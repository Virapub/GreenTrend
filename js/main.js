document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedProducts();
  renderCategories();
  setupSearch();
  setupCurrencyToggleButton("#currency-btn");
  document.addEventListener("currencyChanged", renderFeaturedProducts);
});

// ✅ Render Featured Products
function renderFeaturedProducts() {
  const container = document.querySelector("#featured-products");
  container.innerHTML = "";

  featuredProductIDs.forEach((id) => {
    const product = getProductById(id);
    if (product) {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p class="price">${formatPrice(product)}</p>
        <a href="product.html?id=${product.id}" class="btn">View Details</a>
      `;

      container.appendChild(card);
    }
  });
}

// ✅ Render Categories
function renderCategories() {
  const container = document.querySelector("#categories");
  container.innerHTML = "";

  categories.forEach((cat) => {
    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML = `
      <img src="${cat.image}" alt="${cat.name}" />
      <h4>${cat.name}</h4>
      <a href="category.html?cat=${cat.id}" class="btn-sm">Explore</a>
    `;
    container.appendChild(card);
  });
}

// ✅ Live Search
function setupSearch() {
  const searchInput = document.querySelector("#search-input");
  const resultsBox = document.querySelector("#search-results");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    resultsBox.innerHTML = "";

    if (query.length < 2) {
      resultsBox.style.display = "none";
      return;
    }

    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(query)
    );

    filtered.forEach((p) => {
      const item = document.createElement("a");
      item.href = `product.html?id=${p.id}`;
      item.innerText = p.name;
      resultsBox.appendChild(item);
    });

    resultsBox.style.display = filtered.length ? "block" : "none";
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-box")) {
      resultsBox.style.display = "none";
    }
  });
}
