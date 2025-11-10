import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { tap } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

    const auth = inject(DataService);
    const router = inject(Router);

    const token = auth.getToken();
    let clonedReq = req;
    if (token) {
        clonedReq = req.clone({
            setHeaders: { Authorization: `${token}` }
        });
    }
    
    return next(clonedReq).pipe(
        tap({
          error: (err) => {
            if (err.status === 401 || err.status === 403) {
              auth.logout();
              router.navigate(['/authentication/login']);
            }
          }
        })
    );
};
