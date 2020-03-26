const realisation = document.querySelector('.realisation')
const forwardControlInstruction = document.querySelector('.forwardControlInstruction')
const leftControlInstruction = document.querySelector('.leftControlInstruction')
const backwardControlInstruction = document.querySelector('.backwardControlInstruction')
const rightControlInstruction = document.querySelector('.rightControlInstruction')
const spaceControlInstruction = document.querySelector('.spaceControlInstruction')
const escControlInstruction = document.querySelector('.escControlInstruction')
const SQSKey = document.querySelector('.SQSKey')
const espaceKey = document.querySelector('.espaceKey')
const escKey = document.querySelector('.escKey')


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

forwardControlInstruction.addEventListener(
    'click',
    ()=>{
        window.alert('oij')
    }
)
