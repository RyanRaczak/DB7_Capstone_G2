import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from './Events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  url:string ="Event";
  constructor(private http:HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.url = baseUrl + this.url; 
  }

  GetEvents() :Observable<any> {
    return this.http.get(this.url + "/all/");
  }

  GetEvent(id : number) {
    return this.http.get(this.url + "/byId/" + id); 
  }

  CreateEvent(e : Events) {
    return this.http.post(this.url + "/addEvent/", e);
  }

  DeleteEvent(id: number) {
    return this.http.delete(this.url + "/removeEvent/" + id); 
  }

  UpdateEvents(newEvent: Events, id : number) {
    return this.http.put(this.url + "/editEvent/"+id, newEvent);
  }

  AddAttendee(eventId:number, userId:number){
    return this.http.post(this.url + "/addAttendee/e=" + eventId + "-u=" + userId, null);
  }

  RemoveAttendee(eventId:number, userId:number){
    return this.http.delete(this.url + "/removeAttendee/e=" + eventId + "-u=" + userId);
  }
}