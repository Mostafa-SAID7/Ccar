import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [class]="cardClasses">
      <div *ngIf="title || subtitle" class="mb-4">
        <h3 *ngIf="title" class="text-xl font-semibold text-[var(--color-text)]">{{ title }}</h3>
        <p *ngIf="subtitle" class="text-sm text-[var(--color-text-secondary)] mt-1">{{ subtitle }}</p>
      </div>
      <ng-content></ng-content>
    </div>
  `,
    styles: []
})
export class CardComponent {
    @Input() title?: string;
    @Input() subtitle?: string;
    @Input() hoverable = false;
    @Input() glass = false;

    get cardClasses(): string {
        const baseClasses = 'rounded-fluent p-6 transition-all duration-300';
        const backgroundClasses = this.glass
            ? 'glass-effect'
            : 'bg-[var(--color-surface)] shadow-fluent';
        const hoverClasses = this.hoverable ? 'fluent-hover cursor-pointer' : '';

        return `${baseClasses} ${backgroundClasses} ${hoverClasses}`;
    }
}
