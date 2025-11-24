using Microsoft.AspNetCore.SignalR;

namespace WebAPI.Hubs;

public class NotificationHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        await base.OnConnectedAsync();
    }
}
