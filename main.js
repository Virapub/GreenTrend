// ✅ GreenTrend - main.js

let currentCurrency = "INR";

// --- Format Price According to Currency ---
function formatPrice(inr, usd) {
  return currentCurrency === "INR"
    ? `₹${inr}`
    : `$${usd.toFixed(2)}`;
}

// --- Render Featured Products ---
function renderFeaturedProducts() {
  const container = document.getElementById("featured-products");
  container.innerHTML = "";

  featuredProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">${formatPrice(product.priceINR, product.priceUSD)}</p>
      <a href="${currentCurrency === 'INR' ? product.buyLinkIN : product.buyLinkUS}" target="_blank" class="buy-btn">Buy Now</a>
    `;
    container.appendChild(card);
  });
}

// --- Render Categories ---
function renderCategories() {
  const catContainer = document.getElementById("category-list");
  catContainer.innerHTML = "";

  categories.forEach(cat => {
    const div = document.createElement("div");
    div.classList.add("category-card");

    div.innerHTML = `
      <img src="${cat.image}" alt="${cat.name}">
      <h4>${cat.name}</h4>
    `;
    catContainer.appendChild(div);
  });
}

// --- Live Search Functionality ---
function setupSearch() {
  const input = document.getElementById("searchBox");
  const results = document.getElementById("searchResults");

  input.addEventListener("input", () => {
    const term = input.value.toLowerCase();
    results.innerHTML = "";

    if (term === "") {
      results.style.display = "none";
      return;
    }

    const matched = products.filter(p =>
      p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    );

    if (matched.length === 0) {
      results.innerHTML = "<p>No products found</p>";
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
}

// --- Currency Toggle Setup ---
function setupCurrencyToggle() {
  const toggle = document.getElementById("currency-toggle-button");

  toggle.addEventListener("click", () => {
    currentCurrency = currentCurrency === "INR" ? "USD" : "INR";
    toggle.textContent = currentCurrency;
    renderFeaturedProducts(); // Refresh prices
    setupSearch(); // Update price in search results
  });
}

// --- On Load ---
document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedProducts();
  renderCategories();
  setupSearch();
  setupCurrencyToggle();
});
