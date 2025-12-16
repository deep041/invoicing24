export interface Invoice {
    companyDetails: CompanyDetails;
    customerDetails: CustomerDetails;
    items: InvoiceItem[];
    invoiceNumber: string;
    invoiceDate: Date;
    discount?: number;
    discountType?: 'percentage' | 'fixed';
}

export interface CompanyDetails {
    name: string;
    contactNo: string;
    address: string;
    id: string;
}

export interface CustomerDetails {
    name: string;
    contactNo: string;
    address: string;
    id: string;
}

export interface InvoiceItem {
    name: string;
    price: number;
    quantity: number;
    discount?: number;
    discountType?: 'percentage' | 'fixed';
    id: string;
}