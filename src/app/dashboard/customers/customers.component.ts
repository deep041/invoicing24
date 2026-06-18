import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../common/widgets/table/table.component";
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { MatDialog } from '@angular/material/dialog';
import { CreateCustomerComponent } from '../../common/components/create-customer/create-customer.component';
import { ApiService } from '../../common/services/api.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../common/widgets/pagination/pagination.component';
import { PaginationMeta } from '../../common/interfaces/pagination.interface';
import { SearchFieldComponent } from '../../common/widgets/search-field/search-field.component';

@Component({
    selector: 'app-customers',
    imports: [TableComponent, ButtonComponent, CommonModule, PaginationComponent, SearchFieldComponent],
    templateUrl: './customers.component.html',
    styleUrl: './customers.component.scss'
})

export class CustomersComponent implements OnInit {

    headers = [{ label: 'Name', key: 'name' }, { label: 'Contact No.', key: 'contactNo' }, { label: 'Address', key: 'address' }, { label: 'Edit', key: 'edit', isEdit: true }];
    customerData: any[] = [];
    pageIndex = 0;
    pageSize = 10;
    totalItems = 0;
    searchQuery = '';

    constructor(private dialog: MatDialog, private apiService: ApiService) {}

    ngOnInit(): void {
        this.getCustomers();
    }

    getCustomers(page = 1, limit = this.pageSize) {
        this.apiService.getCustomers({ page, limit, search: this.searchQuery }).subscribe((response: any) => {
            if (response && response.success) {
                this.customerData = response.data.items;
                this.applyPagination(response.data.pagination);
            }
        });
    }

    onSearchChange(search: string) {
        this.searchQuery = search;
        this.getCustomers(1, this.pageSize);
    }

    onPageChange(event: { page: number; limit: number }) {
        this.getCustomers(event.page, event.limit);
    }

    private applyPagination(pagination: PaginationMeta) {
        this.pageIndex = pagination.page - 1;
        this.pageSize = pagination.limit;
        this.totalItems = pagination.total;
    }

    createCustomer(data: any = null) {
        let dialogRef = this.dialog.open(CreateCustomerComponent, {
            width: '500px',
            height: '400px',
            data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getCustomers(this.pageIndex + 1, this.pageSize);
            }
        });
    }
}
