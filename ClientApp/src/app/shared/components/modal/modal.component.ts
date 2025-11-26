import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div *ngIf="isOpen" class="modal-overlay" (click)="onOverlayClick($event)" [@fadeIn]>
      <div class="modal-container" 
           [class.modal-sm]="size === 'sm'"
           [class.modal-md]="size === 'md'"
           [class.modal-lg]="size === 'lg'"
           [class.modal-xl]="size === 'xl'"
           [@slideIn]>
        
        <!-- Header -->
        <div class="modal-header" *ngIf="title || showClose">
          <h2 *ngIf="title" class="modal-title">{{ title }}</h2>
          <button *ngIf="showClose" 
                  (click)="close()" 
                  class="close-btn"
                  aria-label="Close modal">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <ng-content></ng-content>
        </div>

        <!-- Footer -->
        <div class="modal-footer" *ngIf="showFooter">
          <ng-content select="[modal-footer]"></ng-content>
          <div *ngIf="!hasFooterContent" class="default-footer">
            <button (click)="close()" class="btn btn-secondary">
              {{ cancelText }}
            </button>
            <button (click)="confirm()" class="btn btn-primary">
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      padding: 1rem;
    }

    .modal-container {
      background: var(--color-surface);
      border-radius: 16px;
      box-shadow: var(--shadow-xl);
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .modal-sm {
      width: 100%;
      max-width: 400px;
    }

    .modal-md {
      width: 100%;
      max-width: 600px;
    }

    .modal-lg {
      width: 100%;
      max-width: 800px;
    }

    .modal-xl {
      width: 100%;
      max-width: 1200px;
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-text);
      margin: 0;
    }

    .close-btn {
      background: none;
      border: none;
      color: var(--color-text-secondary);
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 8px;
      transition: all var(--transition-fast);
    }

    .close-btn:hover {
      background: var(--color-border);
      color: var(--color-text);
    }

    .modal-body {
      padding: 1.5rem;
      overflow-y: auto;
      flex: 1;
    }

    .modal-footer {
      padding: 1.5rem;
      border-top: 1px solid var(--color-border);
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
    }

    .default-footer {
      display: flex;
      gap: 0.75rem;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-fast);
      border: none;
    }

    .btn-primary {
      background: var(--gradient-primary);
      color: white;
    }

    .btn-primary:hover {
      box-shadow: var(--shadow-glow);
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: var(--color-surface);
      color: var(--color-text);
      border: 1px solid var(--color-border);
    }

    .btn-secondary:hover {
      background: var(--color-border);
    }
  `],
    animations: [
        // Add animations here if using Angular animations
    ]
})
export class ModalComponent {
    @Input() isOpen = false;
    @Input() title = '';
    @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
    @Input() showClose = true;
    @Input() showFooter = false;
    @Input() closeOnOverlayClick = true;
    @Input() closeOnEscape = true;
    @Input() confirmText = 'Confirm';
    @Input() cancelText = 'Cancel';

    @Output() closed = new EventEmitter<void>();
    @Output() confirmed = new EventEmitter<void>();

    hasFooterContent = false;

    @HostListener('document:keydown.escape', ['$event'])
    onEscapeKey(event: KeyboardEvent): void {
        if (this.isOpen && this.closeOnEscape) {
            this.close();
        }
    }

    onOverlayClick(event: MouseEvent): void {
        if (this.closeOnOverlayClick && event.target === event.currentTarget) {
            this.close();
        }
    }

    close(): void {
        this.isOpen = false;
        this.closed.emit();
    }

    confirm(): void {
        this.confirmed.emit();
    }
}
