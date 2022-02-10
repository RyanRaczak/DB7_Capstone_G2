import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInformationService } from './user-information.service';
import { UserInformationComponent } from './user-information/user-information.component';
import { UserInformation } from './UserInformation';
import { Users } from './Users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 isloggedin: boolean; 
 isAdmin: boolean = false; 
 userInfo?: UserInformation; 
  // private _loginUrl = 'https://localhost:44367/api/Login'
  
  url:string ="User";
  constructor(private http:HttpClient,
     @Inject('BASE_URL') baseUrl: string,
      private userInfoService : UserInformationService) { 
    this.url = baseUrl + this.url; 
  }

  getLoginStatus(){
    return this.isloggedin;
  }

  setLoginStatus(status:boolean){
    this.isloggedin=status;
  }
  

  // loginUser(userName: Users) {
  //   try { console.log("Loggin in user...")
  //     this.http.post(this.url + "/login/", userName).subscribe(
  //       (response : any) => { console.log(response);
  //         this.isAdmin = response.isAdmin; 
  //         this.userInfoService.GetPersonByUserId(response.userId).subscribe(
  //           (personResponse: any) => {
  //             this.userInfo = personResponse; 
  //             this.setLoginStatus(true); 
  //             console.log("Reached the very end")
  //             console.log(this.isloggedin, this.userInfo)
  //           }
  //         ); 
  //         console.log(this.isAdmin); 
  //       }
  //     ); 
  //   }
  //   catch {
  //     this.isloggedin = false;
  //   }
  //   // return this.http.post<any>(this.url + userName + password + "//" + user); 
  // }
}
