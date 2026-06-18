import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pricing',
    imports: [MatIconModule, CommonModule],
    templateUrl: './pricing.component.html',
    styleUrl: './pricing.component.scss'
})
export class PricingComponent {

    isMenuOpen = false;

    constructor(private router: Router) {}

    redirect(url: string): void {
        this.isMenuOpen = false;
        this.router.navigate([url]);
    }
}
