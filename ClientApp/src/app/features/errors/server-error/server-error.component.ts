import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { fadeInAnimation, scaleInAnimation } from '../../../core/animations/animations';

@Component({
    selector: 'app-server-error',
    standalone: true,
    imports: [CommonModule, RouterModule, CardComponent, ButtonComponent],
    animations: [fadeInAnimation, scaleInAnimation],
    template: `
    <div class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-red-500/10 via-orange-500/10 to-yellow-500/10">
      <div class="max-w-2xl w-full text-center" @fadeIn>
        <div class="mb-8" @scaleIn>
          <div class="text-9xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            500
          </div>
        </div>
        
        <app-card class="animate-fade-in">
          <h1 class="text-4xl font-bold text-[var(--color-text)] mb-4">
            Server Error
          </h1>
          <p class="text-lg text-[var(--color-text-secondary)] mb-8">
            Something went wrong on our end. We're working to fix it. Please try again later.
          </p>
          
          <div class="flex gap-4 justify-center flex-wrap">
            <app-button variant="primary" size="lg" (click)="retry()">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </app-button>
            <app-button variant="outline" size="lg" routerLink="/">
              Go Home
            </app-button>
          </div>
        </app-card>
      </div>
    </div>
  `,
    styles: []
})
export class ServerErrorComponent {
    retry(): void {
        window.location.reload();
    }
}
