namespace Infrastructure.Authentication;

public class JwtOptions
{
    public string ValidIssuer { get; set; } = string.Empty;
    public string ValidAudience { get; set; } = string.Empty;
    public string Secret { get; set; } = string.Empty;
    public int TokenExpirationInHours { get; set; }
    public int RefreshTokenExpirationInDays { get; set; }
}
