export interface User {
    id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    displayName: string;
    avatar?: string;
    bio?: string;
    role: string;
    isVerified: boolean;
    followersCount: number;
    followingCount: number;
    postsCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Post {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string;
    content: string;
    images?: string[];
    type: string;
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
    isLiked: boolean;
    isBookmarked: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    id: string;
    postId: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string;
    content: string;
    likesCount: number;
    isLiked: boolean;
    parentId?: string;
    replies?: Comment[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Notification {
    id: string;
    type: string;
    title: string;
    message: string;
    isRead: boolean;
    actionUrl?: string;
    actor?: {
        name: string;
        avatar?: string;
    };
    createdAt: Date;
}

export interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    description?: string;
    images?: string[];
    price?: number;
    mileage?: number;
    fuelType?: string;
    transmission?: string;
    color?: string;
    ownerId: string;
    isFavorite: boolean;
    viewsCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Dashboard {
    totalUsers?: number;
    activeUsers?: number;
    totalPosts?: number;
    totalComments?: number;
    recentActivity?: Activity[];
    stats?: Stat[];
}

export interface Activity {
    user: string;
    action: string;
    time: Date;
    icon?: string;
}

export interface Stat {
    label: string;
    value: number;
    change?: string;
    trend?: 'up' | 'down' | 'stable';
}

export interface SearchResult {
    query: string;
    totalResults: number;
    searchTime: string;
    results: {
        posts?: Post[];
        users?: User[];
        cars?: Car[];
    };
    suggestions?: string[];
}

export interface Analytics {
    period: string;
    overview: {
        totalViews: number;
        uniqueVisitors: number;
        averageSessionDuration: string;
        bounceRate: number;
    };
    dailyStats?: DailyStat[];
    topPages?: PageStat[];
}

export interface DailyStat {
    date: string;
    views: number;
    visitors: number;
    sessions: number;
}

export interface PageStat {
    path: string;
    views: number;
    avgDuration: string;
    bounceRate: number;
}
