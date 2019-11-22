/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

/*eslint-env browser*/

/*eslint 'no-console': 0*/

/* BRONNEN:
Afbeelding:
LL Cool J: http://variety.com/2015/music/news/qa-ll-cool-j-on-the-30th-anniversary-of-radio-1201644221/
50Cent: https://open.spotify.com/artist/3q7HBObVc0L8jNeTe5Gofh
Biggie: http://www.rap-up.com/2018/03/09/kareem-biggs-burke-remembers-notorious-big/
Drake: http://www.rap-up.com/2018/02/12/drake-gods-plan-tops-hot-100-for-third-week/
EazyE: https://www.stereogum.com/1905377/eazy-es-daughter-crowdfunding-an-investigation-into-her-fathers-death/news/
Eminem: http://www.standaard.be/cnt/dmf20171011_03125144
IceCube: https://hiphopdx.com/news/id.29291/title.ice-cube-on-working-with-the-bomb-squad-i-was-lucky
Snoop: http://knowyourmeme.com/photos/895441-snoop-dogg
Tupac: https://www.alux.com/networth/tupac-shakur/
Dr Dre: https://www.drdre.com/
Craig Mack: https://www.puna.nl/flava-ya-ear-rapper-craig-mack-op-46-jarige-leeftijd-overleden/
Jay-Z: https://www.rte.ie/entertainment/2018/0128/936537-jay-z-speaks-out-about-infidelity/
Slick Rick: https://www.hiphopinjesmoel.com/agenda/slick-rick/
Akon: http://realnewsmagazine.net/entertainment/akon-host-afrima-2017/
The Game: https://www.stereogum.com/1938551/the-game-sues-viacom-for-20m-over-sexual-assault-verdict/news/
Code Academy: https://www.codecademy.com/courses/learn-javascript/lessons/control-flow/exercises/
*/

// de array met alle legends erin x2, nodig om plaatjes aan te roepen en te matchen later
var legends = ["50cent","biggie","drake","eazye","eminem","icecube","snoop","tupac","50cent","biggie","drake","eazye","eminem","icecube","snoop","tupac", "drdre", "drdre", "craigmack", "craigmack", "jayz", "jayz", "slickrick", "slickrick", "akon", "akon", "game", "game", "llcoolj", "llcoolj"];



//naam van legend bij complete set
var legendNaam = document.querySelector("#legendNaam");

// naaminvoer formulier voor highscore
var formulier = document.querySelector("#naamInvoer");

// wordt tijd in weergegeven
var klokBlok = document.querySelector("#klok");

// startknop
var startKnop = document.querySelector("#startKnop");

//maakt een array aan met alle memory images erin//
var plaatjes = document.querySelectorAll("img");

var scoreBoard = document.querySelector("#highScore");
var scoreBoardSchaduw = document.querySelector("#highScoreSchaduw");
var scoreBoardPlekjes = document.querySelectorAll("#highScore li");


// bijhouden hoe vaak er is omgedraaid in een ronde, ronde is dus 2 plaatjes aanklikken en dan matchen of fout
var aantalOmgedraaid = 0;

// kijkt welke twee plaatjes omgedraaid zijn en slaat ze op (in functie plaatjeOmdraaien)
var plaatjesOmgedraaid = [];

// bijhouden van punten. spel gewonnen bij 8 punten dus legends.length / 2;
var punten = 0;

// maak muziek alvast aan, nummer verschilt per legend
var muziek = new Audio();

// houdt bij hoeveel seconden zijn verstreken tot winst van de game
var seconden = 0;
var minuten = 0;

var aantalPogingen = 0;
var aantalPogingenTekstvak = document.querySelector("#aantalPogingen");



// function die telkens 1 bij seconde op telt en de tekst in de html aanpast
function updateKlok(){
    seconden++;
    if (seconden == 60){
        seconden = 0;
        minuten++;
    }
    if (seconden < 10){
        seconden = "0" + seconden;
    }

    klokBlok.textContent = "Tijd: " + minuten + ":" + seconden;
}
// gaat zorgen dat aan variable seconden 1 wordt toegevoegd, elke 1000ms
var klok;



// random verdelen van de legends over de plaatjes
// BRON: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function schudKaarten(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
// EINDE BRON



function reset(){
    // reset opgeslagen omgedraaide plaatjes
    plaatjesOmgedraaid = [];
    // reset aantal omgedraaide plaatjes
    aantalOmgedraaid = 0;
}

// roep aan om het scoreboard te laten zien
function popupScoreboard(){
    scoreBoard.classList.remove("hidden");
    scoreBoardSchaduw.classList.remove("hidden");
    // zet de score van de speler neer
    scoreBoardPlekjes[0].textContent = "1. Jij: " + aantalPogingen + " pogingen";
}

function plaatjeOmdraaien(event){ // parameter event is het clickevent dat plaatsvind
    var gekliktePlaatje;
    console.log("omgedraait: ",aantalOmgedraaid);
    // zodra er 2 plaatjes omgedraaid zijn mag niet nog een omdraaien
    if (aantalOmgedraaid < 2){
         gekliktePlaatje = event.target; // event.target = datgene waar je op klikt

        // hulp/bron: Folkert-Jan van der Pol, IAM Core huiswerkbegeleiding
        // sla geklikte plaatje op in array plaatjesOmgedraaid zodat ze later vergeleken kunnen worden
        plaatjesOmgedraaid[aantalOmgedraaid] = gekliktePlaatje;

        aantalOmgedraaid++; // tel 1 bij aantalOmgedraaid op zodat ik kan kijken wanneer er 1 of 2 plaatjes omgedraaid zijn

        // verander de image src van uit naar het plaatje van de legend "erachter"
        gekliktePlaatje.src = "images/"+gekliktePlaatje.alt+".png";
    }

    // is nieuwe if statement omdat aantalOmgedraaid in vorige if statement 2 kan worden
    // checken wanneer er twee plaatjes omgedraait zijn, zo ja, is er een match?
    if (aantalOmgedraaid == 2){
        // elke keer dat je twee plaatjes geklikt hebt, heb je een poging gedaan die hier wordt bijgehouden
        aantalPogingen++;

        // check of de legendnaam van het eerstgeklikte plaatje hetzelfde is als het andere plaatje EN check of er niet twee keer op hetzelfde plaatje is geklikt
        if (plaatjesOmgedraaid[0].alt == plaatjesOmgedraaid[1].alt && plaatjesOmgedraaid[0] != plaatjesOmgedraaid[1]) {
            console.log("PUNT ERBIJ");

            // de naam van de legend staat in de alt van het gekliktePlaatje. bij een match komt ie in de paragraaf
            legendNaam.textContent = "je hebt " + gekliktePlaatje.alt + " gevonden";


            // pauzeer huidig nummer
            muziek.pause();
            // verander nummer naar aangeklikte legend
            muziek.src = "audio/"+gekliktePlaatje.alt+".mp3";
            // speel nieuw nummer af
            muziek.play();


            // tel 1 bij punten op
            punten++;

            // checken of je alle sets goed hebt
            // (dus het aantal legends dat er is / 2 want het zijn paren)
            if (punten == legends.length / 2){

                // stop de klok
                clearInterval(klok);

                // opslaan tijd hier ergens
                console.log("GEWONNENNN");

                // laat scoreboard zien
                popupScoreboard();
            }



            // reset de ronde, zie functie reset hier boven
            reset();

        } else {
            console.log("DRAAI TERUG");

            // setTimeout voert de code uit na 1000ms
            setTimeout(
                function(){
                    plaatjesOmgedraaid[0].src = "images/UIT.png";
                    plaatjesOmgedraaid[1].src = "images/UIT.png";

                    // reset de ronde, zie functie reset hier boven
                    reset();
                },
                1000); // verander 1000 naar iets anders om timing aan te passen
        }


        // laat het aantal punten ten opzichte van pogingen zien
        aantalPogingenTekstvak.textContent = punten + "/" + aantalPogingen;
    }
}

function start(){
    // begin de secondeteller vanaf dit moment elke 1000ms
    klok = setInterval(updateKlok, 1000);

    // zet legends in een willekeurige volgorde
    legends = schudKaarten(legends);
    console.log(legends);

    // voer een addEventListener (klik) uit voor alle plaatjes
    // Loop voert net zo vaak uit als het aantal plaatjes in de array
    var i;
    for(i = 0; i < plaatjes.length; i++){
        // bepaal plek van elke legend
        plaatjes[i].alt = legends[i];
        // als je op een image click, voer dan functie plaatjeOmdraaien uit
        plaatjes[i].addEventListener("click", plaatjeOmdraaien);
    }

}





startKnop.addEventListener("click", start);
