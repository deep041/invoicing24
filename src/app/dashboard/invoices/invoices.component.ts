import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../common/widgets/table/table.component";
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { AuthenticationRoutingModule } from "../../authentication/authentication-routing.module";
import { ApiService } from '../../common/services/api.service';

@Component({
    selector: 'app-invoices',
    imports: [TableComponent, ButtonComponent, AuthenticationRoutingModule],
    templateUrl: './invoices.component.html',
    styleUrl: './invoices.component.scss'
})

export class InvoicesComponent implements OnInit {

    headers = [{ label: 'Number', key: 'invoiceNumber' }, { label: 'Date', key: 'invoiceDate', isDate: true }, { label: 'Customer', key: 'customerName' }, { label: 'Total', key: 'grandTotal', align: 'right', isCurrency: true }];
    invoices: any[] = [];

    constructor(private apiService: ApiService) {}

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
}
