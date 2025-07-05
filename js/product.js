// products.js - Final Version
window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = products.find(p => p.id == productId); // Loose equality for type coercion
  const container = document.getElementById("product-details");

  if (!product) {
    container.innerHTML = "<p>Product not found.</p>";
    return;
  }

  container.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="price">Price: ₹${product.priceINR}${product.priceUSD ? ` / $${product.priceUSD}` : ''}</p>
    <p>${product.description}</p>
    ${product.features ? `
    <ul>
      ${product.features.map(feature => `<li>${feature}</li>`).join("")}
    </ul>
    ` : ''}
    <div>
      <a href="${product.link || '#'}" class="buy-btn" ${product.link ? 'target="_blank"' : ''}>Buy Now</a>
      <a href="products.html" class="buy-btn">All Products</a>
    </div>
    ${product.rating ? `<p>Rating: ${"★".repeat(Math.round(product.rating))}${product.rating % 1 ? ".5" : ""}</p>` : ''}
  `;
});
