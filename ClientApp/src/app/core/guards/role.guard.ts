import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ROUTES } from '../constants/app.constants';
import { UserRole } from '../enums/app.enums';

export const roleGuard = (allowedRoles: UserRole[]): CanActivateFn => {
    return (route, state) => {
        const authService = inject(AuthService);
        const router = inject(Router);

        if (!authService.isAuthenticated()) {
            router.navigate([ROUTES.LOGIN], { queryParams: { returnUrl: state.url } });
            return false;
        }

        // Check if user has any of the allowed roles
        // Assuming authService.hasRole accepts string, we might need to cast or update service
        const hasRole = allowedRoles.some(role => authService.hasRole(role));

        if (!hasRole) {
            router.navigate([ROUTES.FORBIDDEN]);
            return false;
        }

        return true;
    };
};
