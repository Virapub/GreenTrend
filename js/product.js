// product.js
// Currency Toggle
let currentCurrency = 'INR';
const currencyButton = document.getElementById('currency-toggle-button');
if (currencyButton) {
  currencyButton.addEventListener('click', () => {
    currentCurrency = currentCurrency === 'INR' ? 'USD' : 'INR';
    currencyButton.textContent = currentCurrency;
    renderProductDetails();
  });
}

// Format Price
function formatPrice(priceINR, priceUSD) {
  return `${currentCurrency} ${currentCurrency === 'INR' ? priceINR : priceUSD}`;
}

// Render Product Details
function renderProductDetails() {
  const detailContainer = document.getElementById('product-detail');
  if (!detailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    detailContainer.innerHTML = '<p class="text-danger text-center">Product not found.</p>';
    return;
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    detailContainer.innerHTML = '<p class="text-danger text-center">Product not found.</p>';
    return;
  }

  detailContainer.innerHTML = `
    <div class="row product-detail-box">
      <div class="col-md-6">
        <img src="${product.image}" alt="${product.name}" class="product-image img-fluid" loading="lazy">
      </div>
      <div class="col-md-6 product-info">
        <h2>${product.name}</h2>
        <div class="rating mb-3">${product.rating ? '⭐'.repeat(Math.round(product.rating)) + ` (${product.rating}/5)` : 'No ratings yet'}</div>
        <p class="description">${product.description}</p>
        ${product.features ? `<ul class="features list-unstyled mb-3">${product.features.map(f => `<li>✔️ ${f}</li>`).join('')}</ul>` : ''}
        <p class="price mb-3"><strong>${formatPrice(product.price.INR, product.price.USD)}</strong></p>
        <a class="btn btn-primary buy-now-btn mb-2" href="${currentCurrency === 'INR' ? product.buyLinkIN : product.buyLinkUS}" target="_blank" aria-label="Buy ${product.name}">Buy Now</a>
        <button class="btn btn-outline-secondary back-btn" onclick="window.history.back()" aria-label="Back to products">← Back to Products</button>
      </div>
    </div>
  `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProductDetails();
});
