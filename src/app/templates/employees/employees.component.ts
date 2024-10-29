import { Component } from '@angular/core';
import { EmployeeComponent } from "../components/employee/employee.component";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [EmployeeComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {

}
