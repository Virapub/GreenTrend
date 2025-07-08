// js/main.js

document.addEventListener("DOMContentLoaded", () => {
    const productListDiv = document.getElementById("product-list"); // For index.html/products.html
    const productDetailContentDiv = document.getElementById("product-detail-content"); // For product.html
    const searchBoxDesktop = document.getElementById("searchBox");
    const searchBoxMobile = document.getElementById("searchBoxMobile");
    const navToggleBtn = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");
    const searchResultsDiv = document.getElementById("searchResults");

    // --- Critical Check: Ensure 'products' data is loaded ---
    if (typeof products === 'undefined' || !Array.isArray(products)) {
        console.error("Error: 'products' data is not loaded or is not an array. Please ensure 'data.js' is loaded correctly BEFORE 'main.js' in your HTML.");
        if (productListDiv) {
            productListDiv.innerHTML = "<p>Product data could not be loaded. Please ensure 'js/data.js' is correctly linked and contains the 'products' array.</p>";
        }
        if (productDetailContentDiv) {
             productDetailContentDiv.classList.remove('loading');
             productDetailContentDiv.classList.add('error');
             productDetailContentDiv.innerHTML = "<p>Failed to load product data. Please check data.js.</p>";
        }
        return; // Stop script execution if data is missing
    } else {
        console.log("Products data loaded successfully:", products.length, "products found.");
    }

    // Function to display multiple products (for index.html and products.html)
    function displayProducts(productsToShow, targetDiv = productListDiv) {
        if (!targetDiv) {
            // console.warn(`Warning: Target display div not found for products. Cannot display products.`);
            return; // Exit if the target div doesn't exist on this page
        }

        targetDiv.innerHTML = ""; // Clear existing products

        if (productsToShow.length === 0) {
            targetDiv.innerHTML = "<p class='no-products-message' style='text-align: center; padding: 20px; color: #555;'>Sorry, no products found matching your search.</p>";
            return;
        }

        productsToShow.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x200/cccccc/333333?text=Image+Not+Found';">
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p class="price">₹${product.priceINR.toLocaleString('en-IN')}</p>
                    <a href="product.html?id=${product.id}" class="buy-btn" aria-label="View details for ${product.name}">View Details</a>
                </div>
            `;
            targetDiv.appendChild(card);
        });
    }

    // Function to display single product details (for product.html)
    function displayProductDetails(product) {
        if (!productDetailContentDiv) {
            // console.warn("Product detail content div not found on this page.");
            return; // Exit if not on product details page
        }

        if (!product) {
            productDetailContentDiv.classList.remove('loading');
            productDetailContentDiv.classList.add('error');
            productDetailContentDiv.innerHTML = "<p>Product not found. Please check the URL.</p>";
            return;
        }

        productDetailContentDiv.classList.remove('loading', 'error');
        productDetailContentDiv.innerHTML = `
            <div class="product-image-gallery">
                <img src="${product.image}" alt="${product.name}" class="product-main-image" onerror="this.onerror=null;this.src='https://via.placeholder.com/500x400/cccccc/333333?text=Image+Not+Found';">
                </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <div class="price-details">
                    ₹${product.priceINR.toLocaleString('en-IN')}
                    ${product.originalPriceINR ? `<span class="original-price">₹${product.originalPriceINR.toLocaleString('en-IN')}</span>` : ''}
                </div>
                ${product.rating ? `
                    <div class="rating">
                        ${'<i class="fas fa-star"></i>'.repeat(Math.floor(product.rating))}
                        ${(product.rating % 1) !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                        <span>(${product.rating})</span>
                    </div>
                ` : ''}
                <p>${product.description}</p>

                ${product.features && product.features.length > 0 ? `
                    <div class="product-features">
                        <h3>Key Features:</h3>
                        <ul>
                            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}

                <div class="action-buttons">
                    <button class="add-to-cart-btn">Add to Cart</button>
                    <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="buy-now-btn">Buy on Amazon <i class="fas fa-external-link-alt"></i></a>
                </div>
            </div>
        `;
    }

    // --- Page Specific Logic ---
    const currentPagePath = window.location.pathname.split('/').pop();

    if (currentPagePath === "index.html" || currentPagePath === "") {
        console.log("Loading homepage products...");
        displayProducts(products.slice(0, 6)); // Display top 6 products on homepage
    } else if (currentPagePath === "products.html") {
        console.log("Loading all products on products.html...");
        displayProducts(products); // Display all products on products.html
    } else if (currentPagePath === "product.html") {
        console.log("Loading single product details...");
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (productId) {
            const product = products.find(p => p.id === productId);
            displayProductDetails(product);
        } else {
            productDetailContentDiv.classList.remove('loading');
            productDetailContentDiv.classList.add('error');
            productDetailContentDiv.innerHTML = "<p>Product ID not found in URL.</p>";
        }
    }


    // --- Search Functionality (Remains same as previous update) ---
    const setupSearch = (searchBox, resultsDiv, isMobile = false) => {
        if (!searchBox || !resultsDiv) return;

        const performSearch = () => {
            const query = searchBox.value.toLowerCase().trim();
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(query) ||
                (product.description && product.description.toLowerCase().includes(query)) ||
                (product.category && product.category.toLowerCase().includes(query))
            );

            if (isMobile && query === "") {
                 resultsDiv.innerHTML = "";
                 resultsDiv.style.display = "none";
                 if (productListDiv && currentPagePath === "products.html") {
                    displayProducts(products);
                 }
                 return;
            }

            if (query === "") {
                resultsDiv.innerHTML = "";
                resultsDiv.style.display = "none";
                if (productListDiv && currentPagePath === "products.html") {
                    displayProducts(products);
                }
            } else if (filteredProducts.length > 0) {
                resultsDiv.innerHTML = filteredProducts.map(product =>
                    `<a href="product.html?id=${product.id}" class="search-result-item">${product.name}</a>`
                ).join("");
                resultsDiv.style.display = "block";

                if (productListDiv && currentPagePath === "products.html") {
                    displayProducts(filteredProducts, productListDiv);
                }
            } else {
                resultsDiv.innerHTML = "<p class='no-results-msg'>No matches found.</p>";
                resultsDiv.style.display = "block";
                if (productListDiv && currentPagePath === "products.html") {
                    productListDiv.innerHTML = "<p class='no-products-message' style='text-align: center; padding: 20px; color: #555;'>No products found matching your search.</p>";
                }
            }
        };

        searchBox.addEventListener("input", performSearch);
        const searchButton = searchBox.nextElementSibling;
        if (searchButton && searchButton.classList.contains('search-button')) {
            searchButton.addEventListener("click", performSearch);
        }
        document.addEventListener('click', (event) => {
            if (!searchBox.contains(event.target) && !resultsDiv.contains(event.target) && (!searchButton || !searchButton.contains(event.target))) {
                resultsDiv.style.display = 'none';
            }
        });
        searchBox.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
                searchBox.blur();
                resultsDiv.style.display = 'none';
            }
        });
    };

    setupSearch(searchBoxDesktop, searchResultsDiv, false);
    setupSearch(searchBoxMobile, searchResultsDiv, true);


    // --- Responsive nav toggle (Menu Button - Remains same) ---
    if (navToggleBtn && navMenu) {
        navToggleBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const isExpanded = navMenu.classList.contains("active");
            navToggleBtn.setAttribute("aria-expanded", isExpanded);
            console.log("Menu button clicked. Menu active status:", isExpanded);
        });

        document.addEventListener('click', (event) => {
            if (!navMenu.contains(event.target) && !navToggleBtn.contains(event.target)) {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggleBtn.setAttribute("aria-expanded", "false");
                    console.log("Menu closed by clicking outside.");
                }
            }
        });

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
