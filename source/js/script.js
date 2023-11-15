const nav = document.querySelector(".header__nav-list");
const menuButton = document.querySelector(".header__nav-toggle");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("opened");
});
