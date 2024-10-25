import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';
import { LoginService } from '../../utils/services/login.service';
import { Router } from '@angular/router';
import { AuthService } from '../../utils/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  emailDf: string = 'admin@gmail.com';
  passwordDf: string = 'testandoAws!1';

  constructor(
    private loginService : LoginService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log('LoginComponent initialized');
  }

  async login(form: any) {
    if(!form.valid){
      Swal.fire({
        text: 'Please fill in all fields',icon: 'error',position: "top-end",showConfirmButton: false,
      });
    }else{
      if(await this.loginService.login(form.value.email, form.value.password)){
        Swal.fire({
          text: 'Login successful',icon: 'success',position: "top-end",showConfirmButton: false,timer: 2000
        });

        this.authService.login();

        setTimeout(() => {
          this.router.navigate(['home']);
        }, 2000);

      }else{
        Swal.fire({
          text: 'Invalid credentials',icon: 'error',position: "top-end",showConfirmButton: false,
        });
      }
    }
  }

}
