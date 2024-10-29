import { Component } from '@angular/core';
import { EmployeeComponent } from "../components/employee/employee.component";
import { CommonModule } from '@angular/common'; // Importando o CommonModule

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [EmployeeComponent,CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  employes = [
    {name: "Fabio", email:"fabio@gmail.com",cpf:"123.456.789-12",worktime:"10 years",position:"Developer"},
    {name: "Joao", email:"joao@gmail.com",cpf:"123.456.789-12",worktime:"5 years",position:"Developer"},
    {name: "Amanda", email:"amanda@gmail.com",cpf:"123.456.789-12",worktime:"11 years",position:"Engineer"},
    {name: "Marcos", email:"marcos@gmail.com",cpf:"123.456.789-12",worktime:"22 years",position:"CEO"},
    {name: "Maria", email:"maria@gmail.com",cpf:"123.456.789-12",worktime:"2 years",position:"Recruiter"},
    {name: "Antonia", email:"antonia@gmail.com",cpf:"123.456.789-12",worktime:"7 years",position:"Designer"},
  ]
  constructor() {}

  ngOnInit(): void {
    console.log('Employees component loaded');
  }

}
