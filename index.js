var menuNav = document.getElementById("nav");
var menuButton = document.getElementById("menu-button");

menuButton.addEventListener("click",() => {
menuNav.classList.toggle("expanded");
});