using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Common.Models;
using PaginationParams = Application.Common.Models.PaginationParameters;
using System.Security.Claims;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NotificationsController : BaseController
{
    [HttpGet]
    public IActionResult GetNotifications([FromQuery] PaginationParams pagination, [FromQuery] bool unreadOnly = false)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var notifications = new[]
        {
            new
            {
                Id = Guid.NewGuid(),
                Type = "like",
                Title = "New Like",
                Message = "John Doe liked your post",
                IsRead = false,
                CreatedAt = DateTime.UtcNow.AddMinutes(-5),
                ActionUrl = "/posts/123",
                Actor = new { Name = "John Doe", Avatar = "/avatars/john.jpg" }
            },
            new
            {
                Id = Guid.NewGuid(),
                Type = "comment",
                Title = "New Comment",
                Message = "Jane Smith commented on your post",
                IsRead = false,
                CreatedAt = DateTime.UtcNow.AddMinutes(-15),
                ActionUrl = "/posts/123#comment-456",
                Actor = new { Name = "Jane Smith", Avatar = "/avatars/jane.jpg" }
            },
            new
            {
                Id = Guid.NewGuid(),
                Type = "follow",
                Title = "New Follower",
                Message = "Mike Johnson started following you",
                IsRead = true,
                CreatedAt = DateTime.UtcNow.AddHours(-2),
                ActionUrl = "/users/mike-johnson",
                Actor = new { Name = "Mike Johnson", Avatar = "/avatars/mike.jpg" }
            },
            new
            {
                Id = Guid.NewGuid(),
                Type = "mention",
                Title = "Mentioned",
                Message = "Sarah Williams mentioned you in a comment",
                IsRead = true,
                CreatedAt = DateTime.UtcNow.AddHours(-5),
                ActionUrl = "/posts/789#comment-101",
                Actor = new { Name = "Sarah Williams", Avatar = "/avatars/sarah.jpg" }
            },
            new
            {
                Id = Guid.NewGuid(),
                Type = "system",
                Title = "Welcome!",
                Message = "Welcome to Ccar Community! Complete your profile to get started.",
                IsRead = true,
                CreatedAt = DateTime.UtcNow.AddDays(-7),
                ActionUrl = "/profile/edit",
                Actor = new { Name = "Ccar", Avatar = "/logo.png" }
            }
        };

        var filtered = unreadOnly ? notifications.Where(n => !n.IsRead) : notifications;
        var pagedResult = PagedResult<object>.Create(filtered, pagination.PageNumber, pagination.PageSize);

        return Success(pagedResult);
    }

    [HttpGet("unread-count")]
    public IActionResult GetUnreadCount()
    {
        var count = new
        {
            Total = 12,
            ByType = new
            {
                Likes = 5,
                Comments = 4,
                Follows = 2,
                Mentions = 1,
                System = 0
            }
        };

        return Success(count);
    }

    [HttpPost("{id}/read")]
    public IActionResult MarkAsRead(Guid id)
    {
        // TODO: Implement actual mark as read logic
        return Success(new { }, "Notification marked as read");
    }

    [HttpPost("read-all")]
    public IActionResult MarkAllAsRead()
    {
        // TODO: Implement actual mark all as read logic
        return Success(new { }, "All notifications marked as read");
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteNotification(Guid id)
    {
        // TODO: Implement actual delete logic
        return Success(new { }, "Notification deleted");
    }

    [HttpDelete("clear-all")]
    public IActionResult ClearAllNotifications()
    {
        // TODO: Implement actual clear all logic
        return Success(new { }, "All notifications cleared");
    }

    [HttpGet("settings")]
    public IActionResult GetNotificationSettings()
    {
        var settings = new
        {
            Email = new
            {
                Likes = true,
                Comments = true,
                Follows = true,
                Mentions = true,
                SystemUpdates = false,
                Newsletter = true
            },
            Push = new
            {
                Likes = false,
                Comments = true,
                Follows = true,
                Mentions = true,
                SystemUpdates = true
            },
            InApp = new
            {
                Likes = true,
                Comments = true,
                Follows = true,
                Mentions = true,
                SystemUpdates = true
            },
            Frequency = new
            {
                Email = "instant", // instant, daily, weekly
                Push = "instant"
            }
        };

        return Success(settings);
    }

    [HttpPut("settings")]
    public IActionResult UpdateNotificationSettings([FromBody] NotificationSettingsDto settings)
    {
        // TODO: Implement actual update logic
        return Success(settings, "Notification settings updated");
    }

    [HttpPost("test")]
    public IActionResult SendTestNotification([FromBody] TestNotificationDto notification)
    {
        // TODO: Implement actual test notification logic
        return Success(new
        {
            Sent = true,
            Type = notification.Type,
            Message = "Test notification sent successfully"
        });
    }
}

public class NotificationSettingsDto
{
    public EmailSettings? Email { get; set; }
    public PushSettings? Push { get; set; }
    public InAppSettings? InApp { get; set; }
}

public class EmailSettings
{
    public bool Likes { get; set; }
    public bool Comments { get; set; }
    public bool Follows { get; set; }
    public bool Mentions { get; set; }
    public bool SystemUpdates { get; set; }
    public bool Newsletter { get; set; }
}

public class PushSettings
{
    public bool Likes { get; set; }
    public bool Comments { get; set; }
    public bool Follows { get; set; }
    public bool Mentions { get; set; }
    public bool SystemUpdates { get; set; }
}

public class InAppSettings
{
    public bool Likes { get; set; }
    public bool Comments { get; set; }
    public bool Follows { get; set; }
    public bool Mentions { get; set; }
    public bool SystemUpdates { get; set; }
}

public class TestNotificationDto
{
    public string Type { get; set; } = "test";
    public string Message { get; set; } = "This is a test notification";
}
