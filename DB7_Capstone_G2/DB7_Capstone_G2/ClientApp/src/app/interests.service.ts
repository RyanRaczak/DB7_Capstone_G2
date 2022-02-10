import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interests } from './Interests';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {

  url:string ="Interest";
  constructor(private http:HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.url = baseUrl + this.url; 
  }

  GetAllInterests() : Observable<any> {   
      return this.http.get(this.url + "/all/");
  }

  GetInterest(id: number) {
    return this.http.get(this.url + "/byId/" + id); 
  }

  AddInterests(i : Interests) {
    return this.http.post(this.url + "/addInterest/", i);
  }

  DeleteInterest(id : number) {
    return this.http.delete(this.url + "/removeInterest/" + id);
  }

  UpdateInterests(newInterests: Interests, id: number) {
      return this.http.put(this.url + "/editInterest/"+id, newInterests); 
    }

}
