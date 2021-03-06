function nascondiPagine(list) {
    for (var K = 0; K < list.length; K++) {
        list[K].style.display = 'none';
    }
}


let santoli15 = { // tutto il codice che serve  per il giochino/dedica in home

    init: function() {
        for (let square of document.querySelectorAll("#santoli15 .square")) { // imposta l'evento al click sui riquadri non vuoti: invert e checkwin e avvia il gioco una prima volta

            if (!square.classList.contains("void")) {
                square.addEventListener("click", function() {
                    santoli15.invert(this);
                    santoli15.checkWin()
                });
            }
        }
        document.querySelector("#santoli15 .win").addEventListener("click", santoli15.start15); // imposta l'evento al click sull'immagine completa che fa ripartire il gioco
        santoli15.start15();
    },

    start15: function() { // avvio del gioco: sposta sotto la faccia completa ed esegue 10000 mosse casuali (la maggior parte saranno ignorate perché non lecite)
        document.querySelector("#santoli15 .win").style.zIndex = -5;
        for (let i = 0; i < 10000; i++) {
            santoli15.invert(document.getElementsByClassName("square")[Math.floor(Math.random() * 15)])
        }
    },



    invert: function(toInvert) { //dato un riquadro lo scambia con il riquadro void se ha verificato che è una mossa lecita, altrimenti non fa nulla
        let voidSquare = document.getElementsByClassName("void")[0];

        let distance = toInvert.style.order - voidSquare.style.order
        if ((distance == 1 && voidSquare.style.order % 4) || distance == -1 && toInvert.style.order % 4 || distance == 4 || distance == -4) {
            let a = toInvert.style.order;
            toInvert.style.order = voidSquare.style.order;
            voidSquare.style.order = a;
        }


    },


    checkWin: function() { //verifica la vittoria: se l'ordine dei riquadri corrisponde all'ordine delle foto sposta in alto l'immagine completa
        let squares = document.getElementsByClassName("square")

        let win = true
        for (let place = 0; place < squares.length; place++) {
            if (place + 1 != squares[place].style.order) {
                win = false
            }
        }

        if (win) {

            document.querySelector("#santoli15 .win").style.zIndex = 5;

        }
    }
}



// INIZIO FUNZIONI FRANCESCO

function francescoInit() {


    document.getElementById("francescoContainer").addEventListener("mousemove", function(event) { //monitora posizione del mouse rispetto al container

        francescoMousePosition.top = event.clientY - document.getElementById("francescoContainer").getBoundingClientRect().top
        francescoMousePosition.left = event.clientX - document.getElementById("francescoContainer").getBoundingClientRect().left

    })


    document.querySelector("#francescoContainer").addEventListener("mouseenter", function() { //avvia nuova partita all'ingresso
        francescoNewGame();
    })



}

function francescoNewGame() {

    let gameLevelsPaces = [30, 50, 70, 90, 110, 130, 150] //tempo del gioco, in millisecondi per passo
    let gameLevelsColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

    let level = gameLevelsPaces.length;
    let levelTime = 3000; //durata di un livello, in millisecondi
    let levelTimeLeft = levelTime;
    let stride = 25; //distanza percorsa per passo
    let francescoJustCaught = false;
    let tryLeft = 5; // numero di "vite" a inizio sfida
    let francescoInterval; // referenza all'animazione

    document.getElementById("francescoVite").innerHTML = disegnaVite(tryLeft)
    document.getElementById("francescoLevelUp").style.backgroundImage = "none";
    document.getElementById("francescoTryLeftBox").innerHTML = "Scappa!!! <br>ma non essere codardo: se esci dal quadrato il gioco si resetta";



    function mouseEvilDistance() { // calcola la distanza
        return Math.sqrt((francescoMousePosition.top - francescoEvilPosition.top) * (francescoMousePosition.top - francescoEvilPosition.top) + (francescoMousePosition.left - francescoEvilPosition.left) * (francescoMousePosition.left - francescoEvilPosition.left))
    }

    function disegnaVite(numero) {
        let stringaVite = "";
        for (let index = 0; index < numero; index++) {
            stringaVite += "<img src=\"immagini/francesco/ghost30.png\" alt = \"fantasmino\">";

        }
        return stringaVite;
    }


    function francescoNextLevel() {
        level--;
        clearInterval(francescoInterval)

        if (level < 0) {
            document.getElementById("francescoTryLeftBox").innerHTML = `ok, hai spaccato, lo ammetto`;
            francescoCentraEvil();
        } else {
            levelTimeLeft = levelTime;
            document.getElementById("francescoLevelUp").style.transition = "0ms linear"
            document.getElementById("francescoLevelUp").style.heigth = "100%";

            francescoInterval = setInterval(francescoMuovi, gameLevelsPaces[level]) // Avvio animazione
            document.getElementById("francescoEvil").style.transition = "top " + gameLevelsPaces[level] + "ms linear, left " + gameLevelsPaces[level] + "ms linear";
            document.getElementById("francescoEvil").style.transition = "all " + gameLevelsPaces[level] + "ms linear";

            document.getElementById("francescoLevelUp").style.transition = gameLevelsPaces[level] + "ms linear";
            document.getElementById("francescoLevelUp").style.backgroundColor = gameLevelsColors[level];



        }

    }


    function francescoMuovi() { // intelligenza del movimento

        if (!francescoJustCaught) {
            if (mouseEvilDistance() < francescoEvilPosition.radius) {
                francescoCaugth();
            } else {
                let angle = Math.atan((francescoMousePosition.top - francescoEvilPosition.top) / (francescoMousePosition.left - francescoEvilPosition.left));
                if (francescoMousePosition.left < francescoEvilPosition.left) {
                    angle += Math.PI;
                }

                while (angle - francescoEvilPosition.angle < -Math.PI) {
                    angle += 2 * Math.PI;
                }


                while (angle - francescoEvilPosition.angle > Math.PI) {
                    angle -= 2 * Math.PI;
                }


                francescoEvilPosition.angle = angle;
                francescoEvilPosition.top += Math.sin(angle) * stride;
                francescoEvilPosition.left += Math.cos(angle) * stride;
                francescoEvilPosition.update();
                levelTimeLeft -= gameLevelsPaces[level];
                document.getElementById("francescoLevelUp").style.height = (levelTimeLeft * 100 / levelTime) + "%";
                if (levelTimeLeft <= 0) {
                    francescoNextLevel()

                }
            }
        }
    }


    function francescoCentraEvil() { //reset al centro

        francescoEvilPosition.top = 250;
        francescoEvilPosition.left = 250;
        francescoEvilPosition.angle = 0;
        francescoEvilPosition.update();

    }

    function francescoQuit() {
        clearInterval(francescoInterval); //stop animazione
        francescoCentraEvil();
        document.getElementById("francescoContainer").removeEventListener("mouseleave", francescoQuit);
        document.getElementById("francescoLevelUp").style.height = "100%";
        document.getElementById("francescoLevelUp").style.backgroundImage = "linear-gradient(violet, indigo, blue, green, yellow, orange, red)"

        document.getElementById("francescoTryLeftBox").innerHTML = "Sei uscito, rientra nel quadrato per ricominciare la sfida";
    }

    document.getElementById("francescoContainer").addEventListener("mouseleave", francescoQuit);

    function francescoCaugth() {
        francescoCentraEvil();
        francescoJustCaught = true;
        tryLeft--;
        document.getElementById("francescoVite").innerHTML = disegnaVite(tryLeft)


        if (tryLeft > 0) {
            setTimeout(function() { francescoJustCaught = false; }, gameLevelsPaces[gameLevelsPaces.length - 1] * 4);
        }else{
            document.getElementById("francescoTryLeftBox").innerHTML = "Hai perso, esci dal quadrato per resettare";

        }
    }



    document.getElementById("francescoContainer").addEventListener("mouseleave", francescoQuit); //controlla la fuga
    francescoNextLevel(); //fa partire il primo livello
}


let francescoMousePosition = {
    top: 250,
    left: 250
}



let francescoEvilPosition = {
    top: 250,
    left: 250,
    radius: 20,
    angle: Math.PI,
    update: function() {

        francescoEvilPosition.top = Math.max(this.radius, Math.min(500 - this.radius, francescoEvilPosition.top))
        francescoEvilPosition.left = Math.max(this.radius, Math.min(500 - this.radius, francescoEvilPosition.left))
        document.getElementById("francescoEvil").style.transform = "rotate(" + this.angle + "rad)";

        document.getElementById("francescoEvil").style.top = (francescoEvilPosition.top - this.radius) + "px";
        document.getElementById("francescoEvil").style.left = (francescoEvilPosition.left - this.radius) + "px";

    }
}







// FINE FUNZIONI FRANCESCO





//INIZIO FUNZIONI LUCA MORO

//creo una lista di oggetti
lucalista = [
    {
        Nome: 'Tizio',
        Cognome: 'Bello',
        Eta: 20
    },
    {
        Nome: 'Antonio',
        Cognome: 'Cere',
        Eta: 10
    },
    {
        Nome: 'Cristiano',
        Cognome: 'Ronaldo',
        Eta: 35
    },
    {
        Nome: 'Luca',
        Cognome: 'Moro',
        Eta: 25
    },
    {
        Nome: 'Tizio',
        Cognome: 'Bello',
        Eta: 20
    },
    {
        Nome: 'Massimo',
        Cognome: 'Santoli',
        Eta: 37
    },
    {
        Nome: 'Sara',
        Cognome: 'La Pietra',
        Eta: 18
    },
    {
        Nome: 'Giuseppe',
        Cognome: 'Rossi',
        Eta: 50
    },
]

//funzione crea lista
function lucacreateTableFromList(contenitoreid, lista) {

    var contenitore = document.getElementById(contenitoreid)

    var nuovatabella = document.createElement('table')
    nuovatabella.setAttribute('id', 'lucatabella')
    contenitore.append(nuovatabella)

    var thead = document.createElement('thead')
    thead.setAttribute('id', 'lucathead')
    nuovatabella.append(thead)

    for (var key in lista[0]) {
        var th = document.createElement('th')
        th.setAttribute('id', 'lucath')
        th.innerHTML = key
        thead.append(th)
    }

    var tbody = document.createElement('tbody')
    tbody.setAttribute('id', 'lucatbody')
    nuovatabella.append(tbody)


    for (var key of lista) {
        var tr = document.createElement('tr')

        tr.setAttribute('id', 'lucatr')
        tr.setAttribute('style', 'color: black')

        tbody.append(tr)

        for (var persone in key) {
            var td = document.createElement('td')
            td.setAttribute('id', 'lucatd')
            td.innerHTML = key[persone]
            tr.append(td)
        }

        //al click colora il font delle righe di blu
        var elements = document.getElementById('lucatabella').rows;

        for (var i = 0; i < elements.length; i++) {

            elements[i].addEventListener("click", function () {
                this.style.color = 'blue';
            });
        }
    }
}

//richiamo la funzione per creare la lista
lucacreateTableFromList('lucacontenitore1', lucalista)

//funzione per filtrare la lista
function lucafiltra_lista(lista, filtro) {
    var risultato = []
    for (var i = 0; i < lista.length; i++) {
        var oggetto = lista[i]

        for (var key in oggetto) {
            if (oggetto[key].toString().toLowerCase().indexOf(filtro.toLowerCase()) !== -1) {
                risultato[risultato.length] = oggetto
                break;

            }

        }

    }

    return risultato
}

//assegno alla variabile lucailmioinput l'elemento input presente nel file index
var lucailmioinput = document.getElementById('lucailmioinput')

//creo l'evento input per il filtro lista
lucailmioinput.addEventListener('input', function () {

    //nascondo la tabella iniziale
    document.getElementById('lucacontenitore1').innerText = '';


    //assegno ad 'x' ciò che inserisco nel mio input
    var x = lucailmioinput.value

    var lista_filtrata = lucafiltra_lista(lucalista, x)


    //se l'input è vuoto non creo la tabella filtrata
    if (lucailmioinput.value == "") {

        document.getElementById('lucacontenitore1').innerText = '';
        lucacreateTableFromList('lucacontenitore1', lucalista)


    } else {
        document.getElementById('lucacontenitore1').innerText = '';
        lucacreateTableFromList('lucacontenitore1', lista_filtrata)

    }

})


//assegno alla variabile lucarecord il pulsante prensente nel file index
var lucarecord = document.getElementById('lucaaggiungi');

//creo l'evento click
lucarecord.addEventListener('click', function lucaaggiungi() {

    //creo un oggetto con i valori inseriti nel form
    var oggetto = {
        'Nome': document.getElementById('lucanome').value,
        'Cognome': document.getElementById('lucacognome').value,
        'Eta': document.getElementById('lucaetà').value,
    }

    //aggiungo gli elementi inseriti nel form, nella lista iniziale
    lucalista.push(oggetto);

    document.getElementById('lucacontenitore1').innerText = '';
    lucacreateTableFromList('lucacontenitore1', lucalista)

})



//Assegno alla variabile lucaTop il pulsante 'sposta' presente in index
var lucaTop = document.getElementById('lucaTop')

//assegno alla variabile 'avviso' il paragrafo prensente in index
var avviso = document.getElementById('lucaAvviso');
//lo nascondo all'inizio
avviso.style.display = "none";

//creo l'evento per spostare le righe selezionate
lucaTop.addEventListener('click', function () {
    var table = document.getElementById("lucatabella");

    var elements = document.getElementsByTagName('tr');

    //sposto le righe di colore 'blu'
    for (j = 0; j < elements.length; j++) {

        //controllo se il colore è blu
        if (elements[j].style.color == 'blue') {
            var tab = document.getElementById('lucatabella').rows[j]

            //prima riga della tabella
            var firstRow = table.rows[0];

            //td presenti nella riga che seleziono
            var elSposta = elements[j].childNodes;

            //td presenti nella prima riga della tabella
            var elFirstRow = firstRow.childNodes;

            //creo un ciclo per iterare tutti i td presenti nelle righe
            for (a = 0; a < elSposta.length; a++) {

                //controllo se i contenuti delle righe sono uguali
                if (elSposta[a].innerText == elFirstRow[a].innerText) {

                    //se sono uguali non sposta la riga

                    //mostro il paragrafo e gli assegno lo stile
                    document.getElementById('lucaAvviso').style.display = "block";
                    document.getElementById('lucaAvviso').style.color = "red";
                    document.getElementById('lucaAvviso').style.fontSize = "30px";

                } else {
                    //sposta le righe non uguali
                    firstRow.parentNode.insertBefore(tab, firstRow);

                    //nascondo il paragrafo
                    document.getElementById('lucaAvviso').style.display = "none";
                }

            }
        }
    }

    //al click sul pulsante le righe ritornano di colore nero
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.color = 'black';

    }
})


//inizio esercizio request API pubblica

//funzione crea lista
function luca2createTableFromList(lista) {

    var contenitore = document.getElementById("lucacontenitore2")

    var nuovatabella = document.createElement('table')
    nuovatabella.setAttribute('id', 'lucatab2')
    contenitore.append(nuovatabella)

    var thead = document.createElement('thead')
    thead.setAttribute('id', 'lucathead')
    nuovatabella.append(thead)

    for (var key in lista[0]) {
        var th = document.createElement('th')
        th.setAttribute('id', 'lucath')
        th.innerHTML = key
        thead.append(th)
    }

    var tbody = document.createElement('tbody')
    tbody.setAttribute('id', 'lucatbody')
    nuovatabella.append(tbody)

    for (var key of lista) {
        var tr = document.createElement('tr')
        tr.setAttribute('id', 'lucatr')
        tbody.append(tr)

        for (var persone in key) {
            var td = document.createElement('td')
            td.setAttribute('id', 'lucatd')
            td.innerHTML = key[persone]
            tr.append(td)
        }
    }
}

// Creo l'oggetto richiesta
var lucarequest = new XMLHttpRequest()

var lucaonresponse = function () {
    var response = lucarequest.response

    // Converto i dati da JSON a js
    var dati = JSON.parse(response)

    //controllo se la richiesta va a buon fine
    if (lucarequest.status === 200) {
        luca2createTableFromList(dati)
    } else {
        var contenitore = document.getElementById('lucacontenitore2')
        contenitore.innerText = 'Errore: ' + lucarequest.status
    }

    //assegno alla variabile lucailmioinput2 l'elemento input presente nel file index
    var lucailmioinput2 = document.getElementById('lucailmioinput2')

    //creo l'evento input per il filtro lista
    lucailmioinput2.addEventListener('input', function () {

        //nascondo la tabella iniziale
        document.getElementById('lucacontenitore2').innerText = '';


        //assegno ad 'x' ciò che inserisco nel mio input
        var x = lucailmioinput2.value

        var lista_filtrata = lucafiltra_lista(dati, x)


        //se l'input è vuoto non creo la tabella filtrata
        if (lucailmioinput2.value == "") {

            document.getElementById('lucacontenitore2').innerText = '';
            lucacreateTableFromList('lucacontenitore2', dati)


        } else {
            document.getElementById('lucacontenitore2').innerText = '';
            lucacreateTableFromList('lucacontenitore2', lista_filtrata)

        }

    })

    //assegno alla variabile lucarecord2 il pulsante prensente nel file index
    var lucarecord2 = document.getElementById('lucaaggiungi2');

    //creo l'evento click
    lucarecord2.addEventListener('click', function lucaaggiungi2() {

        //creo un oggetto con i valori inseriti nel form
        var oggetto = {
            'userID': document.getElementById('lucauser').value,
            'id': document.getElementById('lucaid').value,
            'title': document.getElementById('lucatitle').value,
            'body': document.getElementById('lucabody').value
        }

        //aggiungo gli elementi inseriti nel form
        dati.push(oggetto);

        document.getElementById('lucacontenitore2').innerHTML = ""
        luca2createTableFromList(dati)
    })

}

lucarequest.addEventListener('loadend', lucaonresponse)

lucarequest.open('GET', 'https://jsonplaceholder.typicode.com/posts')
// Eseguo la richiesta
lucarequest.send()



//fine funzioni Luca Moro











//funzioni Sefora
document.getElementById('submit_sef').addEventListener('click', validazioneSef);
document.getElementById('eyeshow').addEventListener('click', hideshow_sef);
//funzione reset Form
document.getElementById('reset_sef').addEventListener('click', function() {
    var form_sef = document.getElementById("form_sef");
    form_sef.reset();
    success_msg.setAttribute("hidden", true);
    document.getElementById('alertName').setAttribute("hidden", true);
    document.getElementById('alertLastName').setAttribute("hidden", true);
    document.getElementById('alertGender').setAttribute("hidden", true);
    document.getElementById('alertGender2').setAttribute("hidden", true);
    document.getElementById('alertSelect1').setAttribute("hidden", true);
    document.getElementById('alertRadio').setAttribute("hidden", true);
    document.getElementById('alertSelect2').setAttribute("hidden", true);
    document.getElementById('emailAlert').setAttribute("hidden", true);
    document.getElementById('alertPass').setAttribute("hidden", true);

});
//funzione validazione Form
function validazioneSef() {
    var succesSef = true; // variabile booleana settata per il button di submit
    var name = document.getElementById('name').value;
    var lastName = document.getElementById('lastName').value;
    var female = document.getElementById('female').checked;
    var male = document.getElementById('male').checked;
    var freetobe = document.getElementById('freetobe').checked;
    var select = document.getElementById('select_sef').value;
    var parterre = document.getElementById('parterre').checked;
    var tribuna = document.getElementById('tribuna').checked;
    var vip = document.getElementById('vip').checked;
    var select_pagamento = document.getElementById('select_pagamento').value;
    var send = document.getElementById('submit_sef').value;
    var success_msg = document.getElementById('success_msg');
    var mail_sef = document.getElementById('email_Sef').value;
    var sef_password = document.getElementById('pass_sef').value;

    //viene controllato ogni campo del form
    if (name == "") {
        succesSef = false;
        document.getElementById('alertName').removeAttribute("hidden");
    } else {
        document.getElementById('alertName').setAttribute("hidden", true);
    }
    if (lastName == "") {
        succesSef = false;
        document.getElementById('alertLastName').removeAttribute("hidden");
    } else {
        document.getElementById('alertLastName').setAttribute("hidden", true);
    }
    if (female == false && male == false && freetobe == false) {
        succesSef = false;
        document.getElementById('alertGender').removeAttribute("hidden");
    } else {
        document.getElementById('alertGender').setAttribute("hidden", true);
    }
    var qta = 0;
    var gender = [female, male, freetobe]
    for (i = 0; i < gender.length; i++) {
        if (gender[i] == true) {
            qta += 1;
        }
    }
    if (qta >= 2) {
        succesSef = false;
        document.getElementById('alertGender2').removeAttribute("hidden");
    } else {
        document.getElementById('alertGender2').setAttribute("hidden", true);
    }
    if (select == "Open this selection menu") {
        succesSef = false;
        document.getElementById('alertSelect1').removeAttribute("hidden");
    } else {
        document.getElementById('alertSelect1').setAttribute("hidden", true);
    }
    if (parterre == false && tribuna == false && vip == false) {
        succesSef = false;
        document.getElementById('alertRadio').removeAttribute("hidden");
    } else {
        document.getElementById('alertRadio').setAttribute("hidden", true);
    }
    if (select_pagamento == "") {
        succesSef = false;
        document.getElementById('alertSelect2').removeAttribute("hidden");
    } else {
        document.getElementById('alertSelect2').setAttribute("hidden", true);
    }
    if (succesSef == true) {
        success_msg.removeAttribute("hidden");
    } else {
        success_msg.setAttribute("hidden", true);
    }
    if (mail_sef == "") {
        succesSef = false;
        document.getElementById('emailAlert').removeAttribute("hidden");
    } else {
        document.getElementById('emailAlert').setAttribute("hidden", true);
    }
    if (sef_password == "") {
        succesSef = false;
        document.getElementById('alertPass').removeAttribute("hidden");
    } else {
        document.getElementById('alertPass').setAttribute("hidden", true);
    }
    event.preventDefault();
}
//function hide/show Password
function hideshow_sef() {
    var pass = document.getElementById('pass_sef');
    if (pass.type === "password") {
        pass.type = "text";
    } else {
        pass.type = "password";
    }
}
// fine funzioni sefora






///////////////Codice Momo//////////////////
document.getElementById("bottone").addEventListener('click', ValidazioneMailMoo)

var showHidePass = document.getElementById("showHidePass") // variabile per mostra e nascondi password

//Evento per mostrare e nascondere password tramite un checkbox
showHidePass.addEventListener('click', function (event) {

    if (showHidePass.checked) {
        pass.type = 'text'
        confPass.type = 'text'
        console.log(pass.type, confPass.type)
    } else {
        pass.type = 'password'
        confPass.type = 'password'
        console.log(pass.type, confPass.type)
    }
})


function ValidazioneMailMoo() {

    //Variabili per mostrare errori
    var sesso = document.getElementById("sesso");//radio
    var classe = document.getElementById("classe")//checkbox
    var viaggio = document.getElementById("viaggio")//checkbox


    //variabili globasli per funzionamento form
    var nome = document.getElementById("nome")
    var cognome = document.getElementById("cognome")
    var pass = document.getElementById("pass")
    var confPass = document.getElementById("confPass")
    var email = document.getElementById("email")
    var dataNascita = document.getElementById("data")
    var radio = document.getElementById("radio1")
    var radio2 = document.getElementById("radio2")
    var radio3 = document.getElementById("radio3")
    var casella = document.getElementById("box1")
    var casella2 = document.getElementById("box2")
    var casella3 = document.getElementById("box3")
    var selezione = document.getElementById("select")
    var numDoc = document.getElementById("numeroDocumento")
    var enteRil = document.getElementById("enteRilascio")
    var rilascio = document.getElementById("dataRilascio")
    var scadenza = document.getElementById("dataScadenza")
    var motivo1 = document.getElementById("motivo1")
    var motivo2 = document.getElementById("motivo2")
    var motivo3 = document.getElementById("motivo3")
    var motivo4 = document.getElementById("motivo4")
    var dataLimite = "1920-01-01";



    //variabili per controllo contenuto
    var contr_email = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-]{2,})+.)+([a-zA-Z0-9]{2,})+$/i;
    var contr_dati = /[a-zA-Z]/
    var contr_pass = /[a-zA-Z]+[0-9]/


    ///CONTROLLI////


    //Controllo nome        
    if (nome.value == "" || !contr_dati.test(nome.value)) {
        nome.classList.add("is-invalid")
        nome.classList.remove("is-valid")
    } else {
        nome.classList.remove("is-invalid")
        nome.classList.add("is-valid")
    }
    //Fine controllo nome



    //Controllo cognome       
    if (cognome.value == "" || !contr_dati.test(cognome.value)) {
        cognome.classList.add("is-invalid")
        cognome.classList.remove("is-valid")
    } else {
        cognome.classList.remove("is-invalid")
        cognome.classList.add("is-valid")
    }
    //Fine controllo cognome




    //Controllo password
    if (pass.value.length >= 8 && pass.value == confPass.value && contr_pass.test(pass.value)) {
        pass.classList.remove("is-invalid")
        pass.classList.add("is-valid")
    } else {
        pass.classList.add("is-invalid")
        pass.classList.remove("is-valid")
    }
    //Fine controllo password




    //Controllo email
    if (contr_email.test(email.value)) {
        email.classList.remove("is-invalid")
        email.classList.add("is-valid")

    } else {
        email.classList.add("is-invalid")
        email.classList.remove("is-valid")
    }
    //Fine controllo email



    //Conttollo data nascita       
    var data = new Date()
    var year = data.getFullYear()

    if (data.getMonth() + 1 < 10) {
        var month = data.getMonth() + 1;
        month = "0" + month
    } else {
        month = data.getMonth() + 1
    }

    var day = data.getDate()
    var dataFinale = year + "-" + month + "-" + day


    var data1 = new Date(dataNascita.value)
    var annoNascita = data1.getFullYear()
    var meseNascita = data1.getMonth() + 1
    var giornoNascitaa = data1.getDate()


    contr_magg = year - annoNascita
    contr_magg1 = month - meseNascita
    contr_magg2 = day - giornoNascitaa


    if (dataNascita.value == "" || dataNascita.value < dataLimite || dataNascita.value > dataFinale) {
        dataNascita.classList.add("is-invalid")
        dataNascita.classList.remove("is-valid")
    } else {
        if (contr_magg >= 18 && contr_magg1 >= 0 && contr_magg2 >= 0) {
            dataNascita.classList.remove("is-invalid")
            dataNascita.classList.add("is-valid")
        } else {
            dataNascita.classList.remove("is-invalid")
            dataNascita.classList.add("is-valid")
        }
    }
    //fine controllo data nascita






    //Controllo sesso
    if (radio.checked || radio2.checked || radio3.checked) {
        sesso.classList.remove("is-invalid")
        sesso.classList.add("is-valid")
    } else {
        sesso.classList.add("is-invalid")
        sesso.classList.remove("is-valid")
    }
    //Fine controllo sesso



    //Controllo classe
    if (casella.checked || casella2.checked || casella3.checked) {
        classe.classList.remove("is-invalid")
        classe.classList.add("is-valid")
    } else {
        classe.classList.add("is-invalid")
        classe.classList.remove("is-valid")
    }
    //Fine controllo classe




    //Controllo checkbox
    if (motivo1.checked || motivo2.checked || motivo3.checked || motivo4.checked) {
        viaggio.classList.remove("is-invalid")
        viaggio.classList.add("is-valid")
    } else {
        viaggio.classList.add("is-invalid")
        viaggio.classList.remove("is-valid")
    }
    //Fine controllo checkox








    //Controllo select 
    if (selezione.value >= 1) {
        selezione.classList.remove("is-invalid")
        selezione.classList.add("is-valid")
    } else {
        selezione.classList.add("is-invalid")
        selezione.classList.remove("is-valid")
    }
    //Fine controllo select






    //controllo numero documento
    if (numDoc.value.length == 9 && contr_dati.test(numDoc.value)) {
        numDoc.classList.remove("is-invalid")
        numDoc.classList.add("is-valid")
    } else {
        numDoc.classList.add("is-invalid")
        numDoc.classList.remove("is-valid")
    }
    //fine controllo nuemro documento




    //controllo ente rilascio
    if (enteRil.value == "" && !contr_dati.test(enteRil.value)) {
        enteRil.classList.add("is-invalid")
        enteRil.classList.remove("is-valid")
    } else {
        enteRil.classList.remove("is-invalid")
        enteRil.classList.add("is-valid")
    }
    //fine controllo ente rilascio







    //controllo data validita documento(10 anni)
    var dataDoc = new Date(rilascio.value)
    var annoRil = dataDoc.getFullYear()
    var meseRil = dataDoc.getMonth() + 1
    var giornoRil = dataDoc.getDate()


    var contr_yy = year - annoRil



    if (rilascio.value == "" || rilascio.value < dataLimite || rilascio.value > dataFinale) {
        rilascio.classList.add("is-invalid")
        rilascio.classList.remove("is-valid")
    } else {
        if (contr_yy == 10 && meseRil == month && giornoRil == day) {
            rilascio.classList.remove("is-invalid")
            rilascio.classList.add("is-valid")

        } else if (contr_yy == 10 && meseRil > month) {
            rilascio.classList.remove("is-invalid")
            rilascio.classList.add("is-valid")
        } else if (contr_yy >= 0 && contr_yy <= 9) {
            rilascio.classList.remove("is-invalid")
            rilascio.classList.add("is-valid")
            console.log("funziona")
        } else {
            rilascio.classList.add("is-invalid")
            rilascio.classList.remove("is-valid")
        }

    }
    //finr controllo data validità rilascio





    //controllo data validita documento(10 anni) scadenza
    var dataSca = new Date(scadenza.value)
    var annoSca = dataSca.getFullYear()
    var meseSca = dataSca.getMonth() + 1
    var giornoSca = dataSca.getDate()

    contr_y = annoSca - annoRil



    if (scadenza.value == "" || scadenza.value < dataLimite) {
        scadenza.classList.add("is-invalid")
        scadenza.classList.remove("is-valid")
    } else {
        if (contr_y == 10 && meseSca == meseRil && giornoSca == giornoRil) {
            scadenza.classList.remove("is-invalid")
            scadenza.classList.add("is-valid")
        } else {
            scadenza.classList.add("is-invalid")
            scadenza.classList.remove("is-valid")
        }
    }
    //finr controllo data validità




    pass.type = 'password'
    confPass.type = 'password'

}// Fine function

 /////////FINE CODICE MOMO ////////////////



 

//funzione di ale the best
//array img
var alessandro_imgs = ["immagini/img_ale/alessandro_1.jpg", "immagini/img_ale/alessandro_2.jpg", "immagini/img_ale/alessandro_4.jpg",
        "immagini/img_ale/alessandro_5.jpg", "immagini/img_ale/alessandro_6.jpg",
        "immagini/img_ale/alessandro_7.jpg", "immagini/img_ale/alessandro_8.jpg", "immagini/img_ale/alessandro_9.jpg",
        "immagini/img_ale/alessandro_10.png", "immagini/img_ale/alessandro_11.jpg", "immagini/img_ale/alessandro_13.jpg"
    ]
    //function principale
function alessandro_games() {
    // creo tutti gli elementi
    var root = document.getElementById("alessandro_root")
    var h1 = document.createElement("h1")
    var h2diff = document.createElement("h2")
    var h2 = document.createElement("h2")
    var img = document.createElement("img")
    var start = document.createElement("div")
    var facile = document.createElement("div")
    var media = document.createElement("div")
    var difficile = document.createElement("div")
    var tdpos = document.createElement("div")
    var tdneg = document.createElement("div")
    var restart = document.createElement("div")
        //imposto tutti gli elementi
    h1.id = "alessandro_h1"
    h1.innerHTML = "ATTACCO EPILETTICO"
    h2diff.id = "alessandro_h2diff"
    h2diff.innerHTML = "SCEGLI LA DIFFICOLTA' 👇🏻"
    h2.id = "alessandro_h2"
    h2.innerHTML = "PROVA A PRENDERE QUESTO PERSONAGGIO 👇🏻 5 VOLTE, MAX 15 ERRORI"
    img.id = "alessandro_img"
    start.id = "alessandro_start"
    start.innerHTML = "START"
    facile.id = "alessandro_facile"
    facile.innerHTML = "FACILE"
    media.id = "alessandro_media"
    media.innerHTML = "MEDIA"
    difficile.id = "alessandro_difficile"
    difficile.innerHTML = "DIFFICILE"
    tdpos.id = "alessandro_positivo"
    tdneg.id = "alessandro_negativo"
    restart.id = "alessandro_restart"
    restart.innerHTML = "RESTART"
        //appendo tutti gli elementi nel div
    root.prepend(h1)
    root.append(h2diff)
    root.append(h2)
    root.append(img)
    root.append(start)
    root.append(facile)
    root.append(media)
    root.append(difficile)
    root.append(tdpos)
    root.append(tdneg)
    root.append(restart)
        //livello facile
    facile.addEventListener("click", function() {
            facile.style.display = "none"
            media.style.display = "none"
            difficile.style.display = "none"
            h2diff.style.display = "none"
            diff = 500
            start.style.display = "flex"
        })
        //livello medio
    media.addEventListener("click", function() {
            facile.style.display = "none"
            media.style.display = "none"
            difficile.style.display = "none"
            h2diff.style.display = "none"
            diff = 350
            start.style.display = "flex"
        })
        //livello difficile
    difficile.addEventListener("click", function() {
            facile.style.display = "none"
            media.style.display = "none"
            difficile.style.display = "none"
            h2diff.style.display = "none"
            diff = 200
            start.style.display = "flex"
        })
        // evento dal click del bottone
    start.addEventListener("click", function() {
        start.style.display = "none"
            // preso img da id
        var img = document.getElementById('alessandro_img')
            // presa immagine random da array
        var imgrandom = alessandro_imgs[Math.floor(alessandro_imgs.length * Math.random())]
            // preso h2 con display none per poterlo far vedere una volte che si è premuto il pulsante
        var h2 = document.getElementById("alessandro_h2")
            // indicazioni su quale img bisogna targettare
        h2.style.display = "block"
            // nuovo tag img per far capire all' utente cosa deve cercare
        var imgofsearch = document.createElement("img")
            //l'appendo all' h2
        h2.append(imgofsearch)
            // setto tutti i parametri dell' img
        imgofsearch.id = "alessandro_img2"
        imgofsearch.style.position = "absolute"
        imgofsearch.style.left = "25%"
        imgofsearch.style.bottom = "15%"
        imgofsearch.style.border = "solid 2px white"
        imgofsearch.style.display = "block"
        imgofsearch.src = imgrandom
            //tempo necessario per vedere l 'img da trovare
        var timeout = setTimeout(function() {
                var img2 = document.getElementById("alessandro_img2")
                img2.style.display = "none"
                img.style.position = "absolute"
                img.style.left = "25%"
                img.style.bottom = "15%"
                img.style.border = "solid 2px white"
                h2.style.display = "none"
                img.style.display = "block"
                clearTimeout(timeout)
            }, 3000)
            //variabili settate a 0 per div giusto e sbagliato
        I = 0
        J = 0
            //click sull ' img
        img.addEventListener("click", function() {
                //se è uguale a quello random
                if (this.src == imgofsearch.src) {
                    tdpos.style.display = "flex"
                    I++
                    tdpos.innerHTML = "GIUSTE: " + I
                        //come da traccia si potrebbe inserire questo per riportare al click dell' img corretta all' inizio, ma se l' img fosse la
                        //prima sarebbe troppo facile quindi ho preferito non metterlo
                        //n=0
                        //5 click sull' img giusta per vincere
                    if (I == 5) {
                        var win = document.createElement("h1")
                        img.style.display = "none"
                        win.style.color = "WHITE"
                        win.innerHTML = "HAI VINTO CAMPIONE"
                        h1.append(win)
                            //ho inserito una canzone per rendere più eroica la vittoria
                        songwin = document.getElementById("alessandro_songwin")
                            // start della canzone
                        songwin.play()
                        restart.style.display = "flex"
                        tdpos.style.display = "none"
                        tdneg.style.display = "none"
                            //al click del restart si avvia un interval lungo il necessario per il video
                        clearInterval(interval)
                        restart.addEventListener("click", function() {
                            restartvid = document.getElementById("alessandro_restartvid")
                            restart.style.display = "none"
                            songwin.pause()
                            restartvid.style.display = "block"
                            win.style.display = "none"
                            restartvid.play()
                                //funzione che rimuevo tutto
                            setTimeout(function() {
                                restartvid.style.display = "none"
                                h1.remove()
                                h2diff.remove()
                                h2.remove()
                                img.remove()
                                start.remove()
                                facile.remove()
                                media.remove()
                                difficile.remove()
                                tdpos.remove()
                                tdneg.remove()
                                restart.remove()
                                alessandro_games()
                            }, 6800)
                        })
                    }
                } else {
                    //div sbagliate
                    tdneg.style.display = "flex"
                    J++
                    tdneg.innerHTML = "SBAGLIATE: " + J
                    if (J == 15) {
                        //stessa cosa di prima con click dell' img sbagliata
                        var lose = document.createElement("h1")
                        img.style.display = "none"
                        lose.style.color = "WHITE"
                        lose.innerHTML = "HAI PERSO"
                        h1.append(lose)
                        songlose = document.getElementById("alessandro_songlose")
                        songlose.play()
                        restart.style.display = "flex"
                        tdpos.style.display = "none"
                        tdneg.style.display = "none"
                        clearInterval(interval)
                        restart.addEventListener("click", function() {
                            //click fa apparire video e mette in pausa lò song
                            restartvid = document.getElementById("alessandro_restartvid")
                            restart.style.display = "none"
                            songlose.pause()
                            restartvid.style.display = "block"
                            lose.style.display = "none"
                            restartvid.play()
                                //stessa funzione di sopra
                            setTimeout(function() {
                                restartvid.style.display = "none"
                                h1.remove()
                                h2diff.remove()
                                h2.remove()
                                img.remove()
                                start.remove()
                                facile.remove()
                                media.remove()
                                difficile.remove()
                                tdpos.remove()
                                tdneg.remove()
                                restart.remove()
                                alessandro_games()
                            }, 6800)
                        })

                    }
                }
            })
            //intervallo per far cambiare le img
        var n = 0
        var interval = setInterval(function() {
            img.src = alessandro_imgs[n++]
            if (n == alessandro_imgs.length) {
                n = 0
            }
        }, diff);
    })
}
//richiamo della funzione
alessandro_games()


//funzione per inserire i numeri nella calcolatrice
function inserisci_ste(numero_ste) {
    var operazione_ste = document.getElementById('operazioni_ste');
    operazione_ste.value += numero_ste;



}
//funzione per il calcolo delle operazioni
function calcola_ste() {
    var operazione_ste = document.getElementById('operazioni_ste');
    operazione_ste.value = eval(operazione_ste.value);


}
//funzione per cancellare
function cancella_ste() {
    var operazione_ste = document.getElementById('operazioni_ste');
    operazione_ste.value = "";
}
//funzione per cambiare il colore al testo
function selezionecolore_ste() {
    colore_ste = document.getElementById('colore_ste');
    colore_label_ste = document.getElementById('colore_label_ste');
    colore_ste.value = colorebase_ste;
    colore_label_ste.value = colorebase_ste;
    colore_ste.addEventListener('input', testo_ste, false);
    colore_label_ste.addEventListener('input', testo_ste, false);
    colore_ste.addEventListener('change', cambia_ste, false);
    colore_label_ste.addEventListener('change', cambia_ste, false);
    colore_ste.select();
    colore_label_ste.select();

}

function testo_ste(event) {
    var h1_ste = document.getElementById('cambio_ste');
    var label_ste = document.getElementById('label_ste');

    if (h1_ste) {
        h1_ste.style.color = event.target.value;


    }
    if (label_ste) {
        label_ste.style.color = event.target.value;
    }



}

function cambia_ste(event) {
    document.getElementById('cambio_ste').foreach(function(cambio_ste) {
        h1_ste.style.color = event.target.value;

    });
    document.getElementById('label_ste').foreach(function(label_ste) {
        label_ste.style.color = event.target.value;
    })

}
//fine funzioni ste


//funzioni di Christian

//richiamo funzione per la creazione della tabella
chris_create_table(8)


//creo tabella con input di tipo numero
var chris_filtro = document.getElementById('c_input')
chris_filtro.addEventListener('click', function() {
    chris_contenitore.innerHTML = ""
    var chris_int_testo = chris_filtro.value
    if (chris_int_testo < 0) {
        alert("Come faccio a creare la tabella con numeri minori di zero? ;)")
    } else {
        chris_create_table(chris_int_testo)
    }
})

//funzione per la creazione di una tabella nxn
function chris_create_table(chris_int_testo) {

    var chris_contenitore = document.getElementById('chris_contenitore')
    var chris_table = document.createElement('table')
    chris_table.id = 'chris_table_id'
    chris_contenitore.append(chris_table)

    for (var i = 0; i < chris_int_testo; i++) {
        var chris_tr = document.createElement('tr')
        chris_table.append(chris_tr)
        for (var k = 0; k < chris_int_testo; k++) {
            var chris_td = document.createElement('td')

            chris_tr.append(chris_td)

            chris_td.style.border = '1px solid black'
        }
        chris_table.style.border = 'collapse'
        chris_table.style.marginLeft = '30%'
        chris_table.style.marginTop = '2%'
        chris_table.style.marginBottom = '2%'
        chris_table.style.width = '30%'
        chris_table.style.height = '400px'
        c_click_td()
    }


}

//funzione per cliccare ogni singola cella della tabella e poterne modificare lo stile
function c_click_td() {
    var chris_contenitore = document.getElementById('chris_contenitore')
    var chris_table = chris_contenitore.getElementsByTagName('table')
    for (var p = 0; p < chris_table.length; p++) {
        var chris_tds = chris_table[p].getElementsByTagName("td")
    }
    for (var j = 0; j < chris_tds.length; j++) {
        var chris_curr_td = chris_tds[j]
        var c_click = function(chris_curr_td) {
            return function() {
                var chris_cell = chris_curr_td
                var chris_color = document.getElementById('c_selected-color').value;
                chris_cell.style.background = chris_color
            }
        }
        chris_curr_td.onclick = c_click(chris_curr_td)

    }
}

//funzione che permette di il reset
function c_reset() {
    chris_contenitore.innerHTML = ""
    chris_create_table(8)
}

//aggiungo evento c_reset al bottone reset
c_button = document.getElementById('c_button_reset')
c_button.addEventListener('click', c_reset)

//aggiungo evento c_click_td al selettore di colore
input = document.getElementById('c_selected-color')
input.addEventListener('click', c_click_td)

//aggiungo evento chris_special_color al bottone speciale
c_bt = document.getElementById('c_special_button')
c_bt.addEventListener('click', chris_special_color)



//funzione per cambiare colore randomicamente ogni 100 ms
function chris_special_color() {
    var chris_contenitore = document.getElementById('chris_contenitore')
    var chris_table = chris_contenitore.getElementsByTagName('table')
    for (var p = 0; p < chris_table.length; p++) {
        var chris_tds = chris_table[p].getElementsByTagName("td")
    }
    for (var j = 0; j < chris_tds.length; j++) {
        var chris_curr_td = chris_tds[j]
        var c_click = function(chris_curr_td) {
            return function() {
                var chris_cell = chris_curr_td
                    //setto colore cella e tempo in cui cambia automaticamente
                setInterval(function() {
                    chris_cell.style.background = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255)

                }, 100)

            }
        }
        chris_curr_td.onclick = c_click(chris_curr_td)

    }
}
//fine funzioni Christian

/******************FUNCTION ALESSIO******************/

var film = ["immagini/img_alessio/1917.jpg", "immagini/img_alessio/Arancia Meccanica.jpg", "immagini/img_alessio/Avengers.jpg",
    "immagini/img_alessio/Il signore dei tranelli.jpg", "immagini/img_alessio/Iron Man.jpg", "immagini/img_alessio/Jurassic World.jpg",
    "immagini/img_alessio/Pirati dei caraibi - Oltre i confini del mare.jpg", "immagini/img_alessio/Spider-man - Homecoming.jpg",
    "immagini/img_alessio/Star Wars.jpg", "immagini/img_alessio/Una notte da leoni.jpg", "immagini/img_alessio/Venom.jpg", "immagini/img_alessio/Via col vento.jpg"
];


function filtra_lista(lista, filtro) {
    var risultato = []
    for (var i = 0; i < lista.length; i++) {
        var oggetto = lista[i]

        if (oggetto.toString().toLowerCase().indexOf(filtro.toLowerCase()) !== -1) {
            risultato[risultato.length] = oggetto


        }
    }
    return risultato
}

var container = document.getElementById('containerAlessio')

var filtro = document.getElementById('filtroAlessio')
filtro.addEventListener('input', function() {

    console.log(filtro.value)

    container.innerHTML = ''

    var testoperilfiltro = filtro.value

    var nuova_lista = filtra_lista(film, testoperilfiltro)

    crea_cards(nuova_lista)

})

function crea_cards(show_list) {

    var container = document.getElementById('containerAlessio')

    container.innerHTML = ''


    for (var i = 0; i < show_list.length; i++) {
        var show = show_list[i]

        var div = document.createElement('div')
        div.setAttribute('id', 'cardAlessio')

        var divBut = document.createElement('div')
        divBut.setAttribute('id', 'cardButAlessio')

        var img = document.createElement('img')
        img.setAttribute('id', 'imgAlessio')

        container.append(div)
        div.append(img)
        div.append(divBut)

        var btn = document.createElement('input')
        divBut.append(btn)
        btn.setAttribute('id', 'btnAlessio')
        btn.setAttribute('type', 'button')
        btn.setAttribute('value', 'Remove')
        btn.setAttribute('data-item-index', i);


        btn.onclick = function() {
            var itemIndex = this.getAttribute('data-item-index');
            show_list.splice(itemIndex, 1);
            console.log(show_list);
            container.innerHTML = '';
            crea_cards(film)
        }

        // btn.addEventListener('click', canc)

        img.src = show
    }
}

crea_cards(film)

/***********************FINE**********************/


// functions Natascia
function natascia_function() {
    //Carousel (60p-70p) natascia
    //Creare un div con dentro un immagine. L'immagine cambia ogni 3 secondi
    //+5p ricomincia da capo quando arriva all'ultima immagine
    //+5p Creare un bottone che inverte in qualsiasi momento la direzione.

    var flag_BT_stop = false;
    var flag_BT_go = false;

    var flag_BT_inv = false;
    var ciclocagnolini = 0;
    var natascia_velocita = 3000;

    document.getElementById("natascia_button_stop").addEventListener("click", natascia_ferma);
    function natascia_ferma(){
    flag_BT_stop=true;
    flag_BT_go=false;
    //console.log('Premuto tasto Ferma rotazione');
    window.clearInterval(ciclocagnolini);
    }


document.getElementById("natascia_button_go").addEventListener("click", natascia_vai);
function natascia_vai(){
    if (flag_BT_go==true && flag_BT_stop==false){
        flag_BT_go=true;
        flag_BT_stop=false;

    }else{
    flag_BT_go=true;
    flag_BT_stop=false;
    //console.log('Premuto tasto Riprendi rotazione');
    ciclocagnolini = setInterval(natascia_cambia_immagine,natascia_velocita);
    }
}



    document.getElementById("natascia_button_inv").addEventListener("click", natascia_inverti);

    function natascia_inverti() {
        if (flag_BT_inv === true) {
            flag_BT_inv = false;
        } else {
            flag_BT_inv = true;
        }
        //console.log('Premuto tasto Inverti rotazione');
        if (flag_BT_go==false && flag_BT_stop==true){
            //console.log('Premuto tasto Inverti rotazione ma sono in STOP ROTAZIONE di conseguenza lancio natascia vai');
            natascia_vai();
        }
    }


//Impostazione velocita' scorrimento immagini
    document.getElementById("natascia_velocita").addEventListener("change", natascia_imposta_vel);
    function natascia_imposta_vel(){
    var nat_vel = document.getElementById('natascia_velocita');
    natascia_velocita = (nat_vel.value*1000);
    //console.log('valore range fin '+natascia_velocita);
    //Una volta impostati i parametri del setInterval non e' possibile cambiarli,
    //di conseguenza elimino totalmente il ciclo e lo reimposto con la nuova velocita'
    //scelta dall'utente
    window.clearInterval(ciclocagnolini);
    ciclocagnolini = setInterval(natascia_cambia_immagine,natascia_velocita); 
    }

    var natascia_index = 1;

    function natascia_cambia_immagine() {
        var cagnolino = document.getElementById('cagnolino');
        var natascia_lista = [
            'immagini/natascia_img/Mos4.jpg',
            'immagini/natascia_img/Mos6.jpg',
            'immagini/natascia_img/Mos12.jpg',
            'immagini/natascia_img/Mos11.jpg'
        ]

        cagnolino.src = natascia_lista[natascia_index];
        if (flag_BT_inv == false) {
            if (natascia_index >= natascia_lista.length - 1) {
                natascia_index = 0;
            } else {
                natascia_index = natascia_index + 1;
            }
        } else {
            if (natascia_index <= 0) {
                natascia_index = 3;
            } else {
                natascia_index = natascia_index - 1;
            }
        }

    }
    var ciclocagnolini = setInterval(natascia_cambia_immagine, natascia_velocita);
}

natascia_function();


// fine functions Natascia



// INIZIO ALBERTO FUNZIONI

var albyFoto = [
    "immagini/albyImmagini/albyGrandi/koala.jpeg",
    "immagini/albyImmagini/albyGrandi/volpe.jpeg",
    "immagini/albyImmagini/albyGrandi/scimmia.jpeg",
    "immagini/albyImmagini/albyGrandi/pesci.jpeg"
]

var albyIndex = 0;
var albyImmagine = document.getElementById("albyGrandi")

// Alby avanzamento automatico

var albyAutomatico = setInterval(function() {
        if (albyIndex < albyFoto.length - 1) {
            albyIndex++;
        } else
            albyIndex = 0;
        albyImmagine.src = albyFoto[albyIndex]
    }, 3000) // immagine cambia ogni 3 secondi


// Alby Pulsanti

var albyPrev = document.getElementById('albyIndietro')
albyPrev.addEventListener("click", function() {
    if (albyIndex == 0) {
        albyIndex = albyFoto.length - 1
    } else
        albyIndex--;
    albyImmagine.src = albyFoto[albyIndex];
})

var albyPause = document.getElementById('albyPausa')
albyPause.addEventListener("click", function() {
    clearInterval(albyAutomatico); // ferma avanzamento automatico
})

var albyNext = document.getElementById('albyAvanti')
albyNext.addEventListener("click", function() {
    if (albyIndex < albyFoto.length - 1) {
        albyIndex++;
    } else
        albyIndex = 0;
    albyImmagine.src = albyFoto[albyIndex]
})


// Alby Miniature

var albyKoala = document.getElementById("albyKoala")
albyKoala.addEventListener("click", function(event) {
    event.preventDefault() // impedisce di aprire il link
    albyImmagine.src = albyKoala
})

var albyVolpe = document.getElementById("albyVolpe")
albyVolpe.addEventListener("click", function(event) {
    event.preventDefault()
    albyImmagine.src = albyVolpe
})

var albyScimmia = document.getElementById("albyScimmia")
albyScimmia.addEventListener("click", function(event) {
    event.preventDefault()
    albyImmagine.src = albyScimmia
})

var albyPesci = document.getElementById("albyPesci")
albyPesci.addEventListener("click", function(event) {
    event.preventDefault()
    albyImmagine.src = albyPesci
})

// FINE ALBERTO FUNZIONI


// ----- INIZIO CAROLINA -----//

let arrayCards = [{
        cardIMG: 'immagini/C/blanka.jpg',
        status: 'close'
    },
    {
        cardIMG: 'immagini/C/blanka.jpg',
        status: 'close'
    },
    {
        cardIMG: 'immagini/C/chunli.jpg',
        status: 'close'
    },
    {
        cardIMG: 'immagini/C/chunli.jpg',
        status: 'close'
    },
    {
        cardIMG: 'immagini/C/dhalsim.jpg',
        status: 'close'
    },
    {
        cardIMG: 'immagini/C/dhalsim.jpg',
        status: 'close'
    },
    {
        cardIMG: 'immagini/C/guile.jpg',
        status: 'close'
    },
    {
        cardIMG: 'immagini/C/guile.jpg',
        status: 'close'
    },
    {
        cardIMG: 'immagini/C/honda.jpg',
        status: 'close'
    },
    {
        cardIMG: 'immagini/C/honda.jpg',
        status: 'close'
    },
    {
        cardIMG: 'immagini/C/ken.jpg',
        status: 'close'
    },
    {
        cardIMG: 'immagini/C/ken.jpg',
        status: 'close'
    },
    {
        cardIMG: 'immagini/C/ryu.jpg',
        status: 'close'
    },
    {
        cardIMG: 'immagini/C/ryu.jpg',
        status: 'close'
    },
    {
        cardIMG: 'immagini/C/vega.jpg',
        status: 'close'
    },
    {
        cardIMG: 'immagini/C/vega.jpg',
        status: 'close'
    },
]

shuffle(arrayCards)


//PAGINA DI START

// Prendo il riferimento del div
let screen = document.getElementById('screen')
    // creo elemento immagine, lo appendo al div e gli assegno una classe
let screenIMG = document.createElement('img')
screen.appendChild(screenIMG)
screenIMG.classList.add('screenIMG')

// gli inserisco una gif
screen.children[0].src = 'immagini/C/start.gif'

// al clic sul div di start nascondo il suddetto div
screen.addEventListener('click', function() {
    screen.style.display = 'none'

    // Creo var per audio
    let audio = new Audio()
    audio.src = 'immagini/C/soundtrack.mp3'
        // esegue audio
    audio.play()
})


// Prendo il riferimento del div per la tavola da gioco
let board = document.getElementById('board')

//CREO LA GRIGLIA DI GIOCO
function createGrid(container, lista) {
    for (let i = 0; i < lista.length; i++) {
        // creo tanti div-celle quanto è lungo il mio array di carte e gli assegno una classe
        let cella = document.createElement('div')
        cella.classList.add('div_cell')
            // creo un elemento img per ogni cella della griglia e le appendo
        let image = document.createElement("img")
        cella.appendChild(image)
        board.appendChild(cella)

        //EVENTO CLICK SU CELLA:
        //richiamo la funzione 'cardClick' definita sotto
        cella.addEventListener('click', function() {
            cardClick(i, cella)
        })
    }
}
createGrid(board, arrayCards)
updateView()



//GESTIONE CLIC SULLE CELLE
function cardClick(i, cella) {
    let card = arrayCards[i]
        // restituisce il numero delle carte aperte "fino a questo momento"
    let oldOpen = getOpenCards()
        // quando arrivano ad essere 2 si ferma
    if (oldOpen.length == 2) {
        return
    } // se la carta in cui clicco è coperta, si gira e aggiorna la vista
    if (card.status == 'close') {
        card.status = 'open'
        updateView()
    } else {
        return
    }
    // restituisce il numero delle NUOVE carte aperte
    let openCards = getOpenCards()
        //CONFRONTO IMMAGINI:
    if (openCards.length == 2) {
        // controlla che le immagini siano uguali
        if (openCards[0].cardIMG === openCards[1].cardIMG) {
            //se si, cambiano di status divenendo carte trovate
            openCards[0].status = 'found'
            openCards[1].status = 'found'

            //(Controlla il numero di carte trovate)
            chkWin()
        } else { //altrimenti tornano allo status originario dopo 2 secondi, aggiornando anche la vista
            setTimeout(function() {
                openCards[0].status = 'close'
                openCards[1].status = 'close'
                updateView()
            }, 2000)
        }
    }
}


// CONTROLLO VISTA DEL GIOCO
function updateView() {
    //scompongo l'array in singole carte
    for (let i = 0; i < arrayCards.length; i++) {
        let card = arrayCards[i]
            //dichiaro la variabile 'cella' assegnandole stesso nome e valore della funzione 'createGrid'
        let cella = board.children[i]

        // CONTROLLO STATUS SINGOLE CARTE:
        //se è 'close', la carta è coperta e le assegno l'immagine del retro
        if (card.status == 'close') {
            cella.children[0].src = 'immagini/C/s.png'
                //altrimenti l'immagine di fronte che ricavo dall'array scomposto
        } else {
            cella.children[0].src = card.cardIMG
        }
    }
}


//CONFRONTO DELLE CARTE APERTE
function getOpenCards() {
    //Creo array vuoto
    let open = []
    for (let i = 0; i < arrayCards.length; i++) {
        let card = arrayCards[i]
            // vi inserisco le carte aperte
        if (card.status == 'open') {
            open.push(card)
        }
    } // restituisce le carte aperte da gestire nella funzione 'cardClick'
    return open
}


//MISCHIA LE CARTE (TROVATA ONLINE E RIPROPOSTA IDENTICA)
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


//CONTROLLA SE HAI VINTO
function chkWin() {
    //creo variabile di appoggio
    let cardFound = 0
    for (let i = 0; i < arrayCards.length; i++) {
        let card = arrayCards[i]
            //inserisco nella variabile ogni carta trovata
        if (card.status == 'found') {
            cardFound++
        }
        //se il numero corrisponde alla lunghezza dell'array:
        if (cardFound == arrayCards.length) {
            //rendo invisibile la tavola da gioco
            board.style.display = 'none'
                // SCHERMATA DI VITTORIA!

            let youwin = document.getElementById('youwin')
            let victory = document.createElement('img')
            youwin.appendChild(victory)
            victory.classList.add('victory')
            youwin.children[0].src = 'immagini/C/victory.gif'
        }
    }
}


//CREO UN DIV PER CONTENERE UN PULSANTE PER IL REFRESH DELLE CARTE
let div_down = document.getElementById('down_bar')
let btnRest = document.createElement('button')
div_down.appendChild(btnRest)
btnRest.classList.add('buttonRefresh')
btnRest.innerHTML = 'RESTART'

//Il punsante chiude tutte le carte aperte
btnRest.addEventListener('click', function() {
    for (let i = 0; i < arrayCards.length; i++) {
        let card = arrayCards[i]
        card.status = 'close'
    }
    //rimischia, aggiorna e rende nuovamente visibile la tavola da gioco
    shuffle(arrayCards)
    updateView()
    board.style.display = ''
    youwin.removeChild(youwin.childNodes[0])
})

//-------FINE CAROLINA--------//

//-------------------------- inizio codice Violetta ------------------

var vbListaTotale = [
    { comando: 'foreach', linguaggio: 'php', descrizione: 'iterazione/ciclo su oggetto' },
    { comando: 'new', linguaggio: 'java', descrizione: 'istanzia un oggetto' },
    { comando: 'splice', linguaggio: 'javascript', descrizione: 'rimuove elementi da array' },
    { comando: 'div', linguaggio: 'html', descrizione: 'crea contenitore generico' },
    { comando: 'br', linguaggio: 'html', descrizione: 'crea un "a capo" nel testo' },
    { comando: 'get/post', linguaggio: 'php', descrizione: 'metodo di richiesta HTTP' },
    { comando: 'getElementById', linguaggio: 'javascript', descrizione: 'recupera elemento HTML' }
]
createTableFromList('vbcontenitore', vbListaTotale);
//-----------
function createTableFromList(vbTabellaHtml, vbListaHtml) {
    nascondiMessaggi();

//crea la TABELLA <TABLE>
    var vbContenitore = document.getElementById(vbTabellaHtml);
    var vbNewTable = document.createElement('table');
    vbNewTable.setAttribute('class', 'vbtable');
    vbContenitore.append(vbNewTable);
/************************
    //crea l'INTESTAZIONE <CAPTION> della tabella 
    var vbNewCaption = document.createElement('caption');
    vbNewCaption.innerText = 'TABELLA COMANDI LINGUAGGI WEB';
    vbNewCaption.setAttribute('class', 'vbtablecaption');
    vbNewTable.append(vbNewCaption);     
************************/
//crea l'INTESTAZIONE <TR/TH> della tabella, leggendo il primo elemento fuori ciclo 
    var vbNewTr = document.createElement('tr');
    vbNewTable.append(vbNewTr);

    var vbListaPersone1 = vbListaHtml[0];
//prendi tutte le chiavi di indice 0 e fai una TH per ognuna delle chiavi 
    for (var key in vbListaPersone1) {
        var vbNewTh = document.createElement('th');
        vbNewTh.setAttribute('class', 'vbtableth');
        vbNewTh.innerHTML = key;
        vbNewTr.append(vbNewTh);
    }
  
    var vbNewTh = document.createElement('th');
    vbNewTh.setAttribute('class', 'vbtableth');
    vbNewTh.innerHTML = "Azione";
    vbNewTr.append(vbNewTh);
    
//crea le RIGHE <TR> della tabella
    for (var i = 0; i < vbListaHtml.length; i++) {
        var vbNewTr = document.createElement('tr');
        vbNewTable.append(vbNewTr);

        var vbOggPersone = vbListaHtml[i];
        for (var key in vbOggPersone) {
//crea le COLONNE <TD> della tabella
            var vbNewTd = document.createElement('td');
            vbNewTd.innerHTML = vbOggPersone[key];
            vbNewTd.setAttribute('class', 'vbtabletd');
            vbNewTr.append(vbNewTd);
        }
 
        var vbNewTd = document.createElement('button');
        vbNewTd.setAttribute('class', 'vbtablebutton');
        vbNomeButton = "vbbuttonremove" + i;
        vbNewTd.setAttribute('id', vbNomeButton);

        vbNewTd.addEventListener("click", function () {
            nascondiMessaggi();
            puliziaCampi();
//cancella dalla array l'elemento selezionato con il bottone                
            var vbStringa =  this.id;
            vbIndEstratto = vbStringa.substr(14);
            var vbCommandoListaHtml = vbListaHtml[vbIndEstratto];
//rivedere 24/3 - inizio
            var vbCommandoListaHtmlx = vbCommandoListaHtml["comando"];
//rivedere 24/3 - fine        
            vbListaHtml.splice(vbIndEstratto,1);
 
//rivedere 24/3 - inizio            
//aggiorna lista totale togliendo l'elemento cancellato a video            
            for (var ivb3 = 0; ivb3 < vbListaTotale.length; ivb3++) {
                 var vbVioletta3 = vbListaTotale[ivb3];
                 for (var keyvb3 in vbVioletta3) {
                    vbCommandoListaHtmlyyy = vbVioletta3[keyvb3];
                    if  (vbCommandoListaHtmlyyy == vbCommandoListaHtmlx){
                        vbListaTotale.splice(ivb3,1);
                    }
                }
            }  
//rivedere 24/3 - fine                   
      
            if (vbListaHtml.length == 0) {
                vbtexthidden = document.getElementById('vbmessaggio3');
                vbtexthidden.style.display = 'block';
            }
            else{
//ricrea la tabella senza l'elemento cancellato
                createTableFromList('vbcontenitore', vbListaHtml);
            }    
        });
        vbNewTd.innerText = 'Cancella';
        vbNewTr.append(vbNewTd);
    }
}
//----------

function filtraLista(lista, filtro) {

    var vbfiltro = filtro; 
    var vbListaNew = [];
   
    for (var i = 0; i < lista.length; i++) {    
        var oggettoPers = lista[i]
        for (var key in oggettoPers) {
//cerca il filtro (come parola completa) nelle varie chiavi della lista             
//          if (oggettoPers[key] == vbfiltro) {
//cerca il filtro dentro ogni chiave della lista
            if (oggettoPers[key].toString().indexOf(vbfiltro) !== -1) { 
                vbListaNew.push(oggettoPers);
            }
        }
    }
     return vbListaNew;
}

//----------

var vbTextFiltro = document.getElementById('vbtestofiltro')

vbTextFiltro.addEventListener('input', function () {

    nascondiMessaggi();
    puliziaCampi(); 
    createTableFromList('vbcontenitore', vbListaTotale); 

//controllo che il filtro sia pieno per fare considerazioni sul filtro
    if ((vbTextFiltro.value !== null) && (vbTextFiltro.value !== "")){
//controllo che il filtro contenga solo lettere    
        var vbpattern = /^[a-z]+$/i;
        if (!vbpattern.test(vbTextFiltro.value)) {
            vbtexthidden = document.getElementById('vbmessaggio1');
            vbtexthidden.style.display = 'block';
        }
        else{
//trasformazione in caratteri minuscoli 
            var vbfiltrolow = vbTextFiltro.value.toLowerCase();
//filtro
            vbListaNew2 = filtraLista(vbListaTotale, vbfiltrolow);

            if (vbListaNew2.length == 0) {
//----          console.log("NON TROVATO filtro in tabella");
                vbtexthidden = document.getElementById('vbmessaggio2');
                vbtexthidden.style.display = 'block';
            }
            else {
//----          console.log("TROVATO filtro in tabella");
                puliziaCampi();     /******************************** */
                createTableFromList('vbcontenitore', vbListaNew2);
            }
        }
    }    
})

var vbButtonReset = document.getElementById('vbbuttonreset');
vbButtonReset.addEventListener("click", function () {
    puliziaCampi();
    document.getElementById('vbtestofiltro').value = "";
    if (vbListaTotale.length !== 0) {
       createTableFromList('vbcontenitore', vbListaTotale);
    }
})

function nascondiMessaggi(){
    vbtexthidden = document.getElementById('vbmessaggio1');
    vbtexthidden.style.display = 'none';
    vbtexthidden = document.getElementById('vbmessaggio2');
    vbtexthidden.style.display = 'none';
    vbtexthidden = document.getElementById('vbmessaggio3');
    vbtexthidden.style.display = 'none';
}
function puliziaCampi(){
    document.getElementById('vbcontenitore').innerHTML = "";
 }
//-------------------------- fine codice Violetta --------------------

//-------------------------- inizio codice Consuelo ------------------
//=========================SCRIPT PRINCIPALE======================

//creo la richiesta
var consuRequest = new XMLHttpRequest();
var attoriSelezionati = Array()
    //configuro la richiesta
consuRequest.open("GET","http://api.tvmaze.com/shows/82/cast");

//======CODICE ESEGUITO ALLA FINE DEL CARICAMENTO DEI DATI
consuRequest.addEventListener("loadend", function () {
// Se la richiesta è andata a buon fine
    if(consuRequest.status===200){
        // Converto i dati da JSON a javascript
        var castMembersCon = JSON.parse(consuRequest.response)

        // creo le card presenti all inizio
        consuCrea(castMembersCon)
        var consu_cerca = document.getElementById('cerca');
        consu_cerca.addEventListener("input", function(){
            stringa_consu = consu_cerca.value;
            var consuCnt = document.getElementById('contenitore');
            consuCnt.innerHTML = '';
            var consu_listaFiltrata = consu_filtro(stringa_consu, castMembersCon);
            consuCrea(consu_listaFiltrata);
        })
    }
    else { // SE la richiesta non va a buon fine
        document.write('ERRORE', consuRequest.status)
    }
})
//======FINE CODICE ESEGUITO ALLA FINE DEL CARICAMENTO DEI DATI

// Imposto  i prametri della richiests
consuRequest.open('GET', 'http://api.tvmaze.com/shows/82/cast')
// Eseguo la richiesta
consuRequest.send()

//=======VARIABILI===========
var consuCnt = document.getElementById('contenitore');


//=========================FINE SCRIPT PRINCIPALE======================


//=========================FUNZIONI======================

//creo gli elementi prendendoli dal mio oggetto e li assegno a un div

function consuCrea(consuDato){

    var consuCnt = document.getElementById('contenitore');

    for(var i=0; i<consuDato.length; i++){
        var consuObj = consuDato[i];
        var divConsu = document.createElement('div');
        var imgConsu = document.createElement('img');
        var nameConsu = document.createElement('h5');
        divConsu.append(imgConsu)
        divConsu.append(nameConsu)
        divConsu.id = consuObj.person.id
        // Assegno al div la classe di bootstrap
        divConsu.classList.add('col-md-3')
        if (attoriSelezionati[consuObj.person.id]==true)
            divConsu.style="border: 1px solid black"
        //scrivo la funzione associata al click sul div
        divConsu.addEventListener("click", function (eventConsu) {
            this.style="border: 1px solid black"
            attoriSelezionati[this.id]=true;
        })

        // Assegno l'indirizzo dell'immagine
        imgConsu.src = consuObj.person.image.medium
        // Inserisco il nome dell'attore
        nameConsu.innerHTML = consuObj.person.name
        // Appendo tutti gli elementi al contenitore
        consuCnt.append(divConsu)
    }
}


function consu_filtro(nome, lista) {
    var nuovaLista = []
    for (var I = 0; I < lista.length; I++) {
        var attore = lista[I]
        if (attore.person.name.toLowerCase().indexOf(nome.toLowerCase()) !== -1 || attoriSelezionati[attore.person.id]==true) {
            nuovaLista[nuovaLista.length] = attore
        }
    }
    return nuovaLista
}

//-------------------------- fine codice Consuelo --------------------

//------------------inizio cod cristina-------------
// var majorDiv = document.createElement('div');
//  majorDiv.id = "scatola";
//  document.body.appendChild(majorDiv);

//creato div prova in scatola.
  var upDiv1 = document.getElementById('scatola');
  var first = document.createElement('div');
  first.id = "prova";
  upDiv1.appendChild(first);

//creo div scatola2 in div scatola
  var second = document.createElement('div');
  second.id = "scatola2"; //console.log(second)
  upDiv1.appendChild(second);

//creo h1 in prova
  var upDiv2 = document.getElementById('prova');
  var titolo = document.createElement('h1');
  titolo.id = "titolo_cri";
  titolo.innerHTML = "GIOCA CON ME!! INDOVINA!!";
  upDiv2.appendChild(titolo);

//creo input nel prova
  var inputOne = document.createElement('input');
  inputOne.id = "input";
  inputOne.type= "number";
  inputOne.value = "";
  upDiv2.appendChild(inputOne);

//creo l'invio in div prova
  var invioIndovina = document.createElement('button');
  invioIndovina.id ="okInvio";
  invioIndovina.innerText='Invia';
  upDiv2.appendChild(invioIndovina);

  var tipo = random()

function gioca() {
  var prendi = document.getElementById('input');
if(prendi.value !== ""){
    if (prendi.value == tipo) {
     var paragraph = creare();
     paragraph.innerHTML = 'Congratulazioni hai indovinato!';
     bottone2(); //console.log(bottone2);
    //console.log(restart1);
     var reinvia = document.getElementById('clicco');
     reinvia.addEventListener('click',elimina,false);
    }else if(prendi.value < 0){
     paragraph = creare()
     paragraph.innerHTML = 'Spiacenti hai selezionato un numero negativo';
     document.getElementById('input').value = "";
    }else if(prendi.value>tipo){
     paragraph = creare()
     paragraph.innerHTML = 'Ops!Spiancente il numero che hai selezionato è maggiore';
     document.getElementById('input').value = "";
    }else{
     paragraph = creare()
     paragraph.innerHTML='Ops!Spiancente il numero che hai selezionato è minore';
     document.getElementById('input').value = "";
     }
  }else{
    paragraph = creare();
    paragraph.innerHTML = 'Non hai inserito nessun numero!';
  }
}

function random(){
  var numeroIndovina = Math.round(Math.random() * 100) + 1;
  return numeroIndovina;
}

function creare() {
  var upDiv = document.getElementById('scatola2');
  var paragraphAll = document.createElement('p');
  paragraphAll.id = "par";
  upDiv.appendChild(paragraphAll);
  return paragraphAll;
  }

function elimina(){
  var upDiv = document.getElementById('scatola2');
  //console.log(upDiv);
  var elemento1 = document.getElementById('par');//elemento da eliminare
  console.log(elemento1);
  //crea classe nel paragrafo e usa il tag classe
  var el = elemento1.parentNode;
  console.log(el);
  var tg = document.getElementById('clicco');
  upDiv.removeChild(tg);
  while (el.childNodes.length > 0){
       el.childNodes[0].remove();
      }
  document.getElementById('input').value="";
  location.reload(true);
}

function bottone2(){
  var upDiv = document.getElementById('scatola2');
  var restart = document.createElement('button');
  restart.id = "clicco";
  restart.innerText='restart';
  upDiv.appendChild(restart);
}

 function controlla(e){
   var tasto = e.which;
  //console.log(tasto);
   if(tasto == 13){
  var inizia = gioca();
    }
}

var invio = document.getElementById('okInvio');
invio.addEventListener('click', gioca, false);
 var tasto = document.getElementById('input');
 tasto.addEventListener('keypress',controlla,false);

 //--------fine cod cristina------------

 //----INIZIO SCRIPT NOEMI-----//
 var noemi_cowRaces = [
    {
        Razza: 'Frisona italiana',
        TipologiaProduzione: 'da latte',
        EtàMedia: '2 anni',
    },
    {
        Razza: 'Piemontese',
        TipologiaProduzione: 'da carne',
        EtàMedia: '6 anni',
    },
    {
        Razza: 'Chianina',
        tipologiaProduzione: 'da carne',
        etàMedia: '2 anni',
    },
    {
        Razza: 'Bufala',
        TipologiaProduzione: 'da latte',
        EtàMedia: '18 anni',
    },
    {
        Razza: 'Jersey',
        TipologiaProduzione: 'da latte',
        EtàMedia: '2 anni',
    },

]

var noemi_filterTable = document.getElementById('filter')

createTableFromList('noemi_tableContainer', noemi_cowRaces)

noemi_filter.addEventListener('input', function () {
    var noemi_container = document.getElementById('noemi_tableContainer')
    noemi_container.innerHTML = ''
    var noemi_filterText = noemi_filter.value
    var noemi_newList = noemi_filterList(noemi_cowRaces, noemi_filterText)
    createTableFromList('noemi_tableContainer', noemi_newList)
})

function createTableFromList(noemi_tableContainer, noemi_cowRaces){

var noemi_container = document.getElementById('noemi_tableContainer')
var noemi_cows = document.createElement('table')
noemi_container.append(noemi_cows)

var noemi_header = document.createElement('thead')
noemi_cows.append(noemi_header)


for (var noemi_obj in noemi_cowRaces[0]) {
    var noemi_tableHead = document.createElement('th')

    noemi_tableHead.style.border = 'solid'
    noemi_tableHead.style.height = '20px'
    noemi_tableHead.innerHTML = noemi_obj


    noemi_header.append(noemi_tableHead);
}


for (var noemi_cow in noemi_cowRaces) {
    var noemi_tableRow = document.createElement('tr')
    noemi_cows.style.border = 'groove'
    noemi_cows.style.width = '20%'
    noemi_cows.style.borderCollapse = 'collapse'

    noemi_cows.append(noemi_tableRow);


    for (var noemi_attribute in noemi_cowRaces[noemi_cow]) {
        var noemi_tableData = document.createElement('td')

        noemi_tableData.style.padding = '5px'
        noemi_tableData.style.border = 'groove'
        noemi_tableData.innerHTML = noemi_cowRaces[noemi_cow][noemi_attribute]


        noemi_tableRow.append(noemi_tableData);

    }
}

}

function noemi_filterList(noemi_list, noemi_filter) {
    var noemi_result = []
    for (var i = 0; i < noemi_list.length; i++) {
        var noemi_cow = noemi_list[i]

        for (var noemi_key in noemi_cow) {

            if (noemi_cow[noemi_key].toLowerCase().indexOf(noemi_filter.toLowerCase()) !== -1) {
                noemi_result[noemi_result.length] = noemi_cow
                break
            }
        }
    }
    return noemi_result
}

//------FINE CODICE NOEMI---//
