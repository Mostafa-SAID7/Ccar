using Application.Abstractions;
using Domain.Shared;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Cars.UpdateCar;

public class UpdateCarCommandHandler : IRequestHandler<UpdateCarCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public UpdateCarCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(UpdateCarCommand request, CancellationToken cancellationToken)
    {
        var car = await _context.Cars
            .FirstOrDefaultAsync(c => c.Id == request.CarId && !c.IsDeleted, cancellationToken);

        if (car == null)
            return Result.Failure(new Error("Car.NotFound", "Car not found"));

        if (car.OwnerId != request.UserId)
            return Result.Failure(new Error("Car.Unauthorized", "You are not authorized to update this car"));

        if (request.CarDto.Make != null) car.Make = request.CarDto.Make;
        if (request.CarDto.Model != null) car.Model = request.CarDto.Model;
        if (request.CarDto.Year.HasValue) car.Year = request.CarDto.Year.Value;
        if (request.CarDto.Color != null) car.Color = request.CarDto.Color;
        if (request.CarDto.LicensePlate != null) car.LicensePlate = request.CarDto.LicensePlate;
        if (request.CarDto.Mileage.HasValue) car.Mileage = request.CarDto.Mileage.Value;
        if (request.CarDto.Description != null) car.Description = request.CarDto.Description;
        if (request.CarDto.ImageUrl != null) car.ImageUrl = request.CarDto.ImageUrl;
        if (request.CarDto.IsAvailable.HasValue) car.IsAvailable = request.CarDto.IsAvailable.Value;
        if (request.CarDto.PricePerDay.HasValue) car.PricePerDay = request.CarDto.PricePerDay.Value;

        car.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
