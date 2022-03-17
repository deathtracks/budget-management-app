export abstract class ObjectBasePrototype {
    private id: string;

    constructor(id: string) {
        this.id = id;
    }

    public abstract getObject(): any;
}
