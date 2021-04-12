import Versenyző from "./Versenyző";
import fs from "fs";
import { error } from "node:console";

export default class Megoldás {
    private _versenyzők: Versenyző[] = [];
    private _newMap = new Map();
    private _fileString: string = "";

    /**
     * Versenyzők maximális számána
     */
    public get versenyzőkSzáma(): number {
        return this._versenyzők.length;
    }

    public get fileString(): string {
        return this._fileString;
    }

    /**
     * 4. feladat megoldásásának alapja.
     * Vissza adja a Nők számát, melyet content.ts állományban százalékos formában jelenítünk meg
     */
    public get nőiVersenyzőkSzáma(): number {
        let nőkSzáma = 0;
        for (const db of this._versenyzők) {
            if (db.kategória == "Noi") {
                nőkSzáma++;
            }
        }
        return nőkSzáma;
    }

    /**
     * 6. feladat megoldása.
     * Legtöbb pontott szerzett nő
     */
    public get nőiBajnok(): Versenyző {
        const nőiVersenyzők: Versenyző[] = [];

        for (const v of this._versenyzők) {
            if (v.kategória == "Noi") {
                nőiVersenyzők.push(v);
            }
        }
        let nőiBajnok = nőiVersenyzők[0];

        for (let i = 1; i < nőiVersenyzők.length; i++) {
            if (nőiVersenyzők[i].osszpontSzam > nőiBajnok.osszpontSzam) nőiBajnok = nőiVersenyzők[i];
        }
        return nőiBajnok;
    }

    /**
     * 7. feladat osszpontFF.txt írása. Megjelenítése front-end-en lessz kivitelezve fetch API-al
     * @param fileString construktorban található fob2016.txt file 7. feladat kritériumainak megfelelően stringé alakított versiója
     */
    private osszpontFF(fileString: string) {
        try {
            if (fs.existsSync("osszpontFF.txt")) {
                console.log("File exists");
                return;
            }
        } catch (error) {
            console.error(error);
            return;
        }
        fs.writeFileSync("osszpontFF.txt", fileString);
    }

    /**
     * 8. feladatnak megfelelő szűrés után String-ként adja vissza a constructorban létrehozott mappa objektumot.
     * Map(Egyesület: Tagjainak száma)
     * Szűrés: n.a.(egyesületen kívüli), [2,0] közötti versenyzőszám.
     */
    public get egyesuletStat() {
        let stringOut: string = "";

        for (const i of this._newMap) {
            if (i[0] !== "n.a." && i[1] > 2) {
                stringOut += "\t" + i.join(" - ") + " fő\n";
            }
        }

        console.log();
        return stringOut;
    }

    constructor(forrás: string) {
        const sorok: string[] = fs
            .readFileSync(forrás)
            .toString()
            .split("\n")
            .map(item => item.trim());

        let counter = 0;
        let carry;

        for (let i = 0; i < sorok.length; i++) {
            if (sorok[i].length != 0) {
                this._versenyzők.push(new Versenyző(sorok[i]));

                // 7.f. Itt a Versenyzők osztály és tömb generálását kihasználva egyből kialakítom az osszpontFF file-ba tartozó stringet.
                if (this._versenyzők[i].kategória.includes("ferfi")) {
                    this._fileString += `${this._versenyzők[i].név};${this._versenyzők[i].osszpontSzam}\n`;
                }

                // 8. feladat elkészítése.
                carry = this._versenyzők[i].egyesület; // Változó az átláthatóság kedvéért.

                // Map objektumot használ kulcs-érték párokkal a statisztika elkészítéséhez melyet később szűr.
                if (this._newMap.has(carry)) {
                    counter = this._newMap.get(carry);
                    this._newMap.set(carry, ++counter);
                } else {
                    this._newMap.set(carry, 1);
                }
            }
        }
        // 7.f. itt hívom meg a file generátort.
        this.osszpontFF(this._fileString);
    }
}
