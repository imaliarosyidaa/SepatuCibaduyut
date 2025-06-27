function parsePrice(priceStr) {
  return parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
}

document.addEventListener('DOMContentLoaded', () => {
  const orderSummary = document.getElementById('orderSummary');
  const product = JSON.parse(localStorage.getItem('checkoutItem'));

  if (!product) {
    orderSummary.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  const quantity = 1;
  const subtotal = parsePrice(product.price) * quantity;

  const item = document.createElement('div');
  item.className = 'order-item flex justify-between items-center border-b pb-2';
  item.innerHTML = `
    <div class="flex gap-2 items-center">
      <img src="${product.image}" alt="${product.name}" class="w-12 h-12 object-cover rounded">
      <div>
        <p class="font-medium">${product.name}</p>
        <p class="text-xs text-gray-500">Rp ${parsePrice(product.price).toLocaleString('id-ID')} × ${quantity}</p>
      </div>
    </div>
    <div class="font-semibold text-sm">
      Rp ${subtotal.toLocaleString('id-ID')}
    </div>
  `;
  orderSummary.appendChild(item);

  const totalEl = document.createElement('div');
  totalEl.className = 'pt-3 font-bold text-right text-gray-800';
  totalEl.innerText = `Total: Rp ${subtotal.toLocaleString('id-ID')}`;
  orderSummary.appendChild(totalEl);
});
