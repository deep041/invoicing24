import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import 'chart.js/auto';

@Component({
    selector: 'app-dashboard-content',
    imports: [MatIconModule, BaseChartDirective],
    templateUrl: './dashboard-content.component.html',
    styleUrl: './dashboard-content.component.scss'
})

export class DashboardContentComponent {

    public barChartType: ChartType = 'bar';

    public barChartData: ChartConfiguration['data'] = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
            { data: [65, 59, 80, 81], label: 'Sales' }
        ]
    };

    public barChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false
    };

}
