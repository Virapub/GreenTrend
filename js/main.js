// main.js
window.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const searchBox = document.getElementById("searchBox");

  function displayProducts(filteredProducts) {
    productList.innerHTML = "";
    filteredProducts.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">₹${product.priceINR.toLocaleString()}</p>
        <a href="${product.link}" class="buy-btn" target="_blank">Buy Now</a>
      `;
      productList.appendChild(card);
    });
  }

  displayProducts(products); // initial load

  // 🔍 Search filter
  if (searchBox) {
    searchBox.addEventListener("input", () => {
      const query = searchBox.value.toLowerCase();
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
      displayProducts(filtered);
    });
  }
});
