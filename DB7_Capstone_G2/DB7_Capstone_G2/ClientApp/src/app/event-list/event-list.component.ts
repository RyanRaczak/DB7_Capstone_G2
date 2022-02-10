import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { City } from '../City';
import { CityService } from '../city.service';
import { Events } from '../Events';
import { EventsService } from '../events.service';
import { LoginService } from '../login.service';
import { State } from '../State';
import { StateService } from '../state.service';
import { UserInformationService } from '../user-information.service';
import { UserInformation } from '../UserInformation';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  providers: [EventsService,
    UserInformationService,
    CityService]
})
export class EventListComponent implements OnInit {
  events: Events [];
  filteredEvents: Events [];

  allCities: City[];
  filteredCities: String[] = [];

  eventCreators: UserInformation [];
  states: State[];

  constructor( private eventService: EventsService, 
    private cityService: CityService,
    private stateService: StateService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.loginService.isloggedin === false){
      this.router.navigate(['user-information']);
    }

    this.stateService.GetStateList().subscribe(
      (response: any) => {
        console.log("Adding States");
        this.states = response;
        console.log("States Added");
      }
    );
    
    this.cityService.GetCities().subscribe(
      (response: any) => {
        console.log("Adding Cities");
        this.allCities = response;
        console.log("Cities Added");
        console.log(this.allCities)
      }
    );

    this.eventService.GetEvents().subscribe(
      (response: any) => {
        console.log(response);
        this.events = response;
        this.filteredEvents = response;
        console.log(this.events);
      }
    );
  }

  StateSelected(){
    this.filteredCities = [];
    let selected = ( <HTMLSelectElement> document.getElementById("StateFilter") ).value;
    let cityBox = ( <HTMLSelectElement> document.getElementById("CityFilter") );

    for(let city of this.allCities){
      if( city.stateAbbr === selected ){
        console.log("Adding " + city.cityName)
        this.filteredCities.push( city.cityName );
      }
    }

    cityBox.style.display = "";
  }

  SelectedCity(){
    this.filteredEvents = [];
    let state = ( <HTMLSelectElement> document.getElementById("StateFilter") ).value;
    let city = ( <HTMLSelectElement> document.getElementById("CityFilter") ).value;

    if(city !== 'City'){
      for(let event of this.events){
        if( event.eventCity === city && event.eventState === state){
          this.filteredEvents.push(event);
        }
      }
    }else{
      for(let event of this.events){
        if( event.eventState === state){
          this.filteredEvents.push(event);
        }
      }
    }
  }

  EditEvent(eventId: number){
    this.router.navigate([`edit-event/${eventId}`]);
  }

  ViewProfile(userId: number){
    this.router.navigate([`profile/${userId}`]);
  }

  DeleteEvent(eventId: number, index: number){
    this.eventService.DeleteEvent(eventId).subscribe(
      (response : any) => {
        console.log("Event Deleted");
        this.filteredEvents.splice(index, 1)
      }
    );
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
