using Application.Abstractions.Interfaces;
using Infrastructure.Authentication;
using Infrastructure.Identity;
using Infrastructure.Services.Email;
using Infrastructure.Services.Audit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Application.Interfaces;
using Infrastructure.Services;

namespace Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<JwtOptions>(configuration.GetSection("JWT"));

        services.AddTransient<JwtProvider>();
        services.AddTransient<IIdentityService, IdentityService>();
        services.AddTransient<IEmailService, EmailService>();
        services.AddScoped<IAuditService, AuditService>();

        services.AddTransient<Infrastructure.DataSeeding.Seeders.UserSeeder>();
        services.AddTransient<Infrastructure.DataSeeding.Seeders.CarSeeder>();
        services.AddScoped<Application.Interfaces.IDataSeeder, Infrastructure.DataSeeding.DataSeeder>();
        services.AddScoped<ICommunityService, CommunityService>();

        return services;
    }
}
