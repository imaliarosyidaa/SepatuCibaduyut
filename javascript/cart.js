const cartItemsContainer = document.getElementById("cartItems");
const openCartBtn = document.getElementById("openCartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.querySelector(".close-cart");

openCartBtn.addEventListener("click", () => {
    cartSidebar.classList.remove("translate-x-full");
    cartSidebar.classList.add("translate-x-0");
});

closeCart.addEventListener("click", () => {
    cartSidebar.classList.remove("translate-x-0");
    cartSidebar.classList.add("translate-x-full");
});

// Add to Cart
document.addEventListener("click", function (e) {
    const btn = e.target.closest(".add-to-cart");
    if (!btn) return;

    const name = btn.dataset.name;
    const price = btn.dataset.price;
    const img = btn.dataset.img;

    const newItem = { name, price, img };

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.push(newItem);
    localStorage.setItem("cart", JSON.stringify(cartItems));

    renderCart();
    cartSidebar.classList.remove("translate-x-full");
    cartSidebar.classList.add("translate-x-0");
});

function renderCart() {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
        return;
    }

    cartItemsContainer.innerHTML = cartItems
        .map(
            (item, index) => `
    <div class="flex justify-between items-center py-3 border-b border-gray-200">
      <div class="flex items-center gap-4">
        <img src="${item.img}" alt="${item.name}" class="w-14 h-14 object-cover rounded shadow" />
        <div>
          <p class="font-semibold text-gray-800">${item.name}</p>
          <p class="text-sm text-red-600 font-medium">${item.price}</p>
        </div>
      </div>
      <button onclick="removeItem(${index})"
        class="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded shadow-sm">
        Remove
      </button>
    </div>
  `
        )
        .join("");
}

function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart();
}

window.onload = renderCart;


document.getElementById('checkoutBtn').addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Keranjang Anda kosong!');
        return;
    }

    localStorage.setItem('checkoutCart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
});