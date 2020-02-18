### Cambia colore (60p)
Creare un input tipo color ed un paragrafo. 
Al cambio del valore dell input il paragrafo cambia colore


### Cambia font a tutto (60-70p)
Creare una input di tipo select le opzioni saranno nomi di diversi tipi di font.
Al cambio del valore dell input il font dell intera applicazione cambia.

+10p se clicco su un elemento cambia il font solo all elemento cliccato. Limtare questo effetto ad una sola pagina.



### Carousel (60p-70p) natascia
Creare un div con dentro un immagine. 
L'immagine cambia ogni 3 secondi

+5p ricomincia da capo quando arriva all'ultima immagine

+5p Creare un bottone che inverte in qualsiasi momento la direzione.


### Calcolatrice (60p-70p) Stefania Cappellino
Creare una interfaccia con bottoni simile a quelli di una calcolatrice:
- Cifre da 1 a 9
- Operazioni + - * /
- Tasto reset
La calcolatrice esegue le operazioni su 2 numeri

+5p Funziona con numeri a piu cifre

+5p La calcolatrice continua a prendere valori e da il risultato solo quando si schiaccia il taso '='


### Zoom immagine (70p-85p) Cristina
Creare un div con dentro un immagine. Creare i tasti: giu, su, destra, sinistra, zoom+, zoom-
il tasto zoom ingrandisce l'immagine i tasti direzionali la spostano.

+5p l'immagine si sposta trascinando e zoom+,zoom- con la rotella del mouse

+5p l'immagine si sposta con le freccie della tastiera, zoom+,zoom- con i tasti '+' e '-' della tastiera

+5p l'immagine non diventa piu piccola del div contenitore


### Inodvina numero (70-100p)
Creare un input di tipo numero, un tasto invia, un paragrafo.
L'applicazione sceglie un numero casuale da 1 a 100 che rimane sconosciuto all'utente.
Quando l'utente scrive un numero nell input e preme il tasto invia se lo indovina riceve un messaggio di 
successo se non lo indovina riceve un messaggio che gli comunica se il numero inserito e piu piccolo o
piu grande di quello da indovinare.

+10 creare un avversario artificiale che 1 volta ogni secondo prova ad indovinare il numero
Se il giocatore artificiale indovina per primo l'utente riceve un messaggio di sconfitta.
L'avversario artificiale usa la funzione Math.random per provare a indovinare.
L'utente non vede i numeri che l'avversario artificiale inserisce ma solo quanti tentativi ha fatto.

+10 inserire un input che permette di impostare ogni quanti millisecondi l'avversario artificiale prova a indovinare. 

+10 l'avversario artificiale ad ogni turno sa se il numero da indovinare e piu grande o piu piccolo di quello che ha inserito.
Di conseguenza restringe il campo ogni volta.




### Cronometro (70-75p)
Creare un tasto start un tasto stop, un tasto pause, un tasto continue ed un tasto reset.
Creare un paragrafo con la scritta 00:00:00
Alla pressione del tasto start il conometro parte, il valore del paragrafo cambia ogni 1/10 di secondo mostrando il tempo trascorso.
Il tasto stop blocca il cronometro, il tasto continue lo fa continuare se stoppato, il tasto reset lo riport allo stato iniziale.

+5p aggiungere un tasto che compare solo quando il cronometro è attivo. Se si preme il tasto viene aggiunto un paragrafo 
con il valore corrente del cronometro. 
è possibile aggiungere un numero indefinito di tempi intermedi al cronometro.


### Timer (70p) 
Simile al cronometro ma parte da un numero inserito in input e si ferma a 0


### Attacco epilettico (75p-85p)
BASE DA CUI PARTIRE: 'Carousel' + 'bonus ricomincia da capo quando arriva all'ultima immagine'. 
Modificarlo di modo che le immagini scorrano molto velocemente. 
E che inizalmente sia fermo.
Inserire un bottone start.
Alla pressione del bottone start compare sopra al carousel una delle immagini del carousel scelta casualmente. 
Il carousel parte ecomicia a cambiare le immagini.
L'utente deve riuscire a cliccare l'immagine scelta casualmente dall'applicazione.
Quando l'utente riesce a cliccare l'immagine corretta il carousel ritorna allo stato iniziale.

+10p tenere traccia dei click corretti e scorretti mostare il rapporto successo/insuccesso in un paragrafo.


### 8-bit (70p-100p) Christian
Creare una griglia di almeno 8*8, ed un input di tipo colore, un tasto reset.
quando clicco su un quadrato della griglia prende il colore selezionato in quel momento dall input di tipo colore
il tasto reset riporta tutto allo stato iniziale

+10 Cambio risoluzione con un input di tipo numero la griglia cambia da 8x8 a NxN

+5 aggiungere un bottone che rappresenta un colore speciale: il quadrato cliccato cambia colore a caso ogni 100ms

+5 aggiungere un bottone che schiarisce il colore gia esitente nel quadrato

+10 aggiungere un bottone sfoca: se clicco su un quadrato i quadrati vicini prendono lo stesso colore del quadrato cliccato ma piu chiaro.


### Tabella da lista di oggetti(65p-75p)
Creare una tabella generata tramite javascript a partire da una lista di oggetti

+5p prendere i dati tramite request da una API pubblica a tua scelta

+5p Campo di testo che filtra la tabella


### Lista card da lista di oggetti(65p-75p)
Creare una visualizzazione a 4 colonne contenete delle card generate tramite javascript a partire da una lista di oggetti.
Ogni card deve contenere almeno un immagine ed un testo.

+5p prendere i dati tramite request da una API pubblica a tua scelta

+5p Campo di testo che filtra la lista
 
 
 
### Tabella da lista di oggetti Advanced(80p-90p) Noemi Ena
BASE DA CUI PARTIRE: 'Tabella da lista di oggetti' + bonus 'Campo di testo che filtra la tabella'.
Rendere gli elementi selezionabili: cliccando su una riga la riga cambia stile.
Le righe selezionate rimangono sempre visibili nella tabella nonostante il filtro

+5p prendere i dati tramite request da una API pubblica a tua scelta

+5p le righe selezionate si posizionano sempre prima delle altre(senza creare duplicati)


### Lista card da lista di oggetti Advanced(80p-90p) Consuelo Fadda
BASE DA CUI PARTIRE: 'Lista card da lista di oggetti' + bonus 'Campo di testo che filtra la lista'.
Rendere gli elementi selezionabili: cliccando su una card la card cambia stile.
Le card selezionate rimangono sempre visibili nella tabella nonostante il filtro

+5p prendere i dati tramite request da una API pubblica a tua scelta

+5p le righe selezionate si posizionano sempre prima delle altre(senza creare duplicati)


<<<<<<< HEAD
### Validazione form(80-95p) Sefora
=======

### Validazione form(80p) Sefora
>>>>>>> d5cd2316e1e052f7211d98e4ccd2b36da4ccf097
Creare un form con almeno 2 campi di testo, un input di tipo select, un input di tipo checkbox ed un input di tipo radio.
Al click del bottone eseguire la validazione del form controllando unicamente che i campi sano stati inseriti tutti.
Nel caso i campi siano stati tutti inseriti mostrare un mesaggio di successo altrimenti mostrare un messaggio di errore sotto ad ogni campo non corretto.

+5p creare un tasto reset che cancella tutti i campi del form

+10 creare un campo input di tipo 'password', creare un bottone mostra password: 
al click rende la password nell input leggibile se è offuscata o la offusca se è leggibile.


### Cerca nel testo (80p)
Create un paragrafo con un testo di almeno 100 caratteri, un input di tipo testo.
Ogni volta che viene inserito o cancellato un carattere nell input colorare(o mettere in grassetto) tutte le occorrenze nel testo se presenti.

+5p il testo ha un colore diverso in base a quante volte il valore cercato è presente nel testo

+15p se scrivo o cancello piu di un carattere in meno di 2 secondi cerca solo 1 volta coll'ultimo valore inserito.


### Validazione form con E-Mail(85p) Mooo
BASE DA CUI PARTIRE: esercizio 'Validazione form'
Aggiungere un campo email e eseguire oltre al controllo base controllare anche che il valore inserito abbia la struttura di un indirizzo email

+5 punti aggiungere un campo 'password' ed un campo 'ripeti password' se il valore di 'ripeti password' non è uguale al valore di 'password' mostrare un errore

+10p Aggiungere campo password, fare un controllo che dia un errore se la password non contiene almeno un carattere minuscolo uno maiuscolo ed un numero


### Validazione form Con aggiunta indirizzi(90p) MATHEUS
BASE DA CUI PARTIRE: esercizio 'Validazione form'
Creare lla interno del form una sezione indirizzi che all'inizio contenga solo un bottone 'aggiungi indirizzo'. 
Alla pressione del bottone si crea un nuovo campo di input testuale in cui l'utente dovra inserire il proprio indirizzo.
Ogni pressione successiva del bottone aggiungera un ulteriore input (solo se l'input indirizzo precendete non risulta vuoto).

+5p ogni input aggiunto ha di fianco un bottone per rimuoverlo
+5p impedire l'inserimento di duplicati


### Aggiungi record a tabella(90-100p) - LUCA
BASE DA CUI PARTIRE: tabella da lista di oggetti.
Crare un form che al submit aggiunga un record alla lista di oggetti e aggiorni la tabella.

+5p prendere i dati tramite request da una API pubblica a tua scelta

+5p le righe selezionate si posizionano sempre prima delle altre(senza creare duplicati)


### Rimuovi record da tabella(90-100p)
BASE DA CUI PARTIRE: tabella da lista di oggetti.
Aggiungere una colonna con un tasto rimuovi. Alla pressione del tasto l'oggetto viene rimosso dalla lista e la tabella si aggiorna.

+5p prendere i dati tramite request da una API pubblica a tua scelta

+5p le righe selezionate si posizionano sempre prima delle altre(senza creare duplicati)


### Rimuovi record da Lista di card(90-100p)
BASE DA CUI PARTIRE: Lista di card da lista di oggetti.
Aggiungere nella card un tasto rimuovi. Alla pressione del tasto l'oggetto viene rimosso dalla lista e la tabella si aggiorna.

+5p prendere i dati tramite request da una API pubblica a tua scelta

+5p le righe selezionate si posizionano sempre prima delle altre(senza creare duplicati)


### Carousel con tasti(80-90p) Alberto
BASE DA CUI PARTIRE: Carousel.
Aggiugere un tasto avanti ed uno indietro e uno pausa. Il tasto avanti e indietro portano all'immagine succesiva/precedente indipendetemente dall avanzamento automatico.
Il tasto pausa ferma l'avanzamneto automatico ma non la funzionalità dei bottoni avanti e indietro.

+5p Inserire delle miniature di tutte le immagini sotto al carousel, l'immagine corrente ha uno stile diverso (es: un bordo di colore diverso)

+5p Inserire delle miniature di tutte le immagini sotto al carousel, Cliccando su una miniatura il carousel va a all'immmagine corrispondente e continua da quell'immagine.



### Prendi il div!(100p) Alessio
Creare un div contenitore che rappresenta l'area di gioco. aggiunger all interno un div quadrato.
Il div si muove casualmente e velocemente all interno dell'area di gioco. 
L'utente deve riuscire a cliccarlo.
Tenere traccia dei click corretti e scorretti mostare il rapporto successo/insuccesso in un paragrafo.

<<<<<<< HEAD


### Scappa dal div! (100p) - Francesco
=======
### Scappa dal div! (100p) - Francesco Ponzin
>>>>>>> d5cd2316e1e052f7211d98e4ccd2b36da4ccf097
Creare un div contenitore che rappresenta l'area di gioco. aggiunger all interno un div quadrato.
Il div si muove inseguendo il puntatore e velocemente all interno dell'area di gioco. 
L'utente deve riuscire a non toccare il div col puntatore.
Tenere traccia del punteggio


### Memory (100p)
Creare il gioco del memory con almeno 16 carte.
