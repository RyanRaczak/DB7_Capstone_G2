import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  url:string ="City";
  constructor(private http:HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.url = baseUrl + this.url; 
}

GetCities() : Observable<any> {
  return this.http.get(this.url + "/all/"); 
}

GetCity(cName: string, sAbbr: string) {
  return this.http.get(this.url + "/byId/" + cName + sAbbr );
}


}
