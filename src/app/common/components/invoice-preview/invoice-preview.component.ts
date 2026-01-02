import { Component, Inject, Input, OnInit } from '@angular/core';
import { TableComponent } from "../../widgets/table/table.component";
import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ButtonComponent } from "../../widgets/button/button.component";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

declare var $: any;

@Component({
    selector: 'app-invoice-preview',
    imports: [TableComponent, MatDialogContent, MatDialogActions, ButtonComponent, CommonModule, MatIconModule],
    templateUrl: './invoice-preview.component.html',
    styleUrl: './invoice-preview.component.scss'
})

export class InvoicePreviewComponent implements OnInit {

    @Input() customerDetails: any;
    @Input() companyDetails: any;
    @Input() items: any;
    @Input() invoiceNumber: number = 0;
    @Input() date = new Date();

    subtotal: number = 0;
    headers = [{ label: 'Name', key: 'name' }, { label: 'Price', key: 'price', align: 'right', isCurrency: true }, { label: 'Quantity', key: 'quantity', align: 'right' }, { label: 'Amount', key: 'amount', align: 'right', isCurrency: true }, { label: 'Discount Amount', key: 'discountAmount', align: 'right', isDiscountAmount: true }, { label: 'Net Amount', key: 'total', align: 'right', isInvoiceTotal: true, calculationLeftSideKey: 'price', calculationRightSideKey: 'quantity' }];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<InvoicePreviewComponent>) {}

    ngOnInit(): void {
        if (this.data.customerDetails) {
            this.customerDetails = this.data.customerDetails;
        }

        if (this.data.companyDetails) {
            this.companyDetails = this.data.companyDetails;
        }

        if (this.data.invoiceNumber) {
            this.invoiceNumber = this.data.invoiceNumber;
        }
        
        if (this.data.date) {
            this.date = this.data.date;
        }

        if (this.data.items) {
            this.items = this.data.items.map((data: any) => {
                this.subtotal += data.quantity * data.price;
                return {
                    name: data.name, 
                    quantity: data.quantity, 
                    price: data.price,
                    amount: data.quantity * data.price,
                    discountType: data.discountType,
                    discount: data.discount
                }
            })
        }
    }

    print() {
        $('#print-section').printThis({
            importCSS: true,           // Copies linked CSS
            importStyle: true,         // Copies <style> tags
            loadCSS: "",               // You can also specify global CSS path
            canvas: true,              // Include canvas drawings if any
            copyTagClasses: true,      // Preserve element classes
            base: false,               // Keeps relative paths for images, etc.
            printDelay: 500,           // Delay before print
            removeInline: false,       // Keep inline styles
          });
    }

    close() {
        this.dialogRef.close();
    }

}
