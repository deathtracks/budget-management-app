import { ObjectBasePrototype } from '../object-base-prototype';
import { Objectif } from './objectif';
import { Section } from './section';

export class User extends ObjectBasePrototype{
    public firstName: string;
    public lastName: string;
    public sections: Section[];
    public objectifs: Objectif[];
    public months: string[];

    private adresse: string;

    constructor(email: string, firstName: string, lastName: string, section?: Section[], objectif?: Objectif[], month?: string[]){
        super(email);
        this.adresse = email;
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
        return this.adresse;
    }

    public getObject() {
        const sectionList = [];
        this.sections.forEach(s=>sectionList.push(s.getObject()));
        const objectifList = [];
        this.objectifs.forEach(o=>objectifList.push(o.getObject()));
        return {
            email : this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            section: sectionList,
            month: this.months,
            objectifs: objectifList
        };
    }
}
