
// fetch API a szerverrel való kommunikációhoz.
// Ez küld egy kérést mikor a böngésző betölti a scriptet és lefuttatja
// classicus prommise based megoldást használtam amely azt takarja, hogy egy promise objectumot generál és ad vissza a fetch metódus
// https://javascript.info/promise-basics itt találhattok egy nagyszerű leírást.
// abban található a response is melyet belepumpál a .then() metódusba akárcsak a map(items, index, array)-nál az autómatikusan paraméterként felhasználható Tömb itemek.


let fileFetch = fetch("/osszpontFF.txt");
fileFetch
    .then(resolve => {
        return resolve.text();
        // ebből a resolve paraméterből át kell alakítanom és analizálnom kell .text() metodussal  respons tartalmát, mely egy ujjab promise-t ad vissza
        // a promise eredményét a következő then() ben elérhetem.
    })
    .then(text => {
        // itt már a response tartalmát textként elérhetem és felhasználhatom.
        // össze állítok egy pár elemet és HTML-t hogy szebben jelenítsem meg a file tartalmát.
        const object = document.querySelector("form");
        const insert = document.createElement("ul");
        object.insertAdjacentHTML("beforeend", "<h3>osszpontFF.txt(Részlet):</h3>");
        let list;
        const ff = text.split("\n", 5);
        // nem kell az egész file elég csak az első 5 elem.

        for (let i = 0; i < 5; i++) {

            list = document.createElement("li");
            list.innerText = ff[i];
            insert.insertAdjacentElement("beforeend", list);
        }
        object.insertAdjacentElement("afterend", insert);
    })
    .catch(error => console.log(error));
    // bármiféle hiba esetén pusztán kiiratom a szervertől kapott hibaüzenetet.
    // összetetteb hiba kezelés még szükséges.