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
//6.feladat
public get osszpontSzam(): number {
    let osszpont: number =0;
    this._pontok.sort();
    for (let i = 2; i< this._pontok.length; i++)
    {
        osszpont += this._pontok[i]
    }
    if (this._pontok[0] != 0)
    {
        osszpont += 10;
    }
    if (this._pontok[1] != 0)
    {
       osszpont += 10    
    }
    return osszpont;
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