using Application.Abstractions.Interfaces;
using Domain.Shared;
using MediatR;

namespace Application.Users.ChangeEmail;

public record ChangeEmailCommand(string UserId, string NewEmail) : IRequest<Result>;

public class ChangeEmailCommandHandler : IRequestHandler<ChangeEmailCommand, Result>
{
    private readonly IIdentityService _identityService;

    public ChangeEmailCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<Result> Handle(ChangeEmailCommand request, CancellationToken cancellationToken)
    {
        return await _identityService.ChangeEmailAsync(request.UserId, request.NewEmail);
    }
}
