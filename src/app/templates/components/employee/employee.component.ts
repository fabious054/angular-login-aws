import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  @Input() employee: {name: string, email: string, cpf: string, worktime: string, position: string} = {name: '', email: '', cpf: '', worktime: '', position: ''};

}
