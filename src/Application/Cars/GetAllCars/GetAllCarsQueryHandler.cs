using Application.Abstractions;
using Application.DTOs.Response;
using Domain.Shared;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Cars.GetAllCars;

public class GetAllCarsQueryHandler : IRequestHandler<GetAllCarsQuery, Result<List<CarDto>>>
{
    private readonly IApplicationDbContext _context;

    public GetAllCarsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<List<CarDto>>> Handle(GetAllCarsQuery request, CancellationToken cancellationToken)
    {
        var query = _context.Cars
            .Include(c => c.Owner)
            .Where(c => !c.IsDeleted);

        if (request.IsAvailable.HasValue)
            query = query.Where(c => c.IsAvailable == request.IsAvailable.Value);

        var cars = await query
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
            .ToListAsync(cancellationToken);

        return Result<List<CarDto>>.Success(cars);
    }
}
