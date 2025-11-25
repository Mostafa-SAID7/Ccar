using Application.DTOs.Request;
using Application.DTOs.Response;
using Domain.Shared;

namespace Application.Interfaces;

public interface ICommunityService
{
    Task<Result<List<PostDto>>> GetPostsAsync(string currentUserId, CancellationToken cancellationToken = default);
    Task<Result<PostDto>> CreatePostAsync(string userId, CreatePostDto request, CancellationToken cancellationToken = default);
    Task<Result> LikePostAsync(string userId, Guid postId, CancellationToken cancellationToken = default);
    Task<Result<CommentDto>> AddCommentAsync(string userId, Guid postId, CreateCommentDto request, CancellationToken cancellationToken = default);
}
