import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './common/services/data.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ToastComponent } from "./common/widgets/toast/toast.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CommonModule, ToastComponent, AsyncPipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent {

    constructor(public dataService: DataService) {}

    title = 'invoicing';
}
