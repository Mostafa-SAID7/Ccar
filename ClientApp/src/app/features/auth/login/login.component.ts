import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, CardComponent, ButtonComponent],
    template: `
    <div class="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10">
      <div class="w-full max-w-md animate-fade-in">
        <app-card>
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-[var(--color-text)]">Welcome Back</h2>
            <p class="text-[var(--color-text-secondary)] mt-2">Sign in to your account</p>
          </div>
          
          <form class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-[var(--color-text)] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                class="w-full px-4 py-2 rounded-fluent border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label for="password" class="block text-sm font-medium text-[var(--color-text)] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                class="w-full px-4 py-2 rounded-fluent border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="••••••••"
              />
            </div>
            
            <app-button variant="primary" size="lg" [fullWidth]="true" type="submit">
              Sign In
            </app-button>
          </form>
          
          <div class="mt-6 text-center">
            <p class="text-sm text-[var(--color-text-secondary)]">
              Don't have an account?
              <a routerLink="/auth/register" class="text-primary-500 hover:text-primary-600 font-medium">
                Sign up
              </a>
            </p>
          </div>
        </app-card>
      </div>
    </div>
  `,
    styles: []
})
export class LoginComponent { }
