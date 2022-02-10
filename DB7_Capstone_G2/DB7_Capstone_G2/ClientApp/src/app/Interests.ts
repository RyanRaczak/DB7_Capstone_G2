export interface Interests{
    id:number; 
    interestName:string; 
}

export class Convert {
    public static toTask(json: string): Interests {
        return JSON.parse(json);
    }
    public static TaskToJson(value: Interests): string {
        return JSON.stringify(value);
    }
}