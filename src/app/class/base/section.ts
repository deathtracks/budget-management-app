export class Section {
    private part: number;

    constructor(p: number,name: string){
        this.part = p;
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
}
