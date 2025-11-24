using Application.Abstractions.Interfaces;
using Domain.Shared;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Services.Email;

public class EmailService : IEmailService
{
    private readonly ILogger<EmailService> _logger;

    public EmailService(ILogger<EmailService> logger)
    {
        _logger = logger;
    }

    public Task<Result> SendEmailConfirmationAsync(string email, string firstName, string token)
    {
        // TODO: Implement actual email sending logic (SMTP, SendGrid, etc.)
        _logger.LogInformation(
            "Email Confirmation - To: {Email}, Name: {FirstName}, Token: {Token}",
            email, firstName, token);

        return Task.FromResult(Result.Success());
    }

    public Task<Result> SendPasswordResetAsync(string email, string firstName, string token)
    {
        // TODO: Implement actual email sending logic
        _logger.LogInformation(
            "Password Reset - To: {Email}, Name: {FirstName}, Token: {Token}",
            email, firstName, token);

        return Task.FromResult(Result.Success());
    }

    public Task<Result> SendEmailChangeConfirmationAsync(string email, string firstName, string token)
    {
        // TODO: Implement actual email sending logic
        _logger.LogInformation(
            "Email Change Confirmation - To: {Email}, Name: {FirstName}, Token: {Token}",
            email, firstName, token);

        return Task.FromResult(Result.Success());
    }
}
