namespace Application.Abstractions.DTOs.Request;

public record UpdateProfileDto(
    string FirstName,
    string LastName,
    string? Bio,
    string? PhoneNumber
);
