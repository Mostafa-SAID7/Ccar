import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Comment {
    id: string;
    content: string;
    authorName: string;
    authorImage?: string;
    isAuthor: boolean;
    createdAt: string;
}

export interface Post {
    id: string;
    content: string;
    imageUrl?: string;
    authorName: string;
    authorImage?: string;
    isAuthor: boolean;
    likesCount: number;
    commentsCount: number;
    isLikedByCurrentUser: boolean;
    createdAt: string;
    recentComments: Comment[];
}

export interface CreatePostRequest {
    content: string;
    imageUrl?: string;
}

export interface CreateCommentRequest {
    content: string;
}

@Injectable({
    providedIn: 'root'
})
export class CommunityService {
    private apiUrl = `${environment.apiUrl}/posts`;

    constructor(private http: HttpClient) { }

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(this.apiUrl);
    }

    createPost(request: CreatePostRequest): Observable<Post> {
        return this.http.post<Post>(this.apiUrl, request);
    }

    likePost(postId: string): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/${postId}/like`, {});
    }

    addComment(postId: string, request: CreateCommentRequest): Observable<Comment> {
        return this.http.post<Comment>(`${this.apiUrl}/${postId}/comments`, request);
    }
}
