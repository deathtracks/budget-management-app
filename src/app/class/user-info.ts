export class UserInfo {
    public email: string;
    public months: string[];

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
    }

    public getData(){
        return {
            email: this.email,
            months: this.months
        };
    }

    public getUID(){
        return this.uid;
    }
}
