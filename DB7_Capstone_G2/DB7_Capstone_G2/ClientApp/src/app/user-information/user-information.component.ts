import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UserInformationService } from '../user-information.service';
import { UserInformation } from '../UserInformation';
import { Users } from '../Users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css'],
  providers: [UsersService]
})
export class UserInformationComponent implements OnInit {

  constructor(private userService : UsersService, private userInformationService : UserInformationService, private router : Router, private loginServ : LoginService) { }

  ngOnInit() {
  }

  AddUser() {

    let UserName: string = (<HTMLInputElement>document.getElementById("userName")).value; 
    console.log(UserName); 
    let UserPassword: string = (<HTMLInputElement>document.getElementById("userPassword")).value; 
    console.log(UserPassword);
    
     let newUser: Users = {
       userName: UserName, userPassword: UserPassword, isAdmin: false,
       userId: 0,

     };
      this.userService.AddUser(newUser).subscribe(
      (response: any ) => {
        //PUT CODE HERE 
        // location.reload() 
        this.userService.GetUserName(newUser.userName).subscribe(
          (getUserResponse: string) => { console.log(getUserResponse);
            let newUserInfo: UserInformation = {
              id: 0,
              userId: parseInt(getUserResponse),
              firstName: 'Add your First Name',
              lastName: 'Add your Last Name',
              email: 'Add an email',
              userBio: 'Add your bio',
              city: '',
              state: '',
              eventsAttending: []
            }
            this.userInformationService.CreateUserInformation(newUserInfo).subscribe(
                (userInforResponse : any) => {
                  console.log("User Added"); 
                  this.loginServ.setLoginStatus(true); 
                  this.userInformationService.GetPersonByUserId(parseInt(getUserResponse)).subscribe(
                    (userInfor : any) => {
                      this.loginServ.userInfo = userInfor; 
                      this.router.navigate([`profile/${userInfor.userId}`]);
                    }
                  );
                }
            )
          }
        );
      }
    ); 
}


}
