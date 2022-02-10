import { Events } from "./Events";

export interface UserInformation{
    id:number; 
    userId:number; 
    firstName:string; 
    lastName:string;
    email:string;
    userBio:string;
    city:string; 
    state:string; 
    eventsAttending: Events[];   
}

export class Convert {
    public static toTask(json: string): UserInformation {
        return JSON.parse(json);
    }
    public static TaskToJson(value: UserInformation): string {
        return JSON.stringify(value);
    }
}