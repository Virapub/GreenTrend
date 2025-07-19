// Currency toggle and display logic
let currentCurrency = localStorage.getItem("currency") || "INR";
document.addEventListener("DOMContentLoaded", () => {
  // Currency toggle
  const currencyToggle = document.getElementById("currencyToggle");
  if (currencyToggle) {
    currencyToggle.value = currentCurrency;
    currencyToggle.addEventListener("change", (e) => {
      currentCurrency = e.target.value;
      localStorage.setItem("currency", currentCurrency);
      renderAllSections();
    });
  }
  // Search bar
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderAllProducts(PRODUCTS.filter(p =>
        p.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        p.description.toLowerCase().includes(e.target.value.toLowerCase())
      ));
    });
  }
  renderAllSections();
});

function renderAllSections() {
  if (document.getElementById("editorsPicksList")) renderSection("editors", "editorsPicksList");
  if (document.getElementById("trendingList")) renderSection("trending", "trendingList");
  if (document.getElementById("newArrivalsList")) renderSection("new", "newArrivalsList");
  if (document.getElementById("allProductsList")) renderAllProducts(PRODUCTS);
  if (document.getElementById("categoryProductsList")) renderCategoryPage();
  if (document.getElementById("productDetails")) renderProductPage();
}

function renderSection(tag, elementId) {
  const list = PRODUCTS.filter(p => p.tags && p.tags.includes(tag));
  document.getElementById(elementId).innerHTML = list.map(productCardHTML).join('');
}

function renderAllProducts(list) {
  document.getElementById("allProductsList").innerHTML = list.map(productCardHTML).join('');
}

function renderCategoryPage() {
  const url = new URL(window.location.href);
  const cat = url.searchParams.get("cat");
  const mapping = {
    budget: "Budget-Friendly Finds",
    midrange: "Mid-Range Marvels",
    premium: "Premium Innovations"
  };
  document.getElementById("categoryTitle").textContent = mapping[cat] || "Category";
  const products = PRODUCTS.filter(p => p.category === cat);
  document.getElementById("categoryProductsList").innerHTML = products.map(productCardHTML).join('');
}

function renderProductPage() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) {
    document.getElementById("productDetails").innerHTML = "<p>Product not found.</p>";
    return;
  }
  let gallery = product.images.map(img => `<img src="${img}" alt="${product.title}">`).join('');
  let features = product.features ? `<ul class="features">${product.features.map(f => `<li>${f}</li>`).join('')}</ul>` : '';
  document.getElementById("productDetails").innerHTML = `
    <div class="product-card">
      <div class="product-gallery">${gallery}</div>
      <div class="product-title">${product.title}</div>
      <div class="product-desc">${product.description}</div>
      <div class="product-price">
        <span>${currentCurrency === "INR" ? `₹${product.priceINR}` : `$${product.priceUSD}`}</span>
      </div>
      <div class="buy-buttons">
        <a class="buy-btn" href="${product.affiliateIN}" target="_blank">Buy on Amazon India</a>
        <a class="buy-btn" href="${product.affiliateUS}" target="_blank">Buy on Amazon US</a>
      </div>
      ${features}
    </div>
  `;
}

function productCardHTML(product) {
  let img = product.images && product.images.length ? product.images[0] : "assets/placeholder.jpg";
  return `
    <div class="product-card">
      <a href="product.html?id=${product.id}">
        <img src="${img}" alt="${product.title}">
        <div class="product-title">${product.title}</div>
      </a>
      <div class="product-desc">${product.description}</div>
      <div class="product-price">${currentCurrency === "INR" ? `₹${product.priceINR}` : `$${product.priceUSD}`}</div>
      <div class="buy-buttons">
        <a class="buy-btn" href="${product.affiliateIN}" target="_blank">Amazon IN</a>
        <a class="buy-btn" href="${product.affiliateUS}" target="_blank">Amazon US</a>
      </div>
    </div>
  `;
}
