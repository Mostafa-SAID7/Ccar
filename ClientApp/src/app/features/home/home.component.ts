import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, CardComponent, ButtonComponent],
    template: `
    <div class="min-h-screen">
      <!-- Hero Section -->
      <section class="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10"></div>
        <div class="relative max-w-7xl mx-auto text-center animate-fade-in">
          <h1 class="text-5xl md:text-6xl font-bold text-[var(--color-text)] mb-6">
            Welcome to <span class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">Ccar Community</span>
          </h1>
          <p class="text-xl text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
            Join the ultimate community for car enthusiasts. Share, learn, and connect with fellow automotive lovers.
          </p>
          <div class="flex gap-4 justify-center flex-wrap">
            <app-button variant="primary" size="lg">Get Started</app-button>
            <app-button variant="outline" size="lg">Learn More</app-button>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-bg)]">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold text-center text-[var(--color-text)] mb-12">
            Why Choose Ccar?
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <app-card
              *ngFor="let feature of features"
              [title]="feature.title"
              [subtitle]="feature.description"
              [hoverable]="true"
              class="animate-fade-in"
            >
              <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-fluent flex items-center justify-center mb-4">
                <span class="text-white text-2xl">{{ feature.icon }}</span>
              </div>
            </app-card>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <app-card [glass]="true" class="animate-fade-in">
            <h2 class="text-3xl font-bold text-[var(--color-text)] mb-4">
              Ready to Join?
            </h2>
            <p class="text-[var(--color-text-secondary)] mb-6">
              Start your journey with Ccar Community today and connect with thousands of car enthusiasts.
            </p>
            <app-button variant="primary" size="lg">Sign Up Now</app-button>
          </app-card>
        </div>
      </section>
    </div>
  `,
    styles: []
})
export class HomeComponent {
    features = [
        {
            icon: '🚗',
            title: 'Car Listings',
            description: 'Browse and share amazing car collections from around the world.'
        },
        {
            icon: '💬',
            title: 'Community Forums',
            description: 'Engage in discussions with fellow car enthusiasts and experts.'
        },
        {
            icon: '🔧',
            title: 'Expert Advice',
            description: 'Get professional tips and guidance from mechanics and experts.'
        }
    ];
}
