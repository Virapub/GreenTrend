window.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const searchBox = document.getElementById("searchBox");

  function displayProducts(productsToShow) {
    if (!productList) return;
    productList.innerHTML = "";

    productsToShow.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-details">
          <h3>${product.name}</h3>
          <p class="price">₹${product.priceINR.toLocaleString()}</p>
          <a href="product.html?id=${product.id}" class="buy-btn">View Details</a>
        </div>
      `;

      productList.appendChild(card);
    });
  }

  // Initial Display
  displayProducts(products);

  // Search Functionality
  if (searchBox) {
    searchBox.addEventListener("input", () => {
      const query = searchBox.value.toLowerCase();
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
      displayProducts(filtered);
    });
  }
});

// Responsive nav toggle
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }
});
