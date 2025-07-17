// ✅ GreenTrend - product-detail.js (Handles Product Detail Page)

document.addEventListener("DOMContentLoaded", () => { const params = new URLSearchParams(window.location.search); const productId = params.get("id"); const currencyToggle = document.getElementById("currency-toggle-button");

const product = products.find(p => p.id === productId);

if (!product) { document.getElementById("product-detail").innerHTML = <p>Product not found.</p>; return; }

const imageEl = document.getElementById("product-image"); const nameEl = document.getElementById("product-name"); const descEl = document.getElementById("product-description"); const priceEl = document.getElementById("product-price"); const ratingEl = document.getElementById("product-rating"); const featuresEl = document.getElementById("product-features"); const buyBtn = document.getElementById("buy-button");

let currentCurrency = "INR";

function renderProductDetails() { imageEl.src = product.image; imageEl.alt = product.name; nameEl.textContent = product.name; descEl.textContent = product.description;

if (currentCurrency === "USD") {
  priceEl.textContent = `$${product.priceUSD}`;
  buyBtn.href = product.buyLinkUS || "#";
} else {
  priceEl.textContent = `₹${product.priceINR}`;
  buyBtn.href = product.buyLinkIN || "#";
}

ratingEl.innerHTML = `⭐ ${product.rating} / 5`;
featuresEl.innerHTML = "";
if (product.features && product.features.length > 0) {
  product.features.forEach(feature => {
    const li = document.createElement("li");
    li.textContent = feature;
    featuresEl.appendChild(li);
  });
}

}

// Currency toggle handler currencyToggle.addEventListener("click", () => { currentCurrency = currentCurrency === "INR" ? "USD" : "INR"; currencyToggle.textContent = currentCurrency; renderProductDetails(); });

renderProductDetails(); });

