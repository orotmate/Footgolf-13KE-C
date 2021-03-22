export default class Versenyző{
    // Albert Laszlo;Felnott ferfi;HOLE HUNTERS;0;0;10;10;0;0;0;10
    private _név: string;
    private _kategória: string;
    private _egyesület: string;
    private _pontok: number[] = [];
    
    public get név(): string{
        return this._név;
    }
    public get kategória(): string{
        return this._kategória;
    }
    public get egyesület(): string{
        return this._egyesület;
    }

    public constructor(sor:string){
        const m: string[] = sor.split(";");

        this._név = m[0];
        this._kategória = m[1];
        this._egyesület = m[2];
        for (let i = 3; i < m.length; i++) {
            this._pontok.push(parseInt(m[i]))
        }
    }
}