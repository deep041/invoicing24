import { Component, OnInit } from '@angular/core';
import { TableComponent } from "../../common/widgets/table/table.component";
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { MatDialog } from '@angular/material/dialog';
import { CreateItemComponent } from '../../common/components/create-item/create-item.component';
import { ApiService } from '../../common/services/api.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-items',
    imports: [TableComponent, ButtonComponent, CommonModule],
    templateUrl: './items.component.html',
    styleUrl: './items.component.scss'
})

export class ItemsComponent implements OnInit {

    headers = [{ label: 'Name', key: 'name' }, { label: 'Category', key: 'category' }, { label: 'Status', key: 'status' }, { label: 'Price', key: 'price', align: 'right', isCurrency: true }];
    itemData: any[] = [];

    constructor(private dialog: MatDialog, private apiService: ApiService) {}

    ngOnInit(): void {
        this.getData();
    }

    getData() {
        this.apiService.getItems().subscribe((res: any) => {
            if (res && res.success) {
                this.itemData = res.data;
            }
        })
    }

    createItem() {
        let dialogRef = this.dialog.open(CreateItemComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getData();
            }
        })
    }

}
