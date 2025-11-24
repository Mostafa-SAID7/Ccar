import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-community',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-4xl font-bold text-[var(--color-text)] mb-8">Community</h1>
      <p class="text-[var(--color-text-secondary)]">Community features coming soon...</p>
    </div>
  `,
    styles: []
})
export class CommunityComponent { }
