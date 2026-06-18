import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { PaginationComponent } from '../../widgets/pagination/pagination.component';
import { PaginationMeta } from '../../interfaces/pagination.interface';
import { ButtonComponent } from '../../widgets/button/button.component';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';

@Component({
  selector: 'app-select-customer',
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIconModule,
    PaginationComponent,
    ButtonComponent
  ],
  templateUrl: './select-customer.component.html',
  styleUrl: './select-customer.component.scss'
})
export class SelectCustomerComponent implements OnInit {

  customerData: any[] = [];
  searchQuery = '';
  pageIndex = 0;
  pageSize = 10;
  totalItems = 0;
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<SelectCustomerComponent>,
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  get filteredCustomers(): any[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      return this.customerData;
    }

    return this.customerData.filter((customer) =>
      customer.name?.toLowerCase().includes(query) ||
      customer.contactNo?.toLowerCase().includes(query) ||
      customer.address?.toLowerCase().includes(query) ||
      customer.gstNo?.toLowerCase().includes(query)
    );
  }

  getCustomers(page = 1, limit = this.pageSize) {
    this.isLoading = true;
    this.apiService.getCustomers({ page, limit }).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.customerData = res.data.items;
          this.applyPagination(res.data.pagination);
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: { page: number; limit: number }) {
    this.searchQuery = '';
    this.getCustomers(event.page, event.limit);
  }

  createCustomer() {
    const dialogRef = this.dialog.open(CreateCustomerComponent, {
      width: '520px',
      maxWidth: '95vw'
    });

    dialogRef.afterClosed().subscribe((created) => {
      if (created) {
        this.getCustomers(this.pageIndex + 1, this.pageSize);
      }
    });
  }

  selectCustomer(customer: any) {
    if (customer) {
      this.dialogRef.close(customer);
    }
  }

  close() {
    this.dialogRef.close();
  }

  private applyPagination(pagination: PaginationMeta) {
    this.pageIndex = pagination.page - 1;
    this.pageSize = pagination.limit;
    this.totalItems = pagination.total;
  }
}
