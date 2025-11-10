import { Component } from '@angular/core';
import { TableComponent } from "../../common/widgets/table/table.component";
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { AuthenticationRoutingModule } from "../../authentication/authentication-routing.module";

@Component({
    selector: 'app-invoices',
    imports: [TableComponent, ButtonComponent, AuthenticationRoutingModule],
    templateUrl: './invoices.component.html',
    styleUrl: './invoices.component.scss'
})
export class InvoicesComponent {

    headers = [{ label: 'Number', key: 'number' }, { label: 'Date', key: 'date' }, { label: 'Customer', key: 'customer' }, { label: 'Total', key: 'total', align: 'right', isCurrency: true }]
}
