using System.Security.Claims;
using Domain.Entities;
using Domain.Enums;
using Persistence.Data;

namespace WebAPI.Middleware;

public class UserTrackingMiddleware
{
    private readonly RequestDelegate _next;

    public UserTrackingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, ApplicationDbContext dbContext)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!string.IsNullOrEmpty(userId))
        {
            var deviceId = context.Request.Headers["X-Device-Id"].FirstOrDefault() ?? "Unknown";
            var ipAddress = context.Connection.RemoteIpAddress?.ToString() ?? "Unknown";
            var action = $"{context.Request.Method} {context.Request.Path}";

            var activity = new UserActivity
            {
                UserId = userId,
                ActivityType = UserActivityType.ApiCall,
                Details = action,
                DeviceId = deviceId,
                IpAddress = ipAddress,
                Timestamp = DateTime.UtcNow
            };

            dbContext.UserActivities.Add(activity);
            await dbContext.SaveChangesAsync();
        }

        await _next(context);
    }
}
