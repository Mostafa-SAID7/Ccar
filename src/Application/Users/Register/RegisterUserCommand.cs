using Application.Abstractions.Interfaces;
using Domain.Shared;
using MediatR;

namespace Application.Users.Register;

public record RegisterUserCommand(string Email, string Password, string FirstName, string LastName) : IRequest<Result>;

public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, Result>
{
    private readonly IIdentityService _identityService;

    public RegisterUserCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<Result> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        return await _identityService.RegisterAsync(
            request.Email,
            request.Password,
            request.FirstName,
            request.LastName);
    }
}
