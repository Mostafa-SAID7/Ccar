export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: string[];
}

export interface PagedResponse<T> {
    data: T[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
    rememberMe?: boolean;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName?: string;
    lastName?: string;
}

export interface CreatePostRequest {
    content: string;
    images?: string[];
    type?: string;
}

export interface UpdatePostRequest {
    content: string;
    images?: string[];
}

export interface CreateCommentRequest {
    content: string;
    parentId?: string;
}

export interface UpdateProfileRequest {
    firstName?: string;
    lastName?: string;
    bio?: string;
    avatar?: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface SearchRequest {
    query: string;
    type?: string;
    pageNumber?: number;
    pageSize?: number;
}

export interface NotificationSettingsRequest {
    email?: {
        likes?: boolean;
        comments?: boolean;
        follows?: boolean;
        mentions?: boolean;
    };
    push?: {
        likes?: boolean;
        comments?: boolean;
        follows?: boolean;
        mentions?: boolean;
    };
}
