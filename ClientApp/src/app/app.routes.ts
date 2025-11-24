import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'community',
                loadComponent: () => import('./features/community/community.component').then(m => m.CommunityComponent)
            },
            {
                path: 'cars',
                loadComponent: () => import('./features/cars/cars.component').then(m => m.CarsComponent)
            },
            {
                path: 'auth',
                loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
            }
        ]
    },
    {
        path: 'error/500',
        loadComponent: () => import('./features/errors/server-error/server-error.component').then(m => m.ServerErrorComponent)
    },
    {
        path: 'error/403',
        loadComponent: () => import('./features/errors/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
    },
    {
        path: '**',
        loadComponent: () => import('./features/errors/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
