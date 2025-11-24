using Application.Abstractions.Interfaces;
using Domain.Shared;
using MediatR;

namespace Application.Users.RequestPasswordReset;

public record RequestPasswordResetCommand(string Email) : IRequest<Result>;

public class RequestPasswordResetCommandHandler : IRequestHandler<RequestPasswordResetCommand, Result>
{
    private readonly IIdentityService _identityService;

    public RequestPasswordResetCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<Result> Handle(RequestPasswordResetCommand request, CancellationToken cancellationToken)
    {
        return await _identityService.RequestPasswordResetAsync(request.Email);
    }
}
