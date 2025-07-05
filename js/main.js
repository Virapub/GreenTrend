// js/main.js

window.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">₹${product.priceINR}</p>
      <a href="${product.link}" class="buy-btn" target="_blank">Buy Now</a>
    `;

    productList.appendChild(card);
  });
});
