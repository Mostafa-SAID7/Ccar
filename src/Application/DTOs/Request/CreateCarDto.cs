namespace Application.DTOs.Request;

public record CreateCarDto(
    string Make,
    string Model,
    int Year,
    string Color,
    string LicensePlate,
    string VIN,
    decimal Mileage,
    string? Description,
    string? ImageUrl,
    decimal PricePerDay
);
