using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Domain.Entities;
using System.Security.Claims;

namespace WebAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class ExternalLoginController : ControllerBase
{
    private readonly SignInManager<User> _signInManager;
    private readonly UserManager<User> _userManager;

    public ExternalLoginController(SignInManager<User> signInManager, UserManager<User> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
    }

    [HttpGet("Challenge/{provider}")]
    public IActionResult Challenge(string provider, string returnUrl = "/")
    {
        var redirectUrl = Url.Action(nameof(Callback), "ExternalLogin", new { provider, returnUrl });
        var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
        return Challenge(properties, provider);
    }

    [HttpGet("Callback")]
    public async Task<IActionResult> Callback(string provider, string returnUrl = "/")
    {
        var info = await _signInManager.GetExternalLoginInfoAsync();
        if (info == null) return BadRequest("External login information not available.");

        var signInResult = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);
        if (signInResult.Succeeded) return LocalRedirect(returnUrl);

        // Create a new user if not exists
        var email = info.Principal.FindFirstValue(System.Security.Claims.ClaimTypes.Email) ?? "";
        var user = new User { UserName = email, Email = email, EmailConfirmed = true };
        var createResult = await _userManager.CreateAsync(user);
        if (!createResult.Succeeded) return BadRequest(createResult.Errors);

        await _userManager.AddLoginAsync(user, info);
        await _signInManager.SignInAsync(user, isPersistent: false);
        return LocalRedirect(returnUrl);
    }
}
