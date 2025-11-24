using Application.DTOs.Response;
using Domain.Shared;
using MediatR;

namespace Application.Cars.GetCar;

public record GetCarQuery(Guid CarId) : IRequest<Result<CarDto>>;
