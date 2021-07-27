import firebase from 'firebase/app';

export class Expense {
    public name: string;
    public amount: number;
    public date: Date;
    public category: number;
    readonly owner: string;
    private id: string;

    constructor(
        id: string,
        owner: string,
        name: string,
        amount: number,
        date: Date,
        category: number = 0
    ) {
        this.owner = owner;
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.date = date;
        this.category = category;
    }

    public setId(newId: string){
        this.id = newId;
    }

    public getId(){
        return this.id;
    }

    public getObject(){
        return {
            name : this.name,
            amount : this.amount,
            date : firebase.firestore.Timestamp.fromDate(this.date),
            category: this.category,
            owner: this.owner
        };
    }
}
