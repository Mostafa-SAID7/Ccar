using Application.Abstractions.DTOs.Request;
using Application.Abstractions.DTOs.Response;
using Application.Abstractions.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Domain.Shared;
using Infrastructure.Authentication;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;

namespace Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly UserManager<User> _userManager;
    private readonly JwtProvider _jwtProvider;
    private readonly IEmailService _emailService;
    private readonly IAuditService _auditService;

    public IdentityService(
        UserManager<User> userManager,
        JwtProvider jwtProvider,
        IEmailService emailService,
        IAuditService auditService)
    {
        _userManager = userManager;
        _jwtProvider = jwtProvider;
        _emailService = emailService;
        _auditService = auditService;
    }

    #region Authentication

    public async Task<Result<TokenResponse>> LoginAsync(string email, string password)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user is null || user.IsDeleted)
        {
            await LogActivityAsync(null, UserActivityType.FailedLogin, false, email);
            return Result.Failure<TokenResponse>(new Error("User.NotFound", "User not found"));
        }

        var result = await _userManager.CheckPasswordAsync(user, password);

        if (!result)
        {
            await LogActivityAsync(user.Id, UserActivityType.FailedLogin, false);
            return Result.Failure<TokenResponse>(new Error("User.InvalidCredentials", "Invalid credentials"));
        }

        string accessToken = _jwtProvider.Generate(user);
        string refreshToken = _jwtProvider.GenerateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        user.LastLoginDate = DateTime.UtcNow;

        await _userManager.UpdateAsync(user);
        await LogActivityAsync(user.Id, UserActivityType.Login, true);

        return new TokenResponse(accessToken, refreshToken);
    }

    public async Task<Result<TokenResponse>> RefreshTokenAsync(string accessToken, string refreshToken)
    {
        var principal = _jwtProvider.GetPrincipalFromExpiredToken(accessToken);
        if (principal == null)
        {
            return Result.Failure<TokenResponse>(new Error("Token.Invalid", "Invalid access token"));
        }

        var email = principal.Claims.FirstOrDefault(c => c.Type == System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Email)?.Value;
        if (email == null)
        {
            return Result.Failure<TokenResponse>(new Error("Token.Invalid", "Invalid access token claims"));
        }

        var user = await _userManager.FindByEmailAsync(email);
        if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow || user.IsDeleted)
        {
            return Result.Failure<TokenResponse>(new Error("Token.Invalid", "Invalid refresh token"));
        }

        var newAccessToken = _jwtProvider.Generate(user);
        var newRefreshToken = _jwtProvider.GenerateRefreshToken();

        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        await _userManager.UpdateAsync(user);
        await LogActivityAsync(user.Id, UserActivityType.RefreshToken, true);

        return new TokenResponse(newAccessToken, newRefreshToken);
    }

    public async Task<Result> RegisterAsync(string email, string password, string firstName, string lastName)
    {
        var user = new User
        {
            Email = email,
            UserName = email,
            FirstName = firstName,
            LastName = lastName,
            CreatedAt = DateTime.UtcNow,
            EmailConfirmationToken = GenerateSecureToken(),
            EmailConfirmationTokenExpiry = DateTime.UtcNow.AddHours(24)
        };

        var result = await _userManager.CreateAsync(user, password);

        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(e => new Error(e.Code, e.Description));
            return Result.Failure(errors.First());
        }

        await LogActivityAsync(user.Id, UserActivityType.Register, true);

        // Send confirmation email
        await _emailService.SendEmailConfirmationAsync(user.Email!, user.FirstName, user.EmailConfirmationToken!);

        return Result.Success();
    }

    #endregion

    #region User Profile (Read)

    public async Task<Result<UserDto>> GetUserProfileAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null || user.IsDeleted)
        {
            return Result.Failure<UserDto>(new Error("User.NotFound", "User not found"));
        }

        var userDto = new UserDto(
            user.Id,
            user.Email!,
            user.FirstName,
            user.LastName,
            user.Bio,
            user.ProfilePictureUrl,
            user.PhoneNumber,
            user.EmailConfirmed,
            user.PhoneNumberConfirmed,
            user.TwoFactorEnabled,
            user.LastLoginDate,
            user.CreatedAt
        );

        return Result.Success(userDto);
    }

    #endregion

    #region User Profile (Update)

    public async Task<Result> UpdateProfileAsync(string userId, UpdateProfileDto dto)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null || user.IsDeleted)
        {
            return Result.Failure(new Error("User.NotFound", "User not found"));
        }

        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        user.Bio = dto.Bio;
        user.PhoneNumber = dto.PhoneNumber;
        user.UpdatedAt = DateTime.UtcNow;

        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded)
        {
            return Result.Failure(new Error("User.UpdateFailed", "Failed to update user profile"));
        }

        await LogActivityAsync(user.Id, UserActivityType.ProfileUpdate, true);

        return Result.Success();
    }

    #endregion

    #region Password Management

    public async Task<Result> ChangePasswordAsync(string userId, string currentPassword, string newPassword)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null || user.IsDeleted)
        {
            await LogActivityAsync(userId, UserActivityType.PasswordChange, false);
            return Result.Failure(new Error("User.NotFound", "User not found"));
        }

        var result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);

        if (!result.Succeeded)
        {
            await LogActivityAsync(user.Id, UserActivityType.PasswordChange, false);
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            return Result.Failure(new Error("User.PasswordChangeFailed", errors));
        }

        user.UpdatedAt = DateTime.UtcNow;
        await _userManager.UpdateAsync(user);
        await LogActivityAsync(user.Id, UserActivityType.PasswordChange, true);

        return Result.Success();
    }

    public async Task<Result> RequestPasswordResetAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        // Don't reveal if user exists or not for security
        if (user == null || user.IsDeleted)
        {
            return Result.Success();
        }

        user.PasswordResetToken = GenerateSecureToken();
        user.PasswordResetTokenExpiry = DateTime.UtcNow.AddHours(1);
        user.UpdatedAt = DateTime.UtcNow;

        await _userManager.UpdateAsync(user);
        await LogActivityAsync(user.Id, UserActivityType.PasswordResetRequest, true);

        await _emailService.SendPasswordResetAsync(user.Email!, user.FirstName, user.PasswordResetToken);

        return Result.Success();
    }

    public async Task<Result> ResetPasswordAsync(string email, string token, string newPassword)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null || user.IsDeleted)
        {
            return Result.Failure(new Error("User.NotFound", "User not found"));
        }

        if (user.PasswordResetToken != token || user.PasswordResetTokenExpiry == null || user.PasswordResetTokenExpiry < DateTime.UtcNow)
        {
            await LogActivityAsync(user.Id, UserActivityType.PasswordReset, false);
            return Result.Failure(new Error("User.InvalidToken", "Invalid or expired password reset token"));
        }

        var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
        var result = await _userManager.ResetPasswordAsync(user, resetToken, newPassword);

        if (!result.Succeeded)
        {
            await LogActivityAsync(user.Id, UserActivityType.PasswordReset, false);
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            return Result.Failure(new Error("User.PasswordResetFailed", errors));
        }

        // Clear reset token after successful use
        user.PasswordResetToken = null;
        user.PasswordResetTokenExpiry = null;
        user.UpdatedAt = DateTime.UtcNow;

        await _userManager.UpdateAsync(user);
        await LogActivityAsync(user.Id, UserActivityType.PasswordReset, true);

        return Result.Success();
    }

    #endregion

    #region Email Management

    public async Task<Result> ConfirmEmailAsync(string userId, string token)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null || user.IsDeleted)
        {
            return Result.Failure(new Error("User.NotFound", "User not found"));
        }

        if (user.EmailConfirmationToken != token || user.EmailConfirmationTokenExpiry == null || user.EmailConfirmationTokenExpiry < DateTime.UtcNow)
        {
            await LogActivityAsync(user.Id, UserActivityType.EmailConfirmation, false);
            return Result.Failure(new Error("User.InvalidToken", "Invalid or expired email confirmation token"));
        }

        user.EmailConfirmed = true;
        user.EmailConfirmationToken = null;
        user.EmailConfirmationTokenExpiry = null;
        user.UpdatedAt = DateTime.UtcNow;

        await _userManager.UpdateAsync(user);
        await LogActivityAsync(user.Id, UserActivityType.EmailConfirmation, true);

        return Result.Success();
    }

    public async Task<Result> ResendEmailConfirmationAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null || user.IsDeleted)
        {
            return Result.Failure(new Error("User.NotFound", "User not found"));
        }

        if (user.EmailConfirmed)
        {
            return Result.Failure(new Error("User.EmailAlreadyConfirmed", "Email is already confirmed"));
        }

        user.EmailConfirmationToken = GenerateSecureToken();
        user.EmailConfirmationTokenExpiry = DateTime.UtcNow.AddHours(24);

        await _userManager.UpdateAsync(user);
        await LogActivityAsync(user.Id, UserActivityType.ResendEmailConfirmation, true);

        await _emailService.SendEmailConfirmationAsync(user.Email!, user.FirstName, user.EmailConfirmationToken);

        return Result.Success();
    }

    public async Task<Result> ChangeEmailAsync(string userId, string newEmail)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null || user.IsDeleted)
        {
            return Result.Failure(new Error("User.NotFound", "User not found"));
        }

        // Check if new email is already in use
        var existingUser = await _userManager.FindByEmailAsync(newEmail);
        if (existingUser != null)
        {
            await LogActivityAsync(user.Id, UserActivityType.EmailChange, false);
            return Result.Failure(new Error("User.EmailInUse", "Email is already in use"));
        }

        var result = await _userManager.SetEmailAsync(user, newEmail);
        if (!result.Succeeded)
        {
            await LogActivityAsync(user.Id, UserActivityType.EmailChange, false);
            return Result.Failure(new Error("User.EmailChangeFailed", "Failed to change email"));
        }

        await _userManager.SetUserNameAsync(user, newEmail);

        user.EmailConfirmed = false;
        user.EmailConfirmationToken = GenerateSecureToken();
        user.EmailConfirmationTokenExpiry = DateTime.UtcNow.AddHours(24);
        user.UpdatedAt = DateTime.UtcNow;

        await _userManager.UpdateAsync(user);
        await LogActivityAsync(user.Id, UserActivityType.EmailChange, true);

        await _emailService.SendEmailChangeConfirmationAsync(newEmail, user.FirstName, user.EmailConfirmationToken);

        return Result.Success();
    }

    #endregion

    #region Account Management (Delete)

    public async Task<Result> DeleteAccountAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user == null || user.IsDeleted)
        {
            return Result.Failure(new Error("User.NotFound", "User not found"));
        }

        // Soft delete
        user.IsDeleted = true;
        user.DeletedAt = DateTime.UtcNow;
        user.UpdatedAt = DateTime.UtcNow;

        // Optionally clear sensitive data
        user.RefreshToken = null;
        user.EmailConfirmationToken = null;
        user.PasswordResetToken = null;

        await _userManager.UpdateAsync(user);
        await LogActivityAsync(user.Id, UserActivityType.AccountDeleted, true);

        return Result.Success();
    }

    #endregion

    #region Helper Methods

    private string GenerateSecureToken()
    {
        var randomBytes = new byte[32];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(randomBytes);
        }
        return Convert.ToBase64String(randomBytes);
    }

    private async Task LogActivityAsync(string? userId, UserActivityType activityType, bool isSuccessful, string? details = null)
    {
        await _auditService.LogActivityAsync(userId, activityType, isSuccessful, details);
    }

    #endregion
}
