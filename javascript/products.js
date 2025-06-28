const products = [
  {
    id: 1,
    name: 'Black Formal',
    category: 'sneakers',
    price: 'Rp 270.000',
    image: './images/products/Black Formal.jpg'
  },
  {
    id: 2,
    name: 'Classic Oxford',
    category: 'kulit casual',
    price: 'Rp 290.000',
    image: './images/products/brown shoes.jpg'
  },
  {
    id: 3,
    name: 'Diamond Brogue',
    category: 'pantofel pria',
    price: 'Rp 300.000',
    image: './images/products/Diamond Brogue.jpg'
  },
  {
    id: 4,
    name: 'Derby Brown',
    category: 'sneakers',
    price: 'Rp 400.000',
    image: './images/products/Derby Brown.jpg'
  },
  {
    id: 5,
    name: 'Premium Monk',
    category: 'sneakers',
    price: 'Rp 320.000',
    image: './images/products/Premium Monk.jpg'
  }
];

const grid = document.getElementById('productGrid');

// Render produk berdasarkan list
function renderProducts(filtered) {
  grid.innerHTML = '';

  if (!filtered.length) {
    grid.innerHTML = `
      <p class="col-span-full text-center text-gray-500 text-sm">
        Tidak ada produk ditemukan.
      </p>`;
    return;
  }

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden';

    card.innerHTML = `
      <div class="relative group text-xs sm:text-sm">
      <!-- Gambar produk -->
      <a href="./product_detail.html?id=${p.id}">
      <img src="${p.image}" alt="${p.name}"
        class="w-full h-40 sm:h-52 object-cover group-hover:scale-105 transition duration-300 rounded-md" />
      </a>
      <!-- Tombol favorite -->
      <div
        class="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button
          class="p-1 bg-white rounded-full shadow favorite-btn"
          data-name="${p.name}"
          data-price="${p.price}"
          data-img="${p.image}">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-5 h-5 sm:w-6 sm:h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Detail produk -->
    <div class="p-3">
      <p class="font-medium truncate">${p.name}</p>
      <p class="text-red-600 font-semibold mb-2">${p.price}</p>

      <!-- Tombol aksi -->
      <div class="flex flex-col sm:flex-row gap-2 w-full">
        <!-- Tombol Checkout -->
        <button
          class="checkoutBtn orderSummary bg-gray-600 text-white w-full sm:w-3/4 px-4 py-2 sm:py-2.5 text-xs sm:text-sm rounded hover:bg-gray-700 flex justify-center sm:justify-around items-center gap-2">
          <span>Check Out</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-5 h-5 sm:w-6 sm:h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>

        <!-- Tombol Add to Cart -->
        <button
          class="add-to-cart bg-gray-900 text-white w-full sm:w-1/4 flex justify-center py-2 sm:py-2.5 text-xs sm:text-sm rounded hover:bg-gray-800"
          data-name="${p.name}" data-price="${p.price}"
          data-img="${p.image}">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" class="lucide lucide-shopping-cart">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path
              d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </button>
      </div>
    </div>
    `;

    const checkoutBtn = card.querySelector('.checkoutBtn');
    checkoutBtn.addEventListener('click', () => {
      const productData = {
        name: p.name,
        price: p.price,
        image: p.image
      };
      localStorage.setItem('checkoutItem', JSON.stringify(productData));
      localStorage.setItem('checkoutFrom', 'productData');
      window.location.href = 'checkout.html';
    });

    grid.appendChild(card);
  });
}

// Terapkan filter berdasarkan kategori tercentang
function applyFilters() {
  const checkboxes = document.querySelectorAll('.filter-checkbox');
  const activeCategories = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value.trim());

  const filtered = products.filter(p => activeCategories.includes(p.category));
  renderProducts(filtered);
}

// Jalankan saat halaman siap
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.filter-checkbox').forEach(cb =>
    cb.addEventListener('change', applyFilters)
  );
  applyFilters();
});
