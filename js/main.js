// main.js

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const searchBox = document.getElementById("searchBox");

  // Display products dynamically
  function displayProducts(productsToShow) {
    productList.innerHTML = "";

    productsToShow.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">₹${product.priceINR.toLocaleString()}</p>
        <a href="product.html?id=${product.id}" class="buy-btn">View Details</a>
      `;
      productList.appendChild(card);
    });
  }

  // Check if products exist and display
  if (typeof products !== "undefined" && Array.isArray(products)) {
    displayProducts(products);

    // Live Search functionality
    if (searchBox) {
      searchBox.addEventListener("input", () => {
        const query = searchBox.value.toLowerCase().trim();
        const filtered = products.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
        displayProducts(filtered);
      });
    }
  } else {
    console.error("❌ 'products' array not found. Check your data.js file.");
  }

  // Hamburger menu toggle
  const toggleBtn = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }
});
