import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-pagination',
    imports: [MatPaginatorModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

    @Input() pageIndex = 0;
    @Input() pageSize = 10;
    @Input() totalItems = 0;
    @Input() pageSizeOptions: number[] = [5, 10, 25, 50];

    @Output() pageChange = new EventEmitter<{ page: number; limit: number }>();

    onPageChange(event: PageEvent): void {
        this.pageChange.emit({
            page: event.pageIndex + 1,
            limit: event.pageSize
        });
    }
}
