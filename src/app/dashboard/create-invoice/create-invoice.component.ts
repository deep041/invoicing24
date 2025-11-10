import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectCustomerComponent } from '../../common/components/select-customer/select-customer.component';
import { SelectItemsComponent } from '../../common/components/select-items/select-items.component';
import { TableComponent } from "../../common/widgets/table/table.component";
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { InvoicePreviewComponent } from '../../common/components/invoice-preview/invoice-preview.component';

@Component({
    selector: 'app-create-invoice',
    imports: [CommonModule, TableComponent, ButtonComponent],
    templateUrl: './create-invoice.component.html',
    styleUrl: './create-invoice.component.scss'
})

export class CreateInvoiceComponent {

    selectedCustomer: any;
    selectedItems: any;
    headers = [{ label: 'Name', key: 'name' }, { label: 'Category', key: 'category' }, { label: 'Price', key: 'price', align: 'right', isCurrency: true }, { label: 'Quantity', key: 'quantity' }];

    constructor(private dialog: MatDialog) {}

    selectCustomer() {
        let dialogRef = this.dialog.open(SelectCustomerComponent, {
            height: '400px',
            width: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(result)
                this.selectedCustomer = result;
            }
        });
    }

    selectItems() {
        let dialogRef = this.dialog.open(SelectItemsComponent, {
            width: '600px',
            maxHeight: '60vh'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.selectedItems = result.map((data: any) => { return { name: data.name, price: data.price, category: data.category, quantity: 0 }});
            }
        });
    }

    generate() {
        console.log('Items', this.selectedItems);
    }

    preview() {
        let data = {
            date: new Date(),
            customerDetails: this.selectedCustomer,
            items: this.selectedItems
        };

        this.dialog.open(InvoicePreviewComponent, {
            width: '90vw',
            maxWidth: '90vw',
            data
        });
    }
}
