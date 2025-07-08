// js/main.js

document.addEventListener("DOMContentLoaded", () => {
    const productListDiv = document.getElementById("product-list");
    const searchBoxDesktop = document.getElementById("searchBox"); // Desktop search input
    const searchBoxMobile = document.getElementById("searchBoxMobile"); // Mobile search input
    const navToggleBtn = document.getElementById("navToggle"); // Menu toggle button
    const navMenu = document.getElementById("navMenu"); // Navigation menu
    const searchResultsDiv = document.getElementById("searchResults"); // Search results for desktop

    // --- Critical Check: Ensure 'products' data is loaded ---
    if (typeof products === 'undefined' || !Array.isArray(products)) {
        console.error("Error: 'products' data is not loaded or is not an array. Please ensure 'data.js' is loaded correctly BEFORE 'main.js' in your HTML.");
        if (productListDiv) {
            productListDiv.innerHTML = "<p>Product data could not be loaded. Please ensure 'js/data.js' is correctly linked and contains the 'products' array.</p>";
        }
        return; // Stop script execution if data is missing
    } else {
        console.log("Products data loaded successfully:", products.length, "products found.");
    }

    // Function to display products dynamically
    function displayProducts(productsToShow, targetDiv = productListDiv) {
        if (!targetDiv) {
            console.warn(`Warning: Target display div not found for products. Cannot display products.`);
            return;
        }

        targetDiv.innerHTML = ""; // Clear existing products to avoid duplicates

        if (productsToShow.length === 0) {
            targetDiv.innerHTML = "<p class='no-products-message' style='text-align: center; padding: 20px; color: #555;'>Sorry, no products found matching your criteria.</p>";
            return;
        }

        productsToShow.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            // Make sure product.image path is correct, e.g., 'images/coffee-maker.jpg'
            // For external images like m.media-amazon.com, ensure they are accessible.
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x200/cccccc/333333?text=Image+Not+Found';">
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p class="price">₹${product.priceINR.toLocaleString('en-IN')}</p>
                    <a href="${product.link}" class="buy-btn" target="_blank" rel="noopener noreferrer" aria-label="Buy ${product.name} on Amazon">View Details</a>
                </div>
            `;
            targetDiv.appendChild(card);
        });
    }

    // --- Initial Product Display Logic ---
    // Check if we are on the homepage (index.html) or a dedicated products page (products.html)
    const currentPagePath = window.location.pathname.split('/').pop(); // Gets 'index.html' or 'products.html'

    if (productListDiv) { // Ensure the product list div exists on the current page
        if (currentPagePath === "index.html" || currentPagePath === "") {
            // Display top 6 products on the homepage
            console.log("Displaying featured products on homepage...");
            displayProducts(products.slice(0, 6));
        } else if (currentPagePath === "products.html") {
            // Display all products on the dedicated products page
            console.log("Displaying all products on products page...");
            displayProducts(products);
        }
    }


    // --- Search Functionality ---
    const setupSearch = (searchBox, resultsDiv, isMobile = false) => {
        if (!searchBox || !resultsDiv) {
            // console.warn(`Search elements not found for ${isMobile ? 'mobile' : 'desktop'}.`);
            return;
        }

        const performSearch = () => {
            const query = searchBox.value.toLowerCase().trim();
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(query) ||
                (product.description && product.description.toLowerCase().includes(query)) ||
                (product.category && product.category.toLowerCase().includes(query))
            );

            // Hide search results dropdown initially for mobile or if no query
            if (isMobile && query === "") { // Only clear and hide dropdown for mobile if query is empty
                 resultsDiv.innerHTML = "";
                 resultsDiv.style.display = "none";
                 if (productListDiv && currentPagePath === "products.html") {
                    displayProducts(products); // Reset product list if search cleared on products.html
                 }
                 return;
            }


            if (query === "") {
                resultsDiv.innerHTML = "";
                resultsDiv.style.display = "none";
                // On products.html, if search is cleared, redisplay all products
                if (productListDiv && currentPagePath === "products.html") {
                    displayProducts(products);
                }
            } else if (filteredProducts.length > 0) {
                // For desktop search dropdown
                resultsDiv.innerHTML = filteredProducts.map(product =>
                    `<a href="${product.link}" target="_blank" rel="noopener noreferrer" class="search-result-item">${product.name}</a>`
                ).join("");
                resultsDiv.style.display = "block";

                // On products.html, update the main product list with filtered results
                if (productListDiv && currentPagePath === "products.html") {
                    displayProducts(filteredProducts, productListDiv);
                }
            } else {
                resultsDiv.innerHTML = "<p class='no-results-msg'>No matches found.</p>";
                resultsDiv.style.display = "block";
                // On products.html, if no results, clear the main product list
                if (productListDiv && currentPagePath === "products.html") {
                    productListDiv.innerHTML = "<p class='no-products-message' style='text-align: center; padding: 20px; color: #555;'>No products found matching your search.</p>";
                }
            }
        };

        searchBox.addEventListener("input", performSearch);

        const searchButton = searchBox.nextElementSibling; // Assuming button is next sibling
        if (searchButton && searchButton.classList.contains('search-button')) {
            searchButton.addEventListener("click", performSearch);
        }

        // Hide search results when clicking outside the search box or results
        document.addEventListener('click', (event) => {
            if (!searchBox.contains(event.target) && !resultsDiv.contains(event.target) && (!searchButton || !searchButton.contains(event.target))) {
                resultsDiv.style.display = 'none';
            }
        });

        // Trigger search on Enter key press
        searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent default form submission
                performSearch();
                searchBox.blur(); // Hide keyboard on mobile after pressing Enter
                // Hide search results dropdown on Enter, especially for mobile
                resultsDiv.style.display = 'none';
            }
        });
    };

    // Initialize search for desktop
    setupSearch(searchBoxDesktop, searchResultsDiv, false);

    // Initialize search for mobile
    // Note: Mobile search results will also appear in searchResultsDiv by default.
    // If you want a different UI for mobile search results, you'll need a separate div for that.
    setupSearch(searchBoxMobile, searchResultsDiv, true);


    // --- Responsive nav toggle (Menu Button) ---
    if (navToggleBtn && navMenu) {
        navToggleBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const isExpanded = navMenu.classList.contains("active");
            navToggleBtn.setAttribute("aria-expanded", isExpanded);
            console.log("Menu button clicked. Menu active status:", isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !navToggleBtn.contains(event.target)) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggleBtn.setAttribute("aria-expanded", "false");
                    console.log("Menu closed by clicking outside.");
                }
            }
        });

        // Close menu when a navigation link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggleBtn.setAttribute("aria-expanded", "false");
                    console.log("Menu closed by clicking on a link.");
                }
            });
        });
    } else {
        console.warn("Navigation toggle button or menu not found. Menu functionality may not work.");
    }
});
