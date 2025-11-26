import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[appInfiniteScroll]',
    standalone: true
})
export class InfiniteScrollDirective {
    @Input() scrollThreshold = 200; // Distance from bottom to trigger (in pixels)
    @Input() scrollEnabled = true;
    @Output() scrolled = new EventEmitter<void>();

    @HostListener('window:scroll', ['$event'])
    onScroll(): void {
        if (!this.scrollEnabled) {
            return;
        }

        const scrollPosition = window.pageYOffset + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollPosition >= documentHeight - this.scrollThreshold) {
            this.scrolled.emit();
        }
    }
}
