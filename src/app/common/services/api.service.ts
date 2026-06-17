import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Invoice } from '../interfaces/invoice.interface';
import { PaginationParams } from '../interfaces/pagination.interface';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    constructor(private http: HttpClient) { }

    private buildPaginationParams(params?: PaginationParams): HttpParams {
        let httpParams = new HttpParams();

        if (params?.page) {
            httpParams = httpParams.set('page', params.page.toString());
        }

        if (params?.limit) {
            httpParams = httpParams.set('limit', params.limit.toString());
        }

        return httpParams;
    }

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

    getCustomers(params?: PaginationParams) {
        return this.http.get<any>(`${environment.apiUrl}customer`, {
            params: this.buildPaginationParams(params)
        });
    }

    createItem(payload: any) {
        return this.http.post<any>(`${environment.apiUrl}item`, payload);
    }

    editItem(payload: any) {
        return this.http.post<any>(`${environment.apiUrl}item/edit`, payload);
    }

    getItems(params?: PaginationParams) {
        return this.http.get<any>(`${environment.apiUrl}item`, {
            params: this.buildPaginationParams(params)
        });
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

    getInvoices(params?: PaginationParams) {
        return this.http.get<any>(`${environment.apiUrl}invoice`, {
            params: this.buildPaginationParams(params)
        });
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
