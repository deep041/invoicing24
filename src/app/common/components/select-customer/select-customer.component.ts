import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../widgets/table/table.component";
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { PaginationComponent } from '../../widgets/pagination/pagination.component';
import { PaginationMeta } from '../../interfaces/pagination.interface';

@Component({
    selector: 'app-select-customer',
    imports: [TableComponent, PaginationComponent],
    templateUrl: './select-customer.component.html',
    styleUrl: './select-customer.component.scss'
})

export class SelectCustomerComponent implements OnInit {

    headers = [{ label: 'Name', key: 'name' }, { label: 'Contact No.', key: 'contactNo' }, { label: 'Address', key: 'address' }];
    customerData: any[] = [];
    pageIndex = 0;
    pageSize = 10;
    totalItems = 0;

    constructor(public dialogRef: MatDialogRef<SelectCustomerComponent>, private apiService: ApiService) { }

    ngOnInit(): void {
        this.getCustomers();
    }

    getCustomers(page = 1, limit = this.pageSize) {
        this.apiService.getCustomers({ page, limit }).subscribe((res: any) => {
            if (res && res.success) {
                this.customerData = res.data.items;
                this.applyPagination(res.data.pagination);
            }
        });
    }

    onPageChange(event: { page: number; limit: number }) {
        this.getCustomers(event.page, event.limit);
    }

    private applyPagination(pagination: PaginationMeta) {
        this.pageIndex = pagination.page - 1;
        this.pageSize = pagination.limit;
        this.totalItems = pagination.total;
    }

    selectCustomer($event: any) {
        if ($event) {
            this.dialogRef.close($event);
        }
    }
}
