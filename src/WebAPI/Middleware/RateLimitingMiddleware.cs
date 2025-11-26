using System.Collections.Concurrent;
using Application.Common.Models;
using System.Text.Json;

namespace WebAPI.Middleware;

public class RateLimitingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RateLimitingMiddleware> _logger;
    private static readonly ConcurrentDictionary<string, ClientRequestInfo> _clients = new();
    private static readonly TimeSpan _timeWindow = TimeSpan.FromMinutes(1);
    private const int _maxRequests = 100;

    public RateLimitingMiddleware(RequestDelegate next, ILogger<RateLimitingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var clientId = GetClientIdentifier(context);
        var now = DateTime.UtcNow;

        var clientInfo = _clients.GetOrAdd(clientId, _ => new ClientRequestInfo
        {
            WindowStart = now,
            RequestCount = 0
        });

        lock (clientInfo)
        {
            // Reset window if expired
            if (now - clientInfo.WindowStart > _timeWindow)
            {
                clientInfo.WindowStart = now;
                clientInfo.RequestCount = 0;
            }

            clientInfo.RequestCount++;

            // Check if limit exceeded
            if (clientInfo.RequestCount > _maxRequests)
            {
                _logger.LogWarning("Rate limit exceeded for client: {ClientId}", clientId);

                context.Response.StatusCode = 429; // Too Many Requests
                context.Response.ContentType = "application/json";

                var response = ApiResponse<object>.ErrorResponse(
                    "Rate limit exceeded. Please try again later.",
                    new List<string> { $"Maximum {_maxRequests} requests per minute allowed" }
                );

                var json = JsonSerializer.Serialize(response);
                await context.Response.WriteAsync(json);
                return;
            }
        }

        // Clean up old entries periodically
        if (_clients.Count > 10000)
        {
            CleanupOldEntries();
        }

        await _next(context);
    }

    private string GetClientIdentifier(HttpContext context)
    {
        // Try to get user ID first
        var userId = context.User?.FindFirst("sub")?.Value
                     ?? context.User?.FindFirst("id")?.Value;

        if (!string.IsNullOrEmpty(userId))
        {
            return $"user:{userId}";
        }

        // Fall back to IP address
        var ipAddress = context.Connection.RemoteIpAddress?.ToString()
                       ?? context.Request.Headers["X-Forwarded-For"].FirstOrDefault()
                       ?? "unknown";

        return $"ip:{ipAddress}";
    }

    private void CleanupOldEntries()
    {
        var now = DateTime.UtcNow;
        var keysToRemove = _clients
            .Where(kvp => now - kvp.Value.WindowStart > _timeWindow * 2)
            .Select(kvp => kvp.Key)
            .ToList();

        foreach (var key in keysToRemove)
        {
            _clients.TryRemove(key, out _);
        }

        _logger.LogInformation("Cleaned up {Count} old rate limit entries", keysToRemove.Count);
    }

    private class ClientRequestInfo
    {
        public DateTime WindowStart { get; set; }
        public int RequestCount { get; set; }
    }
}
