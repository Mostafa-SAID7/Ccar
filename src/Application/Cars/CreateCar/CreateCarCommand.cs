using Application.DTOs.Request;
using Domain.Shared;
using MediatR;

namespace Application.Cars.CreateCar;

public record CreateCarCommand(CreateCarDto CarDto, string UserId) : IRequest<Result<Guid>>;
