import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../common/widgets/table/table.component";
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { MatDialog } from '@angular/material/dialog';
import { CreateCustomerComponent } from '../../common/components/create-customer/create-customer.component';
import { ApiService } from '../../common/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-customers',
    imports: [TableComponent, ButtonComponent, CommonModule],
    templateUrl: './customers.component.html',
    styleUrl: './customers.component.scss'
})

export class CustomersComponent implements OnInit {

    headers = [{ label: 'Name', key: 'name' }, { label: 'Contact No.', key: 'contactNo' }, { label: 'Address', key: 'address' }, { label: 'Edit', key: 'edit', isEdit: true }];
    customerData: any[] = [];

    constructor(private dialog: MatDialog, private apiService: ApiService) {}

    ngOnInit(): void {
        this.getCustomers();
    }

    getCustomers() {
        this.apiService.getCustomers().subscribe((response: any) => {
            if (response && response.success) {
                console.log('data', response);
                this.customerData = response.data;
            }
        })
    }

    createCustomer(data: any = null) {
        console.log('Customer Data => ', data)
        let dialogRef = this.dialog.open(CreateCustomerComponent, {
            width: '500px',
            height: '400px',
            data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getCustomers();
            }
        })
    }
}
