import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    constructor() { }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken(): string {
        return localStorage.getItem('token') || '';
    }

    logout() {
        localStorage.clear();
    }

    setLocalStorage(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    getLocalStorage(key: string): string {
        return localStorage.getItem(key) || '';
    }

}
