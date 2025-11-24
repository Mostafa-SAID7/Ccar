using Domain.Entities;
using Domain.Enums;

namespace Application.Abstractions.Interfaces;

public interface IAuditService
{
    Task LogActivityAsync(string? userId, UserActivityType activityType, bool isSuccessful, string? details = null);
}
