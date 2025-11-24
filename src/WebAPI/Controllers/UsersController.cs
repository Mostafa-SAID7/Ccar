using Application.Abstractions.DTOs.Request;
using Application.Users.ChangeEmail;
using Application.Users.ChangePassword;
using Application.Users.DeleteAccount;
using Application.Users.GetUserProfile;
using Application.Users.UpdateProfile;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly ISender _sender;

    public UsersController(ISender sender)
    {
        _sender = sender;
    }

    private string GetCurrentUserId()
    {
        return User.FindFirstValue(ClaimTypes.NameIdentifier)!;
    }

    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var userId = GetCurrentUserId();
        var result = await _sender.Send(new GetUserProfileQuery(userId));

        if (result.IsFailure)
        {
            return NotFound(result.Error);
        }

        return Ok(result.Value);
    }

    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
    {
        var userId = GetCurrentUserId();
        var result = await _sender.Send(new UpdateProfileCommand(userId, dto));

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(new { message = "Profile updated successfully" });
    }

    [HttpPut("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        var userId = GetCurrentUserId();
        var result = await _sender.Send(new ChangePasswordCommand(userId, request.CurrentPassword, request.NewPassword));

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(new { message = "Password changed successfully" });
    }

    [HttpPut("change-email")]
    public async Task<IActionResult> ChangeEmail([FromBody] ChangeEmailRequest request)
    {
        var userId = GetCurrentUserId();
        var result = await _sender.Send(new ChangeEmailCommand(userId, request.NewEmail));

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(new { message = "Email change initiated. Please confirm your new email." });
    }

    [HttpDelete("account")]
    public async Task<IActionResult> DeleteAccount()
    {
        var userId = GetCurrentUserId();
        var result = await _sender.Send(new DeleteAccountCommand(userId));

        if (result.IsFailure)
        {
            return BadRequest(result.Error);
        }

        return Ok(new { message = "Account deleted successfully" });
    }
}

// Request DTOs for UsersController
public record ChangePasswordRequest(string CurrentPassword, string NewPassword);
public record ChangeEmailRequest(string NewEmail);
