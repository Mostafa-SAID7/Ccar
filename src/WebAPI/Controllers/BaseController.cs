using Microsoft.AspNetCore.Mvc;
using Application.Common.Models;
using System.Security.Claims;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseController : ControllerBase
{
    protected string? CurrentUserId => User.FindFirstValue(ClaimTypes.NameIdentifier);
    protected string? CurrentUserEmail => User.FindFirstValue(ClaimTypes.Email);
    protected string? CurrentUserRole => User.FindFirstValue(ClaimTypes.Role);

    protected IActionResult Success<T>(T data, string? message = null)
    {
        return Ok(ApiResponse<T>.SuccessResponse(data, message));
    }

    protected IActionResult Created<T>(T data, string? message = null)
    {
        return StatusCode(201, ApiResponse<T>.SuccessResponse(data, message));
    }

    protected IActionResult Error(string message, List<string>? errors = null, int statusCode = 400)
    {
        var response = ApiResponse<object>.ErrorResponse(message, errors);
        return StatusCode(statusCode, response);
    }

    protected IActionResult NotFound(string message = "Resource not found")
    {
        return Error(message, statusCode: 404);
    }

    protected IActionResult Forbidden(string message = "Access denied")
    {
        return Error(message, statusCode: 403);
    }

    protected IActionResult Unauthorized(string message = "Unauthorized")
    {
        return Error(message, statusCode: 401);
    }
}
