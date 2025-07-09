// js/main.js - Updated for GreenTrend (Further Refinements)

// --- Global Variables & Constants ---
let currentCurrency = 'INR'; // Default currency
const USD_EXCHANGE_RATE = 83.5; // IMPORTANT: Update this value regularly! (July 2025: Approx 83.5 INR for 1 USD)
const DEBOUNCE_DELAY = 300; // Delay for search input debouncing in milliseconds

// Assume products and categories data are globally available from data.js
// Make sure data.js is loaded BEFORE main.js in your HTML:
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
        // console.warn('Invalid price provided to formatPrice:', priceInINR);
        return 'N/A';
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
        const priceINR = parseFloat(detailPriceElement.dataset.inrprice || detailPriceElement.dataset.priceinr);
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
 * Creates and returns HTML for Font Awesome star ratings.
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
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star"></i>';
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

    const fragment = document.createDocumentFragment();
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
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
    contentDiv.classList.remove('error-state');

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
        updateDisplayedPrices();
        document.title = `${product.name} - GreenTrend`; // Update page title
    } else {
        contentDiv.innerHTML = '<div class="error-state">Product not found. Please check the URL or try again.</div>';
        contentDiv.classList.remove('loading-state');
        contentDiv.classList.add('error-state');
        document.title = 'Product Not Found - GreenTrend'; // Update page title
    }
}


// --- Search Functionality ---
/**
 * Sets up the search input and results display.
 * Includes debouncing for better performance on keyup.
 */
function setupSearch() {
    const searchBox = document.getElementById('searchBox');
    const searchResults = document.getElementById('searchResults');
    const searchButton = document.getElementById('searchButton');

    let searchTimeout;

    const performSearch = (query) => {
        if (!searchResults || !products) { // Ensure searchResults and products data exist
            if (!products) console.warn("Products data not loaded for search functionality.");
            return;
        }

        if (query.length > 2) {
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(query.toLowerCase())) ||
                (product.category && product.category.toLowerCase().includes(query.toLowerCase())) // Check for category property
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
            searchResults.style.display = 'none';
        }
    };

    if (searchBox) {
        searchBox.addEventListener('keyup', (e) => {
            clearTimeout(searchTimeout);
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
        currencyToggleButton.textContent = currentCurrency;
        currencyToggleButton.addEventListener('click', () => {
            currentCurrency = (currentCurrency === 'INR') ? 'USD' : 'INR';
            currencyToggleButton.textContent = currentCurrency;
            updateDisplayedPrices();
        });
    }

    // 2. Mobile Navigation Toggle functionality
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu'); // This needs to be present in HTML

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
            // Close search results dropdown when mobile menu is opened/closed
            const searchResults = document.getElementById('searchResults');
            if (searchResults) {
                searchResults.style.display = 'none';
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', false);
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', false);
            }
        });
    } else {
        if(navToggle) navToggle.style.display = 'none'; // Hide if no menu to toggle
        console.warn("Mobile navigation menu (id='navMenu') or toggle button (id='navToggle') not found. Mobile navigation features might not work.");
    }


    // 3. Render initial content based on current page
    // Ensure 'products' and 'categories' data is available from data.js
    const path = window.location.pathname;

    if (path.includes('index.html') || path === '/') {
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
    } else if (path.includes('products.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const categorySlug = urlParams.get('category');
        const searchQuery = urlParams.get('search');
        let productsToDisplay = (typeof products !== 'undefined') ? products : [];

        const productsPageHeading = document.getElementById('products-page-heading');
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
                (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            headingText = `Search Results for "${searchQuery}"`;
        }

        if (productsPageHeading) {
            productsPageHeading.textContent = headingText;
        } else {
            console.warn("Element with ID 'products-page-heading' not found on products.html.");
        }

        renderProducts(productsToDisplay, 'product-grid-container');
    } else if (path.includes('product-detail.html')) {
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
            document.title = 'Error - GreenTrend';
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
