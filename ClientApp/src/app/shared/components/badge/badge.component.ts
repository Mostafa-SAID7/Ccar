import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-badge',
    standalone: true,
    imports: [CommonModule],
    template: `
    <span class="badge"
          [class.badge-sm]="size === 'sm'"
          [class.badge-md]="size === 'md'"
          [class.badge-lg]="size === 'lg'"
          [class.badge-primary]="variant === 'primary'"
          [class.badge-secondary]="variant === 'secondary'"
          [class.badge-success]="variant === 'success'"
          [class.badge-warning]="variant === 'warning'"
          [class.badge-error]="variant === 'error'"
          [class.badge-info]="variant === 'info'"
          [class.badge-outline]="outline"
          [class.badge-pill]="pill"
          [class.badge-dot]="dot">
      <span *ngIf="dot" class="dot"></span>
      <ng-content></ng-content>
    </span>
  `,
    styles: [`
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.75rem;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1;
      white-space: nowrap;
    }

    .badge-sm {
      padding: 0.125rem 0.5rem;
      font-size: 0.75rem;
    }

    .badge-md {
      padding: 0.25rem 0.75rem;
      font-size: 0.875rem;
    }

    .badge-lg {
      padding: 0.375rem 1rem;
      font-size: 1rem;
    }

    .badge-pill {
      border-radius: 100px;
    }

    .badge-primary {
      background: var(--color-primary);
      color: white;
    }

    .badge-secondary {
      background: var(--color-secondary);
      color: white;
    }

    .badge-success {
      background: var(--color-success);
      color: white;
    }

    .badge-warning {
      background: var(--color-warning);
      color: white;
    }

    .badge-error {
      background: var(--color-error);
      color: white;
    }

    .badge-info {
      background: var(--color-info);
      color: white;
    }

    .badge-outline {
      background: transparent;
      border: 1px solid currentColor;
    }

    .badge-outline.badge-primary {
      color: var(--color-primary);
    }

    .badge-outline.badge-secondary {
      color: var(--color-secondary);
    }

    .badge-outline.badge-success {
      color: var(--color-success);
    }

    .badge-outline.badge-warning {
      color: var(--color-warning);
    }

    .badge-outline.badge-error {
      color: var(--color-error);
    }

    .badge-outline.badge-info {
      color: var(--color-info);
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: currentColor;
    }
  `]
})
export class BadgeComponent {
    @Input() variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' = 'primary';
    @Input() size: 'sm' | 'md' | 'lg' = 'md';
    @Input() outline = false;
    @Input() pill = false;
    @Input() dot = false;
}
