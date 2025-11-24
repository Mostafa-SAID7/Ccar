import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher/language-switcher.component';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule, ThemeToggleComponent, LanguageSwitcherComponent],
    template: `
    <nav class="sticky top-0 z-50 glass-effect border-b border-[var(--color-border)]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center space-x-2 rtl:space-x-reverse">
              <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-fluent flex items-center justify-center">
                <span class="text-white font-bold text-xl">C</span>
              </div>
              <span class="text-xl font-bold text-[var(--color-text)]">Ccar</span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <a
              *ngFor="let link of navLinks"
              [routerLink]="link.path"
              routerLinkActive="text-primary-500"
              [routerLinkActiveOptions]="{exact: link.exact}"
              class="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-200 font-medium"
            >
              {{ link.label }}
            </a>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-4 rtl:space-x-reverse">
            <app-language-switcher />
            <app-theme-toggle />
            <button
              routerLink="/auth/login"
              class="px-4 py-2 bg-primary-500 text-white rounded-fluent hover:bg-primary-600 transition-colors duration-200 font-medium"
            >
              Login
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              (click)="mobileMenuOpen = !mobileMenuOpen"
              class="p-2 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)]"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  *ngIf="!mobileMenuOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  *ngIf="mobileMenuOpen"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div *ngIf="mobileMenuOpen" class="md:hidden border-t border-[var(--color-border)] animate-fade-in">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a
            *ngFor="let link of navLinks"
            [routerLink]="link.path"
            (click)="mobileMenuOpen = false"
            routerLinkActive="bg-primary-50 dark:bg-primary-900/20 text-primary-500"
            [routerLinkActiveOptions]="{exact: link.exact}"
            class="block px-3 py-2 rounded-md text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)]"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </nav>
  `,
    styles: []
})
export class NavbarComponent {
    mobileMenuOpen = false;

    navLinks = [
        { path: '/', label: 'Home', exact: true },
        { path: '/community', label: 'Community', exact: false },
        { path: '/cars', label: 'Cars', exact: false },
        { path: '/about', label: 'About', exact: false },
    ];
}
