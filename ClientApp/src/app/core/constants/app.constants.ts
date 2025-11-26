// API Endpoints
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        LOGOUT: '/api/auth/logout',
        REFRESH: '/api/auth/refresh',
        FORGOT_PASSWORD: '/api/auth/forgot-password',
        RESET_PASSWORD: '/api/auth/reset-password',
    },
    POSTS: {
        BASE: '/api/posts',
        TRENDING: '/api/posts/trending',
        BOOKMARKS: '/api/posts/bookmarks',
        BY_ID: (id: string) => `/api/posts/${id}`,
        LIKE: (id: string) => `/api/posts/${id}/like`,
        COMMENTS: (id: string) => `/api/posts/${id}/comments`,
        BOOKMARK: (id: string) => `/api/posts/${id}/bookmark`,
        SHARE: (id: string) => `/api/posts/${id}/share`,
    },
    DASHBOARD: {
        ADMIN: '/api/dashboard/admin',
        EXPERT: '/api/dashboard/expert',
        REVIEWER: '/api/dashboard/reviewer',
        AUTHOR: '/api/dashboard/author',
        INSTRUCTOR: '/api/dashboard/instructor',
        MECHANIC: '/api/dashboard/mechanic',
        GARAGE_OWNER: '/api/dashboard/garage-owner',
        VENDOR: '/api/dashboard/vendor',
        AFFILIATE: '/api/dashboard/affiliate',
        ANALYTICS: '/api/dashboard/analytics',
        ACTIVITY: '/api/dashboard/activity',
        QUICK_STATS: '/api/dashboard/quick-stats',
    },
    ANALYTICS: {
        USER_ENGAGEMENT: '/api/analytics/user-engagement',
        CONTENT_PERFORMANCE: '/api/analytics/content-performance',
        USER_BEHAVIOR: '/api/analytics/user-behavior',
        REVENUE: '/api/analytics/revenue',
        EXPORT: '/api/analytics/export',
    },
    SEARCH: {
        BASE: '/api/search',
        SUGGESTIONS: '/api/search/suggestions',
        TRENDING: '/api/search/trending',
        POPULAR: '/api/search/popular',
        HISTORY: '/api/search/history',
    },
    NOTIFICATIONS: {
        BASE: '/api/notifications',
        UNREAD_COUNT: '/api/notifications/unread-count',
        READ: (id: string) => `/api/notifications/${id}/read`,
        READ_ALL: '/api/notifications/read-all',
        SETTINGS: '/api/notifications/settings',
        DELETE: (id: string) => `/api/notifications/${id}`,
        CLEAR_ALL: '/api/notifications/clear-all',
    },
    USERS: {
        BASE: '/api/users',
        PROFILE: '/api/users/profile',
        BY_ID: (id: string) => `/api/users/${id}`,
        FOLLOW: (id: string) => `/api/users/${id}/follow`,
        FOLLOWERS: (id: string) => `/api/users/${id}/followers`,
        FOLLOWING: (id: string) => `/api/users/${id}/following`,
    },
    CARS: {
        BASE: '/api/cars',
        BY_ID: (id: string) => `/api/cars/${id}`,
        FAVORITES: '/api/cars/favorites',
    },
} as const;

// Storage Keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_DATA: 'user_data',
    THEME: 'theme',
    LANGUAGE: 'language',
    REMEMBER_ME: 'remember_me',
    SEARCH_HISTORY: 'search_history',
    DRAFT_POST: 'draft_post',
} as const;

// App Configuration
export const APP_CONFIG = {
    APP_NAME: 'Ccar Community',
    APP_VERSION: '2.0.0',
    API_BASE_URL: '/api',
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
    DEBOUNCE_TIME: 300,
    TOAST_DURATION: 5000,
    MAX_FILE_SIZE_MB: 5,
    MAX_FILES_UPLOAD: 5,
    SUPPORTED_IMAGE_FORMATS: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    DATE_FORMAT: 'MMM dd, yyyy',
    TIME_FORMAT: 'HH:mm',
    DATETIME_FORMAT: 'MMM dd, yyyy HH:mm',
} as const;

// Validation Rules
export const VALIDATION = {
    PASSWORD: {
        MIN_LENGTH: 8,
        MAX_LENGTH: 128,
        REQUIRE_UPPERCASE: true,
        REQUIRE_LOWERCASE: true,
        REQUIRE_NUMBER: true,
        REQUIRE_SPECIAL: true,
    },
    USERNAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 30,
        PATTERN: /^[a-zA-Z0-9_-]+$/,
    },
    EMAIL: {
        PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    POST: {
        MIN_LENGTH: 1,
        MAX_LENGTH: 5000,
    },
    COMMENT: {
        MIN_LENGTH: 1,
        MAX_LENGTH: 1000,
    },
} as const;

// Route Paths
export const ROUTES = {
    HOME: '/',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    COMMUNITY: '/community',
    CARS: '/cars',
    CAR_DETAILS: (id: string) => `/cars/${id}`,
    PROFILE: '/profile',
    USER_PROFILE: (id: string) => `/users/${id}`,
    DASHBOARD: '/dashboard',
    SETTINGS: '/settings',
    NOTIFICATIONS: '/notifications',
    SEARCH: '/search',
    NOT_FOUND: '/404',
    FORBIDDEN: '/403',
    SERVER_ERROR: '/500',
} as const;

// Animation Durations
export const ANIMATION = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000,
} as const;

// Breakpoints
export const BREAKPOINTS = {
    XS: 0,
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    XXL: 1536,
} as const;

// HTTP Headers
export const HTTP_HEADERS = {
    SKIP_LOADING: 'X-Skip-Loading',
    SKIP_ERROR_TOAST: 'X-Skip-Error-Toast',
    CONTENT_TYPE_JSON: 'application/json',
} as const;
