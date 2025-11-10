import { Component, Inject, Input, OnInit } from '@angular/core';
import { TableComponent } from "../../widgets/table/table.component";
import { DataService } from '../../services/data.service';
import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ButtonComponent } from "../../widgets/button/button.component";
import { CurrencyPipe, DatePipe, NgIf } from '@angular/common';

declare var $: any;

@Component({
    selector: 'app-invoice-preview',
    imports: [TableComponent, MatDialogContent, MatDialogActions, ButtonComponent, DatePipe, NgIf, CurrencyPipe],
    templateUrl: './invoice-preview.component.html',
    styleUrl: './invoice-preview.component.scss'
})

export class InvoicePreviewComponent implements OnInit {

    @Input() customerDetails: any;
    @Input() items: any;
    @Input() date = new Date();

    subtotal: number = 0;
    headers = [{ label: 'Name', key: 'name' }, { label: 'Qty', key: 'qty', align: 'right' }, { label: 'Price', key: 'price', align: 'right', isCurrency: true }, { label: 'Total', key: 'total', align: 'right', isCurrency: true }];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<InvoicePreviewComponent>) {}

    ngOnInit(): void {
        if (this.data.customerDetails) {
            this.customerDetails = this.data.customerDetails;
        }

        if (this.data.date) {
            this.date = this.data.date;
        }

        if (this.data.items) {
            this.items = this.data.items.map((data: any) => {
                this.subtotal += data.quantity * data.price;
                return {
                    name: data.name, 
                    qty: data.quantity, 
                    price: data.price,
                    total: data.quantity * data.price
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
