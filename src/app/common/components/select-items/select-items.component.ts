import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../services/api.service';
import { ButtonComponent } from '../../widgets/button/button.component';
import { PaginationComponent } from '../../widgets/pagination/pagination.component';
import { PaginationMeta } from '../../interfaces/pagination.interface';
import { CurrencyPipe } from '../../pipes/currency.pipe';

@Component({
  selector: 'app-select-items',
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatIconModule,
    ButtonComponent,
    PaginationComponent,
    CurrencyPipe
  ],
  templateUrl: './select-items.component.html',
  styleUrl: './select-items.component.scss'
})
export class SelectItemsComponent implements OnInit {

  items: any[] = [];
  searchQuery = '';
  pageIndex = 0;
  pageSize = 10;
  totalItems = 0;
  isLoading = false;
  private selectedItemsMap = new Map<string, any>();

  constructor(
    public dialogRef: MatDialogRef<SelectItemsComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initializeSelectedItems();
    this.getItems();
  }

  get filteredItems(): any[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
      return this.items;
    }

    return this.items.filter((item) =>
      item.name?.toLowerCase().includes(query) ||
      item.hsnCode?.toLowerCase().includes(query)
    );
  }

  get newSelectionCount(): number {
    return Array.from(this.selectedItemsMap.values()).filter((item) => !item.isDisabled).length;
  }

  getItems(page = 1, limit = this.pageSize) {
    this.isLoading = true;
    this.apiService.getItems({ page, limit }).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.items = res.data.items.map((item: any) => this.applySelectionState(item));
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
    this.getItems(event.page, event.limit);
  }

  onItemToggle(item: any) {
    if (item.isDisabled) {
      return;
    }

    if (item.checkbox) {
      this.selectedItemsMap.set(item._id, item);
    } else {
      this.selectedItemsMap.delete(item._id);
    }
  }

  select() {
    this.dialogRef.close(Array.from(this.selectedItemsMap.values()));
  }

  close() {
    this.dialogRef.close();
  }

  private initializeSelectedItems() {
    this.data?.selectedItems?.forEach((selectedItem: any) => {
      const id = selectedItem.id || selectedItem._id;
      if (id) {
        this.selectedItemsMap.set(id, {
          ...selectedItem,
          _id: id,
          checkbox: true,
          isDisabled: true
        });
      }
    });
  }

  private applySelectionState(item: any) {
    const selectedItem = this.selectedItemsMap.get(item._id);

    if (selectedItem) {
      return {
        ...item,
        checkbox: true,
        isDisabled: selectedItem.isDisabled === true
      };
    }

    return { ...item, checkbox: false };
  }

  private applyPagination(pagination: PaginationMeta) {
    this.pageIndex = pagination.page - 1;
    this.pageSize = pagination.limit;
    this.totalItems = pagination.total;
  }
}
