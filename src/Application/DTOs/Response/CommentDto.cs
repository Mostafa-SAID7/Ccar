namespace Application.DTOs.Response;

public class CommentDto
{
    public Guid Id { get; set; }
    public string Content { get; set; } = string.Empty;

    public string AuthorName { get; set; } = string.Empty;
    public string? AuthorImage { get; set; }
    public bool IsAuthor { get; set; }

    public DateTime CreatedAt { get; set; }
}
