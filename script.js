// Udregner hvor mange penge hver person skal betale
// til hvem for at alle har betalt lige meget

// Finder antallet af personer
const personer = document.getElementById("personer");
const personButton = document.getElementById("ps");

let x = 0;
let n = 0;

personButton.onclick = function(){
    x = personer.value;
    
    // Fjerner det gamle html
    const list = document.getElementById("list")
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }

    const bt = document.getElementById("bt")
    while (bt.hasChildNodes()) {
        bt.removeChild(bt.firstChild);
    }

    // Tilføjer ny liste for hver person
    for (let i = 0; i < x; i++) {
        const div = document.createElement("div");
        div.innerHTML = `<li class="list-group-item p-3 person" id=${i}>
        <div class="row p-3">
            <div class="col-auto">
                <label class="col-form-label">Navn:</label>
            </div>
            <div class="col-auto"><input type="text" class="form-control" id="${"navn" + i}"></div>
        </div>
        <ul class="list-group" id="${"bl" + i}">
            
        </ul>
        <div class="col p-2">
            <button class="btn btn-secondary" id="${"btn" + i}">Tilføj betaling</button>
        </div>
    </li>`
        list.appendChild(div);
        // Tilføjer betalings knappens funktion
        const betalingBtn = document.getElementById("btn" + i);
        betalingBtn.onclick = function() {
            const div = document.createElement("div");
            div.innerHTML = `<li class="list-group-item" id="${"b" + n}">
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" placeholder="Hvad">
                </div>
                <div class="col">
                    <input type="number" class="form-control personUdgift" placeholder="Hvor meget">
                </div>
                <div class="col-auto">
                    <button class="btn btn-danger" id="${"db" + n}">X</button>
                </div>
            </div>
        </li>`
            document.getElementById("bl" + i).appendChild(div);
        
            document.getElementById("b" + n).querySelector("button").onclick = function(){
                const dbId = this.id.substr(2);
                document.getElementById("b" + dbId).remove();
            }
            n++;
        }
    } 

    // Check for uBtn
    if(document.getElementById("uBtn") == null) {
        const uBtn = document.createElement("div");
        uBtn.innerHTML = `<button class="btn btn-primary ms-5" id="uBtn">Udregn</button>`
        list.insertAdjacentElement("afterend", uBtn)
        // Tilføjer funktionen
        uBtn.onclick = uClick;
    }
}

// Udregner betalingerne
function uClick() {
    let udgifter = [];
    const personDiv = document.getElementsByClassName("person");
    // Laver liste over udgifter
    for (let i = 0; i < x; i++) {
        let u = []
        let pd = personDiv[i];
        let personUdgifter = pd.getElementsByClassName("personUdgift");

        for (let j = 0; j < personUdgifter.length; j++) {
            u.push(personUdgifter[j].value);
        }
        udgifter.push(u);
    }

    let totalSamlet = 0;
    let totalPerson = [];

    // Finder det totale for personer og samlet
    for (let i = 0; i < x; i++) {
        let sum = 0
        for (let j = 0; j < udgifter[i].length; j++){
            if (parseFloat(udgifter[i][j])) {
                sum += parseFloat(udgifter[i][j]);
            }   
        }
        totalSamlet += sum;
        totalPerson.push(sum);
    }

    // Finder hvor meget hver person skylder
    let divTotal = totalSamlet / x;
    let dif = [];
    for (let i = 0; i < x; i++) {
        dif.push(totalPerson[i] - divTotal);
    }

    // Udregner betalingerne
    let betalinger = [];
    for (let i = 0; i < x; i++) {
        if (dif[i] >= 0) {
            betalinger.push([0]);
            continue;
        }

        // Finder overførselerne for hver person
        betalinger.push({});
        for (let j = 0; j < x; j++) {
            if (dif[j] > 0) {
                let overførsel = Math.min(dif[j], dif[i] * -1);
                betalinger[i][j] = overførsel;

                dif[i] += overførsel;
                dif[j] -= overførsel;

                if (dif[i] === 0) {
                    break;
                }
            }
        }
    }

    // Finder navne
    let navne = [];
    for (let i = 0; i < x; i++) {
        let navn = document.getElementById("navn" + i).value;
        if (navn.length == 0) {
            navn = "Person " + (i + 1)
        }
        navne.push(navn)
    }

    const bt = document.getElementById("bt")
    while (bt.hasChildNodes()) {
        bt.removeChild(bt.firstChild);
    }

    // Skriver betalingerne
    for (let i = 0; i < x; i++) {
        if (betalinger[i] != 0){
            for (let key in betalinger[i]) {
                bText = document.createElement("h3");
                bText.innerHTML = navne[i] + " skal betale " + betalinger[i][key] + " til " + navne[key];
                bt.appendChild(bText);
            }
        }
    }
}