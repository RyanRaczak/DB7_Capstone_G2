import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { UserInformationService } from '../user-information.service';
import { Users } from '../Users';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  providers: []
})
export class LoginComponent implements OnInit {
  isAdmin: boolean;
  loginUserData : Users; 
  userFound:boolean;

  url:string ="User";
  constructor(private http:HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private userInfoService : UserInformationService,
    private loginService: LoginService,
    private router: Router) 
    { this.url = baseUrl + this.url; }

  ngOnInit() {
  }

  loginUser() {
    let newUserName = (<HTMLInputElement>document.getElementById("Uname")).value; 
    let newPassWord = (<HTMLInputElement>document.getElementById("Pword")).value; 
    this.loginUserData = {userId : 0, userName: newUserName, userPassword: newPassWord, isAdmin: false};

    try { console.log("Loggin in user...")
      this.http.post(this.url + "/login/", this.loginUserData).subscribe(
        (response : any) => { console.log(response);
          this.isAdmin = response.isAdmin; 
          this.userInfoService.GetPersonByUserId(response.userId).subscribe(
            (personResponse: any) => {
              this.loginService.setLoginStatus(true);
              this.loginService.userInfo = personResponse;
              console.log("Reached the very end");
              console.log(this.loginService.isloggedin, this.loginService.userInfo);
              this.router.navigate(['searchPeople']);
            }
          ); 
          console.log(this.isAdmin); 
        }
      ); 
    }
    catch {
      this.loginService.setLoginStatus(false);
    }

    
  }

  logoutUser(){
    this.loginService.setLoginStatus(false);
    this.loginService.userInfo = null;
    this.router.navigate(['user-information']);
  }

}
