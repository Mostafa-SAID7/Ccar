using Application.Abstractions;
using Domain.Shared;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Cars.DeleteCar;

public class DeleteCarCommandHandler : IRequestHandler<DeleteCarCommand, Result>
{
    private readonly IApplicationDbContext _context;

    public DeleteCarCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result> Handle(DeleteCarCommand request, CancellationToken cancellationToken)
    {
        var car = await _context.Cars
            .FirstOrDefaultAsync(c => c.Id == request.CarId && !c.IsDeleted, cancellationToken);

        if (car == null)
            return Result.Failure(new Error("Car.NotFound", "Car not found"));

        if (car.OwnerId != request.UserId)
            return Result.Failure(new Error("Car.Unauthorized", "You are not authorized to delete this car"));

        car.IsDeleted = true;
        car.DeletedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return Result.Success();
    }
}
