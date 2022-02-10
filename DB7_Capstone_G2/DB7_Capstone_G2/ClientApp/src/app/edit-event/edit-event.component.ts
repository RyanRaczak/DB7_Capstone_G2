import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from '../Events';
import { EventsService } from '../events.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
  providers: [EventsService]
})
export class EditEventComponent implements OnInit {

  eventId: number;
  currentEvent: Events;


  constructor( private eventService: EventsService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router) {
      //{ path: 'edit-event/:eventId', component: EditEventComponent} <---- This is how I added variable to url
      this.route.params.subscribe(
        (response: any) => { this.eventId = response['eventId'], console.log('Added eventId')}
      );
     }

  ngOnInit() {
    if(this.loginService.isloggedin === false){
      this.router.navigate(['user-information']);
    }
    
    this.eventService.GetEvent(this.eventId).subscribe(
      ( response: any ) => {
        this.currentEvent = response;
        console.log(response);
      }
    );
  }

  UpdateEvent(){
    let newName: string;
    let newDescription: string;
    let newDate: Date;
    let newCapacity: number;
    let newCity: string;
    let newState: string;

    try{
      newName= ( <HTMLInputElement> document.getElementById("eventName") ).value;
    }catch{
      newName = this.currentEvent.eventName;
    }

    try{
      newDescription= ( <HTMLInputElement> document.getElementById("eventDescription") ).value;
    }catch{
      newDescription= this.currentEvent.eventDescription;
    }

    try{
      newDate = new Date( Date.parse( ( <HTMLInputElement> document.getElementById("eventDate") ).value ) );
      //newDate.setDate( newDate.getDate() +1 );
    }catch{
      newDate = this.currentEvent.eventDate;
    }

    try{
      newCapacity = parseInt( ( <HTMLInputElement> document.getElementById("eventCapacity") ).value );
    }catch{
      newCapacity = this.currentEvent.eventCapacity;
    }

    try{
      newCity= ( <HTMLInputElement> document.getElementById("CityFilter") ).value;
    }catch{
      newCity= this.currentEvent.eventCity;
    }

    try{
      newState = ( <HTMLSelectElement> document.getElementById("StateFilter") ).value;
    }catch{
      newState = this.currentEvent.eventState;
    }


    

    console.log(newName);
    console.log(newDescription);
    console.log(newDate);
    console.log(newCapacity);
    console.log(newCity);
    console.log(newState);

    let updatedEvent: Events = { eventId: this.currentEvent.eventId,
       createdBy: this.currentEvent.createdBy,
       eventName: newName,
       eventDescription: newDescription,
       eventDate: newDate,
       eventCapacity: newCapacity,
       eventCity: newCity,
       eventState: newState,
       attendees: this.currentEvent.attendees
    }

    console.log(updatedEvent);

    this.eventService.UpdateEvents(updatedEvent, this.eventId).subscribe(
      ( response: any ) => {
        console.log("Event Updated");
        this.router.navigate(['event-list']);
      }
    );

  }

}
