using Microsoft.AspNetCore.Mvc;
using Application.Common.Models;
using PaginationParams = Application.Common.Models.PaginationParameters;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SearchController : BaseController
{
    [HttpGet]
    public IActionResult Search(
        [FromQuery] string q,
        [FromQuery] string? type = null,
        [FromQuery] PaginationParams? pagination = null)
    {
        pagination ??= new PaginationParams();

        if (string.IsNullOrWhiteSpace(q))
        {
            return Error("Search query is required");
        }

        var results = new
        {
            Query = q,
            TotalResults = 145,
            SearchTime = "0.23s",
            Results = new
            {
                Posts = new[]
                {
                    new
                    {
                        Id = Guid.NewGuid(),
                        Type = "post",
                        Title = "Best practices for electric vehicle maintenance",
                        Excerpt = "...electric vehicle maintenance requires different approaches...",
                        Author = "John Doe",
                        CreatedAt = DateTime.UtcNow.AddDays(-5),
                        Relevance = 0.95
                    },
                    new
                    {
                        Id = Guid.NewGuid(),
                        Type = "post",
                        Title = "Understanding electric car batteries",
                        Excerpt = "...battery technology in electric vehicles has evolved...",
                        Author = "Jane Smith",
                        CreatedAt = DateTime.UtcNow.AddDays(-12),
                        Relevance = 0.87
                    }
                },
                Users = new[]
                {
                    new
                    {
                        Id = Guid.NewGuid(),
                        Type = "user",
                        Name = "Electric Vehicle Expert",
                        Username = "ev_expert",
                        Bio = "Specialist in electric vehicle technology and maintenance",
                        Followers = 1250,
                        Relevance = 0.82
                    }
                },
                Cars = new[]
                {
                    new
                    {
                        Id = Guid.NewGuid(),
                        Type = "car",
                        Make = "Tesla",
                        Model = "Model 3",
                        Year = 2024,
                        Description = "Long Range electric sedan",
                        Relevance = 0.91
                    }
                }
            },
            Suggestions = new[]
            {
                "electric vehicle charging",
                "electric car range",
                "electric vehicle tax credits"
            },
            Filters = new
            {
                Types = new[] { "posts", "users", "cars", "articles" },
                DateRanges = new[] { "today", "week", "month", "year", "all" },
                SortOptions = new[] { "relevance", "recent", "popular" }
            }
        };

        var pagedResult = PagedResult<object>.Create(new[] { results }, pagination.PageNumber, pagination.PageSize);
        return Success(pagedResult);
    }

    [HttpGet("suggestions")]
    public IActionResult GetSuggestions([FromQuery] string q)
    {
        if (string.IsNullOrWhiteSpace(q) || q.Length < 2)
        {
            return Success(new { Suggestions = Array.Empty<string>() });
        }

        var suggestions = new[]
        {
            "electric vehicles",
            "electric car maintenance",
            "electric vehicle charging stations",
            "electric car range comparison",
            "electric vehicle tax credits"
        }.Where(s => s.Contains(q, StringComparison.OrdinalIgnoreCase))
         .Take(5)
         .ToArray();

        return Success(new { Suggestions = suggestions });
    }

    [HttpGet("trending")]
    public IActionResult GetTrendingSearches()
    {
        var trending = new[]
        {
            new { Query = "Tesla Model 3", Count = 1250, Trend = "up" },
            new { Query = "electric vehicle charging", Count = 980, Trend = "up" },
            new { Query = "car maintenance tips", Count = 850, Trend = "stable" },
            new { Query = "best SUVs 2024", Count = 720, Trend = "down" },
            new { Query = "hybrid vs electric", Count = 650, Trend = "up" }
        };

        return Success(new { TrendingSearches = trending });
    }

    [HttpGet("popular")]
    public IActionResult GetPopularContent([FromQuery] string period = "week")
    {
        var popular = new
        {
            Period = period,
            Posts = new[]
            {
                new { Id = Guid.NewGuid(), Title = "Top 10 Electric Vehicles of 2024", Views = 45000, Likes = 3200 },
                new { Id = Guid.NewGuid(), Title = "Complete Car Maintenance Guide", Views = 38000, Likes = 2800 },
                new { Id = Guid.NewGuid(), Title = "Understanding Turbochargers", Views = 32000, Likes = 2400 }
            },
            Users = new[]
            {
                new { Id = Guid.NewGuid(), Name = "Car Expert Pro", Followers = 15000, Posts = 234 },
                new { Id = Guid.NewGuid(), Name = "EV Specialist", Followers = 12000, Posts = 189 },
                new { Id = Guid.NewGuid(), Name = "Mechanic Mike", Followers = 9800, Posts = 156 }
            },
            Topics = new[]
            {
                new { Topic = "Electric Vehicles", Posts = 450, Engagement = 15000 },
                new { Topic = "Car Maintenance", Posts = 680, Engagement = 12000 },
                new { Topic = "Performance Tuning", Posts = 320, Engagement = 8900 }
            }
        };

        return Success(popular);
    }

    [HttpPost("history")]
    public IActionResult SaveSearchHistory([FromBody] SearchHistoryDto searchHistory)
    {
        // TODO: Implement actual save logic
        return Success(new { }, "Search history saved");
    }

    [HttpGet("history")]
    public IActionResult GetSearchHistory([FromQuery] PaginationParams pagination)
    {
        var history = new[]
        {
            new { Query = "electric vehicles", SearchedAt = DateTime.UtcNow.AddHours(-2) },
            new { Query = "car maintenance", SearchedAt = DateTime.UtcNow.AddHours(-5) },
            new { Query = "Tesla Model 3", SearchedAt = DateTime.UtcNow.AddDays(-1) },
            new { Query = "hybrid cars", SearchedAt = DateTime.UtcNow.AddDays(-2) }
        };

        var pagedResult = PagedResult<object>.Create(history, pagination.PageNumber, pagination.PageSize);
        return Success(pagedResult);
    }

    [HttpDelete("history")]
    public IActionResult ClearSearchHistory()
    {
        // TODO: Implement actual clear logic
        return Success(new { }, "Search history cleared");
    }
}

public class SearchHistoryDto
{
    public string Query { get; set; } = string.Empty;
    public string? Type { get; set; }
}
