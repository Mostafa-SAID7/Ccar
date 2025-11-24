import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, NavbarComponent],
    template: `
    <div class="min-h-screen flex flex-col">
      <app-navbar />
      <main class="flex-1">
        <router-outlet />
      </main>
      <footer class="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-8 mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center text-[var(--color-text-secondary)]">
            <p>&copy; 2024 Ccar Community. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
    styles: []
})
export class MainLayoutComponent { }
