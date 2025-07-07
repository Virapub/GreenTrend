document.addEventListener("DOMContentLoaded", () => {
  const productListDiv = document.getElementById("product-list");
  const searchBox = document.getElementById("searchBox");
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
  // For index.html, we only want to show a subset, typically "top products".
  // For products.html, we show all products.
  if (productListDiv) { // Check if the product list container exists on the current page
      if (window.location.pathname.includes("products.html")) {
          // On products.html, display all products
          displayProducts(products);
      } else if (window.location.pathname.includes("index.html")) {
          // On index.html, display a limited number of top products (e.g., first 3-6)
          // You can define which products are "top" or just slice the array.
          displayProducts(products.slice(0, 6)); // Display top 6 products on homepage
      }
  }


  // Search Functionality (for both index.html and products.html)
  if (searchBox) {
    searchBox.addEventListener("input", () => {
      const query = searchBox.value.toLowerCase().trim();
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );

      // Display search results in a dedicated search results area (e.g., dropdown)
      // For simplicity, here we will just update the main product list on products.html
      // or show a simple "no results" message if on index.html's search bar (no specific searchResults div shown here)
      const currentPath = window.location.pathname;

      if (currentPath.includes("products.html")) {
        displayProducts(filtered); // Update product list on products.html
      } else if (currentPath.includes("index.html")) {
        // On index.html, you might want a separate search results overlay or simply
        // link to products.html with the search query.
        // For now, if on index.html, we'll just log the search and not change the main product display.
        // If you had a #searchResults div, you'd populate that.
        const searchResultsDiv = document.getElementById("searchResults");
        if (searchResultsDiv) {
            if (query === "") {
                searchResultsDiv.innerHTML = "";
                searchResultsDiv.style.display = "none";
            } else if (filtered.length > 0) {
                searchResultsDiv.innerHTML = filtered.map(product =>
                    `<a href="product.html?id=${product.id}">${product.name}</a>`
                ).join("");
                searchResultsDiv.style.display = "block";
            } else {
                searchResultsDiv.innerHTML = "<p>No matches found.</p>";
                searchResultsDiv.style.display = "block";
            }
        }
      }
    });
  }

  // Responsive nav toggle (moved here from individual HTML files)
  if (navToggleBtn && navMenu) {
    navToggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }
});
