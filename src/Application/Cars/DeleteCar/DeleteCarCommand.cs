using Domain.Shared;
using MediatR;

namespace Application.Cars.DeleteCar;

public record DeleteCarCommand(Guid CarId, string UserId) : IRequest<Result>;
