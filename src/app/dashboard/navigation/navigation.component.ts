import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../common/services/data.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-navigation',
    imports: [RouterLink, MatIconModule],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})

export class NavigationComponent implements OnInit {

    constructor(private router: Router, public dataService: DataService) {}

    ngOnInit(): void {
        console.log(this.router.url);
    }

    navigate(route: string) {
        this.router.navigate([route]);
    }

    isActive(paths: string[]): boolean {
        return paths.some(p => this.router.url.startsWith(p));
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['authentication/login']);
    }
}
