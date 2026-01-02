import { CommonModule, CurrencyPipe, JsonPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from "../input/input.component";
import { RadioComponent } from "../radio/radio.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-table',
    imports: [CommonModule, FormsModule, InputComponent, CurrencyPipe, RadioComponent, MatIconModule],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})

export class TableComponent implements OnInit {

    @Input() headers: any[] = [];
    @Input() data: any[] = [];

    @Output() selectedData = new EventEmitter();
    @Output() selectedItems = new EventEmitter();
    @Output() edit = new EventEmitter();
    @Output() view = new EventEmitter();

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
