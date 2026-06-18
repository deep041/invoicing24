export interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface PaginatedData<T> {
    items: T[];
    pagination: PaginationMeta;
}
