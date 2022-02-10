export interface Login{
    userName: string; 
    passWord: string;   
}

export class Convert {
    public static toTask(json: string): Login {
        return JSON.parse(json);
    }
    public static TaskToJson(value: Login): string {
        return JSON.stringify(value);
    }
}