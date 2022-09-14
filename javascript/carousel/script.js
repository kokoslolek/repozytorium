const views = [ //tablica obiektów
    {
        "src" : "1.webp",
        "name" : "Pierwszy",
        "alt" : "City" 
    },
    {
        "src" : "2.webp",
        "name" : "Drugi",
        "alt" : "Skyscrapers" 
    },
    {
        "src" : "3.webp",
        "name" : "Trzeci",
        "alt" : "Beach"
    },
]


function getSingleView( index ){
    const h2 = document.querySelector("h2")
    h2.innerHTML = views[index].name

    const img = document.querySelector("img")
    img.src = views[index].src
    img.alt = views[index].alt
}

let currentSlide = 0;
getSingleView(currentSlide)

function modifyCurrentSide(direction){
    
    if(direction == 'right'){
        currentSlide++;
    }
    if(currentSlide >= views.length){
        currentSlide = 0;
    }
    if(direction == 'left'){
        currentSlide--;
    }
    if(currentSlide < 0){
        currentSlide = views.length - 1;
    }
    getSingleView(currentSlide)
    }
const rightArr = document.querySelector(".right") 
rightArr.onclick = function(){modifyCurrentSide('right')}

const leftArr = document.querySelector(".left")
leftArr.onclick = function(){modifyCurrentSide('left')}
