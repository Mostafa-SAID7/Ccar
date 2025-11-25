import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityService, Post } from '../../core/services/community.service';
import { PostCardComponent } from './components/post-card/post-card.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, PostCardComponent, CreatePostComponent],
  templateUrl: './community.component.html',
  styles: []
})
export class CommunityComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  error: string | null = null;

  constructor(private communityService: CommunityService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.communityService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading posts', err);
        this.error = 'Failed to load community feed.';
        this.loading = false;
      }
    });
  }

  onCreatePost(event: { content: string, imageUrl?: string }): void {
    this.communityService.createPost(event).subscribe({
      next: (newPost) => {
        this.posts.unshift(newPost);
      },
      error: (err) => {
        console.error('Error creating post', err);
        // Ideally show a toast notification here
      }
    });
  }

  onLikePost(postId: string): void {
    this.communityService.likePost(postId).subscribe({
      next: () => {
        const post = this.posts.find(p => p.id === postId);
        if (post) {
          post.isLikedByCurrentUser = !post.isLikedByCurrentUser;
          post.likesCount += post.isLikedByCurrentUser ? 1 : -1;
        }
      },
      error: (err) => console.error('Error liking post', err)
    });
  }

  onCommentPost(event: { postId: string, content: string }): void {
    this.communityService.addComment(event.postId, { content: event.content }).subscribe({
      next: (newComment) => {
        const post = this.posts.find(p => p.id === event.postId);
        if (post) {
          post.recentComments.unshift(newComment);
          post.commentsCount++;
        }
      },
      error: (err) => console.error('Error adding comment', err)
    });
  }
}
