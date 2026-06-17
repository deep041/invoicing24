import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartConfiguration, ChartType } from 'chart.js';
import 'chart.js/auto';
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyPipe } from '../../common/pipes/currency.pipe';
import { ApiService } from '../../common/services/api.service';
import { DataService } from '../../common/services/data.service';
import { Dashboard } from '../dashboard.interface';

@Component({
  selector: 'app-dashboard-content',
  imports: [MatIconModule, BaseChartDirective, CurrencyPipe],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.scss'
})

export class DashboardContentComponent implements OnInit
{

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public barChartType: ChartType = 'bar';

  public barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      { data: [], label: 'Sales' }
    ]
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false
  };

  dashboardData: Dashboard = {
    customerCount: 0,
    invoiceCount: 0,
    itemCount: 0,
    totalSales: 0
  };

  constructor(private apiService: ApiService, private dateService: DataService) { }

  ngOnInit(): void
  {
    this.getDashboardData();
  }

  getDashboardData()
  {
    this.apiService.getDashboardData().subscribe((res: any) =>
    {
      console.log('res :', res);
      if (res && res.success)
      {
        this.dashboardData = res.data;

        this.barChartData.labels = res.data.salesPerMonth.map((data: any) => this.dateService.getMonthName(data.month, true) + ' - ' + data.year);
        this.barChartData.datasets[0].data = res.data.salesPerMonth.map((data: any) => data.totalSales);
        this.chart?.update();
      }
    });
  }

}
