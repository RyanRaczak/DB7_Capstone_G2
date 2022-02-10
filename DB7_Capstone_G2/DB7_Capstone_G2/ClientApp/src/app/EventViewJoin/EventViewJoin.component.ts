import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { UserInformationService } from '../user-information.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Events} from '../Events';
import { UserInformation } from '../UserInformation';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-EventViewJoin',
  templateUrl: './EventViewJoin.component.html',
  styleUrls: ['./EventViewJoin.component.css'],
  providers: [EventsService]
})

export class EventViewJoinComponent implements OnInit {
  selectedEvent: Events;
  eventId: number;
  userId: number;
  host: UserInformation;
  attending: boolean = false;
  constructor(private eventService: EventsService,
              private route: ActivatedRoute,
              private userInformationService: UserInformationService,
              private loginService: LoginService,
              private router: Router) {
    //{ path: 'eventview/:eventId', component: EventViewJoinComponent}
    this.route.params.subscribe(
      (response: any) => {
        this.eventId = response['eventId'];
        console.log("EVENT ID")
        console.log(this.eventId);
      }
    );
    this.userId = this.loginService.userInfo.userId;
  }

  ngOnInit() {
    this.eventService.GetEvent(this.eventId).subscribe(
      (response:any) => {
        this.selectedEvent = response;
        console.log("EVENT")
        console.log(response);

        this.userInformationService.GetPersonByUserId(this.selectedEvent.createdBy).subscribe(
          (response:any) => {
            this.host = response;
            console.log("HOST")
            console.log(this.host);

            this.selectedEvent.attendees.forEach(user => {
              if(this.userId === user.userId){
                this.attending = true;
              }
            });
            
            if(this.userId == this.host.userId){
              this.attending = true;
            }
            console.log("Attending/Hosting: " + this.attending);
          }
        );
      }
    );
    
  }

  RsvpEvent(){
    this.eventService.AddAttendee(this.eventId,this.userId).subscribe(
      (response:any)=>{
        this.reloadComponent();
      }
    );
  }

  CancelRsvp(){
    this.eventService.RemoveAttendee(this.eventId,this.userId).subscribe(
      (response:any)=>{
        this.reloadComponent();
      }
    );
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  DeleteEvent(){
    this.eventService.DeleteEvent(this.eventId).subscribe(
      (response : any) => {
        console.log("Event Deleted");
        this.router.navigate(['event-list']);
      }
    );
  }
}
