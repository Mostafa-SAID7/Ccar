using Application.Abstractions.Interfaces;
using Domain.Shared;
using MediatR;

namespace Application.Users.ResetPassword;

public record ResetPasswordCommand(string Email, string Token, string NewPassword) : IRequest<Result>;

public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, Result>
{
    private readonly IIdentityService _identityService;

    public ResetPasswordCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<Result> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        return await _identityService.ResetPasswordAsync(request.Email, request.Token, request.NewPassword);
    }
}
