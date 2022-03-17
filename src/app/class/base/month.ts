import { ObjectBasePrototype } from '../object-base-prototype';
import { Expense } from './expense';

export class Month extends ObjectBasePrototype{
    public close: boolean;
    public budget: number;
    public expenseList: Expense[];
    private start: Date;
    private end: Date;

    constructor(
        id: string,
        start: Date,
        end: Date,
        budget: number,
        expenseList: Expense[],
        close: boolean
    ) {
        super(id);
        this.start = start;
        this.end = end;
        this.budget = budget;
        this.expenseList = expenseList;
        this.close = close;
    }

    public get startDate(): Date{
        return this.start;
    }

    public set startDate(newDate: Date) {
        this.expenseList.forEach(e =>{
            if(e.date<newDate){
                e.date = newDate;
            }
        });
        this.start = newDate;
    }

    public get endDate(): Date{
        return this.end;
    }

    public set endDate(newDate: Date) {
        this.expenseList.forEach(e =>{
            if(e.date>newDate){
                e.date = newDate;
            }
        });
        this.end = newDate;
    }

    public getObject() {
        const expenses = [];
        this.expenseList.forEach(e=>expenses.push(e.getObject()));
        return {
            start: this.start,
            end: this.end,
            budget: this.budget,
            expenseList : expenses,
            close: this.close
        };
    }
}
