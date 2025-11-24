import { Injectable, signal } from '@angular/core';

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    timestamp: Date;
    link?: string;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notifications = signal<Notification[]>([]);
    public notifications$ = this.notifications.asReadonly();

    unreadCount = signal<number>(0);

    constructor() {
        // Load notifications from localStorage
        this.loadNotifications();
    }

    private loadNotifications(): void {
        const stored = localStorage.getItem('ccar-notifications');
        if (stored) {
            const parsed = JSON.parse(stored);
            this.notifications.set(parsed.map((n: any) => ({
                ...n,
                timestamp: new Date(n.timestamp)
            })));
            this.updateUnreadCount();
        }
    }

    private saveNotifications(): void {
        localStorage.setItem('ccar-notifications', JSON.stringify(this.notifications()));
    }

    addNotification(notification: Omit<Notification, 'id' | 'read' | 'timestamp'>): void {
        const newNotification: Notification = {
            ...notification,
            id: crypto.randomUUID(),
            read: false,
            timestamp: new Date()
        };

        this.notifications.update(notifications => [newNotification, ...notifications]);
        this.updateUnreadCount();
        this.saveNotifications();
    }

    markAsRead(id: string): void {
        this.notifications.update(notifications =>
            notifications.map(n => n.id === id ? { ...n, read: true } : n)
        );
        this.updateUnreadCount();
        this.saveNotifications();
    }

    markAllAsRead(): void {
        this.notifications.update(notifications =>
            notifications.map(n => ({ ...n, read: true }))
        );
        this.updateUnreadCount();
        this.saveNotifications();
    }

    deleteNotification(id: string): void {
        this.notifications.update(notifications =>
            notifications.filter(n => n.id !== id)
        );
        this.updateUnreadCount();
        this.saveNotifications();
    }

    clearAll(): void {
        this.notifications.set([]);
        this.unreadCount.set(0);
        localStorage.removeItem('ccar-notifications');
    }

    private updateUnreadCount(): void {
        const count = this.notifications().filter(n => !n.read).length;
        this.unreadCount.set(count);
    }
}
