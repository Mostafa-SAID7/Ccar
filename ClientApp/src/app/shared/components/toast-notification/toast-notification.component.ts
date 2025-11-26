import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastNotificationService, Toast } from '../../core/services/toast-notification.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-toast-notification',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="toast-container">
      <div *ngFor="let toast of toasts" 
           [class]="'toast ' + toast.type + ' animate-slide-down'"
           [style.animation-delay]="'0ms'">
        <div class="toast-icon">
          <svg *ngIf="toast.type === 'success'" class="w-6 h-6 text-[var(--color-success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <svg *ngIf="toast.type === 'error'" class="w-6 h-6 text-[var(--color-error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <svg *ngIf="toast.type === 'warning'" class="w-6 h-6 text-[var(--color-warning)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <svg *ngIf="toast.type === 'info'" class="w-6 h-6 text-[var(--color-info)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="toast-content flex-1">
          <p class="text-sm font-medium text-[var(--color-text)]">{{ toast.message }}</p>
        </div>
        <button *ngIf="toast.action" 
                (click)="handleAction(toast)"
                class="text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors">
          {{ toast.action.label }}
        </button>
        <button (click)="dismiss(toast.id)" 
                class="ml-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div class="toast-progress" [style.animation-duration]="toast.duration + 'ms'"></div>
      </div>
    </div>
  `,
    styles: [`
    .toast-container {
      position: fixed;
      top: 1rem;
      right: 1rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-width: 400px;
    }

    .toast {
      position: relative;
      min-width: 300px;
      padding: 1rem;
      border-radius: 12px;
      background: var(--color-surface);
      box-shadow: var(--shadow-lg);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      overflow: hidden;
    }

    .toast.success {
      border-left: 4px solid var(--color-success);
    }

    .toast.error {
      border-left: 4px solid var(--color-error);
    }

    .toast.warning {
      border-left: 4px solid var(--color-warning);
    }

    .toast.info {
      border-left: 4px solid var(--color-info);
    }

    .toast-icon {
      flex-shrink: 0;
    }

    .toast-content {
      flex: 1;
      min-width: 0;
    }

    .toast-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      width: 100%;
      background: var(--color-primary);
      animation: progress linear;
      transform-origin: left;
    }

    @keyframes progress {
      from {
        transform: scaleX(1);
      }
      to {
        transform: scaleX(0);
      }
    }
  `]
})
export class ToastNotificationComponent implements OnInit, OnDestroy {
    toasts: Toast[] = [];
    private subscription?: Subscription;
    private timeouts = new Map<string, any>();

    constructor(private toastService: ToastNotificationService) { }

    ngOnInit(): void {
        this.subscription = this.toastService.toasts$.subscribe(toast => {
            this.toasts.push(toast);

            if (toast.duration && toast.duration > 0) {
                const timeout = setTimeout(() => {
                    this.dismiss(toast.id);
                }, toast.duration);
                this.timeouts.set(toast.id, timeout);
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
        this.timeouts.forEach(timeout => clearTimeout(timeout));
        this.timeouts.clear();
    }

    dismiss(id: string): void {
        const index = this.toasts.findIndex(t => t.id === id);
        if (index !== -1) {
            this.toasts.splice(index, 1);
            const timeout = this.timeouts.get(id);
            if (timeout) {
                clearTimeout(timeout);
                this.timeouts.delete(id);
            }
        }
    }

    handleAction(toast: Toast): void {
        if (toast.action) {
            toast.action.callback();
            this.dismiss(toast.id);
        }
    }
}
