using Application.Abstractions.Interfaces;
using Domain.Shared;
using MediatR;

namespace Application.Users.DeleteAccount;

public record DeleteAccountCommand(string UserId) : IRequest<Result>;

public class DeleteAccountCommandHandler : IRequestHandler<DeleteAccountCommand, Result>
{
    private readonly IIdentityService _identityService;

    public DeleteAccountCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<Result> Handle(DeleteAccountCommand request, CancellationToken cancellationToken)
    {
        return await _identityService.DeleteAccountAsync(request.UserId);
    }
}
