import { LoginService } from './utils/services/login.service';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './utils/services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const LoginServices = inject(LoginService);

  const user = await LoginServices.userSession();
  if (user) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
