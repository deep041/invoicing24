import { Routes } from '@angular/router';
import { authGuard } from './common/guards/auth.guard';
import { loginGuard } from './common/guards/login.guard';
import { WebSiteComponent } from './web-site/web-site.component';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(d => d.DashboardModule), canActivate: [authGuard] },
  { path: 'landing', loadChildren: () => import('./web-site/web-site.module').then(w => w.WebSiteModule), component: WebSiteComponent },
  { path: 'pricing', loadComponent: () => import('./web-site/pricing/pricing.component').then(m => m.PricingComponent) },
  { path: 'privacy-policy', loadComponent: () => import('./web-site/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent) },
  { path: 'terms-of-service', loadComponent: () => import('./web-site/terms-of-service/terms-of-service.component').then(m => m.TermsOfServiceComponent) },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(a => a.AuthenticationModule), canActivate: [loginGuard] }
];
