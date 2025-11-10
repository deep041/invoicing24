import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataService } from '../services/data.service';

export const authGuard: CanActivateFn = (route, state) => {
    const auth = inject(DataService);
    const router = inject(Router);

    if (auth.getToken()) {
        return true;
    } else {
        router.navigate(['/authentication/login']);
        return false;
    }
};
