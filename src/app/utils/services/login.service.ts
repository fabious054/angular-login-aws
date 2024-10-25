import { Injectable } from '@angular/core';
import { Amplify } from 'aws-amplify'; // Importando Auth
import { signIn, signOut, confirmSignIn, confirmResetPassword, SignInOutput, updatePassword, ConfirmSignInOutput, ConfirmResetPasswordInput, fetchUserAttributes, FetchUserAttributesOutput } from 'aws-amplify/auth'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {
    Amplify.configure(
      {
        Auth:{Cognito:{
          userPoolId: 'sa-east-1_HZuFTcpkA',
          userPoolClientId: '7fmtumj3scmm5shsku3v6lqat8',
        }}
      }
    );
   }

   async login(email: string, password: string): Promise<boolean> {
    try {
      const user = await signIn({ username: email, password: password }) as SignInOutput;
      console.log('Login successful:', user);

      // Verifique se o usuário está usando uma senha temporária
      if (user.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        // Se você quiser definir uma nova senha, faça isso aqui
        await this.setNewPassword(user, password);
      }
      return true; // Retorna true se o login for bem-sucedido
    } catch (error) {
      console.error('Error signing in:', error);
      return false; // Retorna false se o login falhar
    }
  }

  private async setNewPassword(user: SignInOutput, password: string): Promise<void> {
    try {
      const output = await confirmSignIn({ challengeResponse: password });
      console.log('Password updated:', output);
     } catch (err) {
      console.error('Error confirming sign in:', err);
    }
  }
}
