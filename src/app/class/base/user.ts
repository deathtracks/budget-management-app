export class User {
    public displayName: string;
    private email: string;
    private emailVerified: boolean;
    private token: string;

    constructor(
        display: string,
        email: string,
        token: string,
        emailVerified: boolean
    ){
        this.displayName = display;
        this.email = email;
        this.token = token;
        this.emailVerified = emailVerified;
    }

    public getEmail(){
        return this.email;
    }

    public getToken(){
        return this.token;
    }
}
