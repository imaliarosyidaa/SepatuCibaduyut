const orderSummary = document.getElementById('orderSummary');
const from = localStorage.getItem('checkoutFrom');

const singleProduct = JSON.parse(localStorage.getItem('checkoutItem'));
const cart = JSON.parse(localStorage.getItem('checkoutCart'));

function parsePrice(priceStr) {
  return parseFloat(String(priceStr).replace(/[^\d]/g, ""));
}

// Format harga
function formatRupiah(value) {
  return 'Rp' + value.toLocaleString('id-ID');
}

if (from === 'productData' && singleProduct) {
  let quantity = 1;
  const subtotal = parsePrice(singleProduct.price) * quantity;
  orderSummary.innerHTML = `
    <div class= "flex justify-between">
    <div class="flex gap-2 items-center">
      <img src="${singleProduct.image}" alt="${singleProduct.name}" class="w-12 h-12 object-cover rounded">
      <div>
        <p class="font-medium">${singleProduct.name}</p>
        <p class="text-xs text-gray-500">Rp ${parsePrice(singleProduct.price).toLocaleString('id-ID')} × ${quantity}</p>
      </div>
    </div>
    <div class="font-semibold text-sm">
      Rp ${subtotal.toLocaleString('id-ID')}
    </div>
    </div>
    <p><strong>Total: ${formatRupiah(subtotal)}</strong></p>
  `;
  localStorage.removeItem('checkoutItem');
  localStorage.removeItem('checkoutFrom');
} else if (from === 'cart' && cart && cart.length > 0) {
  let quantity = 1;
  let html = '';
  let total = 0;
  cart.forEach(item => {
    const subtotal = parsePrice(item.price) * quantity;
    total += subtotal;

    html += `
    <div class= "flex justify-between">
    <div class="flex gap-2 items-center">
      <img src="${item.img}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
      <div>
        <p class="font-medium">${item.name}</p>
        <p class="text-xs text-gray-500">Rp ${parsePrice(item.price).toLocaleString('id-ID')} × ${quantity}</p>
      </div>
    </div>
    <div class="font-semibold text-sm">
      Rp ${subtotal.toLocaleString('id-ID')}
    </div>
    </div>
  `;
  });
  html += `<hr><p><strong>Total: ${formatRupiah(total)}</strong></p>`;
  orderSummary.innerHTML = html;
  localStorage.removeItem('checkoutCart');
  localStorage.removeItem('checkoutFrom');
} else {
  orderSummary.innerHTML = '<p>Checkout tidak valid atau data kosong.</p>';
}
