using Domain.Primitives;

namespace Domain.Entities;

public class Post : Entity
{
    public string Content { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }

    public string AuthorId { get; set; } = string.Empty;
    public User? Author { get; set; }

    public int LikesCount { get; set; }
    public int CommentsCount { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    public ICollection<Like> Likes { get; set; } = new List<Like>();
}
