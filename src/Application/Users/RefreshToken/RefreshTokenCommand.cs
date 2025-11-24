using Application.Abstractions.DTOs.Response;
using Domain.Shared;
using MediatR;

namespace Application.Users.RefreshToken;

public record RefreshTokenCommand(string AccessToken, string RefreshToken) : IRequest<Result<TokenResponse>>;
