// js/main.js - Functional and Robust Version for GreenTrend

// --- Global Variables & Constants ---
let currentCurrency = 'INR'; // Default currency when page loads
const USD_EXCHANGE_RATE = 83.5; // IMPORTANT: Update this value regularly! (e.g., 1 USD = 83.5 INR)
const DEBOUNCE_DELAY = 300; // Delay for search input debouncing in milliseconds

// Assume 'products', 'categories', and 'featuredProducts' data are globally available from data.js.
// Ensure data.js is loaded BEFORE main.js in your HTML:
// <script src="js/data.js"></script>
// <script src="js/main.js"></script>

// --- Helper Functions ---

/**
 * Formats a price from INR to the current selected currency (INR or USD).
 * Handles invalid price inputs gracefully.
 * @param {number} priceInINR - The price in Indian Rupees.
 * @returns {string} The formatted price string (e.g., "₹1,234" or "$14.80" or "N/A").
 */
function formatPrice(priceInINR) {
    if (typeof priceInINR !== 'number' || isNaN(priceInINR)) {
        console.warn('Invalid price provided to formatPrice:', priceInINR);
        return 'N/A'; // Return N/A for invalid numbers
    }

    if (currentCurrency === 'INR') {
        // Correctly format for Indian Rupees
        return `₹${priceInINR.toLocaleString('en-IN')}`;
    } else {
        // Convert to USD and format to 2 decimal places
        const priceInUSD = (priceInINR / USD_EXCHANGE_RATE).toFixed(2);
        return `$${priceInUSD}`;
    }
}

/**
 * Updates all displayed prices on the current page.
 * It iterates through product cards and product detail elements to apply the current currency format.
 */
function updateDisplayedPrices() {
    // Update prices in all product cards (on home/products pages)
    document.querySelectorAll('.product-card').forEach(productCard => {
        const priceElement = productCard.querySelector('.current-price');
        const originalPriceElement = productCard.querySelector('.original-price');

        // Get original INR price from dataset (e.g., data-priceinr="1299")
        const dataPriceINR = parseFloat(productCard.dataset.priceinr);
        if (priceElement && !isNaN(dataPriceINR)) {
            priceElement.textContent = formatPrice(dataPriceINR);
        }

        // If there's an original price, update that too
        const dataOriginalPriceINR = parseFloat(productCard.dataset.originalpriceinr);
        if (originalPriceElement && !isNaN(dataOriginalPriceINR)) {
            originalPriceElement.textContent = formatPrice(dataOriginalPriceINR);
        }
    });

    // Update price on the single product detail page (product-detail.html)
    const detailPriceElement = document.getElementById('product-detail-price');
    const detailOriginalPriceElement = document.getElementById('product-detail-original-price');

    if (detailPriceElement) {
        // Get original INR price from its data attribute (e.g., data-inr-price="1299")
        const priceINR = parseFloat(detailPriceElement.dataset.inrprice);
        if (!isNaN(priceINR)) {
            detailPriceElement.textContent = formatPrice(priceINR);
        }
    }

    if (detailOriginalPriceElement) {
        const originalPriceINR = parseFloat(detailOriginalPriceElement.dataset.inrprice);
        if (!isNaN(originalPriceINR)) {
            detailOriginalPriceElement.textContent = formatPrice(originalPriceINR);
        }
    }
}

/**
 * Generates the HTML string for star ratings based on a numerical rating.
 * Uses Font Awesome icons for full, half, and empty stars.
 * @param {number} rating - The numerical rating (e.g., 3.5, 5).
 * @returns {string} HTML string representing the star rating.
 */
function getStarRatingHTML(rating) {
    if (typeof rating !== 'number' || isNaN(rating)) return '';
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }
    // Add half star if applicable
    if (hasHalfStar) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    // Add empty stars to make up to 5 stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star"></i>'; // Use 'far' for empty star outlines
    }
    return starsHtml;
}

// --- DOM Rendering Functions ---

/**
 * Renders a list of products into a specified container on the page.
 * Uses DocumentFragment for efficient DOM manipulation.
 * @param {Array<Object>} productsToRender - An array of product objects to display.
 * @param {string} containerId - The ID of the HTML element where products should be appended.
 */
function renderProducts(productsToRender, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Error: Product container with ID "${containerId}" not found.`);
        return;
    }

    container.innerHTML = ''; // Clear existing content before rendering

    if (!productsToRender || productsToRender.length === 0) {
        container.innerHTML = '<p class="empty-state-message">No products found. Please try a different search or category.</p>';
        return;
    }

    const fragment = document.createDocumentFragment(); // Use fragment for better performance
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        // Store original INR prices as data attributes for currency conversion
        productCard.dataset.priceinr = product.priceINR;
        if (product.originalPriceINR) {
            productCard.dataset.originalpriceinr = product.originalPriceINR;
        }

        const ratingHTML = getStarRatingHTML(product.rating);

        productCard.innerHTML = `
            <a href="product-detail.html?id=${product.id}" aria-label="View details for ${product.name}">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <div class="price">
                        <span class="current-price">${formatPrice(product.priceINR)}</span>
                        ${product.originalPriceINR ? `<span class="original-price">${formatPrice(product.originalPriceINR)}</span>` : ''}
                    </div>
                    <div class="rating">
                        ${ratingHTML}
                        <span class="rating-text">(${product.rating}/5)</span>
                    </div>
                    <button class="btn btn-primary buy-btn">View Details</button>
                </div>
            </a>
        `;
        fragment.appendChild(productCard);
    });

    container.appendChild(fragment); // Append all cards at once
    updateDisplayedPrices(); // Update prices after rendering products
}

/**
 * Renders a list of categories into a specified container.
 * @param {Array<Object>} categoriesToRender - An array of category objects.
 * @param {string} containerId - The ID of the HTML element where categories should be rendered.
 */
function renderCategories(categoriesToRender, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Error: Category container with ID "${containerId}" not found.`);
        return;
    }

    container.innerHTML = ''; // Clear existing content

    if (!categoriesToRender || categoriesToRender.length === 0) {
        container.innerHTML = '<p class="empty-state-message">No categories found.</p>';
        return;
    }

    const fragment = document.createDocumentFragment();
    categoriesToRender.forEach(category => {
        const categoryCard = document.createElement('a');
        categoryCard.href = `products.html?category=${category.slug}`; // Link to products page with category filter
        categoryCard.className = 'category-card';
        categoryCard.setAttribute('aria-label', `Explore ${category.name} category`);
        categoryCard.innerHTML = `
            <img src="${category.image}" alt="${category.name} category icon" loading="lazy">
            <span>${category.name}</span>
        `;
        fragment.appendChild(categoryCard);
    });
    container.appendChild(fragment);
}

/**
 * Renders the detail page for a single product based on its ID.
 * Displays loading, error, or product details.
 * @param {string} productId - The ID of the product to render.
 */
async function renderProductDetail(productId) {
    const contentDiv = document.getElementById('product-detail-content');
    if (!contentDiv) {
        console.error('Error: Product detail content container not found (ID: product-detail-content).');
        return;
    }

    // Display loading state
    contentDiv.innerHTML = `<div class="loading-state">Loading product details...</div>`;
    contentDiv.classList.remove('error-state'); // Remove any previous error state

    // Simulate fetching product data (assuming 'products' array is loaded from data.js)
    const product = (typeof products !== 'undefined') ? products.find(p => p.id === productId) : null;

    if (product) {
        const ratingHTML = getStarRatingHTML(product.rating);
        contentDiv.innerHTML = `
            <div class="product-image-gallery">
                <img src="${product.image}" alt="${product.name}" class="product-main-image">
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <div class="price-details">
                    <span id="product-detail-price" data-inr-price="${product.priceINR}">${formatPrice(product.priceINR)}</span>
                    ${product.originalPriceINR ? `<span class="original-price" id="product-detail-original-price" data-inr-price="${product.originalPriceINR}">${formatPrice(product.originalPriceINR)}</span>` : ''}
                    ${product.discountPercent ? `<span class="discount-percent">${product.discountPercent}% Off</span>` : ''}
                </div>
                <div class="rating">
                    ${ratingHTML}
                    <span class="rating-text">(${product.rating}/5)</span>
                </div>
                <p class="description">${product.description}</p>

                <div class="product-features">
                    <h3>Key Features:</h3>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="action-buttons">
                    <a href="${product.affiliateLink}" target="_blank" rel="noopener noreferrer" class="btn btn-accent buy-now-btn">BUY NOW</a>
                </div>
            </div>
        `;
        contentDiv.classList.remove('loading-state');
        updateDisplayedPrices(); // Update prices after rendering detail page
        document.title = `${product.name} - GreenTrend Smart Kitchen`; // Dynamically update page title
    } else {
        contentDiv.innerHTML = '<div class="error-state">Product not found. Please check the URL or try again.</div>';
        contentDiv.classList.remove('loading-state');
        contentDiv.classList.add('error-state');
        document.title = 'Product Not Found - GreenTrend'; // Update page title for error
    }
}

// --- Search Functionality ---

/**
 * Sets up search input and displays real-time search results.
 * Implements debouncing to optimize performance.
 */
function setupSearch() {
    const searchBox = document.getElementById('searchBox');
    const searchResults = document.getElementById('searchResults');
    const searchButton = document.getElementById('searchButton'); // Assuming one search box for both desktop/mobile

    let searchTimeout; // For debouncing

    const performSearch = (query) => {
        if (!searchResults) {
            console.error('Search results container (ID: searchResults) not found.');
            return;
        }
        // Ensure products data is available before attempting search
        if (typeof products === 'undefined' || !products.length) {
            console.warn("Products data not available for search. Please ensure data.js is loaded.");
            searchResults.style.display = 'none'; // Hide results if no data
            return;
        }

        if (query.length > 2) { // Only search if query is long enough
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(query.toLowerCase())) ||
                (product.category && product.category.toLowerCase().includes(query.toLowerCase())) // Ensure category field exists
            );

            if (filteredProducts.length > 0) {
                searchResults.innerHTML = filteredProducts.map(product => `
                    <a href="product-detail.html?id=${product.id}" aria-label="Go to ${product.name} detail page">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                        <span>${product.name}</span>
                    </a>
                `).join('');
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<div class="no-results-msg">No products found matching your search.</div>';
                searchResults.style.display = 'block';
            }
        } else {
            searchResults.style.display = 'none'; // Hide if query is too short or empty
        }
    };

    if (searchBox) {
        searchBox.addEventListener('keyup', (e) => {
            clearTimeout(searchTimeout); // Clear previous timeout
            const query = e.target.value.trim();
            searchTimeout = setTimeout(() => performSearch(query), DEBOUNCE_DELAY);
        });

        searchBox.addEventListener('focus', (e) => {
            // Re-show results if focus returns and query exists and is long enough
            if (e.target.value.trim().length > 2) {
                performSearch(e.target.value.trim());
            }
        });
    }

    if (searchButton && searchBox) {
        searchButton.addEventListener('click', () => {
            performSearch(searchBox.value.trim());
            // Optional: Redirect to products page with search query
            // if (searchBox.value.trim()) window.location.href = `products.html?search=${encodeURIComponent(searchBox.value.trim())}`;
        });
    }

    // Close search results dropdown on outside click
    document.addEventListener('click', (e) => {
        if (searchResults && !searchResults.contains(e.target) &&
            !(searchBox && searchBox.contains(e.target)) &&
            !(searchButton && searchButton.contains(e.target))) {
            searchResults.style.display = 'none';
        }
    });
}

// --- DOM Content Loaded Listener ---
// This runs when the HTML is fully loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {

    // 1. Setup Currency Toggle Button functionality
    const currencyToggleButton = document.getElementById('currency-toggle-button');
    if (currencyToggleButton) {
        currencyToggleButton.textContent = currentCurrency; // Set initial button text
        currencyToggleButton.addEventListener('click', () => {
            currentCurrency = (currentCurrency === 'INR') ? 'USD' : 'INR';
            currencyToggleButton.textContent = currentCurrency; // Update button text
            updateDisplayedPrices(); // Recalculate and display all prices
        });
    } else {
        console.warn("Currency toggle button (ID: currency-toggle-button) not found.");
    }

    // 2. Mobile Navigation Toggle functionality
    const navToggle = document.getElementById('navToggle'); // Hamburger icon
    const navMenu = document.getElementById('navMenu');     // Main navigation UL (or container)

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active'); // Toggles the 'active' class (for CSS styling)
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active')); // ARIA for accessibility
            // Close search results dropdown when mobile menu is opened/closed
            const searchResults = document.getElementById('searchResults');
            if (searchResults) {
                searchResults.style.display = 'none';
            }
        });

        // Close nav menu when a link inside it is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active'); // Hide menu after clicking a link
                navToggle.setAttribute('aria-expanded', false);
            });
        });

        // Close mobile menu if window is resized to desktop width
        window.addEventListener('resize', () => {
            // Adjust breakpoint (992px) if your CSS uses a different one for mobile nav
            if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', false);
            }
        });
    } else {
        // If navMenu or navToggle are missing, hide the toggle to prevent a non-functional button
        if (navToggle) navToggle.style.display = 'none';
        console.warn("Mobile navigation setup incomplete: ensure elements with ID 'navToggle' and 'navMenu' exist in HTML.");
    }


    // 3. Render initial content based on current page
    const currentPath = window.location.pathname;

    // Check if 'products' and 'categories' data are loaded from data.js
    const productsLoaded = typeof products !== 'undefined' && products.length > 0;
    const categoriesLoaded = typeof categories !== 'undefined' && categories.length > 0;
    const featuredProductsLoaded = typeof featuredProducts !== 'undefined' && featuredProducts.length > 0;


    if (currentPath.includes('index.html') || currentPath === '/') {
        // Home page specific rendering
        if (categoriesLoaded) {
            renderCategories(categories, 'category-list');
        } else {
            console.warn("Categories data not available or empty for home page. Categories section might be empty.");
        }

        if (featuredProductsLoaded) {
            renderProducts(featuredProducts, 'featured-product-list');
        } else {
            console.warn("Featured products data not available or empty for home page. Featured products section might be empty.");
        }
    } else if (currentPath.includes('products.html')) {
        // Products page specific rendering with filtering
        const urlParams = new URLSearchParams(window.location.search);
        const categorySlug = urlParams.get('category');
        const searchQuery = urlParams.get('search');
        let productsToDisplay = productsLoaded ? products : []; // Default to all products if loaded

        const productsPageHeading = document.getElementById('products-page-heading');
        let headingText = "All Smart Kitchen Products";

        if (categorySlug) {
            // Filter by category slug
            productsToDisplay = productsToDisplay.filter(product => product.categorySlug === categorySlug);
            const category = categoriesLoaded ? categories.find(cat => cat.slug === categorySlug) : null;
            if (category) {
                headingText = `Products in "${category.name}"`;
            } else {
                headingText = `Category Not Found for "${categorySlug}"`;
            }
        } else if (searchQuery) {
            // Filter by search query across name, description, category
            productsToDisplay = productsToDisplay.filter(product =>
                product.name.toLowerCase().includes(sear
