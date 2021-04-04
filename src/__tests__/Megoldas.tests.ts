import Megoldás from "../Megoldás";
// Megoldás test.

describe("Megoldás osztály tesztelése", () => {
    const Meg: Megoldás = new Megoldás("fob2016.txt");

    it("Osztálypéldány ellenörzése", async () => {
        expect(Meg).toBeInstanceOf(Megoldás);
    });

    it("Versenyzők száma", async () => {
        expect(Meg.versenyzőkSzáma).toBe(77);
    });

    it("Női versenyzők száma", async () => {
        expect(Meg.nőiVersenyzőkSzáma).toBe(9);
    });

    it("Női bajnok", async () => {
        expect(Meg.nőiBajnok.név).toBe("Major Ilona");
    });
});
