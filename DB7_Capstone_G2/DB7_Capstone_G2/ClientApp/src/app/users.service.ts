import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from './Users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  url:string="User"
  constructor(private http:HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl + this.url; 
   }

   GetAllUsers() : Observable<any> {
      return this.http.get(this.url + "/all/"); 
   }

   GetUser(id : number) {
    return this.http.get(this.url + "/byId/" + id); 
   }

   GetUserName(username :string) {
    return this.http.get(this.url + "/byUserName/" + username); 
   }


   AddUser(u: Users) {
     console.log(u);
     return this.http.post(this.url + "/addUser/", u); 
   }

   DeleteUser(id : number) {
    return this.http.delete(this.url + "/removeUser/" + id);
   }

  UpdateUser(newUsers: Users, id: number) {
  return this.http.put(this.url + "/editUser/"+id, newUsers); 
  }



}
