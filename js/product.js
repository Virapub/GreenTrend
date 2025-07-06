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
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="product-info">
      <h2>${product.name}</h2>
      <p class="price">₹${product.priceINR.toLocaleString()} / $${product.priceUSD}</p>
      <p>${product.description}</p>
      <ul>
        ${product.features.map(f => `<li>✔ ${f}</li>`).join("")}
      </ul>
      <a href="${product.link}" target="_blank" class="buy-btn">Buy Now</a>
      <p class="rating">Rating: ${"★".repeat(Math.floor(product.rating))}${product.rating % 1 ? "½" : ""}</p>
    </div>
  `;
});
