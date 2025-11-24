namespace Domain.Enums;

public enum UserActivityType
{
    // Authentication
    Login,
    Logout,
    FailedLogin,
    RefreshToken,

    // Registration & Email
    Register,
    EmailConfirmation,
    ResendEmailConfirmation,

    // Password Management
    PasswordChange,
    PasswordResetRequest,
    PasswordReset,

    // Profile Management
    ProfileUpdate,
    EmailChange,
    ProfilePictureUpdate,

    // Two-Factor Authentication
    TwoFactorEnabled,
    TwoFactorDisabled,
    TwoFactorVerification,

    // Account Management
    AccountDeleted,
    AccountRestored,

    // API
    ApiCall
}
