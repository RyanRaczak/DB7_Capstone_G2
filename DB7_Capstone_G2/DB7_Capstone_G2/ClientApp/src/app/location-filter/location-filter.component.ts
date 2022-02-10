import { Component, OnInit } from '@angular/core';
import { City } from '../City';
import { CityService } from '../city.service';
import { State } from '../State';
import { StateService } from '../state.service';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.css']
})
export class LocationFilterComponent implements OnInit {

  allCities: City[];
  filteredCities: String[] = [];
  states: State[];
  
  constructor(private cityService: CityService,
    private stateService: StateService) { }

  ngOnInit() {
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
  }

  StateSelected(){
    this.filteredCities = [];
    let selected = ( <HTMLSelectElement> document.getElementById("StateFilter") ).value;
    let cityBox = ( <HTMLSelectElement> document.getElementById("CityFilter") );

    for(let city of this.allCities){
      if( city.stateAbbr === selected ){
        //console.log("Adding " + city.cityName)
        this.filteredCities.push( city.cityName );
      }
    }

    cityBox.style.display = "";
  }

}
