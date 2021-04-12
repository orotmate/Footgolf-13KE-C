import Versenyző from "../Versenyző";

describe("Versenyző osztály unit tesztek", () => {
    const Versenyző1: Versenyző = new Versenyző("Albert Laszlo;Felnott ferfi;HOLE HUNTERS;0;0;10;10;0;0;0;10");
    const Versenyző2: Versenyző = new Versenyző("Erdelyi Nora;Noi;ROYAL FOOTGOLF CLUB;74;74;80;74;74;80;80;74");


    it("Versenyző osztálypéldány ellenőrzése", async () => {
        expect(Versenyző1).toBeInstanceOf(Versenyző);
        expect(Versenyző2).toBeInstanceOf(Versenyző);
    });

    it("Versenyző nevének ellenőrzése", async () => {
        expect(Versenyző1.név).toBe("Albert Laszlo");
        expect(Versenyző2.név).toBe("Erdelyi Nora");
    });

    it("Versenyző kategória", async () => {
        expect(Versenyző1.kategória).toBe("Felnott ferfi");
        expect(Versenyző2.kategória).toBe("Noi");
    });

    it("Versenyző egyesületének ellenőrzése", async () => {        
        expect(Versenyző1.egyesület).toBe("HOLE HUNTERS");
        expect(Versenyző2.egyesület).toBe("ROYAL FOOTGOLF CLUBS");
    });

    it("Versenyző pontjainak tesztelése", async () => {
        const pontok: number[] = [0, 0, 10, 10, 0, 0, 0, 10];
        pontok.sort((a, b) => a - b);
        expect(Versenyző1.pontok).toEqual(pontok);
        
        const pontok2: number[] = [74,74,80,74,74,80,80,74];
        pontok.sort((a, b) => a - b);
        expect(Versenyző2.pontok).toEqual(pontok);

    });

    it("Versenyző összpontszáma", async () => {
        expect(Versenyző1.osszpontSzam).toBe(30);
        expect(Versenyző2.osszpontSzam).toBe(610);
    });
});
