// js/main.js

document.addEventListener("DOMContentLoaded", () => {
    const productListDiv = document.getElementById("product-list");
    const searchBoxDesktop = document.getElementById("searchBox"); // Desktop search
    const searchBoxMobile = document.getElementById("searchBoxMobile"); // Mobile search
    const navToggleBtn = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const searchResultsDiv = document.getElementById("searchResults"); // Search results for desktop

    // Ensure 'products' data is loaded
    if (typeof products === 'undefined' || !Array.isArray(products)) {
        console.error("Error: 'products' data is not loaded or is not an array. Please ensure 'data.js' is loaded correctly before 'main.js'.");
        if (productListDiv) {
            productListDiv.innerHTML = "<p>Product data could not be loaded. Please try again later.</p>";
        }
        return;
    }

    // Function to display products
    function displayProducts(productsToShow, targetDiv = productListDiv) {
        if (!targetDiv) {
            console.warn(`Target display div not found for products.`);
            return;
        }

        targetDiv.innerHTML = ""; // Clear existing products

        if (productsToShow.length === 0) {
            targetDiv.innerHTML = "<p>No products found matching your search.</p>";
            return;
        }

        productsToShow.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p class="price">₹${product.priceINR.toLocaleString('en-IN')}</p>
                    <a href="product.html?id=${product.id}" class="buy-btn" aria-label="View details for ${product.name}">View Details</a>
                </div>
            `;
            targetDiv.appendChild(card);
        });
    }

    // Initial Display of products on homepage (index.html)
    // On a full product page (products.html), you would display all products
    if (productListDiv && (window.location.pathname.includes("index.html") || window.location.pathname === "/")) {
        // Display top 6 products on homepage
        displayProducts(products.slice(0, 6));
    }
    // If you have a separate products.html, you'd add similar logic there:
    // This section needs to be uncommented and potentially modified if you have a products.html page
    // else if (productListDiv && window.location.pathname.includes("products.html")) {
    //     displayProducts(products); // Display all products on products.html
    // }


    // --- Search Functionality ---
    const setupSearch = (searchBox, resultsDiv) => {
        if (!searchBox || !resultsDiv) return;

        const performSearch = () => {
            const query = searchBox.value.toLowerCase().trim();
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );

            if (query === "") {
                resultsDiv.innerHTML = "";
                resultsDiv.style.display = "none";
                // If on products.html and search is cleared, redisplay all products
                if (productListDiv && window.location.pathname.includes("products.html")) {
                    displayProducts(products);
                }
            } else if (filteredProducts.length > 0) {
                resultsDiv.innerHTML = filteredProducts.map(product =>
                    `<a href="product.html?id=${product.id}" class="search-result-item">${product.name}</a>`
                ).join("");
                resultsDiv.style.display = "block";
            } else {
                resultsDiv.innerHTML = "<p class='no-results-msg'>No matches found.</p>";
                resultsDiv.style.display = "block";
            }

            // On products.html, update the main product list with filtered results
            if (productListDiv && window.location.pathname.includes("products.html")) {
                displayProducts(filteredProducts, productListDiv);
            }
        };

        searchBox.addEventListener("input", performSearch);

        // Associate search button if present (assuming it's the next sibling)
        const searchButton = searchBox.nextElementSibling;
        if (searchButton && searchButton.classList.contains('search-button')) {
            searchButton.addEventListener("click", performSearch);
        }

        // Hide search results when clicking outside
        document.addEventListener('click', (event) => {
            if (!searchBox.contains(event.target) && !resultsDiv.contains(event.target) && (!searchButton || !searchButton.contains(event.target))) {
                resultsDiv.style.display = 'none';
            }
        });

        searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
                searchBox.blur(); // Hide keyboard on mobile after pressing Enter
                // For mobile, you might want to hide the search results dropdown immediately on Enter
                if (window.innerWidth <= 768) { // Assuming 768px is your mobile breakpoint
                    resultsDiv.style.display = 'none';
                }
            }
        });
    };

    // Initialize search for desktop
    setupSearch(searchBoxDesktop, searchResultsDiv);

    // Initialize search for mobile (using the same results div for simplicity)
    // You might need to adjust where search results appear for mobile specifically
    // if you want them in a different UI element.
    setupSearch(searchBoxMobile, searchResultsDiv);


    // --- Responsive nav toggle ---
    if (navToggleBtn && navMenu) {
        navToggleBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const isExpanded = navMenu.classList.contains("active");
            navToggleBtn.setAttribute("aria-expanded", isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !navToggleBtn.contains(event.target)) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggleBtn.setAttribute("aria-expanded", "false");
                }
            }
        });

        // Close menu when a navigation link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggleBtn.setAttribute("aria-expanded", "false");
                }
            });
        });
    }
});
