import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from "./navigation/navigation.component";
import { AuthenticationRoutingModule } from "../authentication/authentication-routing.module";
import { ApiService } from '../common/services/api.service';
import { Dashboard } from './dashboard.interface';

@Component({
    selector: 'app-dashboard',
    imports: [NavigationComponent, AuthenticationRoutingModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {

    constructor() {}

    ngOnInit(): void {
    }

    

}
