export class Category {
    public name: string;
    public index: number;
    public color: string;


    constructor(
        name: string,
        index: number,
        color: string
    ){
        this.name =name;
        this.index = index;
        if(color){
            this.color = color;
        }else{
            this.color = '#00f';
        }
    }

    public getObject(){
        return {
            name: this.name,
            color: this.color
        };
    }
}
