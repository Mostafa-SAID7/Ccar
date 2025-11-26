import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClasses">
      <!-- Header -->
      <div *ngIf="title || subtitle || headerAction" class="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h3 *ngIf="title" class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <p *ngIf="subtitle" class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
            {{ subtitle }}
          </p>
        </div>
        <div *ngIf="headerAction">
          <ng-content select="[header-action]"></ng-content>
        </div>
      </div>

      <!-- Body -->
      <div [class]="bodyClasses">
        <ng-content></ng-content>
      </div>

      <!-- Footer -->
      <div *ngIf="footer" class="px-4 py-4 sm:px-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 rounded-b-lg">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
  @Input() shadow: 'none' | 'sm' | 'md' | 'lg' = 'md';
  @Input() border = true;
  @Input() hover = false;
  @Input() footer = false;
  @Input() headerAction = false;
  @Input() fullHeight = false;

  get cardClasses(): string {
    const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg overflow-hidden transition-all duration-200';
    const shadowClasses = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow',
      lg: 'shadow-lg'
    };
    const borderClasses = this.border ? 'border border-gray-200 dark:border-gray-700' : '';
    const hoverClasses = this.hover ? 'hover:shadow-md hover:-translate-y-1' : '';
    const heightClasses = this.fullHeight ? 'h-full' : '';

    return `${baseClasses} ${shadowClasses[this.shadow]} ${borderClasses} ${hoverClasses} ${heightClasses}`;
  }

  get bodyClasses(): string {
    const paddingClasses = {
      none: '',
      sm: 'px-4 py-4 sm:px-6',
      md: 'px-4 py-5 sm:p-6',
      lg: 'px-6 py-6 sm:p-8'
    };

    return `${paddingClasses[this.padding]}`;
  }
}
