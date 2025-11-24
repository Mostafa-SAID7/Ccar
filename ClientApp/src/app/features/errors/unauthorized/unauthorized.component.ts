import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { fadeInAnimation, slideInAnimation } from '../../../core/animations/animations';

@Component({
    selector: 'app-unauthorized',
    standalone: true,
    imports: [CommonModule, RouterModule, CardComponent, ButtonComponent],
    animations: [fadeInAnimation, slideInAnimation],
    template: `
    <div class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-red-500/10">
      <div class="max-w-2xl w-full text-center" @fadeIn>
        <div class="mb-8" @slideIn>
          <div class="text-9xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
            403
          </div>
        </div>
        
        <app-card class="animate-fade-in">
          <h1 class="text-4xl font-bold text-[var(--color-text)] mb-4">
            Access Denied
          </h1>
          <p class="text-lg text-[var(--color-text-secondary)] mb-8">
            You don't have permission to access this page. Please contact an administrator if you believe this is an error.
          </p>
          
          <div class="flex gap-4 justify-center flex-wrap">
            <app-button variant="primary" size="lg" routerLink="/auth/login">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In
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
export class UnauthorizedComponent { }
