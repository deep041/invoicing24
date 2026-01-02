import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../widgets/table/table.component";
import { MatDialogContent, MatDialogActions, MatDialogRef } from "@angular/material/dialog";
import { ButtonComponent } from "../../widgets/button/button.component";
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-select-items',
    imports: [TableComponent, MatDialogContent, MatDialogActions, ButtonComponent, CommonModule],
    templateUrl: './select-items.component.html',
    styleUrl: './select-items.component.scss'
})

export class SelectItemsComponent implements OnInit {

    selectedItems: any;
    headers = [{ label: 'Checkbox', key: 'checkbox' }, { label: 'Name', key: 'name' }, { label: 'Price', key: 'price', align: 'right', isCurrency: true }];
    items: any[] = [];

    constructor(public dialogRef: MatDialogRef<SelectItemsComponent>, private apiService: ApiService) { }

    ngOnInit(): void {
        this.getItems();
    }

    getItems() {
        this.apiService.getItems().subscribe((res: any) => {
            if (res && res.success) {
                this.items = res.data;
            }
        })
    }

    selectItems($event: any) {
        console.log($event);
        this.selectedItems = $event;
    }

    select() {
        this.dialogRef.close(this.selectedItems);
    }
}
