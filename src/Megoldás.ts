import Versenyző from "./Versenyző";
import fs from "fs";

export default class Megoldás{
    private _versenyzők: Versenyző[] = [];

    public get versenyzőkSzáma(): number{
        return this._versenyzők.length;
    }
    public get nőiVersenyzőkSzáma(): number{
        return this._versenyzők[1].kategória;
    }
    public get összPont(): number{
        return this.
    }
    public get nőiBajnok(): string{
        return this.
    }
    constructor(forrás: string){
        const sorok: string[] = fs.readFileSync(forrás).toString().split("\n");
        for (let i = 0; i < sorok.length; i++) {
            if (sorok[i].length != 0){
                this._versenyzők.push(new Versenyző(sorok[i]));
            }
        }
    }
}