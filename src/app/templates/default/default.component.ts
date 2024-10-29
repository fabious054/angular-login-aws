import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginService } from '../../utils/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class DefaultComponent {
  moduleActive = "";
  userLogged : any = null;

  constructor(
    private route: ActivatedRoute,
    private loginService : LoginService,
    private router: Router
  ) {}

    ngOnInit(): void {
      this.route.url.subscribe(() => {
        // Use 'firstChild' para pegar a rota ativa
        const activeRoute = this.route.firstChild;
        this.moduleActive = activeRoute?.snapshot.routeConfig?.path || 'home';
      });
      this.userSession();
      console.log('Module active:', this.moduleActive);

    }

    async userSession() {
      try {
        const user = await this.loginService.userSession();
        console.log('User session:', user);
        if (user) {
          this.userLogged = user;
        }
      } catch (error) {
        console.error('Error fetching user session:', error);
        this.userLogged = null;
      }
    }

    async logout() {
      const logOutConfirm = await this.loginService.logout();
      if (logOutConfirm.status) {
        Swal.fire({
          text: logOutConfirm.message,icon: 'success',position: "top-end",showConfirmButton: false,timer: 2000
        });
        setTimeout(() => {
         this.router.navigate(['/login']);
        },2000);
      }
    }

    changeRouteModule(module: string) {
      this.moduleActive = module;
    }

}
