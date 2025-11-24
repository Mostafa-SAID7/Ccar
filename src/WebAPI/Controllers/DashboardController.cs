using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class DashboardController : ControllerBase
{
    // Admin dashboard
    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetAdminDashboard()
    {
        // Placeholder data – replace with real admin metrics
        var data = new { Message = "Admin dashboard data", Timestamp = System.DateTime.UtcNow };
        return Ok(data);
    }

    // Expert dashboard
    [HttpGet("expert")]
    [Authorize(Roles = "Expert")]
    public IActionResult GetExpertDashboard()
    {
        var data = new { Message = "Expert dashboard data", Timestamp = System.DateTime.UtcNow };
        return Ok(data);
    }

    // Reviewer dashboard
    [HttpGet("reviewer")]
    [Authorize(Roles = "Reviewer")]
    public IActionResult GetReviewerDashboard()
    {
        var data = new { Message = "Reviewer dashboard data", Timestamp = System.DateTime.UtcNow };
        return Ok(data);
    }

    // Add additional role dashboards as needed (Author, Instructor, Mechanic, GarageOwner, Vendor, Affiliate)
}
