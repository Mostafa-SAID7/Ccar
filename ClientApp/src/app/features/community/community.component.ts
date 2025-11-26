import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunityService, Post } from '../../core/services/community.service';
import { ToastNotificationService } from '../../core/services/toast-notification.service';
import { PostCardComponent } from './components/post-card/post-card.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { InfiniteScrollDirective } from '../../shared/directives/infinite-scroll.directive';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, FormsModule, PostCardComponent, CreatePostComponent, InfiniteScrollDirective],
  templateUrl: './community.component.html',
  styles: []
})
export class CommunityComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  error: string | null = null;

  // Pagination
  currentPage = 1;
  pageSize = 10;
  hasMore = true;

  // Filtering and search
  currentFilter: 'recent' | 'trending' | 'following' = 'recent';
  searchQuery = '';
  filters = [
    { label: 'Recent', value: 'recent' as const },
    { label: 'Trending', value: 'trending' as const },
    { label: 'Following', value: 'following' as const }
  ];

  constructor(
    private communityService: CommunityService,
    private toastService: ToastNotificationService
  ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(append = false): void {
    this.loading = true;
    this.error = null;

    if (!append) {
      this.currentPage = 1;
      this.posts = [];
    }

    this.communityService.getPosts().subscribe({
      next: (data) => {
        if (append) {
          this.posts = [...this.posts, ...data];
        } else {
          this.posts = data;
        }
        this.loading = false;
        this.hasMore = data.length >= this.pageSize;
      },
      error: (err) => {
        console.error('Error loading posts', err);
        // Load mock data when API is unavailable
        const mockPosts = this.getMockPosts();
        if (append) {
          this.posts = [...this.posts, ...mockPosts];
        } else {
          this.posts = mockPosts;
        }
        this.loading = false;
        this.hasMore = false;
        this.error = null; // Don't show error, just use mock data
      }
    });
  }

  onScroll(): void {
    if (!this.loading && this.hasMore) {
      this.currentPage++;
      this.loadPosts(true);
    }
  }

  setFilter(filter: 'recent' | 'trending' | 'following'): void {
    if (this.currentFilter !== filter) {
      this.currentFilter = filter;
      this.loadPosts();
      this.toastService.info(`Showing ${filter} posts`);
    }
  }

  onSearch(): void {
    // Debounce search in production
    if (this.searchQuery.length > 2 || this.searchQuery.length === 0) {
      this.loadPosts();
    }
  }

  private getMockPosts(): Post[] {
    return [
      {
        id: '1',
        content: 'Just joined the community! Excited to connect with fellow car enthusiasts. 🚗',
        authorName: 'John Doe',
        authorImage: undefined,
        isAuthor: false,
        likesCount: 15,
        commentsCount: 3,
        isLikedByCurrentUser: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        recentComments: [
          {
            id: 'c1',
            content: 'Welcome to the community!',
            authorName: 'Jane Smith',
            isAuthor: false,
            createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
          }
        ]
      },
      {
        id: '2',
        content: 'Anyone going to the car meet this weekend? Would love to see some classic rides!',
        authorName: 'Mike Johnson',
        authorImage: undefined,
        isAuthor: false,
        likesCount: 24,
        commentsCount: 8,
        isLikedByCurrentUser: true,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        recentComments: [
          {
            id: 'c2',
            content: 'I\'ll be there with my Mustang!',
            authorName: 'Sarah Williams',
            isAuthor: false,
            createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'c3',
            content: 'Count me in! Bringing my vintage Corvette.',
            authorName: 'Tom Brown',
            isAuthor: false,
            createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
          }
        ]
      },
      {
        id: '3',
        content: 'Check out my new rims! Just got them installed today. What do you think? 🔥',
        imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ed5fa?auto=format&fit=crop&q=80&w=1000',
        authorName: 'Alex Martinez',
        authorImage: undefined,
        isAuthor: false,
        likesCount: 42,
        commentsCount: 12,
        isLikedByCurrentUser: false,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        recentComments: [
          {
            id: 'c4',
            content: 'Those look amazing! What brand are they?',
            authorName: 'Chris Davis',
            isAuthor: false,
            createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'c5',
            content: 'Sick! Really complements your car.',
            authorName: 'Emma Wilson',
            isAuthor: false,
            createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString()
          }
        ]
      },
      {
        id: '4',
        content: 'Looking for recommendations on the best car wash in town. Any suggestions?',
        authorName: 'David Lee',
        authorImage: undefined,
        isAuthor: false,
        likesCount: 8,
        commentsCount: 5,
        isLikedByCurrentUser: false,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        recentComments: []
      }
    ];
  }

  onCreatePost(event: { content: string, imageUrl?: string }): void {
    // Optimistic UI update
    const optimisticPost: Post = {
      id: 'temp-' + Date.now(),
      content: event.content,
      imageUrl: event.imageUrl,
      authorName: 'You',
      authorImage: undefined,
      isAuthor: true,
      likesCount: 0,
      commentsCount: 0,
      isLikedByCurrentUser: false,
      createdAt: new Date().toISOString(),
      recentComments: []
    };

    this.posts.unshift(optimisticPost);
    this.toastService.success('Post created successfully!');

    this.communityService.createPost(event).subscribe({
      next: (newPost) => {
        // Replace optimistic post with real post
        const index = this.posts.findIndex(p => p.id === optimisticPost.id);
        if (index !== -1) {
          this.posts[index] = newPost;
        }
      },
      error: (err) => {
        console.error('Error creating post', err);
        // Remove optimistic post on error
        this.posts = this.posts.filter(p => p.id !== optimisticPost.id);
        this.toastService.error('Failed to create post. Please try again.');
      }
    });
  }

  onLikePost(postId: string): void {
    const post = this.posts.find(p => p.id === postId);
    if (!post) return;

    // Optimistic UI update
    const wasLiked = post.isLikedByCurrentUser;
    post.isLikedByCurrentUser = !wasLiked;
    post.likesCount += wasLiked ? -1 : 1;

    this.communityService.likePost(postId).subscribe({
      next: () => {
        // Success - optimistic update was correct
      },
      error: (err) => {
        console.error('Error liking post', err);
        // Revert optimistic update
        post.isLikedByCurrentUser = wasLiked;
        post.likesCount += wasLiked ? 1 : -1;
        this.toastService.error('Failed to update like. Please try again.');
      }
    });
  }

  onCommentPost(event: { postId: string, content: string }): void {
    const post = this.posts.find(p => p.id === event.postId);
    if (!post) return;

    // Optimistic UI update
    const optimisticComment = {
      id: 'temp-' + Date.now(),
      content: event.content,
      authorName: 'You',
      isAuthor: true,
      createdAt: new Date().toISOString()
    };

    post.recentComments.unshift(optimisticComment);
    post.commentsCount++;
    this.toastService.success('Comment added!');

    this.communityService.addComment(event.postId, { content: event.content }).subscribe({
      next: (newComment) => {
        // Replace optimistic comment with real comment
        const commentIndex = post.recentComments.findIndex(c => c.id === optimisticComment.id);
        if (commentIndex !== -1) {
          post.recentComments[commentIndex] = newComment;
        }
      },
      error: (err) => {
        console.error('Error adding comment', err);
        // Revert optimistic update
        post.recentComments = post.recentComments.filter(c => c.id !== optimisticComment.id);
        post.commentsCount--;
        this.toastService.error('Failed to add comment. Please try again.');
      }
    });
  }
}
