// ✅ GreenTrend - products.js (Displays all products with category, currency toggle, and search)

document.addEventListener("DOMContentLoaded", () => { const productContainer = document.getElementById("product-grid"); const categoryFilter = document.getElementById("category-filter"); const currencyToggle = document.getElementById("currency-toggle-button"); const searchBox = document.getElementById("searchBox");

let currentCurrency = "INR";

function displayProducts(filteredProducts) { productContainer.innerHTML = ""; filteredProducts.forEach(product => { const card = document.createElement("div"); card.className = "product-card";

card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <strong class="price">${currentCurrency === "USD" ? `$${product.priceUSD}` : `₹${product.priceINR}`}</strong>
    <a href="product-detail.html?id=${product.id}" class="btn">View Details</a>
  `;

  productContainer.appendChild(card);
});

}

function applyFilters() { const selectedCategory = categoryFilter.value; const query = searchBox.value.toLowerCase();

let filtered = products.filter(p =>
  (selectedCategory === "all" || p.category === selectedCategory) &&
  (p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
);

displayProducts(filtered);

}

currencyToggle.addEventListener("click", () => { currentCurrency = currentCurrency === "INR" ? "USD" : "INR"; currencyToggle.textContent = currentCurrency; applyFilters(); });

categoryFilter.addEventListener("change", applyFilters); searchBox.addEventListener("input", applyFilters);

applyFilters(); });

