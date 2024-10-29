import { Component } from '@angular/core';
import { ChartComponent } from "../components/chart/chart.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

    constructor() {
    }

    ngOnInit(): void {
      console.log('Home');
    }

}
