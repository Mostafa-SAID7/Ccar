using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Application.Common.Models;
using PaginationParams = Application.Common.Models.PaginationParameters;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : BaseController
{
    // Admin dashboard
    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetAdminDashboard()
    {
        var data = new
        {
            TotalUsers = 1250,
            ActiveUsers = 890,
            TotalPosts = 3450,
            TotalComments = 8920,
            NewUsersToday = 45,
            NewPostsToday = 123,
            RecentActivity = new[]
            {
                new { User = "John Doe", Action = "Created Post", Time = DateTime.UtcNow.AddMinutes(-5) },
                new { User = "Jane Smith", Action = "Commented", Time = DateTime.UtcNow.AddMinutes(-12) },
                new { User = "Mike Johnson", Action = "Joined", Time = DateTime.UtcNow.AddMinutes(-20) }
            },
            SystemHealth = new
            {
                Status = "Healthy",
                Uptime = "99.9%",
                ResponseTime = "45ms",
                ErrorRate = "0.01%"
            }
        };
        return Success(data);
    }

    // Expert dashboard
    [HttpGet("expert")]
    [Authorize(Roles = "Expert")]
    public IActionResult GetExpertDashboard()
    {
        var data = new
        {
            TotalAnswers = 156,
            AcceptedAnswers = 98,
            AcceptanceRate = 62.8,
            Reputation = 2450,
            QuestionsAnswered = new[]
            {
                new { Question = "Best oil for high-performance engines?", Votes = 24, Accepted = true },
                new { Question = "Turbo vs Supercharger comparison", Votes = 18, Accepted = true },
                new { Question = "Brake pad recommendations", Votes = 12, Accepted = false }
            },
            RecentActivity = new[]
            {
                new { Action = "Answered question", Time = DateTime.UtcNow.AddHours(-2) },
                new { Action = "Received upvote", Time = DateTime.UtcNow.AddHours(-5) }
            }
        };
        return Success(data);
    }

    // Reviewer dashboard
    [HttpGet("reviewer")]
    [Authorize(Roles = "Reviewer")]
    public IActionResult GetReviewerDashboard()
    {
        var data = new
        {
            TotalReviews = 89,
            AverageRating = 4.5,
            PendingReviews = 5,
            RecentReviews = new[]
            {
                new { Car = "2024 Toyota Camry", Rating = 4.5, Date = DateTime.UtcNow.AddDays(-1) },
                new { Car = "2023 Honda Accord", Rating = 4.8, Date = DateTime.UtcNow.AddDays(-3) },
                new { Car = "2024 Tesla Model 3", Rating = 4.9, Date = DateTime.UtcNow.AddDays(-5) }
            },
            PopularReviews = new[]
            {
                new { Car = "2024 Ford Mustang", Views = 5600, Likes = 234 },
                new { Car = "2023 Chevrolet Corvette", Views = 4200, Likes = 189 }
            }
        };
        return Success(data);
    }

    // Author dashboard
    [HttpGet("author")]
    [Authorize(Roles = "Author")]
    public IActionResult GetAuthorDashboard()
    {
        var data = new
        {
            TotalArticles = 45,
            TotalViews = 125000,
            TotalLikes = 3450,
            AverageEngagement = 7.8,
            RecentArticles = new[]
            {
                new { Title = "Top 10 Car Maintenance Tips", Views = 8900, Likes = 234, Date = DateTime.UtcNow.AddDays(-2) },
                new { Title = "Electric vs Hybrid: Which is Right for You?", Views = 12000, Likes = 456, Date = DateTime.UtcNow.AddDays(-7) },
                new { Title = "Understanding Turbochargers", Views = 6700, Likes = 189, Date = DateTime.UtcNow.AddDays(-14) }
            },
            TopPerforming = new
            {
                Title = "The Future of Autonomous Vehicles",
                Views = 45000,
                Likes = 1200,
                Comments = 345
            }
        };
        return Success(data);
    }

    // Instructor dashboard
    [HttpGet("instructor")]
    [Authorize(Roles = "Instructor")]
    public IActionResult GetInstructorDashboard()
    {
        var data = new
        {
            TotalCourses = 12,
            TotalStudents = 890,
            AverageRating = 4.7,
            CompletionRate = 78.5,
            ActiveCourses = new[]
            {
                new { Title = "Advanced Driving Techniques", Students = 234, Progress = 65 },
                new { Title = "Car Maintenance 101", Students = 456, Progress = 82 },
                new { Title = "Performance Tuning Basics", Students = 200, Progress = 45 }
            },
            RecentFeedback = new[]
            {
                new { Student = "Alex M.", Course = "Advanced Driving", Rating = 5, Comment = "Excellent course!" },
                new { Student = "Sarah W.", Course = "Car Maintenance", Rating = 4, Comment = "Very informative" }
            }
        };
        return Success(data);
    }

    // Mechanic dashboard
    [HttpGet("mechanic")]
    [Authorize(Roles = "Mechanic")]
    public IActionResult GetMechanicDashboard()
    {
        var data = new
        {
            TotalJobs = 567,
            CompletedJobs = 523,
            PendingJobs = 44,
            AverageRating = 4.8,
            Revenue = 125000,
            RecentJobs = new[]
            {
                new { Customer = "John D.", Service = "Oil Change", Status = "Completed", Date = DateTime.UtcNow.AddDays(-1) },
                new { Customer = "Jane S.", Service = "Brake Repair", Status = "In Progress", Date = DateTime.UtcNow },
                new { Customer = "Mike J.", Service = "Engine Diagnostic", Status = "Scheduled", Date = DateTime.UtcNow.AddDays(2) }
            },
            PopularServices = new[]
            {
                new { Service = "Oil Change", Count = 145, Revenue = 7250 },
                new { Service = "Brake Service", Count = 89, Revenue = 12450 },
                new { Service = "Tire Rotation", Count = 112, Revenue = 5600 }
            }
        };
        return Success(data);
    }

    // GarageOwner dashboard
    [HttpGet("garage-owner")]
    [Authorize(Roles = "GarageOwner")]
    public IActionResult GetGarageOwnerDashboard()
    {
        var data = new
        {
            TotalRevenue = 450000,
            MonthlyRevenue = 38000,
            TotalCustomers = 1250,
            ActiveMechanics = 8,
            PendingAppointments = 23,
            RevenueByMonth = new[]
            {
                new { Month = "Jan", Revenue = 35000 },
                new { Month = "Feb", Revenue = 38000 },
                new { Month = "Mar", Revenue = 42000 },
                new { Month = "Apr", Revenue = 39000 },
                new { Month = "May", Revenue = 45000 },
                new { Month = "Jun", Revenue = 38000 }
            },
            TopMechanics = new[]
            {
                new { Name = "Mike Johnson", Jobs = 89, Rating = 4.9, Revenue = 45000 },
                new { Name = "Sarah Williams", Jobs = 76, Rating = 4.8, Revenue = 38000 }
            },
            InventoryAlerts = new[]
            {
                new { Item = "Engine Oil 5W-30", Stock = 5, Status = "Low" },
                new { Item = "Brake Pads", Stock = 12, Status = "Normal" }
            }
        };
        return Success(data);
    }

    // Vendor dashboard
    [HttpGet("vendor")]
    [Authorize(Roles = "Vendor")]
    public IActionResult GetVendorDashboard()
    {
        var data = new
        {
            TotalProducts = 234,
            TotalOrders = 1890,
            TotalRevenue = 567000,
            PendingOrders = 45,
            TopProducts = new[]
            {
                new { Name = "Premium Brake Pads", Sales = 456, Revenue = 45600 },
                new { Name = "Synthetic Oil 5W-30", Sales = 890, Revenue = 35600 },
                new { Name = "Air Filter", Sales = 678, Revenue = 20340 }
            },
            RecentOrders = new[]
            {
                new { OrderId = "ORD-1234", Customer = "Auto Shop A", Amount = 1250, Status = "Shipped" },
                new { OrderId = "ORD-1235", Customer = "Garage B", Amount = 890, Status = "Processing" },
                new { OrderId = "ORD-1236", Customer = "Mechanic C", Amount = 450, Status = "Pending" }
            },
            LowStockItems = new[]
            {
                new { Product = "Spark Plugs", Stock = 15, ReorderLevel = 50 },
                new { Product = "Wiper Blades", Stock = 8, ReorderLevel = 30 }
            }
        };
        return Success(data);
    }

    // Affiliate dashboard
    [HttpGet("affiliate")]
    [Authorize(Roles = "Affiliate")]
    public IActionResult GetAffiliateDashboard()
    {
        var data = new
        {
            TotalClicks = 12500,
            TotalConversions = 234,
            ConversionRate = 1.87,
            TotalEarnings = 8900,
            PendingPayment = 2340,
            TopPerformingLinks = new[]
            {
                new { Product = "Car Wax Kit", Clicks = 890, Conversions = 45, Earnings = 450 },
                new { Product = "Dash Cam", Clicks = 1200, Conversions = 67, Earnings = 670 },
                new { Product = "Tire Pressure Monitor", Clicks = 750, Conversions = 34, Earnings = 340 }
            },
            EarningsByMonth = new[]
            {
                new { Month = "Jan", Earnings = 1200 },
                new { Month = "Feb", Earnings = 1450 },
                new { Month = "Mar", Earnings = 1890 },
                new { Month = "Apr", Earnings = 1670 },
                new { Month = "May", Earnings = 2100 },
                new { Month = "Jun", Earnings = 2340 }
            }
        };
        return Success(data);
    }

    // General analytics endpoint
    [HttpGet("analytics")]
    [Authorize]
    public IActionResult GetAnalytics([FromQuery] string period = "week")
    {
        var data = new
        {
            Period = period,
            UserEngagement = new
            {
                TotalViews = 45000,
                UniqueVisitors = 12000,
                AverageSessionDuration = "5m 32s",
                BounceRate = 32.5
            },
            ContentMetrics = new
            {
                TotalPosts = 890,
                TotalComments = 3450,
                TotalLikes = 12000,
                EngagementRate = 8.5
            },
            TrendingTopics = new[]
            {
                new { Topic = "Electric Vehicles", Posts = 145, Engagement = 4500 },
                new { Topic = "Car Maintenance", Posts = 234, Engagement = 6700 },
                new { Topic = "Performance Tuning", Posts = 89, Engagement = 2300 }
            }
        };
        return Success(data);
    }

    // Activity feed endpoint
    [HttpGet("activity")]
    [Authorize]
    public IActionResult GetActivityFeed([FromQuery] PaginationParams pagination)
    {
        var activities = new[]
        {
            new { User = "John Doe", Action = "Created a post about electric vehicles", Time = DateTime.UtcNow.AddMinutes(-5), Icon = "post" },
            new { User = "Jane Smith", Action = "Commented on 'Best oil for high-performance engines'", Time = DateTime.UtcNow.AddMinutes(-12), Icon = "comment" },
            new { User = "Mike Johnson", Action = "Liked your post", Time = DateTime.UtcNow.AddMinutes(-20), Icon = "like" },
            new { User = "Sarah Williams", Action = "Started following you", Time = DateTime.UtcNow.AddHours(-1), Icon = "follow" },
            new { User = "Tom Brown", Action = "Shared your article", Time = DateTime.UtcNow.AddHours(-2), Icon = "share" },
            new { User = "Alex Martinez", Action = "Mentioned you in a comment", Time = DateTime.UtcNow.AddHours(-3), Icon = "mention" }
        };

        var pagedResult = PagedResult<object>.Create(activities, pagination.PageNumber, pagination.PageSize);
        return Success(pagedResult);
    }

    // Quick stats endpoint
    [HttpGet("quick-stats")]
    [Authorize]
    public IActionResult GetQuickStats()
    {
        var stats = new
        {
            Posts = new { Count = 45, Change = "+12%", Trend = "up" },
            Followers = new { Count = 890, Change = "+5%", Trend = "up" },
            Engagement = new { Count = 3450, Change = "-2%", Trend = "down" },
            Views = new { Count = 12000, Change = "+18%", Trend = "up" }
        };
        return Success(stats);
    }
}
