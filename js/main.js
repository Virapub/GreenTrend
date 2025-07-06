window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-list");

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="price">Price: ₹${product.priceINR} / $${product.priceUSD}</p>
      <a href="product.html?id=${product.id}" class="buy-btn">View Details</a>
    `;

    container.appendChild(card);
  });
});
