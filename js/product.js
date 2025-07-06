window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = products.find(p => p.id === productId);
  const container = document.getElementById("product-details");

  if (!product) {
    container.innerHTML = "<p>Product not found.</p>";
    return;
  }

  container.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="product-info">
      <h3>${product.name}</h3>
      <p class="price">Price: ₹${product.priceINR} / $${product.priceUSD}</p>
      <p>${product.description}</p>
      <ul>
        ${product.features.map(feature => `<li>${feature}</li>`).join("")}
      </ul>
      <a href="${product.link}" class="buy-btn" target="_blank">Buy Now</a>
      <p>Rating: ${"★".repeat(Math.round(product.rating))}${product.rating % 1 ? "½" : ""}</p>
    </div>
  `;
});
