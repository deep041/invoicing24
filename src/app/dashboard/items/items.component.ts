import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import data from '../../../assets/data.json';
import { CreateItemComponent } from '../../common/components/create-item/create-item.component';
import { ApiService } from '../../common/services/api.service';
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { TableComponent } from "../../common/widgets/table/table.component";
import { PaginationComponent } from '../../common/widgets/pagination/pagination.component';
import { PaginationMeta } from '../../common/interfaces/pagination.interface';
import { SearchFieldComponent } from '../../common/widgets/search-field/search-field.component';
import { SelectComponent, SelectOption } from '../../common/widgets/select/select.component';

@Component({
  selector: 'app-items',
  imports: [TableComponent, ButtonComponent, CommonModule, FormsModule, PaginationComponent, SearchFieldComponent, SelectComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})

export class ItemsComponent implements OnInit
{

  headers = [{ label: 'Name', key: 'name' }, { label: 'Status', key: 'status', isStatus: true }, { label: 'HSN Code', key: 'hsnCode' }, { label: 'Unit', key: 'unitLabel' }, { label: 'GST %', key: 'gstRate', align: 'right' }, { label: 'Price', key: 'price', align: 'right', isCurrency: true }, { label: 'Edit', key: 'edit', isEdit: true, align: 'right' }];
  private unitLabels = new Map(data.units.map((unit) => [unit.value, unit.label]));
  itemData: any[] = [];
  pageIndex = 0;
  pageSize = 10;
  totalItems = 0;
  searchQuery = '';
  statusFilter = '';
  statusOptions: SelectOption[] = [
    { label: 'All statuses', value: '' },
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' }
  ];

  constructor(private dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit(): void
  {
    this.getData();
  }

  getData(page = 1, limit = this.pageSize)
  {
    this.apiService.getItems({
      page,
      limit,
      search: this.searchQuery,
      status: this.statusFilter
    }).subscribe((res: any) =>
    {
      if (res && res.success)
      {
        this.itemData = res.data.items.map((item: any) => ({
          ...item,
          unitLabel: this.unitLabels.get(item.unit ?? item.measurement) ?? item.unit ?? item.measurement ?? 'Nos'
        }));
        this.applyPagination(res.data.pagination);
      }
    });
  }

  onSearchChange(search: string)
  {
    this.searchQuery = search;
    this.getData(1, this.pageSize);
  }

  onStatusChange(status: string)
  {
    this.statusFilter = status;
    this.getData(1, this.pageSize);
  }

  onPageChange(event: { page: number; limit: number })
  {
    this.getData(event.page, event.limit);
  }

  private applyPagination(pagination: PaginationMeta)
  {
    this.pageIndex = pagination.page - 1;
    this.pageSize = pagination.limit;
    this.totalItems = pagination.total;
  }

  createItem(data: any = null)
  {
    let dialogRef = this.dialog.open(CreateItemComponent, { data });
    dialogRef.afterClosed().subscribe(result =>
    {
      if (result)
      {
        this.getData(this.pageIndex + 1, this.pageSize);
      }
    });
  }

}
