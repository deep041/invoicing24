import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, map, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EncryptionService } from '../services/encryption.service';

function isApiRequest(url: string): boolean {
    return url.startsWith(environment.apiUrl);
}

function hasEncryptedBody(body: unknown): body is { encrypted: string } {
    return !!body && typeof body === 'object' && 'encrypted' in body && typeof (body as { encrypted: unknown }).encrypted === 'string';
}

function decryptHttpResponse<T>(encryptionService: EncryptionService, response: HttpResponse<T>) {
    if (!hasEncryptedBody(response.body)) {
        return of(response);
    }

    return from(encryptionService.decrypt(response.body.encrypted)).pipe(
        map((decryptedBody) => response.clone({ body: decryptedBody }))
    );
}

function decryptHttpError(encryptionService: EncryptionService, error: HttpErrorResponse) {
    if (!hasEncryptedBody(error.error)) {
        return throwError(() => error);
    }

    return from(encryptionService.decrypt(error.error.encrypted)).pipe(
        switchMap((decryptedBody) => throwError(() => new HttpErrorResponse({
            error: decryptedBody,
            headers: error.headers,
            status: error.status,
            statusText: error.statusText,
            url: error.url ?? undefined
        })))
    );
}

export const encryptionInterceptor: HttpInterceptorFn = (req, next) => {
    const encryptionService = inject(EncryptionService);

    if (!encryptionService.isEnabled() || !isApiRequest(req.url)) {
        return next(req);
    }

    const preparedRequest$ = req.body && ['POST', 'PUT', 'PATCH'].includes(req.method)
        ? from(encryptionService.encrypt(req.body)).pipe(
            map((encrypted) => req.clone({ body: { encrypted } }))
        )
        : of(req);

    return preparedRequest$.pipe(
        switchMap((clonedReq) => next(clonedReq).pipe(
            switchMap((event) => {
                if (event instanceof HttpResponse && hasEncryptedBody(event.body)) {
                    return decryptHttpResponse(encryptionService, event);
                }

                return of(event);
            }),
            catchError((error: HttpErrorResponse) => decryptHttpError(encryptionService, error))
        ))
    );
};
