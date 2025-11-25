import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-create-post',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './create-post.component.html',
    styles: []
})
export class CreatePostComponent {
    @Output() createPost = new EventEmitter<{ content: string, imageUrl?: string }>();

    content = '';
    imageUrl = '';
    showImageInput = false;
    loading = false;

    toggleImageInput(): void {
        this.showImageInput = !this.showImageInput;
    }

    onSubmit(): void {
        if (!this.content.trim()) return;

        this.loading = true;
        this.createPost.emit({
            content: this.content,
            imageUrl: this.imageUrl || undefined
        });

        // Reset form is handled by parent or we can reset here if we assume success
        // For now, let's wait for parent to handle it, but we need a way to know when to reset.
        // Simplification: Reset immediately and emit.
        this.content = '';
        this.imageUrl = '';
        this.showImageInput = false;
        this.loading = false;
    }
}
