using Application.DTOs.Request;
using Domain.Shared;
using MediatR;

namespace Application.Cars.UpdateCar;

public record UpdateCarCommand(Guid CarId, UpdateCarDto CarDto, string UserId) : IRequest<Result>;
