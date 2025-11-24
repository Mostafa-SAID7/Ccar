using Application.Abstractions.DTOs.Response;
using Application.Abstractions.Interfaces;
using Domain.Shared;
using MediatR;

namespace Application.Users.Login;

public record LoginUserCommand(string Email, string Password) : IRequest<Result<TokenResponse>>;

public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, Result<TokenResponse>>
{
    private readonly IIdentityService _identityService;

    public LoginUserCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<Result<TokenResponse>> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        return await _identityService.LoginAsync(request.Email, request.Password);
    }
}
