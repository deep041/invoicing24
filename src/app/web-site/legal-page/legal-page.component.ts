import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

export type LegalPageType = 'privacy' | 'terms';

@Component({
    selector: 'app-legal-page',
    imports: [MatIconModule, CommonModule],
    templateUrl: './legal-page.component.html',
    styleUrl: './legal-page.component.scss'
})
export class LegalPageComponent {

    @Input({ required: true }) title!: string;
    @Input({ required: true }) lastUpdated!: string;
    @Input() activePage: LegalPageType | null = null;

    isMenuOpen = false;

    constructor(private router: Router) {}

    redirect(url: string): void {
        this.isMenuOpen = false;
        this.router.navigate([url]);
    }
}
