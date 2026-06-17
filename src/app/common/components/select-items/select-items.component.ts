import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { ApiService } from '../../services/api.service';
import { ButtonComponent } from "../../widgets/button/button.component";
import { TableComponent } from "../../widgets/table/table.component";

@Component({
  selector: 'app-select-items',
  imports: [TableComponent, MatDialogContent, MatDialogActions, ButtonComponent, CommonModule],
  templateUrl: './select-items.component.html',
  styleUrl: './select-items.component.scss'
})

export class SelectItemsComponent implements OnInit
{

  selectedItems: any;
  headers = [{ label: 'Checkbox', key: 'checkbox' }, { label: 'Name', key: 'name' }, { label: 'HSN Code', key: 'hsnCode' }, { label: 'Price', key: 'price', align: 'right', isCurrency: true }];
  items: any[] = [];

  constructor(public dialogRef: MatDialogRef<SelectItemsComponent>, private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void
  {
    this.getItems();
  }

  getItems()
  {
    this.apiService.getItems().subscribe((res: any) =>
    {
      if (res && res.success)
      {
        this.items = res.data;

        this.data?.selectedItems?.forEach((selectedItem: any) =>
        {
          const index = this.items.findIndex(item => item._id === selectedItem.id);
          if (index !== -1)
          {
            this.items[index].checkbox = true;
            this.items[index].isDisabled = true;
          }
        });
      }
    });
  }

  selectItems($event: any)
  {
    console.log($event);
    this.selectedItems = $event;
  }

  select()
  {
    this.dialogRef.close(this.selectedItems);
  }
}
