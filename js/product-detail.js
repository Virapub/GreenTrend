// ✅ GreenTrend - product-detail.js

// Get product ID from URL const urlParams = new URLSearchParams(window.location.search); const productId = urlParams.get('id');

// Find product from data.js const product = products.find(p => p.id === productId);

// Currency Toggle Logic (shared) let currency = 'INR'; const currencyBtn = document.getElementById('currency-toggle-button'); currencyBtn.addEventListener('click', () => { currency = currency === 'INR' ? 'USD' : 'INR'; currencyBtn.textContent = currency; renderProductDetails(); });

// Render Product Details function renderProductDetails() { if (!product) return; document.getElementById('product-image').src = product.image; document.getElementById('product-name').textContent = product.name; document.getElementById('product-description').textContent = product.description; document.getElementById('product-price').textContent = currency === 'INR' ? ₹${product.priceINR} : $${product.priceUSD}; document.getElementById('buy-button').href = currency === 'INR' ? product.buyLinkIN : product.buyLinkUS; document.getElementById('product-rating').textContent = ⭐ ${product.rating || '4.5'} / 5; const featuresList = document.getElementById('product-features'); featuresList.innerHTML = ''; if (product.features && product.features.length) { product.features.forEach(f => { const li = document.createElement('li'); li.textContent = f; featuresList.appendChild(li); }); } }

document.addEventListener('DOMContentLoaded', renderProductDetails);

