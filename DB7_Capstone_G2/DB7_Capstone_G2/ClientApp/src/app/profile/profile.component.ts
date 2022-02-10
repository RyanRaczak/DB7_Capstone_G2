import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'oidc-client';
import { LoginService } from '../login.service';
import { UserInformationService } from '../user-information.service';
import { UserInformation } from '../UserInformation';
import { Convert, Users } from '../Users';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserInformationService]
})
export class ProfileComponent implements OnInit {
  userId : number; 
  currentUser: UserInformation; 
  sameUser : boolean = false;  
  constructor(private userService : UserInformationService, private loginServ : LoginService, private route : ActivatedRoute, private router : Router ) {
      this.route.params.subscribe(
        (response : any) => {
          this.userId = parseInt(response['userId']); 
          console.log("userid in url: " + this.userId);

          this.userService.GetPersonByUserId(this.userId).subscribe(
            (response : any) => {
              this.currentUser = response; 
            }
          );
        }
      ); 
   }

  ngOnInit() {
    if(this.loginServ.isloggedin === false){
      this.router.navigate(['user-information']);
    }
    // this.userDAL.GetAllUsers().subscribe(
    //   (response: any) => {
    //     console.log(response);
    //     let json = Convert.TaskToJson(response); 
    //     this.userList = Convert.toTask(json); 
    //     console.log(this.userList); 
      }

      DeleteProfile(id: number) {
        this.userService.DeleteProfile(id).subscribe(
          (response: any) => {console.log("User deleted successfully")}
          
        );
        this.router.navigate(['SearchPeople']); 
      }

      EditProfile(profileID: number){
        let displayProfile = document.getElementById("Display" + profileID);
        let editProfile = document.getElementById("Edit" + profileID);
    
        // If the display style is the empty string,
        // by default the element is being shown
        if(displayProfile.style.display === ""){
          displayProfile.style.display = "none";
          editProfile.style.display = "";
        }
      }
      

}
