using Application.Abstractions.Interfaces;
using Domain.Shared;
using MediatR;

namespace Application.Users.ConfirmEmail;

public record ConfirmEmailCommand(string UserId, string Token) : IRequest<Result>;

public class ConfirmEmailCommandHandler : IRequestHandler<ConfirmEmailCommand, Result>
{
    private readonly IIdentityService _identityService;

    public ConfirmEmailCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<Result> Handle(ConfirmEmailCommand request, CancellationToken cancellationToken)
    {
        return await _identityService.ConfirmEmailAsync(request.UserId, request.Token);
    }
}
