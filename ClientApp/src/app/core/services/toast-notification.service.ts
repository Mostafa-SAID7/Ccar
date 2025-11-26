import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Toast {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
    action?: {
        label: string;
        callback: () => void;
    };
}

@Injectable({
    providedIn: 'root'
})
export class ToastNotificationService {
    private toastSubject = new Subject<Toast>();
    public toasts$ = this.toastSubject.asObservable();

    private generateId(): string {
        return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    show(toast: Omit<Toast, 'id'>): void {
        const newToast: Toast = {
            ...toast,
            id: this.generateId(),
            duration: toast.duration || 5000
        };
        this.toastSubject.next(newToast);
    }

    success(message: string, duration?: number): void {
        this.show({ type: 'success', message, duration });
    }

    error(message: string, duration?: number): void {
        this.show({ type: 'error', message, duration });
    }

    warning(message: string, duration?: number): void {
        this.show({ type: 'warning', message, duration });
    }

    info(message: string, duration?: number): void {
        this.show({ type: 'info', message, duration });
    }
}
