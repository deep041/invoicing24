export interface Invoice {
    companyDetails: CompanyDetails;
    customerDetails: CustomerDetails;
    items: InvoiceItem[];
    invoiceNumber?: string;
    invoiceDate: Date;
    discount?: number;
    discountType?: 'percentage' | 'fixed';
    total: number;
    grandTotal: number;
    totalDiscountAmount?: number;
    taxableAmount?: number;
    cgstAmount?: number;
    sgstAmount?: number;
    igstAmount?: number;
    totalGstAmount?: number;
    isInterState?: boolean;
}

export interface CompanyDetails {
    name: string;
    contactNo: string;
    address: string;
    id: string;
    gstNo?: string;
    stateCode?: string;
}

export interface CustomerDetails {
    name: string;
    contactNo: string;
    address: string;
    id: string;
    gstNo?: string;
    stateCode?: string;
}

export interface InvoiceItem {
    name: string;
    hsnCode?: string;
    price: number;
    quantity: number;
    discount?: number;
    discountType?: 'percentage' | 'fixed';
    discountValue?: number;
    amount: number;
    netAmount: number;
    gstRate?: number;
    taxableAmount?: number;
    gstAmount?: number;
    cgstAmount?: number;
    sgstAmount?: number;
    igstAmount?: number;
    id: string;
}
