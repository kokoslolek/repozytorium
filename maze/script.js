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
  [80, 0, 20, 20, 'time'],
  [0,0,20,21, 'start'],
  [10,20,20,11],
  [20,30,20,11],
  [30,40,20,11],
  [40,50,20,11],
  [50,60,20,11],
  [60,70,30,11],
  [80,80,20,21, 'meta']
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
  maxTime : 5,
  buttons: {
    time: document.querySelector('.time'),
    start: document.querySelector('.start'),
    meta: document.querySelector('.meta'),
    walls: document.querySelectorAll('.wall'),
  },
  // metoda przygotowująca grę
  init(){
    // przypisz do pola start możliwość kliknięcia i rozpoczęcia gry
    game.buttons.start.onclick = function () { game.start() }
    game.time = game.maxTime
    game.buttons.time.innerHTML = game.time
  },
  start(){ // start gry
    // zablokuj możliwość rozpoczęcia nowej gry
    game.buttons.start.onclick = ""
    // "nasłuchuj" kursora na polu meta (jeśli się tam pojawi, wywoła 
    // zakończenie gry z pozytywnym wynikiem
    game.buttons.meta.addEventListener('mousemove', game.over)

    // jeśli nakierujesz myszkę na gamePlane po starcie, to przegrywasz grę
    // gamePlane.addEventListener('mousemove', game.gamePlaneListener)
    gamePlane.addEventListener('mousemove', game.gamePlaneListener)
    // wyciągamy jako wall każdą ścianę osobno
    for(const wall of game.buttons.walls){
      // jeśli Twój kursor jest na klasie .wall, to nie wyzwalaj
      // żadnych innych słuchaczy (eventListenerów)
      wall.addEventListener('mousemove', game.wallListener)
    }

    game.interval = setInterval(function(){
      game.time--
      if(game.time < 0) { game.over(false) }
      game.buttons.time.innerHTML = game.time
    }, 1000)

    console.log("GAME STARTED")
  },
  wallListener(e){
    e.stopPropagation();
  },
  gamePlaneListener(e){
    game.over(false)
  },
  // zakończ grę - wynik zależy od result - może być true - wygrana,
  // lub false - przegrana
  over(result){
    // wyświetl odpowiedni komunikat
    if(result){
      modal.show('WYGRANA!', 'green')
      document.body.style.backgroundColor = "green"
    }else{
      modal.show('PRZEGRANA!', 'red')
      document.body.style.backgroundColor = "red"
    }
    // zdejmij słuchacza z pola meta (przestajemy nasłuchiwać kursor 
    // na polu meta)
    game.buttons.meta.removeEventListener('mousemove', game.over)

    gamePlane.removeEventListener('mousemove', game.gamePlaneListener)
    for(const wall of game.buttons.walls){
      wall.removeEventListener('mousemove', game.wallListener)
    }

    clearInterval(game.interval)

    // przygotuj nową grę
    game.init()
  }
}
// przygotuj grę
// ta metoda wywołuje się po każdym odświeżeniu strony


// KOMUNIKATY 
const modal = {
  dom : document.createElement("div"),
  h1 : document.createElement("h1"),
  init(){
    modal.dom.style.cssText = `
      border:10px solid green;
      position:fixed;
      width:80vw;
      height:80vh;
      left:10vw;
      top:10vh;
      background:#aa6969;
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      display:none;
      text-align:center;
      border-radius:10px;
    `
    document.body.append(modal.dom)

    modal.h1.innerHTML = "H1"
    modal.dom.append(modal.h1)

    const button = document.createElement("button")
    button.innerHTML = "OK"
    button.style.cssText = ` 
      padding:1rem 4rem;
      border-radius:1rem;
      cursor:pointer;
    `
    button.onclick = function () { modal.hide() }
    modal.dom.append(button)
  },
  show(text, color = '#aa6969') { 
    modal.dom.style.backgroundColor = color
    modal.dom.style.display = "flex";
    modal.h1.innerHTML = text
  },
  hide(){
    modal.dom.style.display = "none";
    document.body.style.backgroundColor = "#fff"
  }

}


modal.init()
// modal.show('KLIKNIJ NA NIEBIESKI KAFELEK, ABY ROZPOCZĄĆ GRĘ <br/> PRZESUŃ KURSOR NA POMARAŃCZOWY, ABY WYGRAĆ')


game.init()