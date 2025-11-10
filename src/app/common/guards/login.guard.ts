import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DataService } from '../services/data.service';

export const loginGuard: CanActivateFn = (route, state) => {
    const auth = inject(DataService);
    const router = inject(Router);

    if (auth.getToken()) {
        router.navigate(['/']);
        return false;
    }
    return true;
};
