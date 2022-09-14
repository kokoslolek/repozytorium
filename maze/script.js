// POBIERAMY GAMEPLANE Z HTML'A PO KLASIE
const gamePlane = document.querySelector('.gamePlane')

// Funkcja tworząca ścianę na podstawie argumentów 
// x - odległość od lewe
// y - odległość od góry
// w - szerokość ściany
// h - wysokość ściany
// type - rodzaj (start, meta, wall)
function makeWall(x, y, w, h, type = 'wall') {  

  // ustaw kolor ściany
  let color = 'green' // domyślny
  if(type == 'start') { color = 'blue' }
  if(type == 'meta') { color = 'orange' }

  // Tworzymy nowy element HTML (div)
  const wall = document.createElement('div')
  // do stworzonego elementu dodajemy style
  wall.style.cssText = `
    /* $ { } - pozwala na dodanie js'owej zmiennej wewnątrz backtick'ów*/
    background:${color};
    width:${w}%;
    height:${h}%;
    left:${x}%;
    top:${y}%;
    position:absolute;
  `
  // dodajemy klasy do każdego diva
  wall.className = 'wall'
  if(type != 'wall'){
    // jeżeli ściana nie jest zwykłym wallem, to dodaj
    // jej typ jako klasę ( po spacji )
    wall.className += ' '+type;
  }

  // do gameplanu (który jest wpięty w HTML'a)
  // wpinamy walla
  gamePlane.append(wall)
}

// tablica map przechowująca tablice zawierające informacje o ścianie
// (każdy pojedyńczy element tablicy map to jedna ściana)
const map = [
  [0,0,20,20, 'start'],
  [10,20,20,10],
  [20,30,20,10],
  [30,40,20,10],
  [40,50,20,10],
  [50,60,20,10],
  [60,70,30,10],
  [80,80,20,20, 'meta']
]

// pętla, pobierająca elementy tablicy map jako wall
for(const wall of map){
  // w tym miejscu wyciągany jest po kolei każdy element tablicy map
  // jako wall
  // ...wall wyciągają dane z tablicy wall i przekazywane są 
  // jako kolejne argumenty funckji makewall
  makeWall(...wall)
}

// mechanika gry
const game = {
  // definiujemy wszystkie aktywne elementy gry
  buttons: {
    start: document.querySelector('.start'),
    meta: document.querySelector('.meta'),
    walls: document.querySelectorAll('.wall'),
  },
  // metoda przygotowująca grę
  init(){
    // przypisz do pola start możliwość kliknięcia i rozpoczęcia gry
    game.buttons.start.onclick = function () { game.start() }

  },
  start(){ // start gry
    // zablokuj możliwość rozpoczęcia nowej gry
    game.buttons.start.onclick = ""
    // "nasłuchuj" kursora na polu meta (jeśli się tam pojawi, wywoła 
    // metodę game.metaTrigger)
    game.buttons.meta.addEventListener('mousemove', game.metaTrigger)
    
    gamePlane.addEventListener('mousemove', game.wallListener)
    console.log("GAME STARTED")
    for(const wall of game.buttons.walls){
        wall.addEventListener('mousemove', game.gamePlaneListener)
    }

    console.log("GAME STARTED")
},
  wallListener(e){
    e.stopPropagation();
  },
  gamePlaneListener(e){
    console.log('gamePlane listen')
    //console.log('CHECKING', e)
  },
  // metoda wywołująca się po nakierowaniu myszką na metę
  metaTrigger(){
    // zakończ grę z pozytywnym wynikiem
    game.over(true)
  },
  // zakończ grę - wynik zależy od result - może być true - wygrana,
  // lub false - przegrana
  over(result){
    // wyświetl odpowiedni komunikat
    if(result){
      console.log("YOU WIN")
    }else{
      console.log("YOU LOSE")
    }
    // zdejmij słuchacza z pola meta (przestajemy nasłuchiwać kursor 
    // na polu meta)
    game.buttons.meta.removeEventListener('mousemove', game.metaTrigger)

    gamePlane.removeEventListener('mousemove', game.wallListener)
    console.log("GAME STARTED")
    for(const wall of game.buttons.walls){
        wall.removeEventListener('mousemove', game.gamePlaneListener)
    }
    // przygotuj nową grę
    game.init()
  }
}
// przygotuj grę
// ta metoda wywołuje się po każdym odświeżeniu strony
game.init()