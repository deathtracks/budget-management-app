export abstract class ObjectBasePrototype {
    private id: string;

    constructor(id: string) {
        this.id = id;
    }

    public getId(){
        return this.id;
    }

    public abstract getObject(): any;
}
