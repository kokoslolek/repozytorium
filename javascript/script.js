const h1 = document.querySelector('h1')

console.log(h1)

h1.innerHTML="TEST"

let count = 0;
function counter(){_
    count++;
    console.log(count)
}
//przypisanie wydarzenia do kliknięcia na h1//
h1.onclick = function(){
    counter()
}