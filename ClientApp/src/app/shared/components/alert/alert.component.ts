import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-alert',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div *ngIf="show" class="alert" 
         [class.alert-success]="type === 'success'"
         [class.alert-error]="type === 'error'"
         [class.alert-warning]="type === 'warning'"
         [class.alert-info]="type === 'info'"
         [@fadeIn]>
      
      <div class="alert-icon">
        <ng-content select="[icon]"></ng-content>
        <svg *ngIf="!hasIcon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path *ngIf="type === 'success'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          <path *ngIf="type === 'error'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          <path *ngIf="type === 'warning'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          <path *ngIf="type === 'info'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>

      <div class="alert-content">
        <h4 *ngIf="title" class="alert-title">{{ title }}</h4>
        <div class="alert-message">
          <ng-content></ng-content>
          {{ message }}
        </div>
      </div>

      <button *ngIf="dismissible" (click)="dismiss()" class="alert-close">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `,
    styles: [`
    .alert {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      position: relative;
      border: 1px solid transparent;
    }

    .alert-success {
      background: rgba(16, 185, 129, 0.1);
      border-color: rgba(16, 185, 129, 0.2);
      color: var(--color-success);
    }

    .alert-error {
      background: rgba(239, 68, 68, 0.1);
      border-color: rgba(239, 68, 68, 0.2);
      color: var(--color-error);
    }

    .alert-warning {
      background: rgba(245, 158, 11, 0.1);
      border-color: rgba(245, 158, 11, 0.2);
      color: var(--color-warning);
    }

    .alert-info {
      background: rgba(59, 130, 246, 0.1);
      border-color: rgba(59, 130, 246, 0.2);
      color: var(--color-info);
    }

    .alert-icon {
      flex-shrink: 0;
      padding-top: 0.125rem;
    }

    .alert-content {
      flex: 1;
    }

    .alert-title {
      font-weight: 600;
      margin: 0 0 0.25rem 0;
      font-size: 0.95rem;
    }

    .alert-message {
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .alert-close {
      background: none;
      border: none;
      color: currentColor;
      opacity: 0.7;
      cursor: pointer;
      padding: 0.25rem;
      margin: -0.25rem;
      transition: opacity var(--transition-fast);
    }

    .alert-close:hover {
      opacity: 1;
    }
  `]
})
export class AlertComponent {
    @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
    @Input() title = '';
    @Input() message = '';
    @Input() dismissible = false;
    @Input() show = true;
    @Input() hasIcon = false;

    @Output() closed = new EventEmitter<void>();

    dismiss(): void {
        this.show = false;
        this.closed.emit();
    }
}
