import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-image-upload',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="image-upload-container">
      <!-- Drop Zone -->
      <div class="drop-zone"
           [class.dragover]="isDragging"
           (dragover)="onDragOver($event)"
           (dragleave)="onDragLeave($event)"
           (drop)="onDrop($event)"
           (click)="fileInput.click()">
        
        <input #fileInput
               type="file"
               [accept]="acceptedFormats"
               [multiple]="multiple"
               (change)="onFileSelected($event)"
               class="hidden">

        <div *ngIf="!previews.length" class="upload-prompt">
          <svg class="w-16 h-16 mx-auto mb-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <p class="text-lg font-semibold text-[var(--color-text)] mb-2">
            {{ isDragging ? 'Drop images here' : 'Upload Images' }}
          </p>
          <p class="text-sm text-[var(--color-text-secondary)]">
            Drag & drop or click to browse
          </p>
          <p class="text-xs text-[var(--color-text-muted)] mt-2">
            {{ acceptedFormats }} (Max {{ maxSizeMB }}MB)
          </p>
        </div>

        <!-- Preview Grid -->
        <div *ngIf="previews.length" class="preview-grid">
          <div *ngFor="let preview of previews; let i = index" class="preview-item">
            <img [src]="preview.url" [alt]="preview.name" class="preview-image">
            <div class="preview-overlay">
              <button (click)="removeImage(i, $event)" class="remove-btn">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div *ngIf="preview.uploading" class="upload-progress">
              <div class="progress-bar" [style.width.%]="preview.progress"></div>
            </div>
          </div>
          
          <!-- Add More Button -->
          <div *ngIf="multiple && previews.length < maxFiles" 
               class="add-more-btn"
               (click)="fileInput.click()">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Error Messages -->
      <div *ngIf="errors.length" class="error-messages">
        <div *ngFor="let error of errors" class="error-item">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{{ error }}</span>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .image-upload-container {
      width: 100%;
    }

    .drop-zone {
      border: 2px dashed var(--color-border);
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      transition: all var(--transition-normal);
      background: var(--color-surface);
    }

    .drop-zone:hover {
      border-color: var(--color-primary);
      background: rgba(0, 102, 255, 0.05);
    }

    .drop-zone.dragover {
      border-color: var(--color-primary);
      background: rgba(0, 102, 255, 0.1);
      transform: scale(1.02);
    }

    .hidden {
      display: none;
    }

    .upload-prompt {
      pointer-events: none;
    }

    .preview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 1rem;
      padding: 0;
    }

    .preview-item {
      position: relative;
      aspect-ratio: 1;
      border-radius: 8px;
      overflow: hidden;
      background: var(--color-bg);
    }

    .preview-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .preview-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity var(--transition-fast);
    }

    .preview-item:hover .preview-overlay {
      opacity: 1;
    }

    .remove-btn {
      background: var(--color-error);
      color: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform var(--transition-fast);
    }

    .remove-btn:hover {
      transform: scale(1.1);
    }

    .upload-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: rgba(0, 0, 0, 0.3);
    }

    .progress-bar {
      height: 100%;
      background: var(--color-primary);
      transition: width 0.3s ease;
    }

    .add-more-btn {
      aspect-ratio: 1;
      border: 2px dashed var(--color-border);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--transition-normal);
      color: var(--color-text-muted);
    }

    .add-more-btn:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
      background: rgba(0, 102, 255, 0.05);
    }

    .error-messages {
      margin-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .error-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      background: rgba(239, 68, 68, 0.1);
      border-left: 3px solid var(--color-error);
      border-radius: 4px;
      color: var(--color-error);
      font-size: 0.875rem;
    }
  `]
})
export class ImageUploadComponent {
    @Input() multiple = false;
    @Input() maxFiles = 5;
    @Input() maxSizeMB = 5;
    @Input() acceptedFormats = 'image/*';
    @Output() filesSelected = new EventEmitter<File[]>();
    @Output() filesUploaded = new EventEmitter<string[]>();

    previews: Array<{ url: string; name: string; file: File; uploading: boolean; progress: number }> = [];
    errors: string[] = [];
    isDragging = false;

    onDragOver(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = true;
    }

    onDragLeave(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;

        const files = event.dataTransfer?.files;
        if (files) {
            this.handleFiles(Array.from(files));
        }
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            this.handleFiles(Array.from(input.files));
        }
    }

    private handleFiles(files: File[]): void {
        this.errors = [];

        // Validate file count
        if (!this.multiple && files.length > 1) {
            this.errors.push('Only one file allowed');
            return;
        }

        if (this.previews.length + files.length > this.maxFiles) {
            this.errors.push(`Maximum ${this.maxFiles} files allowed`);
            return;
        }

        // Validate and process each file
        const validFiles: File[] = [];

        for (const file of files) {
            // Check file type
            if (!file.type.startsWith('image/')) {
                this.errors.push(`${file.name}: Not an image file`);
                continue;
            }

            // Check file size
            const sizeMB = file.size / (1024 * 1024);
            if (sizeMB > this.maxSizeMB) {
                this.errors.push(`${file.name}: File too large (max ${this.maxSizeMB}MB)`);
                continue;
            }

            validFiles.push(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                this.previews.push({
                    url: e.target?.result as string,
                    name: file.name,
                    file: file,
                    uploading: false,
                    progress: 0
                });
            };
            reader.readAsDataURL(file);
        }

        if (validFiles.length > 0) {
            this.filesSelected.emit(validFiles);
        }
    }

    removeImage(index: number, event: Event): void {
        event.stopPropagation();
        this.previews.splice(index, 1);
    }

    // Simulate upload progress (replace with actual upload logic)
    simulateUpload(index: number): void {
        const preview = this.previews[index];
        preview.uploading = true;
        preview.progress = 0;

        const interval = setInterval(() => {
            preview.progress += 10;
            if (preview.progress >= 100) {
                clearInterval(interval);
                preview.uploading = false;
                // Emit uploaded URL (replace with actual URL from server)
                this.filesUploaded.emit([preview.url]);
            }
        }, 200);
    }

    clearAll(): void {
        this.previews = [];
        this.errors = [];
    }
}
