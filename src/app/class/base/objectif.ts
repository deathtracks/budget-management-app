export class Objectif {
    public name: string;
    public start: Date;
    public amount: number;
    public completed: boolean;

    private save: number[];
    private date: Date[];

    constructor(
        name: string,
        start: Date,
        amount: number,
        complted: boolean,
        save?: number[],
        date?: Date[]
    ) {
        if(save && save.length>0 && (!date || date.length!==save.length)){
            throw Error('Missing data in save or date');
        }
        this.amount = amount;
        this.name = name;
        this.start = start;
        this.completed = complted;
        this.save = save;
        this.date = date;
    }

    public get saves(): number[]{
        return [...this.save];
    }

    public get dates(): Date[]{
        return [...this.date];
    }
}
