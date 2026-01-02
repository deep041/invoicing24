import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../common/widgets/table/table.component";
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { AuthenticationRoutingModule } from "../../authentication/authentication-routing.module";
import { ApiService } from '../../common/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { InvoicePreviewComponent } from '../../common/components/invoice-preview/invoice-preview.component';

@Component({
    selector: 'app-invoices',
    imports: [TableComponent, ButtonComponent, AuthenticationRoutingModule],
    templateUrl: './invoices.component.html',
    styleUrl: './invoices.component.scss'
})

export class InvoicesComponent implements OnInit {

    headers = [{ label: 'Number', key: 'invoiceNumber' }, { label: 'Date', key: 'invoiceDate', isDate: true }, { label: 'Customer', key: 'customerName' }, { label: 'Total', key: 'grandTotal', align: 'right', isCurrency: true }, { label: 'View', key: 'view', align: 'right', isViewIcon: true }];
    invoices: any[] = [];

    constructor(private apiService: ApiService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.getInvoices();
    }

    getInvoices() {
        this.apiService.getInvoices().subscribe((res: any) => {
            if (res && res.success) {
                this.invoices = res.data;
            }
        });
    }

    viewInvoice(invoiceData: any) { 
        this.apiService.getInvoiceById(invoiceData._id).subscribe((res: any) => {
            if (res && res.success) {
                const invoiceDetails = res.data[0];
                let data = {
                    date: invoiceDetails.invoiceDate,
                    customerDetails: invoiceDetails.customerDetails,
                    companyDetails: invoiceDetails.companyDetails,
                    items: invoiceDetails.items,
                    invoiceTotal: invoiceDetails.total,
                    invoiceDiscountAmount: invoiceDetails.totalDiscountAmount,
                    grandTotal: invoiceDetails.grandTotal,
                    invoiceNumber: invoiceDetails.invoiceNumber
                };

                this.dialog.open(InvoicePreviewComponent, {
                    width: '99vw',
                    maxWidth: '99vw',
                    height: '90vh',
                    maxHeight: '90vh',
                    data
                });
            }
        });
    }
}
