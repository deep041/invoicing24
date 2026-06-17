import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from '../../services/api.service';
import { ButtonComponent } from "../../widgets/button/button.component";
import { TableComponent } from "../../widgets/table/table.component";
import { PaginationComponent } from '../../widgets/pagination/pagination.component';
import { PaginationMeta } from '../../interfaces/pagination.interface';

@Component({
  selector: 'app-select-items',
  imports: [TableComponent, MatDialogContent, MatDialogActions, ButtonComponent, CommonModule, PaginationComponent],
  templateUrl: './select-items.component.html',
  styleUrl: './select-items.component.scss'
})

export class SelectItemsComponent implements OnInit
{

  headers = [{ label: 'Checkbox', key: 'checkbox' }, { label: 'Name', key: 'name' }, { label: 'HSN Code', key: 'hsnCode' }, { label: 'Price', key: 'price', align: 'right', isCurrency: true }];
  items: any[] = [];
  pageIndex = 0;
  pageSize = 10;
  totalItems = 0;
  private selectedItemsMap = new Map<string, any>();

  constructor(public dialogRef: MatDialogRef<SelectItemsComponent>, private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void
  {
    this.initializeSelectedItems();
    this.getItems();
  }

  getItems(page = 1, limit = this.pageSize)
  {
    this.apiService.getItems({ page, limit }).subscribe((res: any) =>
    {
      if (res && res.success)
      {
        this.items = res.data.items.map((item: any) => this.applySelectionState(item));
        this.applyPagination(res.data.pagination);
      }
    });
  }

  onPageChange(event: { page: number; limit: number })
  {
    this.getItems(event.page, event.limit);
  }

  selectItems($event: any)
  {
    $event.forEach((item: any) =>
    {
      if (item.isDisabled)
      {
        return;
      }

      if (item.checkbox)
      {
        this.selectedItemsMap.set(item._id, item);
      }
      else
      {
        this.selectedItemsMap.delete(item._id);
      }
    });
  }

  select()
  {
    this.dialogRef.close(Array.from(this.selectedItemsMap.values()));
  }

  private initializeSelectedItems()
  {
    this.data?.selectedItems?.forEach((selectedItem: any) =>
    {
      const id = selectedItem.id || selectedItem._id;
      if (id)
      {
        this.selectedItemsMap.set(id, {
          ...selectedItem,
          _id: id,
          checkbox: true,
          isDisabled: true
        });
      }
    });
  }

  private applySelectionState(item: any)
  {
    const selectedItem = this.selectedItemsMap.get(item._id);

    if (selectedItem)
    {
      return {
        ...item,
        checkbox: true,
        isDisabled: selectedItem.isDisabled === true
      };
    }

    return item;
  }

  private applyPagination(pagination: PaginationMeta)
  {
    this.pageIndex = pagination.page - 1;
    this.pageSize = pagination.limit;
    this.totalItems = pagination.total;
  }
}
