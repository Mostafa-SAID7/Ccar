using Application.Abstractions.DTOs.Request;
using Application.Abstractions.Interfaces;
using Domain.Shared;
using MediatR;

namespace Application.Users.UpdateProfile;

public record UpdateProfileCommand(string UserId, UpdateProfileDto Dto) : IRequest<Result>;

public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand, Result>
{
    private readonly IIdentityService _identityService;

    public UpdateProfileCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<Result> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
    {
        return await _identityService.UpdateProfileAsync(request.UserId, request.Dto);
    }
}
