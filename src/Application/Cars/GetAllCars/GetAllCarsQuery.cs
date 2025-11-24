using Application.DTOs.Response;
using Domain.Shared;
using MediatR;

namespace Application.Cars.GetAllCars;

public record GetAllCarsQuery(bool? IsAvailable = null) : IRequest<Result<List<CarDto>>>;
