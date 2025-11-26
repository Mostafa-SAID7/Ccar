import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dropdown',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="dropdown" [class.dropdown-open]="isOpen">
      <button class="dropdown-trigger"
              (click)="toggle()"
              [class.dropdown-trigger-active]="isOpen">
        <ng-content select="[trigger]"></ng-content>
        <svg *ngIf="showArrow" 
             class="dropdown-arrow" 
             [class.dropdown-arrow-up]="isOpen"
             fill="none" 
             stroke="currentColor" 
             viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      <div *ngIf="isOpen" 
           class="dropdown-menu"
           [class.dropdown-menu-right]="align === 'right'"
           [class.dropdown-menu-left]="align === 'left'">
        <ng-content></ng-content>
      </div>
    </div>

    <div *ngIf="isOpen" class="dropdown-overlay" (click)="close()"></div>
  `,
    styles: [`
    .dropdown {
      position: relative;
      display: inline-block;
    }

    .dropdown-trigger {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      cursor: pointer;
      transition: all var(--transition-fast);
      color: var(--color-text);
    }

    .dropdown-trigger:hover {
      background: var(--color-border);
    }

    .dropdown-trigger-active {
      border-color: var(--color-primary);
    }

    .dropdown-arrow {
      width: 16px;
      height: 16px;
      transition: transform var(--transition-fast);
    }

    .dropdown-arrow-up {
      transform: rotate(180deg);
    }

    .dropdown-menu {
      position: absolute;
      top: calc(100% + 0.5rem);
      min-width: 200px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      animation: slideDown 0.2s ease-out;
      overflow: hidden;
    }

    .dropdown-menu-right {
      right: 0;
    }

    .dropdown-menu-left {
      left: 0;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .dropdown-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
    }

    :host ::ng-deep .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: var(--color-text);
      cursor: pointer;
      transition: background var(--transition-fast);
      border: none;
      background: none;
      width: 100%;
      text-align: left;
    }

    :host ::ng-deep .dropdown-item:hover {
      background: var(--color-border);
    }

    :host ::ng-deep .dropdown-divider {
      height: 1px;
      background: var(--color-border);
      margin: 0.5rem 0;
    }
  `]
})
export class DropdownComponent {
    @Input() align: 'left' | 'right' = 'left';
    @Input() showArrow = true;
    @Output() opened = new EventEmitter<void>();
    @Output() closed = new EventEmitter<void>();

    isOpen = false;

    toggle(): void {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.opened.emit();
        } else {
            this.closed.emit();
        }
    }

    close(): void {
        if (this.isOpen) {
            this.isOpen = false;
            this.closed.emit();
        }
    }

    open(): void {
        if (!this.isOpen) {
            this.isOpen = true;
            this.opened.emit();
        }
    }
}
