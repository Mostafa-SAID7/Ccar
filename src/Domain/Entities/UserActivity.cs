using Domain.Enums;
using Domain.Primitives;

namespace Domain.Entities;

public class UserActivity : Entity
{
    public string UserId { get; set; } = string.Empty;
    public UserActivityType ActivityType { get; set; }
    public bool IsSuccessful { get; set; } = true;
    public string DeviceId { get; set; } = string.Empty;
    public string IpAddress { get; set; } = string.Empty;
    public string? Details { get; set; } // JSON string for additional context
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    // Navigation Property
    public User? User { get; set; }
}
