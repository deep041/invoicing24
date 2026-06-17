import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemComponent } from '../../common/components/create-item/create-item.component';
import { ApiService } from '../../common/services/api.service';
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { TableComponent } from "../../common/widgets/table/table.component";
import { PaginationComponent } from '../../common/widgets/pagination/pagination.component';
import { PaginationMeta } from '../../common/interfaces/pagination.interface';

@Component({
  selector: 'app-items',
  imports: [TableComponent, ButtonComponent, CommonModule, PaginationComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})

export class ItemsComponent implements OnInit
{

  headers = [{ label: 'Name', key: 'name' }, { label: 'Status', key: 'status', isStatus: true }, { label: 'HSN Code', key: 'hsnCode' }, { label: 'Price', key: 'price', align: 'right', isCurrency: true }, { label: 'Edit', key: 'edit', isEdit: true, align: 'right' }];
  itemData: any[] = [];
  pageIndex = 0;
  pageSize = 10;
  totalItems = 0;

  constructor(private dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit(): void
  {
    this.getData();
  }

  getData(page = 1, limit = this.pageSize)
  {
    this.apiService.getItems({ page, limit }).subscribe((res: any) =>
    {
      if (res && res.success)
      {
        this.itemData = res.data.items;
        this.applyPagination(res.data.pagination);
      }
    });
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
