import { Routes } from '@angular/router';
import { LoginComponent } from './templates/login/login.component';
import { HomeComponent } from './templates/home/home.component';
import { authGuard } from './auth.guard';
import { DefaultComponent } from './templates/default/default.component';
import { EmployeesComponent } from './templates/employees/employees.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [authGuard],
    children: [
      {path: '',component: HomeComponent},
      {path: 'employees',component: EmployeesComponent}
    ]
  }
];
