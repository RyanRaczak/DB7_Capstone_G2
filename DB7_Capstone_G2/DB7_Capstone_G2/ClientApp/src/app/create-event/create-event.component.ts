import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '../Events';
import { EventsService } from '../events.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  providers: [EventsService]
})
export class CreateEventComponent implements OnInit {

  newEvent: Events;
  isloggedin:boolean;

  constructor(private eventService: EventsService,
     private loginService: LoginService,
     private router: Router) {
   }

  ngOnInit() {
    if(this.loginService.isloggedin === false){
      this.router.navigate(['user-information']);
    }
  }

  AddEvent(){
    let newName: string;
    let newDescription: string;
    let newDate: Date;
    let newCapacity: number;
    let newCity: string;
    let newState: string;
    let createdBy: number;

    try{
      newName= ( <HTMLInputElement> document.getElementById("eventName") ).value;
    }catch{
      newName = "";
    }

    try{
      newDescription = ( <HTMLInputElement> document.getElementById("eventDescription") ).value;
    }catch{
      newDescription = "";
    }

    try{
      newDate = new Date( Date.parse( ( <HTMLInputElement> document.getElementById("eventDate") ).value ) );
      //newDate.setDate( newDate.getDate() +1 );
    }catch{
      newDate = new Date;
    }

    try{
      newCapacity = parseInt( ( <HTMLInputElement> document.getElementById("eventCapacity") ).value );
    }catch{
      newCapacity = 0;
    }

    try{
      newCity = ( <HTMLInputElement> document.getElementById("CityFilter") ).value;
    }catch{
      newCity = ""
    }

    try{
      newState = ( <HTMLSelectElement> document.getElementById("StateFilter") ).value;
    }catch{
      newState = "";
    }

    try{
      createdBy = parseInt( ( <HTMLInputElement> document.getElementById("createdBy") ).value ) ;
    }catch{

    }


    

    console.log(newName);
    console.log(newDescription);
    console.log(newDate);
    console.log(newCapacity);
    console.log(newCity);
    console.log(newState);

    let newEvent: Events = { eventId: 0,
       createdBy: createdBy,
       eventName: newName,
       eventDescription: newDescription,
       eventDate: newDate,
       eventCapacity: newCapacity,
       eventCity: newCity,
       eventState: newState,
       attendees: []
    }

    this.eventService.CreateEvent(newEvent).subscribe(
      (response: any) => {
        console.log(newEvent);
        this.router.navigate(['event-list']);
      }
    );

    

  }

}
