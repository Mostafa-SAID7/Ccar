import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car, CarService } from '../../core/services/car.service';

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cars.component.html',
  styles: []
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];
  loading = true;
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
