import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInformation } from './UserInformation';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService {
  
  url:string="UserInformation"
  constructor(private http:HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl + this.url; 
   }

   GetPeople() : Observable<any> {
    return this.http.get(this.url + "/all/"); 
   }


   GetPerson(id :number) {
    return this.http.get(this.url + "/byId/" + id);    
  } 

  GetPersonByUserId(userId:number){
    return this.http.get(this.url + "/byuserid/" + userId);
  }

   CreateUserInformation(u: UserInformation){
    console.log(u); 
    return this.http.post(this.url + "/addUserInformation/", u);
  }

  DeleteProfile(id: number) {
    return this.http.delete(this.url + "/removeUserInformation/" + id); 
  }

  UpdateProfile(newProfile: UserInformation, id: number) {
    return this.http.put(this.url + "/editUserInformation/"+id, newProfile); 
  }






}

