import { Settings } from './data/settings';

export class UserInfo {
    public email: string;
    public months: string[];
    public settings: Settings;

    private uid: string;
    constructor(
        uid: string,
        data: any
    ){
        this.uid = uid;
        if(data.email && data.months){
            this.email = data.email;
            this.months = data.months;
        }
        if(data.settings){
            this.settings = new Settings(data.settings);
        }else{
            this.settings = new Settings();
        }
    }

    public getData(){
        return {
            email: this.email,
            months: this.months,
            settings : this.settings.getObject()
        };
    }

    public getUID(){
        return this.uid;
    }
}
