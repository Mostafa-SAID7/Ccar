import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Post } from '../../../../core/services/community.service';

@Component({
    selector: 'app-post-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './post-card.component.html',
    styles: []
})
export class PostCardComponent {
    @Input() post!: Post;
    @Output() like = new EventEmitter<string>();
    @Output() comment = new EventEmitter<{ postId: string, content: string }>();

    onLike(): void {
        this.like.emit(this.post.id);
    }

    onComment(content: string): void {
        if (!content.trim()) return;
        this.comment.emit({ postId: this.post.id, content });
    }
}
