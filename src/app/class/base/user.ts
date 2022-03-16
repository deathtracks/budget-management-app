import { Objectif } from "./objectif";
import { Section } from "./section";

export class User {
    private _email: string;
    
    public firstName : string;
    public lastName: string;
    public sections: Section[];
    public objectifs: Objectif[];
    public months: string[];

    constructor(email: string, firstName: string, lastName: string, section?: Section[], objectif?:Objectif[], month?:string[]){
        this._email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.sections = section;
        if(this.sections.length<1){
            this.sections = [new Section(0.5,'besoins'),new Section(0.2,'envies')];
        }
        this.objectifs = objectif;
        this.months = month;
    }

    public get email(): string {
        return this._email;
    }
}
