import Versenyző from "./Versenyző";
import fs from "fs";

export default class Megoldás {
    private _versenyzők: Versenyző[] = [];

    public get versenyzőkSzáma(): number {
        return this._versenyzők.length;
    }
    public get nőiVersenyzőkSzáma(): number {
        let nőkSzáma = 0;
        for (const db of this._versenyzők) {
            if (db.kategória == "Noi") {
                nőkSzáma++;
            }
        }
        return nőkSzáma;
    }
    // public get összPont(): number{
    //  return this.
    // }
    // public get nőiBajnok(): string{
    //     return this.
    // }

    public get nőiBajnok(): Versenyző {
        const nőiVersenyzők: Versenyző[] = [];

        for (const v of this._versenyzők) {
            if (v.kategória == "Noi") {
                nőiVersenyzők.push(v);
            }
        }
        let nőiBajnok = nőiVersenyzők[0];
        //  return nőiBajnok
        for (let i = 1; i < nőiVersenyzők.length; i++) {
            if (nőiVersenyzők[i].osszpontSzam > nőiBajnok.osszpontSzam) nőiBajnok = nőiVersenyzők[i];
        }
        return nőiBajnok;
    }

    private osszpontFF(fileString: string) {
        // egyszerűen legenerálom a filet mivel a front-end-ről fogom elérni később.
        fs.writeFileSync("osszpontFF.txt", fileString);
    }

    constructor(forrás: string) {
        const sorok: string[] = fs
            .readFileSync(forrás)
            .toString()
            .split("\n")
            .map(item => item.trim());
        let fileString: string = "";
        // console.log(sorok);
        // map funkcioval trimmeltem minden elemet amit split-el elvalasztottunk mert a \r meg benne maradt. Ez beletartozik kicsit a code cleaningbe.

        for (let i = 0; i < sorok.length; i++) {
            if (sorok[i].length != 0) {
                this._versenyzők.push(new Versenyző(sorok[i]));

                // Itt a Versenyzők osztály és array generálását kihasználva egyből kialakítom az osszpontFF file-ba tartozó stringet.
                if (this._versenyzők[i].kategória.includes("ferfi")) {
                    fileString += `${this._versenyzők[i].név};${this._versenyzők[i].osszpontSzam}\n`;
                }
            }
        }
        // itt hívom meg
        this.osszpontFF(fileString);
    }
}
