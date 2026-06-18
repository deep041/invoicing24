import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'app-web-site',
    imports: [MatIconModule, CommonModule],
    templateUrl: './web-site.component.html',
    styleUrl: './web-site.component.scss'
})
export class WebSiteComponent {

    isMenuOpen = false;

    constructor(private router: Router) {}

    redirect(url: string): void {
        this.isMenuOpen = false;
        this.router.navigate([url]);
    }

    scrollToSection(sectionId: string): void {
        this.isMenuOpen = false;
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
