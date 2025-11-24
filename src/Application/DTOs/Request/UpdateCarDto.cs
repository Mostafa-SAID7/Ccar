namespace Application.DTOs.Request;

public record UpdateCarDto(
    string? Make,
    string? Model,
    int? Year,
    string? Color,
    string? LicensePlate,
    decimal? Mileage,
    string? Description,
    string? ImageUrl,
    bool? IsAvailable,
    decimal? PricePerDay
);
