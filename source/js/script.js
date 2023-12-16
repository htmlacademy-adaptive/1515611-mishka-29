const nav = document.querySelector(".header__nav-list");
const menuButton = document.querySelector(".header__nav-toggle");

nav.classList.add("closed");
menuButton.classList.remove("header__nav-toggle--hidden");

menuButton.addEventListener("click", () => {
  nav.classList.toggle("opened");
  nav.classList.toggle("closed");
  menuButton.classList.toggle("opened");
});

// Order modal
const addToCartBtn = document.querySelector(".goods__button");
const orderModal = document.querySelector("#order-modal");
const addToCartModalBtn = document.querySelector("#add-to-cart-btn");

addToCartBtn.addEventListener("click", () => {
  orderModal.classList.add("show-modal");
});

addToCartModalBtn.addEventListener("click", () => {
  orderModal.classList.remove("show-modal");
});
