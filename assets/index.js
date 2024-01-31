const open = document.querySelector("#open");
const close = document.querySelector("#close");
const links = document.querySelector(".nav-links");
const nav = document.querySelector('.navbar')

open.onclick = function(){
    open.style.display = "none";
    close.style.display = "block";
    links.style.display = "flex";
    nav.style.height = "45vh";
    
} 

close.onclick = function(){
    open.style.display = "block";
    close.style.display = "none";
    links.style.display = "none"
    nav.style.height = "7vh";
    
 
}