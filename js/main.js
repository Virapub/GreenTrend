// ==============================
// 🌍 1. Detect User Country
// ==============================
const userCountry = navigator.language.includes("en-IN") ? "IN" : "US";

// ==============================
// 📦 2. Display Products
// ==============================
function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach(product => {
    const availability = product.countryAvailability || "ALL";

    if (availability === userCountry || availability === "ALL") {
      // Set price and link according to user country
      let price = "";
      let buyLink = "";

      if (userCountry === "IN" && product.priceINR && product.buyLinkIN) {
        price = `₹${product.priceINR}`;
        buyLink = product.buyLinkIN;
      } else if (userCountry === "US" && product.priceUSD && product.buyLinkUS) {
        price = `$${product.priceUSD}`;
        buyLink = product.buyLinkUS;
      } else {
        return; // Skip if price or link not available for that country
      }

      // Create product card
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">${price}</p>
        <a href="${buyLink}" target="_blank" class="buy-btn">Buy Now</a>
      `;

      productList.appendChild(productCard);
    }
  });
}

// ==============================
// 🚀 3. Initialize on Page Load
// ==============================
document.addEventListener("DOMContentLoaded", displayProducts);
