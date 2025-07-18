// Detect user country using localStorage fallback (mocked)
let userCountry = localStorage.getItem('userCountry') || 'IN';

// Currency symbols
const currencySymbol = {
  IN: '₹',
  US: '$'
};

// Format price
function formatPrice(price, country) {
  const rate = country === 'US' ? 0.012 : 1; // Example rate: ₹1 = $0.012
  return `${currencySymbol[country]}${Math.round(price * rate)}`;
}

// Render products dynamically
function renderProducts(productArray, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const filtered = productArray.filter(p => p.availability.includes(userCountry));
  if (filtered.length === 0) {
    container.innerHTML = '<p>No products available for your region.</p>';
    return;
  }

  filtered.forEach(product => {
    const link = product.link[userCountry] || '#';
    const productHTML = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" />
        <h4>${product.name}</h4>
        <p>${formatPrice(product.price, userCountry)}</p>
        <a href="${link}" target="_blank">Buy Now</a>
      </div>
    `;
    container.innerHTML += productHTML;
  });
}

// Render categories
function renderCategories() {
  const categoryContainer = document.getElementById('category-section');
  if (!categoryContainer) return;

  categoryContainer.innerHTML = categories.map(cat => `
    <div class="category-card" data-category="${cat.slug}">
      <img src="${cat.image}" alt="${cat.name}" />
      <p>${cat.name}</p>
    </div>
  `).join('');
}

// Filter by category
document.addEventListener('click', e => {
  if (e.target.closest('.category-card')) {
    const selected = e.target.closest('.category-card').dataset.category;
    const filtered = products.filter(p => 
      p.category.toLowerCase().includes(selected.replace('-', ' ')) &&
      p.availability.includes(userCountry)
    );
    renderProducts(filtered, 'product-section');
  }
});

// Currency Toggle
document.getElementById('currency-toggle')?.addEventListener('change', e => {
  userCountry = e.target.value;
  localStorage.setItem('userCountry', userCountry);
  renderProducts(products, 'product-section');
});

// Live Search
document.getElementById('search-input')?.addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  const results = products.filter(p =>
    p.name.toLowerCase().includes(term) &&
    p.availability.includes(userCountry)
  );
  renderProducts(results, 'product-section');
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderProducts(products, 'product-section');

  const currencySelect = document.getElementById('currency-toggle');
  if (currencySelect) {
    currencySelect.value = userCountry;
  }
});
