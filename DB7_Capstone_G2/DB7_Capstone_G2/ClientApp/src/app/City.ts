export interface City{
    cityName:string; 
    stateAbbr:string; 
}

export class Convert {
    public static toTask(json: string): City {
        return JSON.parse(json);
    }
    public static TaskToJson(value: City): string {
        return JSON.stringify(value);
    }
}