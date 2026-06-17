import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '../../pipes/currency.pipe';
import { ButtonComponent } from "../../widgets/button/button.component";
import { TableComponent } from "../../widgets/table/table.component";

declare var $: any;

@Component({
  selector: 'app-invoice-preview',
  imports: [TableComponent, MatDialogContent, ButtonComponent, CommonModule, MatIconModule, CurrencyPipe],
  templateUrl: './invoice-preview.component.html',
  styleUrl: './invoice-preview.component.scss'
})

export class InvoicePreviewComponent implements OnInit
{

  @Input() customerDetails: any;
  @Input() companyDetails: any;
  @Input() items: any;
  @Input() invoiceNumber: number = 0;
  @Input() date = new Date();

  subtotal: number = 0;
  headers = [
    { label: 'Item', key: 'name', minWidth: '140px' },
    { label: 'HSN', key: 'hsnCode', minWidth: '72px' },
    { label: 'Price', key: 'price', align: 'right', isCurrency: true, minWidth: '80px' },
    { label: 'Qty', key: 'quantity', align: 'right', minWidth: '56px' },
    { label: 'Amount', key: 'amount', align: 'right', isCurrency: true, minWidth: '88px' },
    { label: 'Disc. Amt', key: 'discountAmount', align: 'right', isDiscountAmount: true, minWidth: '88px' },
    { label: 'Net Amt', key: 'total', align: 'right', isInvoiceTotal: true, calculationLeftSideKey: 'price', calculationRightSideKey: 'quantity', minWidth: '88px' }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<InvoicePreviewComponent>) { }

  ngOnInit(): void
  {
    if (this.data.customerDetails)
    {
      this.customerDetails = this.data.customerDetails;
    }

    if (this.data.companyDetails)
    {
      this.companyDetails = this.data.companyDetails;
    }

    if (this.data.invoiceNumber)
    {
      this.invoiceNumber = this.data.invoiceNumber;
    }

    if (this.data.date)
    {
      this.date = this.data.date;
    }

    if (this.data.items)
    {
      this.items = this.data.items.map((item: any) =>
      {
        const amount = Number(item.quantity) * Number(item.price);
        this.subtotal += amount;
        return {
          name: item.name,
          hsnCode: item.hsnCode,
          quantity: item.quantity,
          price: item.price,
          amount: item.amount ?? amount,
          discountType: item.discountType,
          discount: item.discount ?? 0
        };
      });
    }
  }

  print()
  {
    const printSection = document.getElementById('print-section');
    const viewport = printSection?.closest('.invoice-document-viewport') as HTMLElement | null;

    if (viewport)
    {
      viewport.scrollTop = 0;
    }

    $('#print-section').printThis({
      importCSS: true,
      importStyle: true,
      canvas: true,
      copyTagClasses: false,
      base: false,
      printDelay: 800,
      removeInline: false,
      beforePrint: () =>
      {
        if (viewport)
        {
          viewport.scrollTop = 0;
        }
      }
    });
  }

  close()
  {
    this.dialogRef.close();
  }

}
