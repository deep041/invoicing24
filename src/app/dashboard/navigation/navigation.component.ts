import { Component, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataService } from '../../common/services/data.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-navigation',
    imports: [RouterLink, MatIconModule],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})

export class NavigationComponent {

    navItemClick = output<void>();

    constructor(private router: Router, public dataService: DataService) {}

    onNavClick(): void {
        this.navItemClick.emit();
    }

    isActive(paths: string[]): boolean {
        return paths.some(p => this.router.url.startsWith(p));
    }

    logout(): void {
        localStorage.clear();
        this.router.navigate(['authentication/login']);
    }
}
