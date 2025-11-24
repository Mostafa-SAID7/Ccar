namespace Application.DTOs.Response;

public record CarDto(
    Guid Id,
    string Make,
    string Model,
    int Year,
    string Color,
    string LicensePlate,
    string VIN,
    decimal Mileage,
    string? Description,
    string? ImageUrl,
    bool IsAvailable,
    decimal PricePerDay,
    string OwnerId,
    string OwnerName,
    DateTime CreatedAt,
    DateTime? UpdatedAt
);
