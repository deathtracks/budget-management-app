export class Settings {
    public langue: string;
    public categorie: string[];

    constructor(data: any=undefined){
        if(data && data.categorie){
            this.categorie = data.categorie;
        }else{
            this.categorie = ['Autre'];
        }
        if(data && data.langue){
            this.langue = data.langue;
        }else{
            this.langue = 'English';
        }
    }

    public getObject(){
        return {
            langue : this.langue,
            categorie: this.categorie
        };
    }

    public removeCategory(index: number){
        this.categorie = this.categorie.slice(0,index).concat(this.categorie.slice(index+1));
    }
}
