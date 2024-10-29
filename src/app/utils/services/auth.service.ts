import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated: boolean = false;

  login() {
    this.authenticated = true;
  }

  logout() {
    this.authenticated = false;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  constructor(
    private loginService : LoginService
  ) {
    loginService.userSession().then((user) => {
      if(user){
        this.login();
      }
    });
  }
}
