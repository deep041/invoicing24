import { Injectable } from '@angular/core';

export interface GstLineInput {
  netAmount: number;
  gstRate: number;
}

export interface GstLineResult {
  taxableAmount: number;
  gstAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
}

export interface GstSummary {
  subtotal: number;
  invoiceDiscountAmount: number;
  taxableAmount: number;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  totalGstAmount: number;
  grandTotal: number;
  isInterState: boolean;
  itemGst: GstLineResult[];
}

@Injectable({ providedIn: 'root' })
export class GstService
{
  calculate(
    items: GstLineInput[],
    invoiceDiscountAmount: number,
    companyStateCode?: string,
    customerStateCode?: string
  ): GstSummary
  {
    const subtotal = this.round(items.reduce((sum, item) => sum + item.netAmount, 0));
    const discount = this.round(Math.min(invoiceDiscountAmount, subtotal));
    const discountRatio = subtotal > 0 ? discount / subtotal : 0;
    const isInterState = !!(companyStateCode && customerStateCode && companyStateCode !== customerStateCode);

    const itemGst = items.map(item =>
    {
      const taxableAmount = this.round(item.netAmount * (1 - discountRatio));
      const gstAmount = this.round(taxableAmount * (Number(item.gstRate) || 0) / 100);

      if (isInterState)
      {
        return { taxableAmount, gstAmount, cgstAmount: 0, sgstAmount: 0, igstAmount: gstAmount };
      }

      const half = this.round(gstAmount / 2);
      return { taxableAmount, gstAmount, cgstAmount: half, sgstAmount: half, igstAmount: 0 };
    });

    const taxableAmount = this.round(itemGst.reduce((sum, line) => sum + line.taxableAmount, 0));
    const cgstAmount = this.round(itemGst.reduce((sum, line) => sum + line.cgstAmount, 0));
    const sgstAmount = this.round(itemGst.reduce((sum, line) => sum + line.sgstAmount, 0));
    const igstAmount = this.round(itemGst.reduce((sum, line) => sum + line.igstAmount, 0));
    const totalGstAmount = this.round(cgstAmount + sgstAmount + igstAmount);

    return {
      subtotal,
      invoiceDiscountAmount: discount,
      taxableAmount,
      cgstAmount,
      sgstAmount,
      igstAmount,
      totalGstAmount,
      grandTotal: this.round(subtotal - discount + totalGstAmount),
      isInterState,
      itemGst
    };
  }

  getItemNetAmount(price: number, quantity: number, discount: number, discountType: 'percentage' | 'fixed'): number
  {
    const amount = Number(price) * Number(quantity);
    const discountValue = discountType === 'fixed'
      ? Number(discount)
      : amount * (Number(discount) / 100);

    return this.round(amount - discountValue);
  }

  private round(value: number): number
  {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
