import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './common/services/data.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ToastComponent } from "./common/widgets/toast/toast.component";
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, CommonModule, ToastComponent, AsyncPipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

    title = 'invoicing24';

    constructor(public dataService: DataService) {}

    ngOnInit(): void {
        if (environment.production) {
            this.loadGtm();
        }
    }

    private loadGtm(): void {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${environment.gtmId}`;
    
        document.head.appendChild(script);
    
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({
          event: 'gtm.js',
          'gtm.start': new Date().getTime()
        });
      }
}
