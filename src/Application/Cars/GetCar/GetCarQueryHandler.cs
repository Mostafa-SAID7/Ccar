using Application.Abstractions;
using Application.DTOs.Response;
using Domain.Shared;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Cars.GetCar;

public class GetCarQueryHandler : IRequestHandler<GetCarQuery, Result<CarDto>>
{
    private readonly IApplicationDbContext _context;

    public GetCarQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<CarDto>> Handle(GetCarQuery request, CancellationToken cancellationToken)
    {
        var car = await _context.Cars
            .Include(c => c.Owner)
            .Where(c => c.Id == request.CarId && !c.IsDeleted)
            .Select(c => new CarDto(
                c.Id,
                c.Make,
                c.Model,
                c.Year,
                c.Color,
                c.LicensePlate,
                c.VIN,
                c.Mileage,
                c.Description,
                c.ImageUrl,
                c.IsAvailable,
                c.PricePerDay,
                c.OwnerId,
                c.Owner != null ? $"{c.Owner.FirstName} {c.Owner.LastName}" : "Unknown",
                c.CreatedAt,
                c.UpdatedAt
            ))
            .FirstOrDefaultAsync(cancellationToken);

        if (car == null)
            return Result.Failure<CarDto>(new Error("Car.NotFound", "Car not found"));

        return Result.Success(car);
    }
}
