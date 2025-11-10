import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../widgets/table/table.component";
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-select-customer',
    imports: [TableComponent],
    templateUrl: './select-customer.component.html',
    styleUrl: './select-customer.component.scss'
})

export class SelectCustomerComponent implements OnInit {

    headers = [{ label: 'Name', key: 'name' }, { label: 'Contact No.', key: 'contactNo' }, { label: 'Address', key: 'address' }];
    customerData: any[] = [];

    constructor(public dialogRef: MatDialogRef<SelectCustomerComponent>, private apiService: ApiService) { }

    ngOnInit(): void {
        this.getCustomers();
    }

    getCustomers() {
        this.apiService.getCustomers().subscribe((res: any) => {
            if (res && res.success) {
                this.customerData = res.data;
            }
        })
    }

    selectCustomer($event: any) {
        if ($event) {
            this.dialogRef.close($event);
        }
    }
}
