import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  url:string ="State";
  constructor(private http:HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.url = baseUrl + this.url; 
  }

  GetStateList() : Observable<any> {
      return this.http.get(this.url + "/all/"); 
    }

  GetState(abbr: string) {
    return this.http.get(this.url + "/byId/" + abbr);
  }

}




