// Add Favorite
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".favorite-btn");
  if (!btn) return;

  const id = btn.dataset.id;
  const name = btn.dataset.name;
  const price = btn.dataset.price;
  const img = btn.dataset.img;

  const product = { id,name, price, img };

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favorites.some(p => p.name === name);
  if (!exists) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Ditambahkan ke Favorit!");
  } else {
    alert("Sudah ada di Favorit.");
  }
});