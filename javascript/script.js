// console.log("ELO2");

const x = 1;
let y = 1;
// x = 2;
y = 3;
// console.log( 'y =', y, ', x =', x)

const personName = "John"
// console.log(personName)

// OBIEKTY 
const person = {
  name : "John",
  age: 38,
  outfit : {
    hat: "Chanel",
    shirt: "Supreme",
    boots: "Nike"
  }
}

// console.log( person )
// console.log( person.name )
// console.log( person.outfit )

// console.log( person['name'] )

//  TABLICA
const people = ['John', 'Joanna', 'Josh']
// console.log( people[0] )



// FUNKCJA
// definicja funkcji ( co ma się dziać )
function przyklad( argument = 'default' ) {
  console.log("siemka")
  console.log("wykonuję się z: ", argument)
  console.log("nara")
  return 'zwracam wartosc z ' + argument
}


// wywołanie
// przyklad('argumentem')
// przyklad()

// const zwrot = przyklad('arg')
// console.log( zwrot )





// console.log('argument')
// console.log(console.memory)
// console.log(console)

const dog = {
  voice: () => {
    console.log(' hał hał ')
  }
}

// dog.voice()


// console.log( document )



const h1 = document.querySelector('h1')
// console.log(h1)
h1.innerHTML = "TEST"


let count = 0;
function counter(){
  count++;
  console.log(count)
}

// przypisanie wydarzenia do kliknięcia na h1
h1.onclick = function(){
  counter()
}


// WARUNEK
let a = 500;

if(a < 2){
  console.log("a jest mniejsze od 2")
}else{
  console.log("a nie jest mniejsze od 2")
}
