import { Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';
export type Direction = 'ltr' | 'rtl';
export type Language = 'en' | 'ar';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly THEME_KEY = 'ccar-theme';
    private readonly LANG_KEY = 'ccar-language';

    // Signals for reactive state
    theme = signal<Theme>('light');
    language = signal<Language>('en');
    direction = signal<Direction>('ltr');

    constructor() {
        this.loadPreferences();
        this.applyTheme();
        this.applyDirection();
    }

    private loadPreferences(): void {
        // Load theme from localStorage
        const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
        if (savedTheme === 'light' || savedTheme === 'dark') {
            this.theme.set(savedTheme);
        }

        // Load language from localStorage
        const savedLang = localStorage.getItem(this.LANG_KEY) as Language;
        if (savedLang === 'en' || savedLang === 'ar') {
            this.language.set(savedLang);
            this.direction.set(savedLang === 'ar' ? 'rtl' : 'ltr');
        }
    }

    toggleTheme(): void {
        const newTheme = this.theme() === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    setTheme(theme: Theme): void {
        this.theme.set(theme);
        localStorage.setItem(this.THEME_KEY, theme);
        this.applyTheme();
    }

    setLanguage(lang: Language): void {
        this.language.set(lang);
        this.direction.set(lang === 'ar' ? 'rtl' : 'ltr');
        localStorage.setItem(this.LANG_KEY, lang);
        this.applyDirection();
    }

    private applyTheme(): void {
        const html = document.documentElement;
        if (this.theme() === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }

    private applyDirection(): void {
        const html = document.documentElement;
        html.setAttribute('dir', this.direction());
        html.setAttribute('lang', this.language());
    }
}
