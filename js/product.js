document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = products.find(p => p.id === productId);
  const container = document.getElementById("product-detail-content");

  if (!container) {
    console.error("Product details container not found.");
    return;
  }

  if (!product) {
    container.innerHTML = "<p class='product-not-found'>Sorry, the product you are looking for was not found.</p>";
    return;
  }

  container.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
    </div>
    <div class="product-info">
      <h2>${product.name}</h2>
      <div class="price-details">
        <span class="price" id="product-detail-price" data-inr-price="${product.priceINR}">₹${product.priceINR.toLocaleString()}</span>
      </div>
      <div class="rating">
        ${"★".repeat(Math.floor(product.rating))}${product.rating % 1 ? "½" : ""}
        <span>(${product.rating.toFixed(1)}/5)</span>
      </div>
      <p class="description">${product.description}</p>
      <div class="product-features">
        <h4>Key Features:</h4>
        <ul>
          ${product.features.map(f => `<li>✔ ${f}</li>`).join("")}
        </ul>
      </div>
      <div class="action-buttons">
        <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="buy-now-btn">Buy Now on Amazon</a>
      </div>
      <p class="category">Category: <span>${product.category}</span></p>
    </div>
  `;
});
