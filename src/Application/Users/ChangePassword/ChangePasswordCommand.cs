using Application.Abstractions.Interfaces;
using Domain.Shared;
using MediatR;

namespace Application.Users.ChangePassword;

public record ChangePasswordCommand(string UserId, string CurrentPassword, string NewPassword) : IRequest<Result>;

public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, Result>
{
    private readonly IIdentityService _identityService;

    public ChangePasswordCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<Result> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
    {
        return await _identityService.ChangePasswordAsync(request.UserId, request.CurrentPassword, request.NewPassword);
    }
}
