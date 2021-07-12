export class Expense {
    public name: string;
    public amount: number;
    public date: Date;
    private id: string;

    constructor(
        id: string,
        name: string,
        amount: number,
        date: Date
    ) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.date = date;
    }

    public setId(newId: string){
        this.id = newId;
    }

    public getId(){
        return this.id;
    }
}
