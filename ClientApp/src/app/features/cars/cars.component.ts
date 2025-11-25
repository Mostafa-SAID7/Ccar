import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../../core/services/car.service';
import { Car } from '../../core/models/car.model';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6 text-[var(--color-text)]">Cars</h1>
      
      <div *ngIf="loading" class="text-center py-8">
        <p class="text-[var(--color-text-secondary)]">Loading cars...</p>
      </div>

      <div *ngIf="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>

      <div *ngIf="!loading && !error" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let car of cars" class="bg-[var(--color-surface)] rounded-lg shadow-md overflow-hidden border border-[var(--color-border)]">
          <!-- Car content here -->
          <div class="p-4">
            <h2 class="text-xl font-semibold text-[var(--color-text)]">{{ car.make }} {{ car.model }}</h2>
            <p class="text-[var(--color-text-secondary)]">{{ car.year }}</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];
  loading = false;
  error: string | null = null;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.loading = true;
    this.carService.getCars().subscribe({
      next: (data) => {
        this.cars = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching cars', err);
        this.error = 'Failed to load cars. Please try again later.';
        this.loading = false;
      }
    });
  }
}
