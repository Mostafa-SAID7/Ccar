import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-skeleton-loader',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div [class]="containerClasses">
      <!-- Card Skeleton -->
      <div *ngIf="type === 'card'" class="space-y-4">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text" style="width: 80%"></div>
        <div class="skeleton skeleton-text" style="width: 60%"></div>
      </div>

      <!-- List Skeleton -->
      <div *ngIf="type === 'list'" class="space-y-3">
        <div *ngFor="let item of [1,2,3,4,5]" class="flex items-center gap-3">
          <div class="skeleton skeleton-avatar"></div>
          <div class="flex-1 space-y-2">
            <div class="skeleton skeleton-text" style="width: 70%"></div>
            <div class="skeleton skeleton-text" style="width: 40%"></div>
          </div>
        </div>
      </div>

      <!-- Profile Skeleton -->
      <div *ngIf="type === 'profile'" class="flex items-center gap-4">
        <div class="skeleton skeleton-avatar" style="width: 4rem; height: 4rem"></div>
        <div class="flex-1 space-y-2">
          <div class="skeleton skeleton-title" style="width: 50%"></div>
          <div class="skeleton skeleton-text" style="width: 70%"></div>
        </div>
      </div>

      <!-- Table Skeleton -->
      <div *ngIf="type === 'table'" class="space-y-2">
        <div *ngFor="let row of [1,2,3,4,5,6]" class="flex gap-4">
          <div class="skeleton skeleton-text flex-1"></div>
          <div class="skeleton skeleton-text flex-1"></div>
          <div class="skeleton skeleton-text flex-1"></div>
        </div>
      </div>

      <!-- Text Skeleton -->
      <div *ngIf="type === 'text'" class="space-y-2">
        <div *ngFor="let line of lines" class="skeleton skeleton-text"></div>
      </div>

      <!-- Custom Skeleton -->
      <div *ngIf="type === 'custom'">
        <ng-content></ng-content>
      </div>
    </div>
  `,
    styles: []
})
export class SkeletonLoaderComponent {
    @Input() type: 'card' | 'list' | 'profile' | 'table' | 'text' | 'custom' = 'card';
    @Input() count = 1;
    @Input() lines = 3;

    get containerClasses(): string {
        return 'animate-pulse';
    }
}
