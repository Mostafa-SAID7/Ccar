import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../core/services/loading.service';

@Component({
    selector: 'app-loading-overlay',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div *ngIf="loadingService.loading$ | async" class="loading-overlay">
      <div class="loading-content">
        <div class="spinner-container">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>
        <p class="loading-text">Loading...</p>
      </div>
    </div>
  `,
    styles: [`
    .loading-overlay {
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
      z-index: 10000;
      animation: fadeIn 0.2s ease-in;
    }

    .loading-content {
      text-align: center;
    }

    .spinner-container {
      position: relative;
      width: 80px;
      height: 80px;
      margin: 0 auto 1rem;
    }

    .spinner-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 4px solid transparent;
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
    }

    .spinner-ring:nth-child(2) {
      width: 70%;
      height: 70%;
      top: 15%;
      left: 15%;
      border-top-color: var(--color-secondary);
      animation-delay: -0.5s;
    }

    .spinner-ring:nth-child(3) {
      width: 40%;
      height: 40%;
      top: 30%;
      left: 30%;
      border-top-color: var(--color-accent);
      animation-delay: -1s;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .loading-text {
      color: white;
      font-size: 1.125rem;
      font-weight: 600;
      animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `]
})
export class LoadingOverlayComponent {
    constructor(public loadingService: LoadingService) { }
}
