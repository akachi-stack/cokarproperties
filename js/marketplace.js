document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".view-item-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      console.log("View item ID:", btn.dataset.id);
      // Future PHP redirect here
    });
  });

  document.querySelectorAll(".add-cart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      console.log("Add to cart ID:", btn.dataset.id);
      // Future cart logic
    });
  });

});


const cartKey = "glaze_cart";

/* GET CART */
function getCart() {
  return JSON.parse(localStorage.getItem(cartKey)) || [];
}

/* SAVE CART */
function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartCount();
}

/* ADD TO CART */
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("add-to-cart-btn")) return;

  const item = e.target.closest(".market-item");

  const product = {
    id: item.dataset.id,
    title: item.dataset.title,
    price: Number(item.dataset.price),
    image: item.dataset.image,
    qty: 1
  };

  let cart = getCart();
  const existing = cart.find(p => p.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(product);
  }

  saveCart(cart);
});

/* UPDATE CART COUNT */
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.querySelector(".cart-count");
  if (badge) badge.textContent = count;
}

updateCartCount();

document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("viewModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  const modalPrice = document.getElementById("modalPrice");
  const modalImg1 = document.getElementById("modalImg1");
  const modalImg2 = document.getElementById("modalImg2");
  const modalImg3 = document.getElementById("modalImg3");
  const modalAddBtn = document.querySelector(".modal-add-cart-btn");
  const modalClose = document.querySelector(".modal-close");

  let currentItem = null;

  const descriptions = {
    Land: "This premium land is ideal for residential or commercial investment. Strategically located, dry, well-surveyed, and positioned for long-term appreciation with access to major infrastructure and growing developments.",
    House: "This modern home offers elegant architecture, spacious interiors, premium finishes, and a secure environment suitable for families and real estate investors.",
    Furniture: "This furniture piece combines durability, comfort, and aesthetics, crafted with high-quality materials to enhance modern living spaces.",
    Electronics: "This electronic product delivers high efficiency, smart technology integration, and reliable performance for everyday use.",
    Kitchen: "This kitchen item is designed for efficiency, safety, and durability, blending modern functionality with stylish design."
  };

  /* OPEN MODAL */
  document.body.addEventListener("click", (e) => {
    const viewBtn = e.target.closest(".view-item-btn");
    if (!viewBtn) return;

    const card = viewBtn.closest(".market-item");
    if (!card) return;

    currentItem = {
      id: card.dataset.id,
      title: card.dataset.title,
      category: card.dataset.category,
      price: parseInt(card.dataset.price),
      image: card.dataset.image
    };

    modalTitle.textContent = currentItem.title;
    modalDesc.textContent = descriptions[currentItem.category];
    modalPrice.textContent = `₦${currentItem.price.toLocaleString()}`;

    modalImg1.src = currentItem.image;
    modalImg2.src = currentItem.image.replace("1", "2");
    modalImg3.src = currentItem.image.replace("1", "3");

    modal.classList.add("active");
  });

  /* ADD TO CART FROM MODAL */
  modalAddBtn.addEventListener("click", () => {
    if (!currentItem) return;

    addToCart(currentItem); // 🔥 REUSES YOUR EXISTING CART LOGIC
    modal.classList.remove("active");
  });

  /* CLOSE MODAL */
  modalClose.addEventListener("click", () => modal.classList.remove("active"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });

});
