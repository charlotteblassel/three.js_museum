const realisation = document.querySelector('.realisation')

let transition = setTimeout(
    function (){
        realisation.style.opacity='0'
    },4000
)
let transition2 = setTimeout(
    function (){
        realisation.textContent='Appuyez sur ESPACE pour entrer dans le musée'
        realisation.style.opacity='1'
        realisation.style.border='1px solid red'
    },5000
)