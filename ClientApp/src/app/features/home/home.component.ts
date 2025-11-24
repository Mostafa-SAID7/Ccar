import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, ButtonComponent],
  template: `
    <div class="min-h-screen">
      <!-- Hero Section -->
      <section class="relative py-20 px-4 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10 overflow-hidden">
        <div class="max-w-7xl mx-auto text-center relative z-10">
          <h1 class="text-5xl md:text-6xl font-bold text-[var(--color-text)] mb-6 animate-fade-in">
            Welcome to <span class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">Ccar Community</span>
          </h1>
          <p class="text-xl text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto animate-fade-in">
            Connect with car enthusiasts, share your passion, and discover amazing vehicles from around the world.
          </p>
          <div class="flex gap-4 justify-center flex-wrap animate-fade-in">
            <app-button variant="primary" size="lg" routerLink="/community">
              Explore Community
            </app-button>
            <app-button variant="outline" size="lg" routerLink="/cars">
              Browse Cars
            </app-button>
            <app-button variant="secondary" size="lg" (click)="addTestNotification()">
              Test Notification
            </app-button>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16 px-4">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl font-bold text-[var(--color-text)] text-center mb-12">
            Why Join Ccar?
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <app-card title="Community" subtitle="Connect with enthusiasts" [hoverable]="true" class="animate-fade-in">
              <p class="text-[var(--color-text-secondary)]">
                Join a vibrant community of car lovers, share experiences, and make lasting connections.
              </p>
            </app-card>
            <app-card title="Marketplace" subtitle="Buy & sell vehicles" [hoverable]="true" class="animate-fade-in">
              <p class="text-[var(--color-text-secondary)]">
                Discover amazing deals, list your vehicles, and connect with serious buyers.
              </p>
            </app-card>
            <app-card title="Resources" subtitle="Learn & grow" [hoverable]="true" class="animate-fade-in">
              <p class="text-[var(--color-text-secondary)]">
                Access expert guides, maintenance tips, and the latest automotive news.
              </p>
            </app-card>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-16 px-4 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p class="text-white/90 mb-8 text-lg">
            Join thousands of car enthusiasts today and be part of something special.
          </p>
          <app-button variant="secondary" size="lg" routerLink="/auth/register">
            Create Account
          </app-button>
        </div>
      </section>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  private notificationService = inject(NotificationService);

  ngOnInit(): void {
    // Add a welcome notification on first visit
    const hasVisited = localStorage.getItem('ccar-has-visited');
    if (!hasVisited) {
      this.notificationService.addNotification({
        title: 'Welcome to Ccar!',
        message: 'Thanks for joining our community. Explore and enjoy!',
        type: 'success'
      });
      localStorage.setItem('ccar-has-visited', 'true');
    }
  }

  addTestNotification(): void {
    const types: Array<'info' | 'success' | 'warning' | 'error'> = ['info', 'success', 'warning', 'error'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    this.notificationService.addNotification({
      title: `Test ${randomType.charAt(0).toUpperCase() + randomType.slice(1)} Notification`,
      message: `This is a test ${randomType} notification to demonstrate the notification system.`,
      type: randomType
    });
  }
}
