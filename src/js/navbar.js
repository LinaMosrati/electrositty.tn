const menuButton = document.querySelector("button");
const menu = document.querySelector("nav");

menuButton.addEventListener("click", () => {

    menu.classList.toggle("hidden");

});