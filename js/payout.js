const CART_KEY = "glaze_cart";

const itemsContainer = document.getElementById("payoutItems");
const totalItemsEl = document.getElementById("totalItems");
const totalPriceEl = document.getElementById("totalPrice");

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function renderPayout() {
  const cart = getCart();
  itemsContainer.innerHTML = "";

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalItems += item.qty;
    totalPrice += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "payout-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div>
        <h3>${item.title}</h3>
        <p>₦${item.price.toLocaleString()} × ${item.qty}</p>
      </div>
      <button class="remove-btn" data-id="${item.id}">Remove</button>
    `;
    itemsContainer.appendChild(div);
  });

  totalItemsEl.textContent = totalItems;
  totalPriceEl.textContent = `₦${totalPrice.toLocaleString()}`;
}

itemsContainer.addEventListener("click", e => {
  if (!e.target.classList.contains("remove-btn")) return;

  const id = e.target.dataset.id;
  let cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
  renderPayout();
});

renderPayout();

const backBtn = document.getElementById("backToMarketplace");

if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.history.back();
  });
}
