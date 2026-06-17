import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./navigation/navigation.component";

@Component({
    selector: 'app-dashboard',
    imports: [NavigationComponent, RouterOutlet, MatIconModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {

    sidebarOpen = signal(false);

    toggleSidebar(): void {
        this.sidebarOpen.update(open => !open);
    }

    closeSidebar(): void {
        this.sidebarOpen.set(false);
    }
}
