// js/main.js

// Global Variables
let currentCurrency = "INR";
const USD_EXCHANGE_RATE = 83.5;

// --- Helper Functions ---
function formatPrice(priceInINR) {
    if (currentCurrency === "INR") {
        return `₹${priceInINR.toLocaleString('en-IN')}`;
    } else {
        const priceInUSD = (priceInINR / USD_EXCHANGE_RATE).toFixed(2);
        return `$${priceInUSD}`;
    }
}

function updateDisplayedPrices() {
    document.querySelectorAll('.product-card .price[data-inr-price]').forEach(priceElement => {
        const priceInINR = parseFloat(priceElement.dataset.inrPrice);
        if (!isNaN(priceInINR)) {
            let currentPriceSpan = priceElement.querySelector('.current-price');
            if (!currentPriceSpan) {
                currentPriceSpan = document.createElement('span');
                currentPriceSpan.className = 'current-price';
                priceElement.prepend(currentPriceSpan);
            }
            currentPriceSpan.textContent = formatPrice(priceInINR);
        }
    });

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
    const searchInput = document.getElementById('searchBox');
    const searchResultsContainer = document.getElementById('searchResults');
    const searchButton = document.getElementById('searchButton');

    if (!searchInput || !searchResultsContainer || !searchButton) return;

    const performLiveSearch = (query) => {
        searchResultsContainer.innerHTML = '';
        if (query.length < 2) {
            searchResultsContainer.style.display = 'none';
            return;
        }

        if (typeof products === 'undefined') {
            searchResultsContainer.innerHTML = '<div class="no-results-msg">Error: Product data missing.</div>';
            searchResultsContainer.style.display = 'block';
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
                searchResultsContainer.appendChild(searchResultLink);
            });
            searchResultsContainer.style.display = 'block';
        } else {
            searchResultsContainer.innerHTML = '<div class="no-results-msg">No results found</div>';
            searchResultsContainer.style.display = 'block';
        }
    };

    searchInput.addEventListener('input', (e) => performLiveSearch(e.target.value.trim()));
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query.length > 0) {
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
    });
}

// --- Mobile Navigation ---
function setupMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// --- Footer Year ---
function setupFooterYear() {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// --- Product Rendering ---
function renderProducts(productList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

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
                </div>
                <div class="rating">
                    ${'⭐'.repeat(Math.floor(product.rating))}
                    <span class="rating-text">(${product.rating}/5)</span>
                </div>
                <button class="btn btn-primary buy-btn">View Details</button>
            </div>
        `;
        container.appendChild(productCard);
    });

    updateDisplayedPrices();
}

function renderCategories(categoryList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

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

async function renderProductDetail(productId) {
    const contentDiv = document.getElementById('product-detail-content');
    if (!contentDiv) return;

    contentDiv.innerHTML = '<div class="loading">Loading product details...</div>';
    contentDiv.classList.add('loading');

    if (typeof products === 'undefined') {
        contentDiv.innerHTML = '<div class="error">Error: Product data missing.</div>';
        contentDiv.classList.remove('loading');
        return;
    }

    const product = products.find(p => p.id === productId);
    if (product) {
        contentDiv.classList.remove('loading');
        contentDiv.innerHTML = `
            <div class="product-image-gallery">
                <img class="product-main-image" src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <div class="price-details">
                    <span id="product-detail-price" data-inr-price="${product.priceINR}">${formatPrice(product.priceINR)}</span>
                </div>
                <div class="rating">
                    ${'⭐'.repeat(Math.floor(product.rating))}
                    <span class="rating-text">(${product.rating}/5)</span>
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
                    <a href="${product.link}" target="_blank" class="btn btn-accent buy-now-btn">Buy Now</a>
                </div>
            </div>
        `;
        updateDisplayedPrices();
    } else {
        contentDiv.innerHTML = '<div class="error">Product not found. Please check the URL.</div>';
        contentDiv.classList.remove('loading');
    }
}

// --- Main Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded. Initializing GreenTrend...');

    // Adjust hero section margin
    const mainHeader = document.querySelector('.main-header');
    const heroSection = document.querySelector('.hero-section');
    if (mainHeader && heroSection) {
        heroSection.style.marginTop = `${mainHeader.offsetHeight + 25}px`;
    }

    // Currency toggle
    const currencyToggleButton = document.getElementById('currency-toggle-button');
    if (currencyToggleButton) {
        currencyToggleButton.textContent = currentCurrency;
        currencyToggleButton.addEventListener('click', () => {
            currentCurrency = currentCurrency === "INR" ? "USD" : "INR";
            currencyToggleButton.textContent = currentCurrency;
            updateDisplayedPrices();
        });
    }

    // Page-specific rendering
    if (document.body.classList.contains('homepage')) {
        if (typeof categories !== 'undefined') {
            renderCategories(categories, 'category-list');
        }
        if (typeof featuredProducts !== 'undefined') {
            renderProducts(featuredProducts, 'product-grid');
        }
    }

    if (document.body.classList.contains('products-page')) {
        const urlParams = new URLSearchParams(window.location.search);
        const categorySlug = urlParams.get('category');
        const searchQuery = urlParams.get('search');
        let productsToRender = products || [];

        if (categorySlug) {
            productsToRender = products.filter(product => 
                getPriceBasedCategory(product.priceINR) === 
                categories.find(cat => cat.slug === categorySlug)?.name
            );
            const heading = document.getElementById('products-heading');
            if (heading) {
                const category = categories.find(cat => cat.slug === categorySlug);
                heading.textContent = category ? `${category.name} Products` : "Products";
            }
        } else if (searchQuery) {
            productsToRender = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            const heading = document.getElementById('products-heading');
            if (heading) heading.textContent = `Search Results for "${searchQuery}"`;
        }

        renderProducts(productsToRender, 'product-grid');
    }

    if (document.body.classList.contains('product-detail-page')) {
        const productId = new URLSearchParams(window.location.search).get('id');
        if (productId) renderProductDetail(productId);
    }

    // Initialize core features
    setupSearch();
    setupMobileNav();
    setupFooterYear();
    updateDisplayedPrices();
});
