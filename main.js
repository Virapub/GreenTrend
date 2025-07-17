// ✅ GreenTrend - FINAL UPDATED main.js

let currentCurrency = 'INR';

// Utility function to format price function formatPrice(inr, usd) { return currentCurrency === 'INR' ? ₹${inr.toLocaleString()} : $${usd.toFixed(2)}; }

// ✅ Currency Toggle const currencyToggleBtn = document.getElementById('currency-toggle-button'); currencyToggleBtn.addEventListener('click', () => { currentCurrency = currentCurrency === 'INR' ? 'USD' : 'INR'; currencyToggleBtn.textContent = currentCurrency; renderAll(); });

// ✅ Render Featured Products function renderFeatured() { const featuredIds = [ 'collapsible-electric-kettle', 'mini-electric-chopper', 'smart-trash-can', 'electric-pooja-diffuser' ];

const container = document.getElementById('featured-products'); if (!container) return; container.innerHTML = '';

const featured = products.filter(p => featuredIds.includes(p.id)); featured.forEach(product => { container.innerHTML += productCard(product); }); }

// ✅ Render Categories function renderCategories() { const container = document.getElementById('category-list'); if (!container) return; container.innerHTML = '';

categories.forEach(cat => { container.innerHTML += <div class="category-card"> <img src="${cat.image}" alt="${cat.name}" /> <h3>${cat.name}</h3> </div>; }); }

// ✅ Product Card function productCard(product) { return <div class="product-card"> <img src="${product.image}" alt="${product.name}" /> <h3>${product.name}</h3> <p>${product.description}</p> <strong>${formatPrice(product.priceINR, product.priceUSD)}</strong> </div>; }

// ✅ Search const searchInput = document.getElementById('searchBox'); if (searchInput) { searchInput.addEventListener('input', () => { const query = searchInput.value.toLowerCase(); const resultBox = document.getElementById('searchResults'); if (!resultBox) return; resultBox.innerHTML = ''; if (query === '') return;

const results = products.filter(p =>
  p.name.toLowerCase().includes(query) ||
  p.description.toLowerCase().includes(query)
);

results.forEach(product => {
  resultBox.innerHTML += `
    <div class="search-item">${product.name} - ${formatPrice(product.priceINR, product.priceUSD)}</div>
  `;
});

}); }

// ✅ Master render function function renderAll() { renderFeatured(); renderCategories(); }

// Initial Render renderAll();

