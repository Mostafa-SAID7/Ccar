import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cars',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 class="text-4xl font-bold text-[var(--color-text)] mb-8">Cars</h1>
      <p class="text-[var(--color-text-secondary)]">Car listings coming soon...</p>
    </div>
  `,
    styles: []
})
export class CarsComponent { }
