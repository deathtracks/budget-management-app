import { ObjectBasePrototype } from '../object-base-prototype';
import { Expense } from './expense';

export class Month extends ObjectBasePrototype{
    public close: boolean;
    public budget: number;
    public expenseList: Expense[];
    private start: Date;
    private end: Date;
    private user: string;

    constructor(
        id: string,
        user: string,
        start: Date,
        end: Date,
        budget: number,
        expenseList?: Expense[],
        close?: boolean
    ) {
        super(id);
        this.user = user;
        this.start = start;
        this.end = end;
        this.budget = budget;
        this.expenseList = expenseList;
        if(!this.expenseList) this.expenseList = [];
        this.close = close;
        if(!this.close) this.close = false;
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

    public getDate(): Date{
        const timeStart = this.start.getTime();
        const timeEnd = this.end.getTime();
        return new Date((timeStart+timeEnd)/2);
    }

    public getTotal(): number{
        let sum = 0;
        this.expenseList.forEach((e)=>sum=sum+e.amount);
        return sum;
    }

    public getTotalForSection(index: number){
        let sum = 0;
        this.expenseList.forEach((v)=>{
            if(v.section===index) sum = sum + v.amount;
        })
        return sum;
    }

    public getObject() {
        const expenses = [];
        this.expenseList.forEach(e=>expenses.push(e.getObject()));
        return {
            user: this.user,
            start: this.start,
            end: this.end,
            budget: this.budget,
            expenseList : expenses,
            close: this.close
        };
    }
}
