const cartItemsContainer = document.getElementById("cartItems");
const openCartBtn = document.getElementById("openCartBtn");
const openCartBtn2 = document.getElementById("openCartBtn2");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.querySelector(".close-cart");

openCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("translate-x-full");
  cartSidebar.classList.add("translate-x-0");
});

openCartBtn2.addEventListener("click", () => {
  cartSidebar.classList.remove("translate-x-full");
  cartSidebar.classList.add("translate-x-0");
});

closeCart.addEventListener("click", () => {
  cartSidebar.classList.remove("translate-x-0");
  cartSidebar.classList.add("translate-x-full");
});

// Add to Cart
document.addEventListener("click", function (e) {
  const cartSidebar = document.getElementById("cartSidebar");
  const btn = e.target.closest(".add-to-cart");
  if (!btn) return;

  let name, price, img;

  // Jika tombol punya dataset, ambil dari sana
  if (btn.dataset.name && btn.dataset.price && btn.dataset.img) {
    name = btn.dataset.name;
    price = btn.dataset.price;
    img = btn.dataset.img;
  }
  // Jika tidak, fallback ke variabel global `product`
  else if (typeof product !== "undefined") {
    name = product.name;
    price = product.price;
    img = product.images?.[0] || ""; // default ke kosong kalau tidak ada gambar
  } else {
    console.warn("Gagal menambahkan produk ke keranjang: data tidak ditemukan.");
    return;
  }

  const newItem = { name, price, img };

  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.push(newItem);
  localStorage.setItem("cart", JSON.stringify(cartItems));

  if (typeof renderCart === "function") {
    renderCart(); // hanya panggil jika fungsi tersedia
  }

  if (cartSidebar) {
    cartSidebar.classList.remove("translate-x-full");
    cartSidebar.classList.add("translate-x-0");
  }
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

document.addEventListener('DOMContentLoaded', () => {
  const checkoutBtn = document.getElementById('checkoutBtn');

  checkoutBtn.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
      alert('Keranjang Anda kosong!');
      return;
    }

    // Simpan cart ke localStorage dengan key baru untuk checkout
    localStorage.setItem('checkoutCart', JSON.stringify(cart));
    localStorage.setItem('checkoutFrom', 'cart');

    // Arahkan ke halaman checkout
    window.location.href = 'checkout.html';
  });
});