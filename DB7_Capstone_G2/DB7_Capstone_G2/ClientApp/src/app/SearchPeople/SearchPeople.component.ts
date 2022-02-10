import { Component, OnInit } from '@angular/core';
import { UserInformationService } from '../user-information.service';
import { UserInformation } from '../UserInformation';
import { City } from '../City';
import { CityService } from '../city.service';
import { State } from '../State';
import { StateService } from '../state.service';
import { Interests } from '../Interests';
import { InterestsService } from '../interests.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-SearchPeople',
  templateUrl: './SearchPeople.component.html',
  styleUrls: ['./SearchPeople.component.css'],
  providers: [UserInformationService, CityService,
              StateService, InterestsService]
})
export class SearchPeopleComponent implements OnInit {
  sName: boolean = true;
  sLoc: boolean = false;
  sInt: boolean = false;
  closeDefault: boolean = true;
  cities: City[] = [];
  states: State[] = [];
  users: UserInformation[] = [];
  interests: Interests[] = [];
  filteredCities: string[] = [];
  filteredUsers?: UserInformation[] = [];
  profilePic: string = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  constructor(private userInformationService: UserInformationService,
              private cityService: CityService,
              private stateService: StateService,
              private interestService: InterestsService,
              private loginService: LoginService,
              private router: Router) {

      this.cityService.GetCities().subscribe(
        (response:any) => {
          this.cities = response;
          console.log("CITY LIST");
          console.log(this.cities);
        }
      );
      this.stateService.GetStateList().subscribe(
        (response:any) => {
          this.states = response;
          console.log("STATE LIST");
          console.log(this.states);
        }
      );
      this.userInformationService.GetPeople().subscribe(
        (response:any) => {
          this.users = response;
          console.log("USER LIST");
          console.log(this.users);
        }
      );
      this.interestService.GetAllInterests().subscribe(
        (response:any) => {
          this.interests = response;
          console.log("INTERESTS LIST");
          console.log(this.interests);
        }
      );
  }

  ngOnInit() {
    if(this.loginService.isloggedin !== true){
      this.router.navigate(['user-information']);
    }
    //CORETEZZZZ BROKE THIS HAHAHAHAHAHA
  }

  SearchTypeChange(){
    let searchType = ( <HTMLSelectElement> document.getElementById("searchSelection") ).value;
    switch (searchType){
      case "byname":{
        this.sName = true;
        this.sLoc = false;
        this.sInt= false;
        break;
      }

      case "location":{
        this.sName = false;
        this.sLoc = true;
        this.sInt= false;
        break;
      }

      case "interest":{
        this.sName = false;
        this.sLoc = false;
        this.sInt= true;
        break;
      }
    }
  }

  Search(event){
    this.closeDefault = false;
    let searchType = ( <HTMLSelectElement> document.getElementById("searchSelection") ).value;
    console.log(searchType);
    switch (searchType){
      case "byname":{
        this.SearchByName(event);
        break;
      }

      case "location":{
        this.SearchByLocation();
        break;
      }

      case "interest":{
        //this.SearchByInterest();
        break;
      }
    }
  }

  SearchByName(event){
    this.filteredUsers = [];
    let searchName = event.target.value;
    for(let user of this.users){
      if(user.firstName.trim().toLowerCase().includes(searchName.trim().toLowerCase()) ||
        user.lastName.trim().toLowerCase().includes(searchName.trim().toLowerCase())){
        this.filteredUsers.push(user);
      }
    }
  }

  SearchByLocation(){
    this.filteredUsers = [];
    let searchState = (<HTMLSelectElement> document.getElementById("stateSelected")).value;
    let searchCity = (<HTMLSelectElement> document.getElementById("selectedCity")).value;

    for(let user of this.users){
      if( user.city === searchCity && user.state === searchState){
        this.filteredUsers.push(user);
      }
    }
  }

  /* ---INTEREST PROPERTY STILL NEEDS TO BE IMPLEMENTED----
  SearchByInterest(){
    console.log("Made it to SearchByInterest")
    this.filteredUsers = [];
    let searchInterest = (<HTMLSelectElement> document.getElementById("selectedInterest")).value;
    for(let user of this.users){
      if( user.interests.id === searchInterest){
        this.filteredUsers.push(user);
      }
    }
  }
  */

  FilterCities(){
    this.filteredCities = [];
    let selectedState = (<HTMLSelectElement> document.getElementById("stateSelected")).value;
    let cityBox = (<HTMLSelectElement> document.getElementById("selectedCity"));

    for(let city of this.cities){
      if( city.stateAbbr === selectedState ){
        this.filteredCities.push( city.cityName );
      }
    }

    cityBox.style.display = "";
  }

  onSelect(users: number) {
    this.router.navigate([`/profile/${users}`]);

  }
}
