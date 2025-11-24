import { trigger, transition, style, query, animate, group } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
    transition('* <=> *', [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                width: '100%',
                opacity: 0
            })
        ], { optional: true }),
        query(':enter', [
            style({ opacity: 0 })
        ], { optional: true }),
        group([
            query(':leave', [
                animate('300ms ease-out', style({ opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
                animate('300ms ease-in', style({ opacity: 1 }))
            ], { optional: true })
        ])
    ])
]);

export const slideInAnimation = trigger('slideIn', [
    transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
    ])
]);

export const fadeInAnimation = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
    ])
]);

export const scaleInAnimation = trigger('scaleIn', [
    transition(':enter', [
        style({ transform: 'scale(0.95)', opacity: 0 }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'scale(1)', opacity: 1 }))
    ])
]);

export const bounceInAnimation = trigger('bounceIn', [
    transition(':enter', [
        style({ transform: 'scale(0.3)', opacity: 0 }),
        animate('400ms cubic-bezier(0.68, -0.55, 0.265, 1.55)', style({ transform: 'scale(1)', opacity: 1 }))
    ])
]);
