import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from "../input/input.component";

@Component({
    selector: 'app-table',
    imports: [CommonModule, FormsModule, InputComponent, CurrencyPipe],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})

export class TableComponent implements OnInit {

    @Input() headers: any[] = [];
    @Input() data: any[] = [];

    @Output() selectedData = new EventEmitter();
    @Output() selectedItems = new EventEmitter();

    keys: string[] = [];

    constructor() {}

    ngOnInit(): void {
        if (this.data.length > 0) {
            this.keys = Object.keys(this.data[0]);
        }
    }

    rowSelected(data: any) {
        this.selectedData.emit(data);
    }

    itemSelected() {
        let selectedData = JSON.parse(JSON.stringify(this.data.filter((data: any) => data.checkbox)));
        this.selectedItems.emit(selectedData);
    }
}
