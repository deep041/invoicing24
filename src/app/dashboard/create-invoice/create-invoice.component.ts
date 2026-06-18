import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import data from '../../../assets/data.json';
import { InvoicePreviewComponent } from '../../common/components/invoice-preview/invoice-preview.component';
import { SelectCustomerComponent } from '../../common/components/select-customer/select-customer.component';
import { SelectItemsComponent } from '../../common/components/select-items/select-items.component';
import { CompanyDetails, CustomerDetails, Invoice, InvoiceItem } from '../../common/interfaces/invoice.interface';
import { CurrencyPipe } from '../../common/pipes/currency.pipe';
import { ApiService } from '../../common/services/api.service';
import { GstService, GstSummary } from '../../common/services/gst.service';
import { ToastService } from '../../common/services/toast.service';
import { ButtonComponent } from "../../common/widgets/button/button.component";
import { InputComponent } from "../../common/widgets/input/input.component";
import { SelectComponent } from "../../common/widgets/select/select.component";
import { TableComponent } from "../../common/widgets/table/table.component";

@Component({
  selector: 'app-create-invoice',
  imports: [CommonModule, TableComponent, ButtonComponent, SelectComponent, FormsModule, InputComponent, MatIconModule, CurrencyPipe],
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss'
})

export class CreateInvoiceComponent implements OnInit
{

  activeTab: 'customer' | 'items' | 'review' = 'customer';
  selectedCustomer: any;
  companyDetails: any;
  selectedItems: any[] = [];
  discountOptions = data.discountType;
  gstRateOptions = data.gstRates;
  discountOnTotalType: 'percentage' | 'fixed' = 'fixed';
  discountOnTotal: number = 0;
  invoiceNumber: number = 0;
  headers = [
    { label: 'Name', key: 'name', minWidth: '140px' },
    { label: 'HSN', key: 'hsnCode', minWidth: '72px' },
    { label: 'Price', key: 'price', align: 'right', isCurrency: true, minWidth: '80px' },
    { label: 'Qty', key: 'quantity', type: 'number', placeholder: 'Qty', isNumberInput: true, minWidth: '80px' },
    { label: 'Amount', key: 'amount', align: 'right', isMultiplication: true, calculationLeftSideKey: 'price', calculationRightSideKey: 'quantity', minWidth: '88px' },
    { label: 'Disc. Type', key: 'discountType', isSelect: true, options: data.discountType, minWidth: '120px' },
    { label: 'Disc.', key: 'discount', type: 'number', placeholder: 'Disc.', isNumberInput: true, minWidth: '80px' },
    { label: 'Disc. Amt', key: 'discountAmount', align: 'right', isDiscountAmount: true, minWidth: '88px' },
    { label: 'Net Amt', key: 'total', align: 'right', isInvoiceTotal: true, calculationLeftSideKey: 'price', calculationRightSideKey: 'quantity', minWidth: '88px' },
    { label: 'GST %', key: 'gstRate', isSelect: true, options: data.gstRates, minWidth: '88px' },
    { label: '', key: 'delete', align: 'right', isDelete: true, minWidth: '44px', width: '44px' }
  ];

  constructor(
    private dialog: MatDialog,
    private apiService: ApiService,
    private router: Router,
    private toastService: ToastService,
    private gstService: GstService
  ) { }

  ngOnInit(): void
  {
    this.getCompanyData();
    this.generateInvoiceNumber();
  }

  getCompanyData()
  {
    this.apiService.getCompanyDetails().subscribe((res: any) =>
    {
      if (res && res.success)
      {
        this.companyDetails = res.data;
      }
    });
  }

  generateInvoiceNumber()
  {
    this.apiService.generateInvoiceNumber().subscribe((res: any) =>
    {
      if (res && res.success)
      {
        this.invoiceNumber = res.data.invoiceNumber;
      }
    });
  }

  selectCustomer()
  {
    let dialogRef = this.dialog.open(SelectCustomerComponent, {
      width: '560px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      autoFocus: false,
      panelClass: 'picker-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result =>
    {
      if (result)
      {
        this.selectedCustomer = result;
        this.activeTab = 'items';
      }
    });
  }

  selectItems()
  {
    let dialogRef = this.dialog.open(SelectItemsComponent, {
      width: '560px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      autoFocus: false,
      panelClass: 'picker-dialog-panel',
      data: { selectedItems: this.selectedItems }
    });

    dialogRef.afterClosed().subscribe(result =>
    {
      if (result)
      {
        let filteredSelectedItems = result.filter((item: any) => item.isDisabled !== true);
        this.selectedItems.push(...filteredSelectedItems.map((data: any) => ({
          name: data.name,
          hsnCode: data.hsnCode,
          price: data.price,
          category: data.category,
          quantity: 0,
          discountType: 'fixed',
          discount: 0,
          gstRate: String(data.gstRate ?? 18),
          id: data._id
        })));
      }
    });
  }

  getGstSummary(): GstSummary
  {
    const items = this.selectedItems.map(item => ({
      netAmount: this.gstService.getItemNetAmount(item.price, item.quantity, item.discount ?? 0, item.discountType ?? 'fixed'),
      gstRate: Number(item.gstRate ?? 18)
    }));

    return this.gstService.calculate(
      items,
      this.getInvoiceDiscountAmount(),
      this.companyDetails?.stateCode,
      this.selectedCustomer?.stateCode
    );
  }

  buildInvoiceItems(): InvoiceItem[]
  {
    const gstSummary = this.getGstSummary();

    return this.selectedItems.map((item: any, index: number) =>
    {
      const amount = Number(item.price) * Number(item.quantity);
      const discountValue = (item.discountType === 'fixed')
        ? item.discount
        : (amount * (Number(item.discount) / 100));
      const netAmount = amount - discountValue;
      const gstLine = gstSummary.itemGst[index];

      return {
        name: item.name,
        hsnCode: item.hsnCode,
        price: item.price,
        quantity: item.quantity,
        discount: item.discount,
        discountType: item.discountType,
        discountValue,
        amount,
        netAmount,
        gstRate: Number(item.gstRate ?? 18),
        taxableAmount: gstLine.taxableAmount,
        gstAmount: gstLine.gstAmount,
        cgstAmount: gstLine.cgstAmount,
        sgstAmount: gstLine.sgstAmount,
        igstAmount: gstLine.igstAmount,
        id: item.id
      };
    });
  }

  generate()
  {
    const gstSummary = this.getGstSummary();
    const items = this.buildInvoiceItems();

    let companyDetails: CompanyDetails = {
      name: this.companyDetails.name,
      contactNo: this.companyDetails.contactNo,
      address: this.companyDetails.address,
      gstNo: this.companyDetails.gstNo,
      stateCode: this.companyDetails.stateCode,
      id: this.companyDetails._id
    };

    let customerDetails: CustomerDetails = {
      name: this.selectedCustomer.name,
      contactNo: this.selectedCustomer.contactNo,
      address: this.selectedCustomer.address,
      gstNo: this.selectedCustomer.gstNo,
      stateCode: this.selectedCustomer.stateCode,
      id: this.selectedCustomer._id
    };

    let payload: Invoice = {
      companyDetails,
      customerDetails,
      items,
      invoiceDate: new Date(),
      discount: this.discountOnTotal,
      discountType: this.discountOnTotalType,
      total: gstSummary.subtotal,
      grandTotal: gstSummary.grandTotal,
      totalDiscountAmount: gstSummary.invoiceDiscountAmount,
      taxableAmount: gstSummary.taxableAmount,
      cgstAmount: gstSummary.cgstAmount,
      sgstAmount: gstSummary.sgstAmount,
      igstAmount: gstSummary.igstAmount,
      totalGstAmount: gstSummary.totalGstAmount,
      isInterState: gstSummary.isInterState
    };

    this.apiService.createInvoice(payload).subscribe((res: any) =>
    {
      if (res && res.success)
      {
        this.toastService.show({ message: 'Invoice generated successfully!', type: 'success' });
        this.router.navigate(['invoices']);
      }
    });
  }

  preview()
  {
    const gstSummary = this.getGstSummary();

    let data = {
      date: new Date(),
      customerDetails: this.selectedCustomer,
      companyDetails: this.companyDetails,
      items: this.buildInvoiceItems(),
      invoiceTotal: gstSummary.subtotal,
      invoiceDiscountAmount: gstSummary.invoiceDiscountAmount,
      taxableAmount: gstSummary.taxableAmount,
      cgstAmount: gstSummary.cgstAmount,
      sgstAmount: gstSummary.sgstAmount,
      igstAmount: gstSummary.igstAmount,
      totalGstAmount: gstSummary.totalGstAmount,
      isInterState: gstSummary.isInterState,
      grandTotal: gstSummary.grandTotal,
      invoiceNumber: this.invoiceNumber
    };

    this.dialog.open(InvoicePreviewComponent, {
      width: '99vw',
      maxWidth: '99vw',
      height: '90vh',
      maxHeight: '90vh',
      data
    });
  }

  countTotal(): number
  {
    return this.getGstSummary().subtotal;
  }

  getInvoiceDiscountAmount(): number
  {
    const subtotal = this.selectedItems.reduce((def: number, data: any) =>
      def + this.gstService.getItemNetAmount(data.price, data.quantity, data.discount ?? 0, data.discountType ?? 'fixed'), 0);

    if ((this.discountOnTotalType === 'fixed') && (this.discountOnTotal > 0))
    {
      return this.discountOnTotal;
    }
    else if ((this.discountOnTotalType === 'percentage') && (this.discountOnTotal > 0))
    {
      return subtotal * (this.discountOnTotal / 100);
    }

    return 0;
  }

  countTotalAfterDiscount(): number
  {
    return this.getGstSummary().grandTotal;
  }

  deleteRow(rowData: any)
  {
    this.selectedItems.splice(rowData.index, 1);
  }

  generateButtonDisabled(): boolean
  {
    return !(this.selectedCustomer && this.selectedItems.length > 0 && this.selectedItems.every(item => item.quantity > 0));
  }

  get isReadyToGenerate(): boolean
  {
    return !this.generateButtonDisabled();
  }

  setTab(tab: 'customer' | 'items' | 'review'): void
  {
    if (this.canAccessTab(tab))
    {
      this.activeTab = tab;
    }
  }

  canAccessTab(tab: 'customer' | 'items' | 'review'): boolean
  {
    if (tab === 'customer') return true;
    if (tab === 'items') return !!this.selectedCustomer;
    if (tab === 'review') return !!this.selectedCustomer && this.selectedItems.length > 0;
    return false;
  }

  goNext(): void
  {
    if (this.activeTab === 'customer' && this.selectedCustomer)
    {
      this.activeTab = 'items';
    }
    else if (this.activeTab === 'items' && this.selectedItems.length > 0 && this.isReadyToGenerate)
    {
      this.activeTab = 'review';
    }
  }

  goBack(): void
  {
    if (this.activeTab === 'review')
    {
      this.activeTab = 'items';
    }
    else if (this.activeTab === 'items')
    {
      this.activeTab = 'customer';
    }
  }
}
