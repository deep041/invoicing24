import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    constructor(private http: HttpClient) { }

    register(payload: any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}authenticate/register`, payload);
    }

    login(payload: any) {
        return this.http.post<any>(`${environment.apiUrl}authenticate/login`, payload);
    }

    createCustomer(payload: any) {
        return this.http.post<any>(`${environment.apiUrl}customer`, payload);
    }

    getCustomers() {
        return this.http.get<any>(`${environment.apiUrl}customer`);
    }

    createItem(payload: any) {
        return this.http.post<any>(`${environment.apiUrl}item`, payload);
    }

    getItems() {
        return this.http.get<any>(`${environment.apiUrl}item`);
    }

    addCompanyDetails(payload: any) {
        return this.http.post<any>(`${environment.apiUrl}company-details`, payload);
    }

    getCompanyDetails() {
        return this.http.get<any>(`${environment.apiUrl}company-details`);
    }

}
