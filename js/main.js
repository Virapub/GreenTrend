// Global Variables - (आपके कोड से)
let currentCurrency = "INR"; // Default currency when page loads
const USD_EXCHANGE_RATE = 83.5; // IMPORTANT: Update this value regularly! (e.g. 1 USD = 83.5 INR)

// Helper Functions - (आपके कोड से)
function formatPrice(priceInINR) {
    if (currentCurrency === "INR") {
        return `₹${priceInINR.toLocaleString('en-IN')}`;
    } else {
        const priceInUSD = (priceInINR / USD_EXCHANGE_RATE).toFixed(2);
        return `$${priceInUSD}`;
    }
}

// Function to update all displayed prices on the current page
function updateDisplayedPrices() {
    document.querySelectorAll('[data-inr-price]').forEach(priceElement => {
        const priceInINR = parseFloat(priceElement.dataset.inrPrice);
        if (!isNaN(priceInINR)) {
            // For product cards (on home/products page)
            let currentPriceSpan = priceElement.querySelector('.current-price');
            if (!currentPriceSpan) {
                currentPriceSpan = document.createElement('span');
                currentPriceSpan.className = 'current-price';
                priceElement.prepend(currentPriceSpan);
            }
            currentPriceSpan.textContent = formatPrice(priceInINR);
        }
    });

    // Update price on the single product detail page (product-detail.html)
    const detailPriceElement = document.getElementById('product-detail-price');
    if (detailPriceElement) {
        const priceInINR = parseFloat(detailPriceElement.dataset.inrPrice);
        if (!isNaN(priceInINR)) {
            detailPriceElement.textContent = formatPrice(priceInINR);
        }
    }
}

// --- Search Functionality ---
function setupSearch() {
    const searchBoxDesktop = document.getElementById('searchBox'); // Mobile search box
    const searchBoxMobile = document.getElementById('searchBoxMobile'); // Assuming you might have a separate one, but current CSS uses 'searchBox' only
    const searchResults = document.getElementById('searchResults');
    const searchButton = document.getElementById('searchButton');

    // Use a single searchBox reference if both desktop and mobile use the same input ID
    const searchInput = searchBoxDesktop || searchBoxMobile; 

    if (!searchInput || !searchResults || !searchButton) {
        console.warn('Search elements not found. Search functionality may not work.');
        return;
    }

    const performSearch = (query, resultsContainer) => {
        resultsContainer.innerHTML = '';
        if (query.length < 2) { // Show results only if query is at least 2 chars
            resultsContainer.style.display = 'none';
            return;
        }

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(query.toLowerCase())) ||
            (product.category && product.category.toLowerCase().includes(query.toLowerCase()))
        );

        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const searchResultLink = document.createElement('a');
                searchResultLink.href = `product-detail.html?id=${product.id}`;
                searchResultLink.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <span>${product.name} - ${formatPrice(product.priceINR)}</span>
                `;
                resultsContainer.appendChild(searchResultLink);
            });
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.innerHTML = '<div class="no-results-msg">No results found</div>';
            resultsContainer.style.display = 'block';
        }
    };

    // Event listener for search input (live search)
    searchInput.addEventListener('input', (e) => {
        performSearch(e.target.value.trim(), searchResults);
    });

    // Event listener for search button click
    searchButton.addEventListener('click', () => {
        // You might want to redirect to a search results page here,
        // or simply trigger the live search if that's the only functionality.
        const query = searchInput.value.trim();
        if (query.length > 0) {
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
    });

    // Close search results dropdown on outside click
    document.addEventListener('click', (event) => {
        if (!searchInput.contains(event.target) && !searchResults.contains(event.target) && !searchButton.contains(event.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// 3. Mobile Navigation Toggle functionality
function setupMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const searchResults = document.getElementById('searchResults'); // To close search results if menu opens

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Close search results if the navigation menu is opened
            if (searchResults) {
                searchResults.style.display = 'none';
            }
        });

        // Close nav menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Close nav menu when window is resized to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// 4. Initialize Current Year in Footer (आपके कोड से)
function setupFooterYear() {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// DOM Content Loaded Listener
document.addEventListener('DOMContentLoaded', () => {
    // Adjust hero-section margin for sticky header (only on index.html)
    const headerHeight = document.querySelector('.main-header').offsetHeight;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.marginTop = `${headerHeight + 25}px`; // Add some extra space
    }

    // Initialize currency toggle button functionality
    const currencyToggleButton = document.getElementById('currency-toggle-button');
    if (currencyToggleButton) {
        currencyToggleButton.textContent = currentCurrency;
        currencyToggleButton.addEventListener('click', () => {
            currentCurrency = (currentCurrency === "INR" ? "USD" : "INR");
            currencyToggleButton.textContent = currentCurrency;
            updateDisplayedPrices(); // Recalculate and display all prices
        });
    }

    // Render initial content based on the current page
    // (only renders categories and featured products on the home page)
    if (document.body.classList.contains('homepage')) {
        if (typeof renderCategories !== 'undefined' && categories.length > 0) {
            renderCategories(categories, 'category-list');
        }
        if (typeof renderProducts !== 'undefined' && featuredProducts.length > 0) {
            renderProducts(featuredProducts, 'product-grid');
        }
    }

    // Handle product listing on products.html
    if (document.body.classList.contains('products-page')) {
        const urlParams = new URLSearchParams(window.location.search);
        const categorySlug = urlParams.get('category');
        const searchQuery = urlParams.get('search');
        let productsToRender = products;
        let headingText = "All Products";

        if (categorySlug) {
            productsToRender = products.filter(product => product.categorySlug === categorySlug);
            const categoryName = categories.find(cat => cat.slug === categorySlug)?.name;
            headingText = categoryName ? `${categoryName} Products` : "Products";
        } else if (searchQuery) {
            productsToRender = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            headingText = `Search Results for "${searchQuery}"`;
        }

        if (typeof renderProducts !== 'undefined') {
            renderProducts(productsToRender, 'product-grid');
        }
        const productsHeading = document.getElementById('products-heading');
        if (productsHeading) {
            productsHeading.textContent = headingText;
        }
    }

    // Handle product detail page
    if (document.body.classList.contains('product-detail-page')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            if (typeof renderProductDetail !== 'undefined') {
                renderProductDetail(productId);
            }
        } else {
            const productDetailContent = document.getElementById('product-detail-content');
            if (productDetailContent) {
                productDetailContent.innerHTML = '<div class="error">Product not found. Please check the URL.</div>';
            }
        }
    }

    // Initialize Search functionality
    setupSearch();

    // Initialize Mobile Navigation Toggle
    setupMobileNav();

    // Initialize Footer Year
    setupFooterYear();

    // Initial price update after DOM content is loaded
    updateDisplayedPrices();
});

// Assuming products and categories are loaded from data.js
// You need to ensure data.js is loaded BEFORE main.js in your HTML
// Example:
// <script src="js/data.js"></script>
// <script src="js/main.js"></script>

// Functions to render products and categories (assuming these are in your main.js or separate rendering file)
function renderProducts(productList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // Clear existing content

    if (!productList || productList.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--secondary-color); margin-top: 20px;">No products found.</p>';
        return;
    }

    productList.forEach(product => {
        const productCard = document.createElement('a');
        productCard.href = `product-detail.html?id=${product.id}`;
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <h3>${product.name}</h3>
                <div class="price" data-inr-price="${product.priceINR}">
                    <span class="current-price">${formatPrice(product.priceINR)}</span>
                    ${product.priceUSD ? `<span class="original-price">${formatPrice(product.priceUSD)}</span>` : ''}
                </div>
                <div class="rating">
                    ${'⭐'.repeat(Math.floor(product.rating))}
                    ${product.rating % 1 !== 0 ? ' half-star-icon' : ''} <span class="rating-text">(${product.rating}/5)</span>
                </div>
                <button class="btn btn-primary buy-btn">View Details</button>
            </div>
        `;
        container.appendChild(productCard);
    });

    updateDisplayedPrices(); // Update prices after rendering
}

function renderCategories(categoryList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // Clear existing content

    if (!categoryList || categoryList.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--secondary-color); margin-top: 20px;">No categories found.</p>';
        return;
    }

    categoryList.forEach(category => {
        const categoryCard = document.createElement('a');
        categoryCard.href = `products.html?category=${category.slug}`;
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <img src="${category.image}" alt="${category.name} Category">
            <span>${category.name}</span>
        `;
        container.appendChild(categoryCard);
    });
}


// Async function to render product detail as it might fetch data (though here we use local data)
async function renderProductDetail(productId) {
    const contentDiv = document.getElementById('product-detail-content');
    if (!contentDiv) {
        console.error('Product detail content container not found');
        return;
    }

    // Show loading state
    contentDiv.innerHTML = '<div class="loading">Loading product details...</div>';
    contentDiv.classList.add('loading');

    // Find the product from your `products` data array
    const product = products.find(p => p.id === productId);

    if (product) {
        contentDiv.classList.remove('loading'); // Remove loading class
        contentDiv.innerHTML = `
            <div class="product-image-gallery">
                <img class="product-main-image" src="${product.image}" alt="${product.name}">
                </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <div class="price-details">
                    <span id="product-detail-price" data-inr-price="${product.priceINR}">${formatPrice(product.priceINR)}</span>
                    ${product.priceUSD ? `<span class="original-price">${formatPrice(product.priceUSD)}</span>` : ''}
                    ${product.discountPercent ? `<span class="discount-percent">${product.discountPercent}% Off</span>` : ''}
                </div>
                <div class="rating">
                    ${'⭐'.repeat(Math.floor(product.rating))}
                    ${product.rating % 1 !== 0 ? ' half-star-icon' : ''} <span class="rating-text">(${product.rating}/5)</span>
                </div>
                <p class="description">${product.description}</p>
                ${product.features && product.features.length > 0 ? `
                <div class="product-features">
                    <h3>Key Features:</h3>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>` : ''}
                <div class="action-buttons">
                    <a href="${product.affiliateLink}" target="_blank" rel="noopener noreferrer" class="btn btn-accent buy-now-btn">Buy Now on Amazon</a>
                </div>
            </div>
        `;
        updateDisplayedPrices(); // Update prices after rendering detail page
    } else {
        contentDiv.innerHTML = '<div class="error">Product not found. Please check the URL.</div>';
        contentDiv.classList.remove('loading');
    }
}
