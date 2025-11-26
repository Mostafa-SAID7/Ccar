using Application.DTOs.Request;
using Application.Interfaces;
using Application.Common.Models;
using PaginationParams = Application.Common.Models.PaginationParameters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : BaseController
{
    private readonly ICommunityService _communityService;

    public PostsController(ICommunityService communityService)
    {
        _communityService = communityService;
    }

    [HttpGet]
    public async Task<IActionResult> GetPosts(
        [FromQuery] PaginationParams pagination,
        [FromQuery] string? filter = null,
        [FromQuery] string? sortBy = "recent",
        [FromQuery] string? search = null,
        [FromQuery] string? userId = null)
    {
        var result = await _communityService.GetPostsAsync(CurrentUserId ?? string.Empty);

        if (result.IsFailure)
            return Error(result.Error);

        // Apply filtering
        var posts = result.Value.AsEnumerable();

        if (!string.IsNullOrEmpty(search))
        {
            posts = posts.Where(p => p.Content.Contains(search, StringComparison.OrdinalIgnoreCase));
        }

        if (!string.IsNullOrEmpty(userId))
        {
            posts = posts.Where(p => p.AuthorId == userId);
        }

        // Apply sorting
        posts = sortBy?.ToLower() switch
        {
            "trending" => posts.OrderByDescending(p => p.LikesCount + p.CommentsCount),
            "popular" => posts.OrderByDescending(p => p.LikesCount),
            "oldest" => posts.OrderBy(p => p.CreatedAt),
            _ => posts.OrderByDescending(p => p.CreatedAt) // recent (default)
        };

        // Apply pagination
        var pagedResult = PagedResult<object>.Create(posts, pagination.PageNumber, pagination.PageSize);

        return Success(pagedResult);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetPost(Guid id)
    {
        var result = await _communityService.GetPostsAsync(CurrentUserId ?? string.Empty);

        if (result.IsFailure)
            return Error(result.Error);

        var post = result.Value.FirstOrDefault(p => p.Id == id.ToString());
        if (post == null)
            return NotFound("Post not found");

        return Success(post);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreatePost([FromBody] CreatePostDto request)
    {
        if (string.IsNullOrEmpty(CurrentUserId))
            return Unauthorized("User not authenticated");

        var result = await _communityService.CreatePostAsync(CurrentUserId, request);

        if (result.IsFailure)
            return Error(result.Error);

        return CreatedAtAction(nameof(GetPost), new { id = result.Value.Id },
            ApiResponse<object>.SuccessResponse(result.Value, "Post created successfully"));
    }

    [HttpPut("{id:guid}")]
    [Authorize]
    public async Task<IActionResult> UpdatePost(Guid id, [FromBody] CreatePostDto request)
    {
        if (string.IsNullOrEmpty(CurrentUserId))
            return Unauthorized("User not authenticated");

        // TODO: Implement update post logic in service
        return Success(new { }, "Post updated successfully");
    }

    [HttpDelete("{id:guid}")]
    [Authorize]
    public async Task<IActionResult> DeletePost(Guid id)
    {
        if (string.IsNullOrEmpty(CurrentUserId))
            return Unauthorized("User not authenticated");

        // TODO: Implement delete post logic in service
        return Success(new { }, "Post deleted successfully");
    }

    [HttpPost("{id:guid}/like")]
    [Authorize]
    public async Task<IActionResult> LikePost(Guid id)
    {
        if (string.IsNullOrEmpty(CurrentUserId))
            return Unauthorized("User not authenticated");

        var result = await _communityService.LikePostAsync(CurrentUserId, id);

        if (result.IsFailure)
            return Error(result.Error);

        return Success(new { }, "Post liked successfully");
    }

    [HttpDelete("{id:guid}/like")]
    [Authorize]
    public async Task<IActionResult> UnlikePost(Guid id)
    {
        if (string.IsNullOrEmpty(CurrentUserId))
            return Unauthorized("User not authenticated");

        var result = await _communityService.LikePostAsync(CurrentUserId, id); // Toggle like

        if (result.IsFailure)
            return Error(result.Error);

        return Success(new { }, "Post unliked successfully");
    }

    [HttpGet("{id:guid}/comments")]
    public async Task<IActionResult> GetComments(Guid id, [FromQuery] PaginationParams pagination)
    {
        // TODO: Implement get comments with pagination
        var comments = new[]
        {
            new { Id = Guid.NewGuid(), Content = "Great post!", AuthorName = "John Doe", CreatedAt = DateTime.UtcNow },
            new { Id = Guid.NewGuid(), Content = "Thanks for sharing!", AuthorName = "Jane Smith", CreatedAt = DateTime.UtcNow.AddMinutes(-10) }
        };

        var pagedResult = PagedResult<object>.Create(comments, pagination.PageNumber, pagination.PageSize);
        return Success(pagedResult);
    }

    [HttpPost("{id:guid}/comments")]
    [Authorize]
    public async Task<IActionResult> AddComment(Guid id, [FromBody] CreateCommentDto request)
    {
        if (string.IsNullOrEmpty(CurrentUserId))
            return Unauthorized("User not authenticated");

        var result = await _communityService.AddCommentAsync(CurrentUserId, id, request);

        if (result.IsFailure)
            return Error(result.Error);

        return Success(result.Value, "Comment added successfully");
    }

    [HttpPost("{id:guid}/bookmark")]
    [Authorize]
    public async Task<IActionResult> BookmarkPost(Guid id)
    {
        if (string.IsNullOrEmpty(CurrentUserId))
            return Unauthorized("User not authenticated");

        // TODO: Implement bookmark logic
        return Success(new { }, "Post bookmarked successfully");
    }

    [HttpDelete("{id:guid}/bookmark")]
    [Authorize]
    public async Task<IActionResult> RemoveBookmark(Guid id)
    {
        if (string.IsNullOrEmpty(CurrentUserId))
            return Unauthorized("User not authenticated");

        // TODO: Implement remove bookmark logic
        return Success(new { }, "Bookmark removed successfully");
    }

    [HttpPost("{id:guid}/share")]
    [Authorize]
    public async Task<IActionResult> SharePost(Guid id)
    {
        if (string.IsNullOrEmpty(CurrentUserId))
            return Unauthorized("User not authenticated");

        // TODO: Implement share logic (increment share count, create activity)
        return Success(new { ShareUrl = $"https://ccar.com/posts/{id}" }, "Post shared successfully");
    }

    [HttpGet("trending")]
    public async Task<IActionResult> GetTrendingPosts([FromQuery] PaginationParams pagination)
    {
        var result = await _communityService.GetPostsAsync(CurrentUserId ?? string.Empty);

        if (result.IsFailure)
            return Error(result.Error);

        var trendingPosts = result.Value
            .OrderByDescending(p => p.LikesCount + p.CommentsCount)
            .Take(10);

        var pagedResult = PagedResult<object>.Create(trendingPosts, pagination.PageNumber, pagination.PageSize);
        return Success(pagedResult);
    }

    [HttpGet("bookmarks")]
    [Authorize]
    public async Task<IActionResult> GetBookmarkedPosts([FromQuery] PaginationParams pagination)
    {
        if (string.IsNullOrEmpty(CurrentUserId))
            return Unauthorized("User not authenticated");

        // TODO: Implement get bookmarked posts
        var bookmarkedPosts = new object[] { };
        var pagedResult = PagedResult<object>.Create(bookmarkedPosts, pagination.PageNumber, pagination.PageSize);
        return Success(pagedResult);
    }
}
