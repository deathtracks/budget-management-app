export class Month {
    public name: string;
    private id: string;
    private startDate: Date;
    private endDate: Date;
    private total: number;
    private budget: number;

    constructor(
        start: Date,
        end: Date,
        budget: number
    ){

    }
}
