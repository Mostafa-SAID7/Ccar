import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-input',
    standalone: true,
    imports: [CommonModule, FormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ],
    template: `
    <div class="form-control" [class.w-full]="fullWidth">
      <label *ngIf="label" [for]="id" class="label">
        <span class="label-text font-medium text-gray-700 dark:text-gray-300">{{ label }}</span>
        <span *ngIf="optional" class="label-text-alt text-gray-500 dark:text-gray-400">(Optional)</span>
      </label>
      
      <div class="relative">
        <div *ngIf="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <ng-content select="[icon]"></ng-content>
        </div>
        
        <input
          [id]="id"
          [type]="type"
          [placeholder]="placeholder"
          [value]="value"
          [disabled]="disabled"
          [readonly]="readonly"
          [class]="inputClasses"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
        />
        
        <div *ngIf="iconEnd" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
          <ng-content select="[iconEnd]"></ng-content>
        </div>

        <div *ngIf="type === 'password' && showPasswordToggle" class="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button type="button" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none" (click)="togglePasswordVisibility()">
            <svg *ngIf="isPasswordVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
            <svg *ngIf="!isPasswordVisible" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div *ngIf="hint && !error" class="label">
        <span class="label-text-alt text-gray-500 dark:text-gray-400">{{ hint }}</span>
      </div>
      
      <div *ngIf="error" class="label">
        <span class="label-text-alt text-error-500">{{ error }}</span>
      </div>
    </div>
  `,
    styles: [`
    .form-control {
      display: flex;
      flex-direction: column;
    }
    
    .label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.25rem 0.5rem;
      user-select: none;
    }
    
    input {
      width: 100%;
      transition: all var(--transition-fast);
    }
    
    input:focus {
      outline: none;
    }
  `]
})
export class InputComponent implements ControlValueAccessor {
    @Input() label = '';
    @Input() placeholder = '';
    @Input() type = 'text';
    @Input() id = `input-${Math.random().toString(36).substring(2, 9)}`;
    @Input() hint = '';
    @Input() error = '';
    @Input() disabled = false;
    @Input() readonly = false;
    @Input() required = false;
    @Input() optional = false;
    @Input() fullWidth = true;
    @Input() icon = false;
    @Input() iconEnd = false;
    @Input() showPasswordToggle = false;

    @Output() focus = new EventEmitter<void>();
    @Output() blur = new EventEmitter<void>();

    value: any = '';
    isPasswordVisible = false;

    onChange: any = () => { };
    onTouched: any = () => { };

    get inputClasses(): string {
        const baseClasses = 'input-field block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-2.5';
        const errorClasses = this.error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : '';
        const disabledClasses = this.disabled ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-75' : '';
        const iconPadding = this.icon ? 'pl-10' : 'pl-3';
        const iconEndPadding = this.iconEnd || (this.type === 'password' && this.showPasswordToggle) ? 'pr-10' : 'pr-3';

        return `${baseClasses} ${errorClasses} ${disabledClasses} ${iconPadding} ${iconEndPadding}`;
    }

    togglePasswordVisibility(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
        this.type = this.isPasswordVisible ? 'text' : 'password';
    }

    onInput(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.value = value;
        this.onChange(value);
    }

    onBlur(): void {
        this.onTouched();
        this.blur.emit();
    }

    onFocus(): void {
        this.focus.emit();
    }

    // ControlValueAccessor implementation
    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
