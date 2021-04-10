import fs from "fs";
import http from "http";
import url from "url";
import Megoldás from "./Megoldás";
import Versenyző from "./Versenyző";

export default class Content {
    public static content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        } else if (req.url === "/front-en.js") {
            // Router a script általi statikus file kérésre
            // Streamekkel is meglehetett volna oldani de maradtam az alap callback-es teljes bufferes versional.
            // Még lehet átírom, hogy modernebb legyen és praktikusabb.
            // valamint komolyabb hibakezelés még szükséges.

            fs.readFile("./src/front-en.js", (err, data) => {
                if (err) {
                    res.writeHead(404);
                    console.log(err);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200, { "Content-Type": "text/javascript" });
                res.end(data);
                return;
            });
        } else if (req.url === "/osszpontFF.txt") {
            // Router a fetch() API kérésére
            fs.readFile("./osszpontFF.txt", (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }

                res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
                res.end(data);
                return;
            });
        } else if (req.url === "/") {
            // Kellet külön egy Router a root / - hoz mivel nem tudtam a front-en.js statikus filet máshogyan feltölteni.
            // Weboldal inicializálása + head rész:
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.write("<!DOCTYPE html>");
            res.write("<html lang='hu'>");
            res.write("<head>");
            res.write("<style>\
                        input, pre {font-family:monospace; font-size:1em; font-weight:bold;} \
                        li {list-style-type: none;}\
                        </style>");
            res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
            res.write("<title>Jedlik Ts Template</title>");
            res.write("</head>");
            res.write("<body><form><pre>");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

            // Kezd a kódolást innen -->

            const megoldás: Megoldás = new Megoldás("fob2016.txt");
            res.write(`3. feladat: Versenyzők száma: ${megoldás.versenyzőkSzáma}\n`);
            res.write(`4. feladat: A női versenyzók aránya: ${((megoldás.nőiVersenyzőkSzáma / megoldás.versenyzőkSzáma) * 100).toFixed(2)}%\n`);
            res.write("6. feladat: A bajnok női versenyző");
            const nőiBajnok = megoldás.nőiBajnok;
            res.write(`\tNév: ${nőiBajnok.név}`);
            res.write(`\tEgyesület: ${nőiBajnok.egyesület}`);
            res.write(`\tÖsszpont: ${nőiBajnok.osszpontSzam}\n`);
            res.write(`8. feladat: Egyesület statisztika: ${-1}\n`);

            // <---- Fejezd be a kódolást

            res.write("</pre></form>");

            res.write(`<script src="front-en.js" type="text/javascript"></script>`);
            res.write("</body></html>");
            res.end();
            return;
            // Mindenhol meghagytam a returnt; ha esetleg később szükség lessz rá. Egyenlőre nem szükséges mivel a kód így is úgy is leáll az
            // adott if vagy else if teljesülése eseten és end() miatt le is zárja a responset.
        }
    }
}
