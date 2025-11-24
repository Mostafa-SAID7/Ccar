import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

export interface User {
    id: string;
    email: string;
    userName: string;
    roles: string[];
    profilePictureUrl?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    refreshToken: string;
    user: User;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly TOKEN_KEY = 'ccar-token';
    private readonly REFRESH_TOKEN_KEY = 'ccar-refresh-token';
    private readonly API_URL = '/api'; // Will be proxied to backend

    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    isAuthenticated = signal<boolean>(false);

    constructor(private http: HttpClient) {
        this.checkAuth();
    }

    private checkAuth(): void {
        const token = this.getToken();
        if (token) {
            // TODO: Validate token and load user
            this.isAuthenticated.set(true);
        }
    }

    login(credentials: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials)
            .pipe(
                tap(response => {
                    this.setToken(response.token);
                    this.setRefreshToken(response.refreshToken);
                    this.currentUserSubject.next(response.user);
                    this.isAuthenticated.set(true);
                })
            );
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        this.currentUserSubject.next(null);
        this.isAuthenticated.set(false);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    private setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    private setRefreshToken(token: string): void {
        localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    hasRole(role: string): boolean {
        const user = this.getCurrentUser();
        return user?.roles?.includes(role) ?? false;
    }
}
