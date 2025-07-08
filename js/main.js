// js/main.js

document.addEventListener("DOMContentLoaded", () => {
  const productListDiv = document.getElementById("product-list");
  const searchBox = document.getElementById("searchBox");
  const searchResultsDiv = document.getElementById("searchResults"); // Get the search results div
  const navToggleBtn = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  // Function to display products
  function displayProducts(productsToShow) {
    if (!productListDiv) {
      // This main.js is also used on products.html, which has product-list
      // But not on index.html's main product list (it's called product-list-section).
      // So, we only proceed if productListDiv exists.
      return;
    }

    productListDiv.innerHTML = ""; // Clear existing products

    if (productsToShow.length === 0) {
      productListDiv.innerHTML = "<p>No products found matching your search.</p>";
      return;
    }

    productsToShow.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      // Dynamically create product card HTML
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="product-details">
          <h3>${product.name}</h3>
          <p class="price">₹${product.priceINR.toLocaleString()}</p>
          <a href="product.html?id=${product.id}" class="buy-btn" aria-label="View details for ${product.name}">View Details</a>
        </div>
      `;
      productListDiv.appendChild(card);
    });
  }

  // Initial Display of products on products.html and index.html (if product-list exists)
  if (productListDiv) {
      if (window.location.pathname.includes("products.html")) {
          displayProducts(products); // Assuming 'products' is available globally from data.js
      } else if (window.location.pathname.includes("index.html")) {
          displayProducts(products.slice(0, 6)); // Display top 6 products on homepage
      }
  }

  // --- Search Functionality ---
  if (searchBox && searchResultsDiv) { // Ensure search elements exist
    const performSearch = () => {
        const query = searchBox.value.toLowerCase().trim();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );

        if (query === "") {
            searchResultsDiv.innerHTML = "";
            searchResultsDiv.style.display = "none";
        } else if (filteredProducts.length > 0) {
            searchResultsDiv.innerHTML = filteredProducts.map(product =>
                `<a href="product.html?id=${product.id}">${product.name}</a>`
            ).join("");
            searchResultsDiv.style.display = "block";
        } else {
            searchResultsDiv.innerHTML = "<p>No matches found.</p>";
            searchResultsDiv.style.display = "block";
        }

        // On products.html, update the main product list
        if (window.location.pathname.includes("products.html")) {
            displayProducts(filteredProducts);
        }
    };

    searchBox.addEventListener("input", performSearch); // Live search as user types

    // Optional: If you also have a search button and want it to trigger search
    const searchButton = document.querySelector('.search-button');
    if (searchButton) {
        searchButton.addEventListener("click", performSearch);
    }

    // Hide search results when clicking outside
    document.addEventListener('click', (event) => {
        if (!searchBox.contains(event.target) && !searchResultsDiv.contains(event.target)) {
            searchResultsDiv.style.display = 'none';
        }
    });

    // Handle pressing Enter key
    searchBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
            searchBox.blur(); // Hide keyboard on mobile after pressing Enter
        }
    });

  } else {
      console.warn("Search elements (searchBox or searchResults) not found.");
  }

  // --- Responsive nav toggle ---
  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active"); // Changed from "show" to "active"
    });

    // Optional: Close menu when clicking outside
    document.addEventListener('click', (event) => {
        // Check if the click was outside the nav menu and not on the toggle button
        if (!navMenu.contains(event.target) && !navToggleBtn.contains(event.target)) {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
  } else {
      console.warn("Navigation elements (navToggleBtn or navMenu) not found.");
  }
});
