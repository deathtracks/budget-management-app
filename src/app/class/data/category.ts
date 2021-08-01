export class Category {
    public name: string;
    public index: number;
    public color: number[];


    constructor(
        name: string,
        index: number,
        color: number[]
    ){
        this.name =name;
        this.index = index;
        if(color && color.length===3){
            this.color = color;
        }else{
            this.color = [0,0,255];
        }
    }

    public getColorAsString(){
        return `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
    }

    public getObject(){
        return {
            name: this.name,
            color: this.color
        };
    }
}
