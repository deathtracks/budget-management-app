import firebase from 'firebase/app';
import { Expense } from './expense';

export class Month {
    public expenses: Expense[];
    public startDate: Date;
    public endDate: Date;
    private id: string;
    private budget: number;

    private monthStr = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    constructor(
        id: string,
        start: Date,
        end: Date,
        budget: number
    ){
        try{
            if(start>end){
                alert('The start date can\'t be after the end date');
            } else {
                this.id = id;
                this.startDate = start;
                this.endDate = end;
                this.budget = budget;
                this.expenses = [];
            }
        } catch (error){
            alert(error.message);
        }
    }

    public getBudget(): number {
        return this.budget;
    }

    public getTotal(): number{
        let total = 0;
        this.expenses.forEach(expense => total+=expense.amount);
        return total;
    }

    public getRemaining(): number{
        return this.budget-this.getTotal();
    }

    public getName(): string{
        const middleDate = this.getMiddleDate();
        return `${this.monthStr[middleDate.getMonth()]} ${middleDate.getFullYear()}`;
    }

    public getMiddleDate(): Date{
        const startMs = this.startDate.getTime();
        const endMs = this.endDate.getTime();
        const middleMs = (startMs+endMs)/2;
        const middleDate = new Date(middleMs);
        return middleDate;
    }

    public setId(newId: string){
        this.id = newId;
    }

    public getId(){
        return this.id;
    }

    public setAllExpense(expenses: Expense[]){
        this.expenses = expenses;
    }

    public addOneExpense(expense: Expense){
        this.expenses.push(expense);
    }

    public removeOneExpense(expense: Expense){
        this.expenses = this.expenses.slice(0,this.expenses.indexOf(expense)).concat(this.expenses.slice(this.expenses.indexOf(expense)+1));
    }

    public getObject(){
        const expenseIdList: string[] = [];
        this.expenses.forEach(data =>{
            expenseIdList.push(data.getId());
        });
        return {
            budget: this.budget,
            end: firebase.firestore.Timestamp.fromDate(this.endDate),
            start: firebase.firestore.Timestamp.fromDate(this.startDate),
            expenses: expenseIdList
        };
    }
}
