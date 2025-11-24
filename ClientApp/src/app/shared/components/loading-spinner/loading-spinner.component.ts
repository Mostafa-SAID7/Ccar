import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-loading-spinner',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [class]="containerClasses">
      <div [class]="spinnerClasses">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <p *ngIf="message" class="mt-4 text-[var(--color-text-secondary)]">{{ message }}</p>
    </div>
  `,
    styles: [`
    .spinner-border {
      width: 3rem;
      height: 3rem;
      border: 0.25rem solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spinner-border 0.75s linear infinite;
    }

    @keyframes spinner-border {
      to {
        transform: rotate(360deg);
      }
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  `]
})
export class LoadingSpinnerComponent {
    @Input() size: 'sm' | 'md' | 'lg' = 'md';
    @Input() variant: 'primary' | 'secondary' | 'white' = 'primary';
    @Input() fullScreen = false;
    @Input() message?: string;

    get containerClasses(): string {
        const baseClasses = 'flex flex-col items-center justify-center';
        const fullScreenClasses = this.fullScreen ? 'fixed inset-0 bg-[var(--color-bg)] z-50' : '';
        return `${baseClasses} ${fullScreenClasses}`;
    }

    get spinnerClasses(): string {
        const sizeClasses = {
            sm: 'w-8 h-8',
            md: 'w-12 h-12',
            lg: 'w-16 h-16'
        };

        const variantClasses = {
            primary: 'text-primary-500',
            secondary: 'text-secondary-500',
            white: 'text-white'
        };

        return `${sizeClasses[this.size]} ${variantClasses[this.variant]}`;
    }
}
