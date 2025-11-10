import { Component } from '@angular/core';
import { NavigationComponent } from "./navigation/navigation.component";
import { AuthenticationRoutingModule } from "../authentication/authentication-routing.module";

@Component({
  selector: 'app-dashboard',
  imports: [NavigationComponent, AuthenticationRoutingModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
