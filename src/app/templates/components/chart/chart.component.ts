import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartDataset, ChartOptions, ChartType, registerables } from 'chart.js';

// Registrar todos os controladores, elementos e plugins do Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective], // Certifique-se de que está importando isso
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril'];
  public barChartType: ChartType = 'bar'; // Tipo de gráfico
  public barChartData: ChartDataset[] = [
    { data: [65, 59, 80, 81], label: 'Vendas 2024' },
    { data: [28, 48, 40, 19], label: 'Vendas 2023' },
  ];
}
