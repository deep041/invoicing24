import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { finalize, tap } from 'rxjs';
import { ToastService } from '../services/toast.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

    const auth = inject(DataService);
    const router = inject(Router);
    const dataService = inject(DataService);
    const toast = inject(ToastService);

    dataService.isShowLoader.next(true);

    const token = auth.getToken();
    let clonedReq = req;
    if (token) {
        clonedReq = req.clone({
            setHeaders: { Authorization: `${token}` }
        });
    }

    return next(clonedReq).pipe(
        finalize(() => dataService.isShowLoader.next(false)),
        tap(
            {
                error: (err) => {
                    if (err.status === 401 || err.status === 403) {
                        auth.logout();
                        router.navigate(['/authentication/login']);
                    } else {
                        toast.show({ message: 'Something went wrong!', type: 'error' });
                    }
                }
            }
        )
    );
};
