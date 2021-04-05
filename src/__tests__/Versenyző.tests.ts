import Versenyző from "../Versenyző";

describe("Versenyző osztály unit tesztek", () => {
    const Versenyző1: Versenyző = new Versenyző("Albert Laszlo;Felnott ferfi;HOLE HUNTERS;0;0;10;10;0;0;0;10");

    it("Versenyző osztálypéldány ellenőrzése", async () => {
        expect(Versenyző1).toBeInstanceOf(Versenyző);
    });

    it("Versenyző adatainak ellenőrzése", async () => {
        expect(Versenyző1.név).toBe("Albert Laszlo");
    });

    it("Versenyző kategória", async () => {
        expect(Versenyző1.kategória).toBe("Felnott ferfi");
    });

    it("Versenyző adatainak ellenőrzése", async () => {        
        expect(Versenyző1.egyesület).toBe("HOLE HUNTERS");
    });

    it("Versenyző pontjainak tesztelése", async () => {
        const pontok: number[] = [0, 0, 10, 10, 0, 0, 0, 10];
        pontok.sort((a, b) => a - b);
        expect(Versenyző1.pontok).toEqual(pontok);
    });

    it("Versenyző összpontszáma", async () => {
        expect(Versenyző1.osszpontSzam).toBe(30);
    });
});
