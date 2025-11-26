import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-avatar',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="avatar-container" 
         [class.avatar-sm]="size === 'sm'"
         [class.avatar-md]="size === 'md'"
         [class.avatar-lg]="size === 'lg'"
         [class.avatar-xl]="size === 'xl'"
         [class.clickable]="clickable"
         (click)="handleClick()">
      
      <img *ngIf="src" 
           [src]="src" 
           [alt]="alt"
           class="avatar-image"
           (error)="onImageError()">
      
      <div *ngIf="!src" class="avatar-placeholder">
        <span>{{ initials }}</span>
      </div>

      <div *ngIf="status" 
           class="status-indicator"
           [class.status-online]="status === 'online'"
           [class.status-offline]="status === 'offline'"
           [class.status-away]="status === 'away'"
           [class.status-busy]="status === 'busy'">
      </div>

      <div *ngIf="badge" class="badge">{{ badge }}</div>
    </div>
  `,
    styles: [`
    .avatar-container {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;
      background: var(--gradient-primary);
    }

    .avatar-sm {
      width: 32px;
      height: 32px;
    }

    .avatar-md {
      width: 48px;
      height: 48px;
    }

    .avatar-lg {
      width: 64px;
      height: 64px;
    }

    .avatar-xl {
      width: 96px;
      height: 96px;
    }

    .clickable {
      cursor: pointer;
      transition: transform var(--transition-fast);
    }

    .clickable:hover {
      transform: scale(1.05);
    }

    .avatar-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      text-transform: uppercase;
    }

    .avatar-sm .avatar-placeholder span {
      font-size: 0.75rem;
    }

    .avatar-md .avatar-placeholder span {
      font-size: 1rem;
    }

    .avatar-lg .avatar-placeholder span {
      font-size: 1.25rem;
    }

    .avatar-xl .avatar-placeholder span {
      font-size: 1.75rem;
    }

    .status-indicator {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 25%;
      height: 25%;
      border-radius: 50%;
      border: 2px solid var(--color-surface);
    }

    .status-online {
      background: var(--color-success);
    }

    .status-offline {
      background: var(--color-text-muted);
    }

    .status-away {
      background: var(--color-warning);
    }

    .status-busy {
      background: var(--color-error);
    }

    .badge {
      position: absolute;
      top: -4px;
      right: -4px;
      background: var(--color-error);
      color: white;
      border-radius: 10px;
      padding: 2px 6px;
      font-size: 0.75rem;
      font-weight: 600;
      min-width: 20px;
      text-align: center;
    }
  `]
})
export class AvatarComponent {
    @Input() src?: string;
    @Input() alt = 'Avatar';
    @Input() name = '';
    @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
    @Input() status?: 'online' | 'offline' | 'away' | 'busy';
    @Input() badge?: string | number;
    @Input() clickable = false;

    @Output() clicked = new EventEmitter<void>();

    get initials(): string {
        if (!this.name) return '?';

        const parts = this.name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return this.name.substring(0, 2).toUpperCase();
    }

    handleClick(): void {
        if (this.clickable) {
            this.clicked.emit();
        }
    }

    onImageError(): void {
        this.src = undefined;
    }
}
