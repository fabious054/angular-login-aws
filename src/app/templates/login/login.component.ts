import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import qrcode from 'qrcode';

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

      const loginFnc = await this.loginService.login(form.value.email, form.value.password);

      if(loginFnc.status){
        Swal.fire({
          text: 'Login successful',icon: 'success',position: "top-end",showConfirmButton: false,timer: 2000
        });

        this.authService.login();

        setTimeout(() => {
          this.router.navigate(['']);
        }, 2000);
      }else{

        if(loginFnc.aws_message === 'CONFIRM_SIGN_IN_WITH_TOTP_CODE'){
          this.promptForTOTPCode();
        }

        if(loginFnc.aws_message === 'CONTINUE_SIGN_IN_WITH_TOTP_SETUP'){
          const linkQrCode = loginFnc.link as string;

          try{
            const qrCodeUrl = await qrcode.toDataURL(linkQrCode);
            Swal.fire({
              title: "MFA",
              text: "Please scan the QR code with your authenticator app",
              imageUrl: qrCodeUrl,
              imageWidth: 300,
              imageHeight: 300,
              imageAlt: "QRcode"
            }).then(() => {
              this.promptForTOTPCode();
            });
          } catch (error) {
            console.error('Error generating QR code:', error);
          }
        }
      }
    }
  }


  async promptForTOTPCode() {

    const { value: totpCode } = await Swal.fire({
      title: 'Enter TOTP Code',
      input: 'text',
      inputPlaceholder: 'Enter your TOTP code',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter a code!';
        }

        return false;
      }
    });

    if (totpCode) {
      console.log('TOTP code:', totpCode);
      await this.validateTOTPCode(totpCode);
    }
  }

  async validateTOTPCode(totpCode: string): Promise<void> {
    try {
      const result = await this.loginService.validateTOTP(totpCode);

      if (result.status) {
        Swal.fire({
          text: 'TOTP confirmed',icon: 'success',position: "top-end",showConfirmButton: false,timer: 2000
        });

        this.authService.login();

        setTimeout(() => {
          this.router.navigate(['']);
        }, 2000);
      } else {
        Swal.fire({
          text: 'TOTP validation failed',icon: 'error',position: "top-end",showConfirmButton: false,timer: 2000
        });
      }

    } catch (error) {
      console.error('Error validating TOTP:', error);
    }

  }

}
