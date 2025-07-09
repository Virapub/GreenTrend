// js/main.js - Updated for GreenTrend (Improved Version)

// --- Global Variables & Constants ---
let currentCurrency = 'INR'; // Default currency
const USD_EXCHANGE_RATE = 83.5; // IMPORTANT: Update this value regularly!
const DEBOUNCE_DELAY = 300; // Delay for search input debouncing in milliseconds

// Assume products and categories data are globally available from data.js
// Make sure data.js is loaded BEFORE main.js in your HTML.
// Example:
// <script src="js/data.js"></script>
// <script src="js/main.js"></script>

// --- Helper Functions ---

/**
 * Formats a price from INR to the current selected currency (INR or USD).
 * @param {number} priceInINR - The price in Indian Rupees.
 * @returns {string} The formatted price string (e.g., "₹1,234" or "$14.80").
 */
function formatPrice(priceInINR) {
    if (typeof priceInINR !== 'number' || isNaN(priceInINR)) {
        console.warn('Invalid price provided to formatPrice:', priceInINR);
        return 'N/A'; // Or some default string
    }

    if (currentCurrency === 'INR') {
        return `₹${priceInINR.toLocaleString('en-IN')}`;
    } else {
        const priceInUSD = (priceInINR / USD_EXCHANGE_RATE).toFixed(2);
        return `$${priceInUSD}`;
    }
}

/**
 * Updates all price displays across the current page based on `currentCurrency`.
 * It looks for elements with `data-priceinr` or `data-originalpriceinr` attributes.
 */
function updateDisplayedPrices() {
    // Update prices in all product cards
    document.querySelectorAll('.product-card').forEach(productCard => {
        const priceElement = productCard.querySelector('.current-price');
        const originalPriceElement = productCard.querySelector('.original-price');

        // Get original INR price from dataset attribute
        const dataPriceINR = parseFloat(productCard.dataset.priceinr);
        if (priceElement && !isNaN(dataPriceINR)) {
            priceElement.textContent = formatPrice(dataPriceINR);
        }

        // Update original price if it exists
        const dataOriginalPriceINR = parseFloat(productCard.dataset.originalpriceinr);
        if (originalPriceElement && !isNaN(dataOriginalPriceINR)) {
            originalPriceElement.textContent = formatPrice(dataOriginalPriceINR);
        }
    });

    // Update price on the single product detail page (product-detail.html)
    const detailPriceElement = document.getElementById('product-detail-price');
    const detailOriginalPriceElement = document.getElementById('product-detail-original-price');

    if (detailPriceElement) {
        // Data attribute on detail page might be named differently, ensure consistency
        const priceINR = parseFloat(detailPriceElement.dataset.inrprice || detailPriceElement.dataset.priceinr); // Try both
        if (!isNaN(priceINR)) {
            detailPriceElement.textContent = formatPrice(priceINR);
        }
    }

    if (detailOriginalPriceElement) {
        const originalPriceINR = parseFloat(detailOriginalPriceElement.dataset.inrprice || detailOriginalPriceElement.dataset.originalpriceinr);
        if (!isNaN(originalPriceINR)) {
            detailOriginalPriceElement.textContent = formatPrice(originalPriceINR);
        }
    }
}

/**
 * Creates and returns HTML for star ratings.
 * @param {number} rating - The numerical rating (e.g., 4.5).
 * @returns {string} HTML string with Font Awesome star icons.
 */
function getStarRatingHTML(rating) {
    if (typeof rating !== 'number' || isNaN(rating)) return '';
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    // Optionally add empty stars to make up to 5 stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star"></i>'; // Use 'far' for empty star
    }

    return starsHtml;
}


// --- DOM Rendering Functions ---

/**
 * Renders a list of products into a specified container.
 * @param {Array<Object>} productsToRender - An array of product objects.
 * @param {string} containerId - The ID of the HTML element where products should be rendered.
 */
function renderProducts(productsToRender, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found for rendering products.`);
        return;
    }

    container.innerHTML = ''; // Clear existing content

    if (!productsToRender || productsToRender.length === 0) {
        container.innerHTML = '<p class="empty-state-message">No products found matching your criteria.</p>';
        return;
    }

    const fragment = document.createDocumentFragment(); // Use DocumentFragment for performance
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        // Add data attributes for price conversion
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
                        <span class="current-price" data-inr-price="${product.priceINR}">${formatPrice(product.priceINR)}</span>
                        ${product.originalPriceINR ? `<span class="original-price" data-inr-price="${product.originalPriceINR}">${formatPrice(product.originalPriceINR)}</span>` : ''}
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

    container.appendChild(fragment);
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
        console.error(`Container with ID "${containerId}" not found for rendering categories.`);
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
        categoryCard.href = `products.html?category=${category.slug}`;
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
 * Renders the detail page for a single product.
 * @param {string} productId - The ID of the product to render.
 */
async function renderProductDetail(productId) {
    const contentDiv = document.getElementById('product-detail-content');
    if (!contentDiv) {
        console.error('Product detail content container not found.');
        return;
    }

    contentDiv.innerHTML = `<div class="loading-state">Loading product details...</div>`;
    contentDiv.classList.remove('error-state'); // Ensure no previous error state

    // Find the product (assuming 'products' array is globally available)
    const product = products.find(p => p.id === productId);

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
    } else {
        contentDiv.innerHTML = '<div class="error-state">Product not found. Please check the URL or try again.</div>';
        contentDiv.classList.remove('loading-state');
        contentDiv.classList.add('error-state');
    }
}


// --- Search Functionality ---
/**
 * Sets up the search input and results display.
 * Includes debouncing for better performance on keyup.
 */
function setupSearch() {
    const searchBox = document.getElementById('searchBox'); // Assuming only one search box (desktop/mobile combined)
    const searchResults = document.getElementById('searchResults');
    const searchButton = document.getElementById('searchButton');

    let searchTimeout;

    const performSearch = (query) => {
        if (!searchResults) return; // Exit if searchResults element not found

        if (query.length > 2) { // Only search if query is long enough
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
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
                searchResults.innerHTML = '<div class="no-results-msg">No products found.</div>';
                searchResults.style.display = 'block';
            }
        } else {
            searchResults.style.display = 'none'; // Hide if query is too short
        }
    };

    if (searchBox) {
        searchBox.addEventListener('keyup', (e) => {
            clearTimeout(searchTimeout); // Clear previous timeout
            const query = e.target.value.trim();
            searchTimeout = setTimeout(() => performSearch(query), DEBOUNCE_DELAY);
        });

        searchBox.addEventListener('focus', (e) => {
             // Re-show results if focus returns and query exists
            if (e.target.value.trim().length > 2) {
                performSearch(e.target.value.trim());
            }
        });
    }

    // Optional: Event listener for search button click (if you want to trigger search on click)
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

// --- Event Listeners & Page Initialization ---

document.addEventListener('DOMContentLoaded', () => {

    // 1. Setup Currency Toggle Button functionality
    const currencyToggleButton = document.getElementById('currency-toggle-button');
    if (currencyToggleButton) {
        // Set initial text based on currentCurrency
        currencyToggleButton.textContent = currentCurrency;

        currencyToggleButton.addEventListener('click', () => {
            currentCurrency = (currentCurrency === 'INR') ? 'USD' : 'INR';
            currencyToggleButton.textContent = currentCurrency; // Update button text
            updateDisplayedPrices(); // Recalculate and display all prices
        });
    }

    // 2. Mobile Navigation Toggle functionality
    const navToggle = document.getElementById('navToggle'); // Your hamburger icon
    const navMenu = document.getElementById('navMenu'); // Your main navigation UL (if you add one)
    const searchResults = document.getElementById('searchResults'); // To close search results if open

    // NOTE: Your HTML currently does not have an element with ID `navMenu`.
    // If you intend to have a mobile menu, ensure you add it:
    // <nav id="navMenu" class="nav-menu">...</nav> inside your header or body.
    if (navToggle && navMenu) { // Only proceed if both elements exist
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active'); // Toggles the 'active' class
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active')); // ARIA for accessibility
            // Close search results dropdown when mobile menu is opened/closed
            if (searchResults) {
                searchResults.style.display = 'none';
            }
        });

        // Close nav menu when a link is clicked (assuming navMenu has links)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active'); // Hide menu after clicking a link
                navToggle.setAttribute('aria-expanded', false);
            });
        });

        // Close mobile menu if window is resized to desktop
        window.addEventListener('resize', () => {
            // Adjust breakpoint if your CSS uses a different one for mobile nav
            if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', false);
            }
        });
    } else {
        // Hide navToggle if navMenu doesn't exist to avoid a non-functional button
        if(navToggle) navToggle.style.display = 'none';
        console.warn("Mobile navigation menu (id='navMenu') or toggle button (id='navToggle') not found. Mobile navigation features might not work.");
    }


    // 3. Render initial content based on current page
    // Ensure `products` and `categories` data is loaded/available (from data.js)
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        // Home page logic
        if (typeof categories !== 'undefined' && categories.length > 0) {
            renderCategories(categories, 'category-list');
        } else {
            console.warn("Categories data not found or is empty for home page.");
        }

        if (typeof featuredProducts !== 'undefined' && featuredProducts.length > 0) {
            renderProducts(featuredProducts, 'featured-product-list');
        } else {
            console.warn("Featured products data not found or is empty for home page.");
        }
    } else if (window.location.pathname.includes('products.html')) {
        // Products page logic
        const urlParams = new URLSearchParams(window.location.search);
        const categorySlug = urlParams.get('category');
        const searchQuery = urlParams.get('search');
        let productsToDisplay = products || []; // Default to all products if 'products' is undefined

        const productsPageHeading = document.getElementById('products-page-heading'); // This element needs to be in products.html
        let headingText = "All Smart Kitchen Products";

        if (categorySlug) {
            productsToDisplay = productsToDisplay.filter(product => product.categorySlug === categorySlug);
            const category = (typeof categories !== 'undefined') ? categories.find(cat => cat.slug === categorySlug) : null;
            if (category) {
                headingText = `Products in ${category.name}`;
            } else {
                headingText = `Category "${categorySlug}" Not Found`;
            }
        } else if (searchQuery) {
            productsToDisplay = productsToDisplay.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) || // Check if description exists
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            headingText = `Search Results for "${searchQuery}"`;
        }

        if (productsPageHeading) {
            productsPageHeading.textContent = headingText;
        } else {
            console.warn("Element with ID 'products-page-heading' not found on products.html.");
        }

        renderProducts(productsToDisplay, 'product-grid-container'); // Ensure this ID exists in products.html
    } else if (window.location.pathname.includes('product-detail.html')) {
        // Single product detail page logic
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            renderProductDetail(productId);
        } else {
            const contentDiv = document.getElementById('product-detail-content');
            if (contentDiv) {
                contentDiv.innerHTML = '<div class="error-state">Product ID missing in URL.</div>';
                contentDiv.classList.add('error-state');
            }
        }
    }

    // 4. Initialize Search Functionality
    setupSearch();

    // 5. Automatically update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});

// Add a generic CSS class for empty/error states to style them
// Make sure to add these to your style.css:
/*
.empty-state-message, .error-state, .loading-state {
    text-align: center;
    padding: 40px;
    font-size: 1.2em;
    color: #777;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    margin: 30px auto;
    max-width: 600px;
}
.error-state {
    color: #d9534f;
    border: 1px solid #d9534f;
    background-color: #fcebeb;
}
.loading-state {
    color: #007bff;
    font-style: italic;
    background-color: #e0f2f7;
}
*/
