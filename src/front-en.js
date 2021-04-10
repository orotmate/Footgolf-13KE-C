

let fileFetch = fetch("/osszpontFF.txt");
fileFetch
    .then(resolve => {
        return resolve.text();
    })
    .then(text => {
        const object = document.querySelector("form");
        const insert = document.createElement("ul");
        object.insertAdjacentHTML("beforeend", "<h3>osszpontFF.txt(Részlet):</h3>");
        let list;
        const ff = text.split("\n", 5);

        for (let i = 0; i < 5; i++) {

            list = document.createElement("li");
            list.innerText = ff[i];
            insert.insertAdjacentElement("beforeend", list);
        }
        object.insertAdjacentElement("afterend", insert);
    })
    .catch(error => console.log(error));
