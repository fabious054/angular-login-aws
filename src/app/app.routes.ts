import { Routes } from '@angular/router';
import { LoginComponent } from './templates/login/login.component';
import { HomeComponent } from './templates/home/home.component';
import { authGuard } from './auth.guard';
import { DefaultComponent } from './templates/default/default.component';

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
      {
        path: '',
        component: HomeComponent
      }
    ]
  }
];
