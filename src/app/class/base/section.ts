import { ObjectBasePrototype } from '../object-base-prototype';

export class Section extends ObjectBasePrototype {
    public name: string;

    private part: number;
    constructor(p: number,name: string){
        super(name);
        this.part = p;
        this.name = name;
    }

    public set partion(p: number){
        if(p>0 && p<=1){
            this.part = p;
        } else {
            throw Error('Part can only be a float between 0 and 1');
        }
    }

    public get partion(): number{
        return this.part;
    }

    public getObject() {
        return {
            part: this.part,
            name: this.name
        };
    }
}
