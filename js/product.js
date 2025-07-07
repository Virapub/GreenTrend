document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = products.find(p => p.id === productId); // 'products' array comes from data.js
  const container = document.getElementById("product-details");

  if (!container) {
    console.error("Product details container not found.");
    return;
  }

  if (!product) {
    container.innerHTML = "<p class='product-not-found'>Sorry, the product you are looking for was not found.</p>";
    container.style.textAlign = "center";
    container.style.padding = "2rem";
    return;
  }

  container.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy" />
    </div>
    <div class="product-info">
      <h2>${product.name}</h2>
      <p class="price">
        <span class="price-inr">₹${product.priceINR.toLocaleString()}</span> /
        <span class="price-usd">$${product.priceUSD.toFixed(2)}</span>
      </p>
      <p class="description">${product.description}</p>
      <div class="features">
        <h4>Key Features:</h4>
        <ul>
          ${product.features.map(f => `<li>✔ ${f}</li>`).join("")}
        </ul>
      </div>
      <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="buy-btn">Buy Now on Amazon</a>
      <p class="rating">Rating: ${"★".repeat(Math.floor(product.rating))}${product.rating % 1 ? "½" : ""} (${product.rating.toFixed(1)}/5)</p>
      <p class="category">Category: <span>${product.category}</span></p>
    </div>
  `;
});
