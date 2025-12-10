import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { CustomersComponent } from './customers/customers.component';
import { ItemsComponent } from './items/items.component';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { InvoicePreviewComponent } from '../common/components/invoice-preview/invoice-preview.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardContentComponent },
        { path: 'invoices', component: InvoicesComponent },
        { path: 'create-invoice', component: CreateInvoiceComponent },
        { path: 'customers', component: CustomersComponent },
        { path: 'items', component: ItemsComponent },
        { path: 'invoice-preview', component: InvoicePreviewComponent },
        { path: 'company-details', component: CompanyDetailsComponent }
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
