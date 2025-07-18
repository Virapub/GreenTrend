// Currency Toggle
let currentCurrency = 'INR';
const currencyButton = document.getElementById('currency-toggle-button');
currencyButton.addEventListener('click', () => {
  currentCurrency = currentCurrency === 'INR' ? 'USD' : 'INR';
  currencyButton.textContent = currentCurrency;
  renderProducts();
  renderProductDetails();
});

// Format Price
function formatPrice(priceINR, priceUSD) {
  return `${currentCurrency} ${currentCurrency === 'INR' ? priceINR : priceUSD}`;
}

// Render Products
function renderProducts() {
  const productContainer = document.getElementById('featured-products');
  if (productContainer) {
    productContainer.innerHTML = '';
    products.forEach(product => {
      const productCard = `
        <div class="col">
          <div class="card product-card">
            <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text"><strong>${formatPrice(product.price.INR, product.price.USD)}</strong></p>
              <a href="products.html?id=${product.id}" class="btn btn-primary">View Details</a>
            </div>
          </div>
        </div>
      `;
      productContainer.innerHTML += productCard;
    });
  }
}

// Render Categories
function renderCategories() {
  const categoryContainer = document.getElementById('category-list');
  if (categoryContainer) {
    categoryContainer.innerHTML = '';
    categories.forEach(category => {
      const categoryCard = `
        <div class="col">
          <div class="card category-card">
            <img src="${category.image}" class="card-img-top" alt="${category.name}" loading="lazy">
            <div class="card-body">
              <h5 class="card-title">${category.name}</h5>
              <a href="products.html" class="btn btn-outline-primary">Shop Now</a>
            </div>
          </div>
        </div>
      `;
      categoryContainer.innerHTML += categoryCard;
    });
  }
}

// Search Functionality
document.getElementById('searchBox')?.addEventListener('input', function (e) {
  const query = e.target.value.toLowerCase();
  const resultsContainer = document.getElementById('searchResults');
  if (resultsContainer) {
    resultsContainer.innerHTML = '';
    if (query) {
      const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
      resultsContainer.style.display = filteredProducts.length ? 'block' : 'none';
      resultsContainer.innerHTML = filteredProducts.length
        ? filteredProducts.map(product => `
          <div class="search-result-item d-flex align-items-center p-2 border-bottom">
            <img src="${product.image}" alt="${product.name}" width="50" loading="lazy">
            <div class="ms-3">
              <h6 class="mb-0">${product.name}</h6>
              <p class="mb-0">${formatPrice(product.price.INR, product.price.USD)}</p>
            </div>
          </div>
        `).join('')
        : '<p class="p-2">No results found.</p>';
    } else {
      resultsContainer.style.display = 'none';
    }
  }
});

// Render Product Details (for products.html)
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
    <div class="product-detail-box">
      <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
      <div class="product-info">
        <h2>${product.name}</h2>
        <div class="rating">${product.rating ? '⭐'.repeat(Math.round(product.rating)) + ` (${product.rating}/5)` : 'No ratings yet'}</div>
        <p class="description">${product.description}</p>
        ${product.features ? `<ul class="features">${product.features.map(f => `<li>✔️ ${f}</li>`).join('')}</ul>` : ''}
        <p class="price"><strong>${formatPrice(product.price.INR, product.price.USD)}</strong></p>
        <a class="btn btn-primary buy-now-btn" href="${currentCurrency === 'INR' ? product.buyLinkIN : product.buyLinkUS}" target="_blank" aria-label="Buy ${product.name}">Buy Now</a>
        <button class="btn btn-outline-secondary back-btn" onclick="window.history.back()" aria-label="Back to products">← Back to Products</button>
      </div>
    </div>
  `;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderCategories();
  renderProductDetails();
});
