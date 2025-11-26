export enum UserRole {
    Visitor = 'Visitor',
    Anonymous = 'Anonymous',
    User = 'User',
    Admin = 'Admin',
    Expert = 'Expert',
    Reviewer = 'Reviewer',
    Author = 'Author',
    Instructor = 'Instructor',
    Mechanic = 'Mechanic',
    GarageOwner = 'GarageOwner',
    Vendor = 'Vendor',
    Affiliate = 'Affiliate',
}

export enum PostType {
    Text = 'text',
    Image = 'image',
    Video = 'video',
    Poll = 'poll',
    Article = 'article',
}

export enum NotificationType {
    Like = 'like',
    Comment = 'comment',
    Follow = 'follow',
    Mention = 'mention',
    System = 'system',
    Achievement = 'achievement',
}

export enum ToastType {
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
    Info = 'info',
}

export enum Theme {
    Light = 'light',
    Dark = 'dark',
    Auto = 'auto',
}

export enum Language {
    English = 'en',
    Arabic = 'ar',
    Spanish = 'es',
    French = 'fr',
}

export enum SortOrder {
    Ascending = 'asc',
    Descending = 'desc',
}

export enum PostSortBy {
    Recent = 'recent',
    Trending = 'trending',
    Popular = 'popular',
    Oldest = 'oldest',
}

export enum ContentStatus {
    Draft = 'draft',
    Published = 'published',
    Archived = 'archived',
    Deleted = 'deleted',
}

export enum ModalSize {
    Small = 'sm',
    Medium = 'md',
    Large = 'lg',
    ExtraLarge = 'xl',
}

export enum LoadingState {
    Idle = 'idle',
    Loading = 'loading',
    Success = 'success',
    Error = 'error',
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export enum FileType {
    Image = 'image',
    Video = 'video',
    Document = 'document',
    Audio = 'audio',
}

export enum ActivityType {
    PostCreated = 'post_created',
    PostLiked = 'post_liked',
    CommentAdded = 'comment_added',
    UserFollowed = 'user_followed',
    ProfileUpdated = 'profile_updated',
    AchievementUnlocked = 'achievement_unlocked',
}

export enum AnalyticsPeriod {
    Today = 'today',
    Week = 'week',
    Month = 'month',
    Year = 'year',
    All = 'all',
}

export enum TrendDirection {
    Up = 'up',
    Down = 'down',
    Stable = 'stable',
}

export enum DeviceType {
    Desktop = 'desktop',
    Mobile = 'mobile',
    Tablet = 'tablet',
}

export enum BrowserType {
    Chrome = 'chrome',
    Firefox = 'firefox',
    Safari = 'safari',
    Edge = 'edge',
    Other = 'other',
}
