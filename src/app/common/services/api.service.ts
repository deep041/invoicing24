import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Invoice } from '../interfaces/invoice.interface';

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

    editCustomer(payload: any) {
        return this.http.post<any>(`${environment.apiUrl}customer/edit`, payload);
    }

    getCustomers() {
        return this.http.get<any>(`${environment.apiUrl}customer`);
    }

    createItem(payload: any) {
        return this.http.post<any>(`${environment.apiUrl}item`, payload);
    }

    editItem(payload: any) {
        return this.http.post<any>(`${environment.apiUrl}item/edit`, payload);
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

    createInvoice(payload: Invoice) {
        return this.http.post<any>(`${environment.apiUrl}invoice`, payload);
    }

    getInvoices() {
        return this.http.get<any>(`${environment.apiUrl}invoice`);
    }

    getInvoiceById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}invoice/${id}`);
    }

    generateInvoiceNumber() {
        return this.http.get<any>(`${environment.apiUrl}invoice/generate-invoice-number`);
    }

    getDashboardData() {
        return this.http.get<any>(`${environment.apiUrl}dashboard`);
    }

}
