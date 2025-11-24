using Application.Abstractions.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace WebAPI.Services;

public class NotificationService : INotificationService
{
    private readonly IHubContext<Hubs.NotificationHub> _hubContext;

    public NotificationService(IHubContext<Hubs.NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task SendNotificationAsync(string userId, string message, CancellationToken cancellationToken = default)
    {
        await _hubContext.Clients.User(userId).SendAsync("ReceiveNotification", message, cancellationToken);
    }
}
