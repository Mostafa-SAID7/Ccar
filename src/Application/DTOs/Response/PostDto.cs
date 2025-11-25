namespace Application.DTOs.Response;

public class PostDto
{
    public Guid Id { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }

    public string AuthorName { get; set; } = string.Empty;
    public string? AuthorImage { get; set; }
    public bool IsAuthor { get; set; }

    public int LikesCount { get; set; }
    public int CommentsCount { get; set; }
    public bool IsLikedByCurrentUser { get; set; }

    public DateTime CreatedAt { get; set; }

    public List<CommentDto> RecentComments { get; set; } = new();
}
