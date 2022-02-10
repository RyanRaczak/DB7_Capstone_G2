export interface Users{
    
    userId:number; 
    userName:string; 
    userPassword:string; 
    isAdmin:boolean;  
}

export class Convert {
    public static toTask(json: string): Users {
        return JSON.parse(json);
    }
    public static TaskToJson(value: Users): string {
        return JSON.stringify(value);
    }
}