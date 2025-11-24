using Application.Abstractions.DTOs.Response;
using Application.Abstractions.Interfaces;
using Domain.Shared;
using MediatR;

namespace Application.Users.GetUserProfile;

public record GetUserProfileQuery(string UserId) : IRequest<Result<UserDto>>;

public class GetUserProfileQueryHandler : IRequestHandler<GetUserProfileQuery, Result<UserDto>>
{
    private readonly IIdentityService _identityService;

    public GetUserProfileQueryHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<Result<UserDto>> Handle(GetUserProfileQuery request, CancellationToken cancellationToken)
    {
        return await _identityService.GetUserProfileAsync(request.UserId);
    }
}
