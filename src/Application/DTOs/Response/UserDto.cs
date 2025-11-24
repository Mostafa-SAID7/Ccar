namespace Application.Abstractions.DTOs.Response;

public record UserDto(
    string Id,
    string Email,
    string FirstName,
    string LastName,
    string? Bio,
    string? ProfilePictureUrl,
    string? PhoneNumber,
    bool EmailConfirmed,
    bool PhoneNumberConfirmed,
    bool TwoFactorEnabled,
    DateTime? LastLoginDate,
    DateTime CreatedAt
);
