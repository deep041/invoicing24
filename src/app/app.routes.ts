import { Routes } from '@angular/router';
import { authGuard } from './common/guards/auth.guard';
import { loginGuard } from './common/guards/login.guard';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(d => d.DashboardModule), canActivate: [authGuard] },
    { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(a => a.AuthenticationModule), canActivate: [loginGuard] }
];
