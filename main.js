// ✅ GreenTrend - Professional Main JS

let currentCurrency = "INR";

// Format Price According to Currency
function formatPrice(inr, usd) {
  return currentCurrency === "INR"
    ? `₹${inr.toLocaleString('en-IN')}`
    : `$${usd.toFixed(2)}`;
}

// Render Featured Products
function renderFeaturedProducts() {
  const container = document.getElementById("featured-products");
  if (!container) return;
  
  container.innerHTML = "";

  featuredProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">${formatPrice(product.priceINR, product.priceUSD)}</p>
      <a href="product-detail.html?id=${product.id}" class="buy-btn">View Details</a>
    `;
    container.appendChild(card);
  });
}

// Render Categories
function renderCategories() {
  const catContainer = document.getElementById("category-list");
  if (!catContainer) return;
  
  catContainer.innerHTML = "";

  categories.forEach(cat => {
    const div = document.createElement("div");
    div.classList.add("category-card");
    div.addEventListener("click", () => {
      window.location.href = `products.html?category=${cat.slug}`;
    });

    div.innerHTML = `
      <img src="${cat.image}" alt="${cat.name}">
      <h4>${cat.name}</h4>
    `;
    catContainer.appendChild(div);
  });
}

// Live Search Functionality
function setupSearch() {
  const input = document.getElementById("searchBox");
  const results = document.getElementById("searchResults");
  if (!input || !results) return;

  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    results.innerHTML = "";

    if (term === "") {
      results.style.display = "none";
      return;
    }

    const matched = products.filter(p =>
      p.name.toLowerCase().includes(term) || 
      p.description.toLowerCase().includes(term)
    );

    if (matched.length === 0) {
      results.innerHTML = "<p class='no-results'>No products found</p>";
    } else {
      matched.forEach(p => {
        const item = document.createElement("div");
        item.classList.add("search-item");
        item.innerHTML = `
          <img src="${p.image}" alt="${p.name}">
          <div>
            <h4>${p.name}</h4>
            <p>${formatPrice(p.priceINR, p.priceUSD)}</p>
          </div>
        `;
        item.addEventListener("click", () => {
          window.location.href = `product-detail.html?id=${p.id}`;
        });
        results.appendChild(item);
      });
    }

    results.style.display = "block";
  });

  // Hide results when clicking outside
  document.addEventListener("click", (e) => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.style.display = "none";
    }
  });
}

// Currency Toggle Setup
function setupCurrencyToggle() {
  const toggle = document.getElementById("currency-toggle-button");
  if (!toggle) return;

  // Set initial currency based on user location
  if (navigator.language.includes("en-US")) {
    currentCurrency = "USD";
    toggle.textContent = "USD";
  }

  toggle.addEventListener("click", () => {
    currentCurrency = currentCurrency === "INR" ? "USD" : "INR";
    toggle.textContent = currentCurrency;
    
    // Refresh all price displays
    renderFeaturedProducts();
    setupSearch();
    
    // Refresh product detail page if needed
    if (window.location.pathname.includes("product-detail")) {
      const event = new Event("DOMContentLoaded");
      document.dispatchEvent(event);
    }
  });
}

// Highlight current page in navigation
function setupNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

// On Load
document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedProducts();
  renderCategories();
  setupSearch();
  setupCurrencyToggle();
  setupNavigation();
});
