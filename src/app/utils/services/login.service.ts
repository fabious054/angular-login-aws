import { Injectable } from '@angular/core';
import { Amplify } from 'aws-amplify'; // Importando Auth
import { signIn, signOut, confirmSignIn, SignInOutput,fetchUserAttributes } from 'aws-amplify/auth'

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

   async login(email: string, password: string): Promise<{status: boolean , message: string , aws_message: string,link?:string}> {
    try {
      const user = await signIn({ username: email, password: password }) as SignInOutput;
      console.log('Login successful:', user);

      if (user.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        await this.setNewPassword(user, password);
      }

      if (user.nextStep.signInStep === "CONTINUE_SIGN_IN_WITH_TOTP_SETUP") {
        const appName = 'Login-logic';
        const accoutName = email;
        const uri = user.nextStep.totpSetupDetails.getSetupUri(appName, accoutName);
        console.log('TOTP setup URI:', uri);


        return {status: false, message: 'Please setup TOTP', aws_message: "CONTINUE_SIGN_IN_WITH_TOTP_SETUP",link:uri.href};
      }

      if(user.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_TOTP_CODE"){
        const appName = 'Login-logic';

        return {status: false, message: 'Please enter TOTP code', aws_message: "CONFIRM_SIGN_IN_WITH_TOTP_CODE"};
      }

      if(user.nextStep.signInStep === "DONE"){
          return {status: true, message: 'Login successful', aws_message: "LOGIN_SUCESS"};
      }

      return {status: false, message: 'Login failed', aws_message: "LOGIN_FAILED"};
    } catch (error: any) {

      if(error.message === 'There is already a signed in user.'){
        console.log('User already authenticated');

        return {status: true, message: 'Login successful', aws_message: "LOGIN_SUCESS"};
      }

      return {status: false, message: error.message, aws_message: error.code};
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
  async validateTOTP(code: string): Promise<{status:boolean,message:string}> {
    // const output = await confirmSignIn({ challengeResponse: code });
    // console.log('TOTP confirmed:', output);

    // return {status: true, message: 'TOTP confirmed'};
    try{
      const output = await confirmSignIn({ challengeResponse: code });
      console.log('TOTP confirmed:', output);
      return {status: true, message: 'TOTP confirmed'};
    }
    catch(error:any){
      console.error('Error confirming TOTP:', error);
      return {status: false, message: error.message};
    }
  }

  async userSession(){
    const user = await fetchUserAttributes();
    console.log('User session:', user);

    if(user){
      return user;
    }
    return null;
  }

  async logout() :Promise<{status:boolean,message:string}> {
    try{
      await signOut();
      console.log('Logout successful');
      return {status: true, message: 'Logout successful'};
    }
    catch(error:any){
      console.error('Error signing out:', error);
      return {status: false, message: error.message};
    }
  }


}
