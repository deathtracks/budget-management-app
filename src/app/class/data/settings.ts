import { Langue } from './langue';

export class Settings {
    public langue: Langue;
    public categorie: string[];

    constructor(data: any=undefined){
        if(data && data.categorie){
            this.categorie = this.categorie;
        }else{
            this.categorie = ['Autre'];
        }
        if(data && data.langue){
            this.langue = data.langue;
        }else{
            this.langue = Langue.en;
        }
    }

    public getObject(){
        return {
            langue : this.langue,
            categorie: this.categorie
        };
    }
}
