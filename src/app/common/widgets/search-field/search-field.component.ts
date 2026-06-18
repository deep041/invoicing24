import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-search-field',
    imports: [FormsModule, MatIconModule],
    templateUrl: './search-field.component.html',
    styleUrl: './search-field.component.scss'
})
export class SearchFieldComponent implements OnDestroy {

    @Input() placeholder = 'Search…';
    @Output() searchChange = new EventEmitter<string>();

    searchQuery = '';
    private debounceTimer?: ReturnType<typeof setTimeout>;

    onInput(): void {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.searchChange.emit(this.searchQuery.trim());
        }, 300);
    }

    clear(): void {
        clearTimeout(this.debounceTimer);
        this.searchQuery = '';
        this.searchChange.emit('');
    }

    ngOnDestroy(): void {
        clearTimeout(this.debounceTimer);
    }
}
