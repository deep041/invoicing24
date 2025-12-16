import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectCustomerComponent } from '../../common/components/select-customer/select-customer.component';
import { SelectItemsComponent } from '../../common/components/select-items/select-items.component';
import { TableComponent } from "../../common/widgets/table/table.component";
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { InvoicePreviewComponent } from '../../common/components/invoice-preview/invoice-preview.component';
import { CompanyDetails, CustomerDetails, Invoice, InvoiceItem } from '../../common/interfaces/invoice.interface';
import { ApiService } from '../../common/services/api.service';
import { Router } from '@angular/router';
import { ToastService } from '../../common/services/toast.service';

@Component({
    selector: 'app-create-invoice',
    imports: [CommonModule, TableComponent, ButtonComponent],
    templateUrl: './create-invoice.component.html',
    styleUrl: './create-invoice.component.scss'
})

export class CreateInvoiceComponent implements OnInit {

    selectedCustomer: any;
    companyDetails: any;
    selectedItems: any;
    headers = [{ label: 'Name', key: 'name' }, { label: 'Price', key: 'price', align: 'right', isCurrency: true }, { label: 'Quantity', key: 'quantity', placeholder: 'Quantity', isNumberInput: true }, { label: 'Discount', key: 'discount', placeholder: 'Discount', isNumberInput: true }];

    constructor(private dialog: MatDialog, private apiService: ApiService, private router: Router, private toastService: ToastService) {}

    ngOnInit(): void {
        this.getCompanyData();
    }

    getCompanyData() {
        this.apiService.getCompanyDetails().subscribe((res: any) => {
            if (res && res.success) {
                this.companyDetails = res.data;
            }
        });
    }

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
                this.selectedItems = result.map((data: any) => { return { name: data.name, price: data.price, category: data.category, quantity: 0, id: data._id }});
            }
        });
    }

    generate() {
        let companyDetails: CompanyDetails = {
            name: this.companyDetails.name,
            contactNo: this.companyDetails.contactNo,
            address: this.companyDetails.address,
            id: this.companyDetails._id
        };
        
        let customerDetails: CustomerDetails = {
            name: this.selectedCustomer.name,
            contactNo: this.selectedCustomer.contactNo,
            address: this.selectedCustomer.address,
            id: this.selectedCustomer._id
        };
        
        let items: InvoiceItem[] = this.selectedItems.map((item: any) => { return {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            discount: 0,
            discountType: 'fixed',
            id: item.id
        } });

        let payload: Invoice = {
            companyDetails,
            customerDetails,
            items,
            invoiceNumber: '101',
            invoiceDate: new Date(),
            discount: 0,
            discountType: 'fixed'
        }

        this.apiService.createInvoice(payload).subscribe((res: any) => {
            if (res && res.success) {
                this.toastService.show({ message: 'Invoice generated successfully!', type: 'success' });
                this.router.navigate(['invoices'])
            }
        })
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
