import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { fadeInAnimation, bounceInAnimation } from '../../../core/animations/animations';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [CommonModule, RouterModule, CardComponent, ButtonComponent],
    animations: [fadeInAnimation, bounceInAnimation],
    template: `
    <div class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10">
      <div class="max-w-2xl w-full text-center" @fadeIn>
        <div class="mb-8" @bounceIn>
          <div class="text-9xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            404
          </div>
        </div>
        
        <app-card class="animate-fade-in">
          <h1 class="text-4xl font-bold text-[var(--color-text)] mb-4">
            Page Not Found
          </h1>
          <p class="text-lg text-[var(--color-text-secondary)] mb-8">
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
          
          <div class="flex gap-4 justify-center flex-wrap">
            <app-button variant="primary" size="lg" routerLink="/">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </app-button>
            <app-button variant="outline" size="lg" (click)="goBack()">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </app-button>
          </div>
        </app-card>
      </div>
    </div>
  `,
    styles: []
})
export class NotFoundComponent {
    goBack(): void {
        window.history.back();
    }
}
