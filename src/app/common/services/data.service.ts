import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DataService {

    isShowLoader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
