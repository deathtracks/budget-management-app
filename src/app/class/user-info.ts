export class UserInfo {
    public email: string;
    public months: string[];

    constructor(
        data: any
    ){
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
}
