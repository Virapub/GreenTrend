// js/main.js

// --- Global Variables ---
let currentCurrency = 'INR'; // Default currency when page loads
const USD_EXCHANGE_RATE = 83.5; // CURRENT EXCHANGE RATE: 1 USD = 83.5 INR (Please update this value as needed!)

// --- Helper Functions ---

// Function to format price based on the current currency
// It takes the price in INR as input
function formatPrice(priceInINR) {
    if (currentCurrency === 'INR') {
        // Format for Indian Rupees (e.g., ₹1,499)
        return `₹${priceInINR.toLocaleString('en-IN')}`;
    } else {
        // Calculate USD price and format (e.g., $18.50)
        const priceInUSD = (priceInINR / USD_EXCHANGE_RATE).toFixed(2); // .toFixed(2) ensures 2 decimal places
        return `$${priceInUSD}`;
    }
}

// Function to update all displayed prices on the current page
// This function is called when the currency toggle button is clicked, or on page load.
function updateDisplayedPrices() {
    // 1. Update prices in all product cards (on Home/Products page)
    // We find all elements with class 'product-card' and then their child with class 'price'
    document.querySelectorAll('.product-card .price').forEach(priceElement => {
        // Get the original INR price from the data-inr-price attribute
        const productPriceInINR = parseFloat(priceElement.dataset.inrPrice);
        if (!isNaN(productPriceInINR)) { // Check if it's a valid number
            // Update the text content of the span that displays the current price
            priceElement.querySelector('.current-price').textContent = formatPrice(productPriceInINR);
        }
    });

    // 2. Update price on the single product detail page (product-detail.html)
    const detailPriceElement = document.getElementById('product-detail-price');
    if (detailPriceElement) { // Check if this element exists on the current page
        // Get the original INR price from the data-inr-price attribute on the detail page price span
        const priceInINR = parseFloat(detailPriceElement.dataset.inrPrice);
        if (!isNaN(priceInINR)) { // Check if it's a valid number
            // Update the text content of the detail page price span
            detailPriceElement.textContent = formatPrice(priceInINR);
        }
    }
}

// --- Render Functions (These functions create the HTML for products and categories) ---

// Function to render product cards (used on index.html and products.html)
function renderProducts(productList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return; // Exit if the container element is not found

    container.innerHTML = ''; // Clear any existing content in the container

    productList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        // HTML structure for each product card
        // Note: The 'price' div has a 'data-inr-price' attribute to store the original INR value.
        // The actual displayed price is in a 'span' with class 'current-price'.
        productCard.innerHTML = `
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <div class="price" data-inr-price="${product.price}">
                        <span class="current-price">${formatPrice(product.price)}</span>
                    </div>
                    <button class="buy-btn">View Details</button>
                </div>
            </a>
        `;
        container.appendChild(productCard);
    });

    // After rendering all products, update their prices based on the current currency setting
    updateDisplayedPrices();
}

// Function to render categories (no currency-related changes needed here)
function renderCategories(categoryList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    categoryList.forEach(category => {
        const categoryCard = document.createElement('a');
        categoryCard.href = `products.html?category=${category.slug}`;
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <img src="${category.image}" alt="${category.name}">
            <span>${category.name}</span>
        `;
        container.appendChild(categoryCard);
    });
}

// Function to render a single product's detail page (product-detail.html)
async function renderProductDetail(productId) {
    // Find the product data from your 'products' array (assumed to be in data.js)
    const product = products.find(p => p.id === productId);
    const contentDiv = document.getElementById('product-detail-content');

    if (!product) {
        contentDiv.innerHTML = '<div class="error">Product not found.</div>';
        contentDiv.classList.add('error');
        return;
    }

    contentDiv.classList.remove('loading', 'error'); // Remove loading/error states

    document.title = `${product.name} - GreenTrend`; // Update the browser tab title

    // Create HTML for product features list
    const featuresHtml = product.features.map(feature => `<li>${feature}</li>`).join('');

    // Populate the product detail content
    contentDiv.innerHTML = `
        <div class="product-image-gallery">
            <img src="${product.image}" alt="${product.name}" class="product-main-image">
        </div>
        <div class="product-info">
            <h1>${product.name}</h1>
            <div class="price-details">
                <span id="product-detail-price" data-inr-price="${product.price}">${formatPrice(product.price)}</span>
                ${product.oldPrice ? `<span class="original-price">₹${product.oldPrice.toLocaleString('en-IN')}</span>` : ''}
            </div>
            <div class="rating">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>
                <span>(4.5/5)</span>
            </div>
            <p>${product.description}</p>
            ${product.features && product.features.length > 0 ? `
            <div class="product-features">
                <h3>Key Features:</h3>
                <ul>${featuresHtml}</ul>
            </div>` : ''}
            <p>${product.details}</p>
            <div class="action-buttons">
                <a href="${product.affiliateLink}" target="_blank" rel="noopener noreferrer" class="buy-now-btn">Buy Now on Amazon</a>
            </div>
        </div>
    `;

    // Ensure price is updated immediately after rendering detail page (important for correct initial display)
    updateDisplayedPrices();
}

// --- Search Functionality (Assuming this is already present or needed) ---
function setupSearch() {
    const searchBoxDesktop = document.getElementById('searchBox');
    const searchBoxMobile = document.getElementById('searchBoxMobile');
    const searchResultsDiv = document.getElementById('searchResults');

    const performSearch = (query) => {
        searchResultsDiv.innerHTML = '';
        if (query.length < 2) {
            searchResultsDiv.style.display = 'none';
            return;
        }

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const resultItem = document.createElement('a');
                resultItem.href = `product-detail.html?id=${product.id}`;
                resultItem.className = 'search-result-item';
                resultItem.textContent = product.name;
                searchResultsDiv.appendChild(resultItem);
            });
            searchResultsDiv.style.display = 'block';
        } else {
            searchResultsDiv.innerHTML = '<div class="no-results-msg">No results found.</div>';
            searchResultsDiv.style.display = 'block';
        }
    };

    if (searchBoxDesktop) {
        searchBoxDesktop.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
        searchBoxDesktop.addEventListener('focus', (e) => {
            if (e.target.value.length >= 2) {
                performSearch(e.target.value);
            }
        });
        searchBoxDesktop.addEventListener('blur', () => {
            setTimeout(() => {
                searchResultsDiv.style.display = 'none';
            }, 200); // Small delay to allow click on results
        });
    }

    // Mobile search box logic (you might want a different approach for mobile search results)
    if (searchBoxMobile) {
        // You can add an event listener here if you want to handle mobile search differently.
        // For simplicity, it might just trigger a search on a separate page or overlay.
    }
}

// --- DOM Content Loaded Event Listener (Runs when the entire HTML document is loaded) ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Adjust hero-section margin for sticky header (if you have one)
    const headerHeight = document.querySelector('.main-header').offsetHeight;
    document.querySelector('.hero-section').style.marginTop = `${headerHeight}px`;

    // 2. Render initial content for Home page (Categories and Featured Products)
    if (document.getElementById('category-list') && document.getElementById('featured-product-list')) {
        renderCategories(categories, 'category-list');
        renderProducts(featuredProducts, 'featured-product-list');
    }

    // 3. Setup Currency Toggle Button functionality
    const currencyToggleButton = document.getElementById('currency-toggle-button');
    if (currencyToggleButton) {
        currencyToggleButton.textContent = currentCurrency; // Set initial button text (e.g., "INR")
        currencyToggleButton.addEventListener('click', () => {
            // Toggle currency: if INR, change to USD; if USD, change to INR
            currentCurrency = currentCurrency === 'INR' ? 'USD' : 'INR';
            currencyToggleButton.textContent = currentCurrency; // Update button text to reflect new currency
            updateDisplayedPrices(); // Call function to update all prices on the page
        });
    }

    // 4. Check if on product detail page and render specific product
    // (This requires the <body> tag of product-detail.html to have the class 'product-detail-page')
    if (document.body.classList.contains('product-detail-page')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id'); // Get product ID from URL query parameter
        if (productId) {
            renderProductDetail(productId); // Render the specific product details
        }
    }

    // 5. Initialize Search Functionality
    setupSearch();

    // 6. Automatically update current year in footer (if you have a span with id 'current-year')
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 7. Mobile Navigation Toggle functionality
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active'); // Toggle 'active' class to show/hide menu
            // Optional: Close search results dropdown if nav menu opens
            const searchResults = document.getElementById('searchResults');
            if (searchResults) searchResults.style.display = 'none';
        });

        // Close nav menu when a link inside it is clicked (good for single-page style navigation)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
});
