import { Routes } from '@angular/router';
import { authGuard } from './common/guards/auth.guard';
import { loginGuard } from './common/guards/login.guard';
import { WebSiteComponent } from './web-site/web-site.component';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(d => d.DashboardModule), canActivate: [authGuard] },
  { path: 'landing', loadChildren: () => import('./web-site/web-site.module').then(w => w.WebSiteModule), component: WebSiteComponent },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(a => a.AuthenticationModule), canActivate: [loginGuard] }
];
