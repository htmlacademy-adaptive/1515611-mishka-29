// Order modal
const orderModal = document.querySelector("#order-modal");

//Catalog modal

const videoBtn = document.getElementById("video-presentation-button");

videoBtn.addEventListener("click", () => {
  orderModal.classList.add("show-modal");
});
