using Application.Abstractions.DTOs.Request;
using Application.Abstractions.DTOs.Response;
using Domain.Shared;

namespace Application.Abstractions.Interfaces;

public interface IIdentityService
{
    // Authentication
    Task<Result<TokenResponse>> LoginAsync(string email, string password);
    Task<Result> RegisterAsync(string email, string password, string firstName, string lastName);
    Task<Result<TokenResponse>> RefreshTokenAsync(string accessToken, string refreshToken);

    // User Profile (Read)
    Task<Result<UserDto>> GetUserProfileAsync(string userId);

    // User Profile (Update)
    Task<Result> UpdateProfileAsync(string userId, UpdateProfileDto dto);

    // Password Management
    Task<Result> ChangePasswordAsync(string userId, string currentPassword, string newPassword);
    Task<Result> RequestPasswordResetAsync(string email);
    Task<Result> ResetPasswordAsync(string email, string token, string newPassword);

    // Email Management
    Task<Result> ConfirmEmailAsync(string userId, string token);
    Task<Result> ResendEmailConfirmationAsync(string email);
    Task<Result> ChangeEmailAsync(string userId, string newEmail);

    // Account Management (Delete)
    Task<Result> DeleteAccountAsync(string userId);
}
