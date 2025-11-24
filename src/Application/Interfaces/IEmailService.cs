using Domain.Shared;

namespace Application.Abstractions.Interfaces;

public interface IEmailService
{
    Task<Result> SendEmailConfirmationAsync(string email, string firstName, string token);
    Task<Result> SendPasswordResetAsync(string email, string firstName, string token);
    Task<Result> SendEmailChangeConfirmationAsync(string email, string firstName, string token);
}
