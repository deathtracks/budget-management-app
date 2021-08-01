import { Category } from './category';

export class Settings {
    public langue: string;
    public categorie: Category[];

    constructor(data: any=undefined){
        if(data && data.categorie){
            this.categorie = [];
            for(let i=0;i<data.categorie.length;i++){
                const newCat = new Category(data.categorie[i].name,i,data.categorie[i].color);
                this.categorie.push(newCat);
            }
        }else{
            this.categorie = [new Category('Autre',0,[0,0,255])];
        }
        if(data && data.langue){
            this.langue = data.langue;
        }else{
            this.langue = 'English';
        }
    }

    public getObject(){
        const cat = [];
        for(const c of this.categorie){
            cat.push(c.getObject());
        }
        console.log(cat);
        return {
            langue : this.langue,
            categorie: cat
        };
    }

    public removeCategory(index: number){
        this.categorie = this.categorie.slice(0,index).concat(this.categorie.slice(index+1));
    }
}
