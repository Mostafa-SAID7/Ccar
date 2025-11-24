using Application.Abstractions;
using Domain.Entities;
using Domain.Shared;
using MediatR;

namespace Application.Cars.CreateCar;

public class CreateCarCommandHandler : IRequestHandler<CreateCarCommand, Result<Guid>>
{
    private readonly IApplicationDbContext _context;

    public CreateCarCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<Guid>> Handle(CreateCarCommand request, CancellationToken cancellationToken)
    {
        var car = new Car
        {
            Make = request.CarDto.Make,
            Model = request.CarDto.Model,
            Year = request.CarDto.Year,
            Color = request.CarDto.Color,
            LicensePlate = request.CarDto.LicensePlate,
            VIN = request.CarDto.VIN,
            Mileage = request.CarDto.Mileage,
            Description = request.CarDto.Description,
            ImageUrl = request.CarDto.ImageUrl,
            PricePerDay = request.CarDto.PricePerDay,
            OwnerId = request.UserId,
            IsAvailable = true,
            CreatedAt = DateTime.UtcNow
        };

        _context.Cars.Add(car);
        await _context.SaveChangesAsync(cancellationToken);

        return Result<Guid>.Success(car.Id);
    }
}
