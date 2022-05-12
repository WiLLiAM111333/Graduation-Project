/* LEGACY Theme switch 
const buttonMode = document.getElementById("buttonMode");
var body = document.querySelector('body');
var active = document.getElementsByClassName('active');
var aside = document.querySelector('aside');

buttonMode.onclick = function(){
    body.classList.toggle('active')
    buttonMode.classList.toggle('active')
    buttonMode.innerHTML = "Dark Mode"
    aside.classList.toggle('active');
}
*/