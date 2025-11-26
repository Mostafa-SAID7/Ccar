import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-skeleton',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="skeleton" 
         [class.skeleton-circle]="variant === 'circle'"
         [class.skeleton-text]="variant === 'text'"
         [class.skeleton-rect]="variant === 'rect'"
         [style.width]="width"
         [style.height]="height"
         [style.border-radius]="borderRadius">
    </div>
  `,
    styles: [`
    .skeleton {
      background: var(--color-surface-hover);
      position: relative;
      overflow: hidden;
    }

    .skeleton::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.05) 20%,
        rgba(255, 255, 255, 0.1) 60%,
        rgba(255, 255, 255, 0)
      );
      animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }

    .skeleton-circle {
      border-radius: 50%;
    }

    .skeleton-text {
      border-radius: 4px;
      height: 1em;
      margin-bottom: 0.5em;
    }

    .skeleton-rect {
      border-radius: 8px;
    }
  `]
})
export class SkeletonComponent {
    @Input() variant: 'text' | 'circle' | 'rect' = 'rect';
    @Input() width: string = '100%';
    @Input() height: string = 'auto';
    @Input() borderRadius: string = '';
}
