namespace Application.Common.Constants;

public static class AppConstants
{
    public const string ApplicationName = "Ccar Community";
    public const string ApplicationVersion = "2.0.0";

    public static class Pagination
    {
        public const int DefaultPageSize = 10;
        public const int MaxPageSize = 100;
        public const int MinPageSize = 1;
    }

    public static class Cache
    {
        public const int DefaultExpirationMinutes = 30;
        public const int ShortExpirationMinutes = 5;
        public const int LongExpirationMinutes = 120;

        public static class Keys
        {
            public const string Posts = "posts";
            public const string Users = "users";
            public const string Dashboard = "dashboard";
            public const string Analytics = "analytics";
            public const string Notifications = "notifications";
        }
    }

    public static class RateLimit
    {
        public const int MaxRequestsPerMinute = 100;
        public const int MaxRequestsPerHour = 1000;
        public const int MaxRequestsPerDay = 10000;
    }

    public static class Validation
    {
        public static class Password
        {
            public const int MinLength = 8;
            public const int MaxLength = 128;
            public const bool RequireUppercase = true;
            public const bool RequireLowercase = true;
            public const bool RequireDigit = true;
            public const bool RequireSpecialChar = true;
        }

        public static class Username
        {
            public const int MinLength = 3;
            public const int MaxLength = 30;
        }

        public static class Post
        {
            public const int MinLength = 1;
            public const int MaxLength = 5000;
        }

        public static class Comment
        {
            public const int MinLength = 1;
            public const int MaxLength = 1000;
        }
    }

    public static class FileUpload
    {
        public const int MaxFileSizeMB = 5;
        public const int MaxFilesPerUpload = 5;

        public static readonly string[] AllowedImageExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
        public static readonly string[] AllowedVideoExtensions = { ".mp4", ".webm", ".mov" };
        public static readonly string[] AllowedDocumentExtensions = { ".pdf", ".doc", ".docx", ".txt" };
    }

    public static class Jwt
    {
        public const int AccessTokenExpirationMinutes = 60;
        public const int RefreshTokenExpirationDays = 7;
    }

    public static class Email
    {
        public const string NoReplyAddress = "noreply@ccar.com";
        public const string SupportAddress = "support@ccar.com";
    }
}
