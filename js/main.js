// ✅ GreenTrend - Updated main.js

let currency = 'INR';

// Toggle Currency const currencyToggleBtn = document.getElementById('currency-toggle-button'); currencyToggleBtn.addEventListener('click', () => { currency = currency === 'INR' ? 'USD' : 'INR'; currencyToggleBtn.textContent = currency; renderAll(); });

// Render Featured Products function renderFeatured() { const container = document.getElementById('featured-products'); container.innerHTML = ''; featuredProducts.forEach(product => container.appendChild(createProductCard(product))); }

// Render Categories function renderCategories() { const container = document.getElementById('category-list'); container.innerHTML = ''; categories.forEach(cat => { const div = document.createElement('div'); div.className = 'category-card'; div.innerHTML = <img src="${cat.image}" alt="${cat.name}" /> <h3>${cat.name}</h3>; container.appendChild(div); }); }

// Render All Products function renderProducts() { const container = document.getElementById('product-grid'); if (!container) return; container.innerHTML = ''; products.forEach(product => container.appendChild(createProductCard(product))); }

// Search Functionality const searchBox = document.getElementById('searchBox'); if (searchBox) { searchBox.addEventListener('input', () => { const keyword = searchBox.value.toLowerCase(); const resultsDiv = document.getElementById('searchResults'); resultsDiv.innerHTML = ''; if (keyword.length > 0) { const filtered = products.filter(p => p.name.toLowerCase().includes(keyword)); filtered.forEach(p => { const div = document.createElement('div'); div.className = 'search-result'; div.textContent = p.name; div.onclick = () => window.location.href = product-detail.html?id=${p.id}; resultsDiv.appendChild(div); }); } }); }

// Create Product Card function createProductCard(product) { const div = document.createElement('div'); div.className = 'product-card'; div.innerHTML = <img src="${product.image}" alt="${product.name}" /> <h3>${product.name}</h3> <p>${product.description}</p> <p class="price">${currency === 'INR' ? '₹' + product.priceINR : '$' + product.priceUSD}</p> <a href="${currency === 'INR' ? product.buyLinkIN : product.buyLinkUS}" target="_blank" class="buy-btn">Buy Now</a>; return div; }

// Master Render function renderAll() { renderFeatured(); renderCategories(); renderProducts(); }

document.addEventListener('DOMContentLoaded', renderAll);

