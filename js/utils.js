// ✅ Currency Toggle Logic
let currentCurrency = localStorage.getItem("currency") || "INR";

function formatPrice(product) {
  return currentCurrency === "INR"
    ? `₹${product.priceINR}`
    : `$${product.priceUSD}`;
}

function getAffiliateLink(product) {
  return currentCurrency === "INR"
    ? product.affiliateLinkIN
    : product.affiliateLinkUS;
}

// ✅ Toggle Currency Function
function toggleCurrency() {
  currentCurrency = currentCurrency === "INR" ? "USD" : "INR";
  localStorage.setItem("currency", currentCurrency);
  document.dispatchEvent(new Event("currencyChanged"));
}

// ✅ Get Query Param from URL (like id from product.html?id=xxx)
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// ✅ Filter Products by Category ID
function getProductsByCategory(catId) {
  return products.filter((p) => p.category === catId);
}

// ✅ Get Product by ID
function getProductById(prodId) {
  return products.find((p) => p.id === prodId);
}

// ✅ Currency Button Setup
function setupCurrencyToggleButton(btnSelector) {
  const btn = document.querySelector(btnSelector);
  if (btn) {
    btn.innerText = currentCurrency;
    btn.addEventListener("click", () => {
      toggleCurrency();
      btn.innerText = currentCurrency;
    });
  }
}
