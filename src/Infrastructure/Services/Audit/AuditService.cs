using Application.Abstractions.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Persistence.Data;

namespace Infrastructure.Services.Audit;

public class AuditService : IAuditService
{
    private readonly ApplicationDbContext _context;

    public AuditService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task LogActivityAsync(string? userId, UserActivityType activityType, bool isSuccessful, string? details = null)
    {
        var activity = new UserActivity
        {
            UserId = userId ?? "Unknown",
            ActivityType = activityType,
            IsSuccessful = isSuccessful,
            Details = details,
            Timestamp = DateTime.UtcNow
        };

        _context.Set<UserActivity>().Add(activity);
        await _context.SaveChangesAsync();
    }
}
