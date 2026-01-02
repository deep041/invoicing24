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

    isMenuOpen: boolean = false;

    constructor(private router: Router) {}

    redirect(url: string) {
        this.router.navigate([url]);
    }
}
