export interface State{
    stateName:string; 
    stateAbbr:string;  
}

export class Convert {
    public static toTask(json: string): State {
        return JSON.parse(json);
    }
    public static TaskToJson(value: State): string {
        return JSON.stringify(value);
    }
}