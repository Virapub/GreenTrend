// ✅ Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// ✅ Detect country for currency
let currentCurrency = "INR";
const userCountry = navigator.language.includes("en-US") ? "US" : "IN";
if (userCountry === "US") currentCurrency = "USD";

// ✅ Get product from data.js
const product = products.find(p => p.id === productId);

if (!product) {
  document.getElementById("product-details").innerHTML = `<p>Product not found.</p>`;
} else {
  const productHTML = `
    <div class="product-detail-card">
      <img src="${product.image}" alt="${product.name}" class="product-detail-image" />
      <div class="product-detail-info">
        <h2>${product.name}</h2>
        <p class="product-description">${product.description}</p>
        <p class="product-rating">⭐ ${product.rating} / 5</p>
        <ul class="feature-list">
          ${product.features ? product.features.map(f => `<li>✔️ ${f}</li>`).join('') : ''}
        </ul>
        <p class="product-price">
          ${currentCurrency === "INR" ? `₹${product.priceINR}` : `$${product.priceUSD}`}
        </p>
        <a 
          class="buy-now-btn"
          href="${currentCurrency === 'INR' ? product.buyLinkIN : product.buyLinkUS}" 
          target="_blank"
        >
          Buy Now
        </a>
      </div>
    </div>
    <button class="back-btn" onclick="history.back()">← Back</button>
  `;

  document.getElementById("product-details").innerHTML = productHTML;
}
