import { ObjectBasePrototype } from '../object-base-prototype';

export class Expense extends ObjectBasePrototype {
    public name: string;
    public date: Date;
    public amount: number;
    public section: number;

    constructor(
        name: string,
        date: Date,
        amount: number,
        section: number
    ) {
        super(name);
        this.date = date;
        this.name = name;
        this.amount = amount;
        this.section = section;
    }

    public getObject() {
        return {
            name: this.name,
            date: this.date,
            amount: this.amount,
            section: this.section
        };
    }
}
