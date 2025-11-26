namespace Application.Common.Enums;

public enum UserRole
{
    Visitor = 0,
    Anonymous = 1,
    User = 2,
    Admin = 3,
    Expert = 4,
    Reviewer = 5,
    Author = 6,
    Instructor = 7,
    Mechanic = 8,
    GarageOwner = 9,
    Vendor = 10,
    Affiliate = 11
}

public enum PostType
{
    Text = 0,
    Image = 1,
    Video = 2,
    Poll = 3,
    Article = 4
}

public enum NotificationType
{
    Like = 0,
    Comment = 1,
    Follow = 2,
    Mention = 3,
    System = 4,
    Achievement = 5
}

public enum ContentStatus
{
    Draft = 0,
    Published = 1,
    Archived = 2,
    Deleted = 3
}

public enum SortOrder
{
    Ascending = 0,
    Descending = 1
}

public enum PostSortBy
{
    Recent = 0,
    Trending = 1,
    Popular = 2,
    Oldest = 3
}

public enum ActivityType
{
    PostCreated = 0,
    PostLiked = 1,
    CommentAdded = 2,
    UserFollowed = 3,
    ProfileUpdated = 4,
    AchievementUnlocked = 5
}

public enum AnalyticsPeriod
{
    Today = 0,
    Week = 1,
    Month = 2,
    Year = 3,
    All = 4
}

public enum TrendDirection
{
    Up = 0,
    Down = 1,
    Stable = 2
}

public enum FileType
{
    Image = 0,
    Video = 1,
    Document = 2,
    Audio = 3
}

public enum DeviceType
{
    Desktop = 0,
    Mobile = 1,
    Tablet = 2
}

public enum BrowserType
{
    Chrome = 0,
    Firefox = 1,
    Safari = 2,
    Edge = 3,
    Other = 4
}

public enum EmailTemplate
{
    Welcome = 0,
    PasswordReset = 1,
    EmailVerification = 2,
    NewFollower = 3,
    NewComment = 4,
    WeeklyDigest = 5
}

public enum CacheStrategy
{
    None = 0,
    Short = 1,
    Medium = 2,
    Long = 3,
    Permanent = 4
}
