import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateItemComponent } from '../../common/components/create-item/create-item.component';
import { ApiService } from '../../common/services/api.service';
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { TableComponent } from "../../common/widgets/table/table.component";

@Component({
  selector: 'app-items',
  imports: [TableComponent, ButtonComponent, CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})

export class ItemsComponent implements OnInit
{

  headers = [{ label: 'Name', key: 'name' }, { label: 'Status', key: 'status', isStatus: true }, { label: 'HSN Code', key: 'hsnCode' }, { label: 'Price', key: 'price', align: 'right', isCurrency: true }, { label: 'Edit', key: 'edit', isEdit: true, align: 'right' }];
  itemData: any[] = [];

  constructor(private dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit(): void
  {
    this.getData();
  }

  getData()
  {
    this.apiService.getItems().subscribe((res: any) =>
    {
      if (res && res.success)
      {
        this.itemData = res.data;
      }
    });
  }

  createItem(data: any = null)
  {
    let dialogRef = this.dialog.open(CreateItemComponent, { data });
    dialogRef.afterClosed().subscribe(result =>
    {
      if (result)
      {
        this.getData();
      }
    });
  }

}
