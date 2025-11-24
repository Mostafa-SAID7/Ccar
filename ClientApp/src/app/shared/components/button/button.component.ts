import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [CommonModule],
    template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [class]="buttonClasses"
      (click)="handleClick($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
    styles: [`
    button {
      transition: all var(--transition-fast);
    }
  `]
})
export class ButtonComponent {
    @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
    @Input() size: 'sm' | 'md' | 'lg' = 'md';
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
    @Input() disabled = false;
    @Input() fullWidth = false;

    get buttonClasses(): string {
        const baseClasses = 'inline-flex items-center justify-center font-medium rounded-fluent focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

        const variantClasses = {
            primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
            secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500',
            outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:ring-primary-500',
            ghost: 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:ring-primary-500'
        };

        const sizeClasses = {
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-lg'
        };

        const widthClass = this.fullWidth ? 'w-full' : '';

        return `${baseClasses} ${variantClasses[this.variant]} ${sizeClasses[this.size]} ${widthClass}`;
    }

    handleClick(event: Event): void {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
