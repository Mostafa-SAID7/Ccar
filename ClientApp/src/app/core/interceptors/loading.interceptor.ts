import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { ToastNotificationService } from '../services/toast-notification.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(LoadingService);
    const toastService = inject(ToastNotificationService);

    // Skip loading for certain requests
    const skipLoading = req.headers.has('X-Skip-Loading');

    if (!skipLoading) {
        loadingService.show();
    }

    return next(req).pipe(
        catchError((error) => {
            // Handle HTTP errors
            let errorMessage = 'An error occurred';

            if (error.status === 0) {
                errorMessage = 'Network error. Please check your connection.';
            } else if (error.status === 401) {
                errorMessage = 'Unauthorized. Please login again.';
            } else if (error.status === 403) {
                errorMessage = 'Access denied.';
            } else if (error.status === 404) {
                errorMessage = 'Resource not found.';
            } else if (error.status === 500) {
                errorMessage = 'Server error. Please try again later.';
            } else if (error.error?.message) {
                errorMessage = error.error.message;
            }

            // Show error toast unless explicitly skipped
            if (!req.headers.has('X-Skip-Error-Toast')) {
                toastService.error(errorMessage);
            }

            return throwError(() => error);
        }),
        finalize(() => {
            if (!skipLoading) {
                loadingService.hide();
            }
        })
    );
};
