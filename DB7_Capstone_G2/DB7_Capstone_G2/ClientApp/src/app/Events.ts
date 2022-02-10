import { UserInformation } from "./UserInformation";

export interface Events{
    eventId:number; 
    createdBy:number; 
    eventName:string; 
    eventDescription:string;
    eventDate:Date;
    eventCapacity:number; 
    eventCity:string; 
    eventState:string;   
    attendees: UserInformation[]; 
}

export class Convert {
    public static toTask(json: string): Events {
        return JSON.parse(json);
    }
    public static TaskToJson(value: Events): string {
        return JSON.stringify(value);
    }
}