using Domain.Primitives;

namespace Domain.Entities;

public class Comment : Entity
{
    public string Content { get; set; } = string.Empty;

    public Guid PostId { get; set; }
    public Post? Post { get; set; }

    public string AuthorId { get; set; } = string.Empty;
    public User? Author { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}
