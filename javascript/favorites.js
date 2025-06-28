document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("favorites-container");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function renderFavorites() {
    container.innerHTML = "";
    if (favorites.length === 0) {
    container.innerHTML = `
      <p class="col-span-full text-center text-gray-500 text-sm">
        Tidak ada produk ditemukan.
      </p>`;
    return;
    }

    favorites.forEach((product, index) => {
      const card = document.createElement("div");
      card.className = 'bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden';

      card.innerHTML = `
        <div class="relative group text-xs sm:text-sm">
        <!-- Gambar Produk -->
        <img
          src="${product.img}"
          alt="${product.name}"
          class="w-full h-40 sm:h-52 object-cover group-hover:scale-105 transition duration-300 rounded-md" />

        <!-- Tombol Favorite & Remove -->
        <div
          class="absolute top-2 right-2 flex gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
          
          <!-- Favorite -->
          <button class="p-1 bg-white rounded-full shadow favorite-btn"
            data-name="${product.name}"
            data-price="${product.price}"
            data-img="${product.image}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              class="w-5 h-5 sm:w-6 sm:h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>

          <!-- Remove -->
          <button class="remove-btn p-1 bg-white rounded-full shadow"
            data-name="${product.name}"
            data-price="${product.price}"
            data-img="${product.image}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              class="w-5 h-5 sm:w-6 sm:h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Detail Produk -->
      <div class="p-3 text-xs sm:text-sm">
        <p class="font-medium truncate">${product.name}</p>
        <p class="text-red-600 font-semibold mb-2">${product.price}</p>

        <!-- Tombol Checkout & Add to Cart -->
        <div class="flex flex-col sm:flex-row gap-2 w-full">
          <!-- Checkout -->
          <button
            class="bg-gray-600 text-white w-full sm:w-3/4 px-4 py-2 sm:py-2.5 text-xs sm:text-sm rounded hover:bg-gray-700 flex justify-center sm:justify-around items-center gap-2">
            <span>Check Out</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              class="w-5 h-5 sm:w-6 sm:h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>

          <!-- Add to Cart -->
          <button
            class="bg-gray-900 text-white w-full sm:w-1/4 flex justify-center py-2 sm:py-2.5 text-xs sm:text-sm rounded hover:bg-gray-800"
            data-name="${product.name}"
            data-price="${product.price}"
            data-img="${product.image}">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-shopping-cart">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path
                d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </button>
        </div>
      </div>
      `;

      container.appendChild(card);
    });

    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderFavorites();
      });
    });
  }

  renderFavorites();
});
