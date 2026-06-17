import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { InputComponent } from "../input/input.component";
import { SelectComponent } from "../select/select.component";

@Component({
  selector: 'app-table',
  imports: [CommonModule, FormsModule, InputComponent, CurrencyPipe, SelectComponent, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})

export class TableComponent implements OnInit, OnChanges
{

  @Input() headers: any[] = [];
  @Input() data: any[] = [];
  @Input() compact = false;

  @Output() selectedData = new EventEmitter();
  @Output() selectedItems = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() view = new EventEmitter();
  @Output() deleteRow = new EventEmitter();

  keys: string[] = [];

  constructor() { }

  ngOnInit(): void
  {
    console.log('table data :', this.data);
    if (this.data.length > 0)
    {
      this.keys = Object.keys(this.data[0]);
    }
  }

  ngOnChanges(changes: SimpleChanges): void
  {
    if (changes['data'])
    {
      console.log('table data :', this.data);
      // this.data = this.data;
    }
  }

  rowSelected(data: any)
  {
    this.selectedData.emit(data);
  }

  itemSelected()
  {
    let selectedData = JSON.parse(JSON.stringify(this.data.filter((data: any) => data.checkbox)));
    this.selectedItems.emit(selectedData);
  }
}
