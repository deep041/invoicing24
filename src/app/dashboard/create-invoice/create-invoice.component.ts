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
import { DataService } from '../../common/services/data.service';
import data from '../../../assets/data.json';
import { RadioComponent } from "../../common/widgets/radio/radio.component";
import { FormsModule } from '@angular/forms';
import { InputComponent } from "../../common/widgets/input/input.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-create-invoice',
    imports: [CommonModule, TableComponent, ButtonComponent, RadioComponent, FormsModule, InputComponent, MatIconModule],
    templateUrl: './create-invoice.component.html',
    styleUrl: './create-invoice.component.scss'
})

export class CreateInvoiceComponent implements OnInit {

    selectedCustomer: any;
    companyDetails: any;
    selectedItems: any[] = [];
    discountOptions = data.discountType;
    discountOnTotalType: 'percentage' | 'fixed' = 'fixed';
    discountOnTotal: number = 0;
    invoiceNumber: number = 0;
    headers = [
        { label: 'Name', key: 'name' }, 
        { label: 'Price', key: 'price', align: 'right', isCurrency: true }, 
        { label: 'Quantity', key: 'quantity', type: 'number', placeholder: 'Quantity', isNumberInput: true, width: '10%' },
        { label: 'Amount', key: 'amount', align: 'right', isMultiplication: true, calculationLeftSideKey: 'price', calculationRightSideKey: 'quantity' },
        { label: 'Discount Type', key: 'discountType', isRadioButton: true, options: data.discountType }, 
        { label: 'Discount', key: 'discount', type: 'number', placeholder: 'Discount', isNumberInput: true, width: '10%' },
        { label: 'Discount Amount', key: 'discountAmount', align: 'right', isDiscountAmount: true },
        { label: 'Net Amount', key: 'total', align: 'right', isInvoiceTotal: true, calculationLeftSideKey: 'price', calculationRightSideKey: 'quantity' }
    ];

    constructor(private dialog: MatDialog, private apiService: ApiService, private router: Router, private toastService: ToastService, private dataService: DataService) {}

    ngOnInit(): void {
        this.getCompanyData();
        this.generateInvoiceNumber();
    }

    getCompanyData() {
        this.apiService.getCompanyDetails().subscribe((res: any) => {
            if (res && res.success) {
                this.companyDetails = res.data;
            }
        });
    }

    generateInvoiceNumber() {
        this.apiService.generateInvoiceNumber().subscribe((res: any) => {
            if (res && res.success) {
                this.invoiceNumber = res.data.invoiceNumber;
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
                this.selectedItems = result.map((data: any) => { return { name: data.name, price: data.price, category: data.category, quantity: 0, discountType: 'fixed', discount: 0, id: data._id }});
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
            discount: item.discount,
            discountType: item.discountType,
            discountValue: (item.discountType === 'fixed') ? item.discount : ((Number(item.price) * Number(item.quantity)) * (Number(item.discount) / 100)),
            amount: Number(item.price) * Number(item.quantity),
            netAmount: (Number(item.price) * Number(item.quantity)) - ((item.discountType === 'fixed') ? item.discount : ((Number(item.price) * Number(item.quantity)) * (Number(item.discount) / 100))),
            id: item.id
        } });

        console.log('this.selectedItems', items);

        let payload: Invoice = {
            companyDetails,
            customerDetails,
            items,
            invoiceDate: new Date(),
            discount: this.discountOnTotal,
            discountType: this.discountOnTotalType,
            total: this.countTotal(),
            grandTotal: this.countTotalAfterDiscount(),
            totalDiscountAmount: this.discountOnTotalType === 'fixed' ? this.discountOnTotal : (this.countTotal() * (this.discountOnTotal / 100))
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
            companyDetails: this.companyDetails,
            items: this.selectedItems,
            invoiceTotal: this.countTotal(),
            invoiceDiscountAmount: this.discountOnTotalType === 'fixed' ? this.discountOnTotal : (this.countTotal() * (this.discountOnTotal / 100)),
            grandTotal: this.countTotalAfterDiscount(),
            invoiceNumber: this.invoiceNumber
        };

        this.dialog.open(InvoicePreviewComponent, {
            width: '99vw',
            maxWidth: '99vw',
            height: '90vh',
            maxHeight: '90vh',
            data
        });
    }

    countTotal(): number {
        return this.selectedItems.reduce((def: number, data: any) => def += ((data.price * data.quantity) - (data.discountType ? ((data.discountType === 'fixed') ? data.discount : ((data.price * data.quantity) * (data.discount / 100))) : 0)) , 0);
    }

    countTotalAfterDiscount(): number {
        if ((this.discountOnTotalType === 'fixed') && (this.discountOnTotal > 0)) {
            return this.countTotal() - this.discountOnTotal;
        } else if ((this.discountOnTotalType === 'percentage') && (this.discountOnTotal > 0)) {
            return this.countTotal() - (this.countTotal() * (this.discountOnTotal / 100));
        } else {
            return this.countTotal();
        }
    }
}
