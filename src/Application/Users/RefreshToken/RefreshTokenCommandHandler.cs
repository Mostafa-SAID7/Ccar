using Application.Abstractions.DTOs.Response;
using Application.Abstractions.Interfaces;
using Domain.Shared;
using MediatR;

namespace Application.Users.RefreshToken;

internal sealed class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, Result<TokenResponse>>
{
    private readonly IIdentityService _identityService;

    public RefreshTokenCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<Result<TokenResponse>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        return await _identityService.RefreshTokenAsync(request.AccessToken, request.RefreshToken);
    }
}
