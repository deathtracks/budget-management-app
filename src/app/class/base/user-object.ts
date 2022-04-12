import { ObjectBasePrototype } from '../object-base-prototype';
import { Objectif, ObjectifInterface } from './objectif';
import { Section, SectionInterface } from './section';

export interface UserInterface{
    name: string;
    section: SectionInterface[],
    objectifs: ObjectifInterface[],
    month: string[],
    email: string,
}
export class UserObject extends ObjectBasePrototype{
    public name: string;
    public sections: Section[];
    public objectifs: Objectif[];
    public months: string[];

    private adresse: string;

    constructor(email: string, name: string, section?: Section[], objectif?: Objectif[], month?: string[]){
        super(email);
        this.adresse = email;
        this.name = name;
        this.sections = section;
        if(!this.sections || (this.sections && this.sections.length<1)){
            this.sections = [new Section(0.5,'besoins'),new Section(0.2,'envies')];
        }
        this.objectifs = objectif;
        if(!this.objectifs) this.objectifs = [];
        this.months = month;
        if(!this.months) this.months = [];
    }

    public get email(): string {
        return this.adresse;
    }

    public setEmail(e: string) {
        this.adresse = e;
    }

    public getObject() {
        const sectionList = [];
        this.sections.forEach(s=>sectionList.push(s.getObject()));
        const objectifList = [];
        this.objectifs.forEach(o=>objectifList.push(o.getObject()));
        return {
            email : this.email,
            name: this.name,
            section: sectionList,
            month: this.months,
            objectifs: objectifList
        };
    }
}
