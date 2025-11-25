namespace Domain.Entities;

public class Like
{
    public Guid PostId { get; set; }
    public Post? Post { get; set; }

    public string UserId { get; set; } = string.Empty;
    public User? User { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
