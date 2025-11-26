import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-stats-card',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="stats-card" [class.clickable]="clickable">
      <div class="stats-header">
        <div class="icon-container" [style.background]="iconBackground">
          <ng-content select="[icon]"></ng-content>
        </div>
        <div class="trend-badge" *ngIf="trend" [class.trend-up]="trend === 'up'" [class.trend-down]="trend === 'down'">
          <svg *ngIf="trend === 'up'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
          <svg *ngIf="trend === 'down'" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
          <span>{{ change }}</span>
        </div>
      </div>

      <div class="stats-body">
        <h3 class="stats-title">{{ title }}</h3>
        <div class="stats-value-container">
          <span class="stats-value" [class.animate-counter]="animateValue">{{ displayValue }}</span>
          <span *ngIf="suffix" class="stats-suffix">{{ suffix }}</span>
        </div>
        <p *ngIf="description" class="stats-description">{{ description }}</p>
      </div>

      <div class="stats-footer" *ngIf="footerText">
        <span class="footer-text">{{ footerText }}</span>
        <svg *ngIf="clickable" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </div>
  `,
    styles: [`
    .stats-card {
      background: var(--color-surface);
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: var(--shadow-md);
      transition: all var(--transition-normal);
      position: relative;
      overflow: hidden;
    }

    .stats-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--gradient-primary);
      opacity: 0;
      transition: opacity var(--transition-normal);
    }

    .stats-card:hover::before {
      opacity: 1;
    }

    .stats-card.clickable {
      cursor: pointer;
    }

    .stats-card.clickable:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .stats-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .icon-container {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .trend-badge {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .trend-up {
      background: rgba(16, 185, 129, 0.1);
      color: var(--color-success);
    }

    .trend-down {
      background: rgba(239, 68, 68, 0.1);
      color: var(--color-error);
    }

    .stats-body {
      margin-bottom: 1rem;
    }

    .stats-title {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-secondary);
      margin: 0 0 0.5rem 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stats-value-container {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
    }

    .stats-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-text);
      line-height: 1;
    }

    .stats-value.animate-counter {
      animation: countUp 0.5s ease-out;
    }

    @keyframes countUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .stats-suffix {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text-secondary);
    }

    .stats-description {
      font-size: 0.875rem;
      color: var(--color-text-muted);
      margin: 0.5rem 0 0 0;
    }

    .stats-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 1rem;
      border-top: 1px solid var(--color-border);
    }

    .footer-text {
      font-size: 0.875rem;
      color: var(--color-text-secondary);
    }
  `]
})
export class StatsCardComponent {
    @Input() title = '';
    @Input() value: number | string = 0;
    @Input() suffix = '';
    @Input() description = '';
    @Input() footerText = '';
    @Input() trend: 'up' | 'down' | 'stable' | null = null;
    @Input() change = '';
    @Input() iconBackground = 'var(--gradient-primary)';
    @Input() clickable = false;
    @Input() animateValue = true;

    get displayValue(): string {
        if (typeof this.value === 'number') {
            return this.formatNumber(this.value);
        }
        return this.value;
    }

    private formatNumber(num: number): string {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
}
