import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { UserInformationService } from '../user-information.service';
import { UserInformation } from '../UserInformation';
import { Users } from '../Users';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
  providers: [UserInformationService]
})
export class UpdateProfileComponent implements OnInit {

  @Input() id: number;
  profile: UserInformation;  
  constructor(private userService: UserInformationService, private router : Router, private loginServ : LoginService) {

   }

  ngOnInit() {
    this.userService.GetPerson(this.id).subscribe(
      (response: any) => { 
        console.log(response); 
        this.profile = response 
      }
    );
  }

  UpdateProfile() {
    let firstName: string = (<HTMLInputElement>document.getElementById("FirstName")).value; 
    console.log(firstName); 
    let lastName: string = (<HTMLInputElement>document.getElementById("LastName")).value; 
    console.log(lastName); 
    let userBio: string = (<HTMLInputElement>document.getElementById("Bio")).value; 
    console.log(userBio);
    let userEmail: string = (<HTMLInputElement>document.getElementById("Email")).value; 
    console.log(userEmail);
    let userState = this.GetState();
    console.log(userState);
    let userCity = this.GetCity();
    console.log(userCity);

    let newProfile: UserInformation = {
      id: this.id,
      userId: this.loginServ.userInfo.userId,
      firstName: firstName,
      lastName: lastName,
      userBio: userBio,
      email: userEmail,
      city: userCity,
      state: userState,
      eventsAttending: this.profile.eventsAttending
    }

    this.userService.UpdateProfile(newProfile, this.id).subscribe(
      (response: any ) => { this.reloadComponent();
        this.loginServ.userInfo = newProfile; 
      }
    );
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  GetState(){
    let state = (<HTMLSelectElement>document.getElementById("StateFilter")).value;
    
    if( state === "State" ){
      state = this.profile.state;
    }

    return state;
  }

  GetCity(){
    let city = (<HTMLSelectElement>document.getElementById("CityFilter")).value;

    if( city === "City" ){
      city = this.profile.city;
    }

    return city;
  }


}
