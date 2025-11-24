import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Language } from '../../../core/services/theme.service';

@Component({
    selector: 'app-language-switcher',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="flex gap-2">
      <button
        *ngFor="let lang of languages"
        (click)="switchLanguage(lang.code)"
        [class]="getButtonClasses(lang.code)"
      >
        {{ lang.label }}
      </button>
    </div>
  `,
    styles: []
})
export class LanguageSwitcherComponent {
    themeService = inject(ThemeService);

    languages = [
        { code: 'en' as Language, label: 'EN' },
        { code: 'ar' as Language, label: 'ع' }
    ];

    switchLanguage(lang: Language): void {
        this.themeService.setLanguage(lang);
    }

    getButtonClasses(lang: Language): string {
        const isActive = this.themeService.language() === lang;
        const baseClasses = 'px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200';
        const activeClasses = 'bg-primary-500 text-white';
        const inactiveClasses = 'text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]';

        return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
    }
}
