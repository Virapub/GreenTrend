// js/main.js - Optimized & Fixed Version

// Global Variables
let currentCurrency = "INR"; // Default currency
const USD_EXCHANGE_RATE = 83.7; // 1 USD = 83.7 INR

// Helper Functions
function formatPrice(priceInINR) {
    if (currentCurrency === "INR") {
        return `₹${priceInINR.toLocaleString('en-IN')}`;
    } else {
        const priceInUSD = (priceInINR / USD_EXCHANGE_RATE).toFixed(2);
        return `$${priceInUSD}`;
    }
}

function updateDisplayedPrices() {
    // Product cards
    document.querySelectorAll('.product-card .price[data-inr-price]').forEach(priceElement => {
        const priceInINR = parseFloat(priceElement.dataset.inrPrice);
        if (!isNaN(priceInINR)) {
            let currentPriceSpan = priceElement.querySelector('.current-price') || priceElement;
            currentPriceSpan.textContent = formatPrice(priceInINR);
        }
    });

    // Product detail page
    const detailPriceElement = document.getElementById('product-detail-price');
    if (detailPriceElement && detailPriceElement.dataset.inrPrice) {
        const priceInINR = parseFloat(detailPriceElement.dataset.inrPrice);
        if (!isNaN(priceInINR)) {
            detailPriceElement.textContent = formatPrice(priceInINR);
        }
    }
}

// Search Functionality
function setupSearch() {
    const searchInput = document.getElementById('searchBox');
    const searchResultsContainer = document.getElementById('searchResults');
    const searchButton = document.getElementById('searchButton');

    if (!searchInput || !searchResultsContainer) return;

    function performSearch(query) {
        searchResultsContainer.innerHTML = '';
        if (query.length < 2) {
            searchResultsContainer.style.display = 'none';
            return;
        }

        if (typeof products === 'undefined') {
            searchResultsContainer.innerHTML = '<div class="error">Product data not loaded</div>';
            searchResultsContainer.style.display = 'block';
            return;
        }

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
        );

        if (filteredProducts.length > 0) {
            filteredProducts.slice(0, 5).forEach(product => {
                const resultItem = document.createElement('a');
                resultItem.href = `product-detail.html?id=${product.id}`;
                resultItem.className = 'search-result';
                resultItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <h4>${product.name}</h4>
                        <p>${formatPrice(product.priceINR)}</p>
                    </div>
                `;
                searchResultsContainer.appendChild(resultItem);
            });
            searchResultsContainer.style.display = 'block';
        } else {
            searchResultsContainer.innerHTML = '<div class="no-results">No products found</div>';
            searchResultsContainer.style.display = 'block';
        }
    }

    // Debounced search
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value.trim());
        }, 300);
    });

    // Search button click
    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            }
        });
    }

    // Close results on outside click
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResultsContainer.contains(e.target)) {
            searchResultsContainer.style.display = 'none';
        }
    });
}

// Mobile Navigation
function setupMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close when clicking links
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Close on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}

// Product Rendering
function renderProducts(productList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';

    if (!productList || productList.length === 0) {
        container.innerHTML = '<p class="no-products">No products found</p>';
        return;
    }

    productList.forEach(product => {
        const productCard = document.createElement('a');
        productCard.href = `product-detail.html?id=${product.id}`;
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price" data-inr-price="${product.priceINR}">
                    <span class="current-price">${formatPrice(product.priceINR)}</span>
                    ${product.originalPriceINR ? `<span class="original-price">₹${product.originalPriceINR.toLocaleString('en-IN')}</span>` : ''}
                </div>
                <div class="rating">
                    ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 >= 0.5 ? '½' : ''}
                    <span>(${product.reviews || 0})</span>
                </div>
                <button class="btn">View Details</button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Product Detail Page
function renderProductDetail(productId) {
    const container = document.getElementById('product-detail-content');
    if (!container) return;

    container.innerHTML = '<div class="loading">Loading...</div>';

    if (typeof products === 'undefined') {
        container.innerHTML = '<div class="error">Product data not available</div>';
        return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) {
        container.innerHTML = '<div class="error">Product not found</div>';
        return;
    }

    container.innerHTML = `
        <div class="product-images">
            <img src="${product.image}" alt="${product.name}" class="main-image">
        </div>
        <div class="product-info">
            <h1>${product.name}</h1>
            <div class="price" id="product-detail-price" data-inr-price="${product.priceINR}">
                ${formatPrice(product.priceINR)}
                ${product.originalPriceINR ? `<span class="original-price">₹${product.originalPriceINR.toLocaleString('en-IN')}</span>` : ''}
            </div>
            <div class="rating">
                ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 >= 0.5 ? '½' : ''}
                <span>${product.rating} (${product.reviews || 0} reviews)</span>
            </div>
            <p class="description">${product.description}</p>
            ${product.features ? `
            <div class="features">
                <h3>Features:</h3>
                <ul>${product.features.map(f => `<li>${f}</li>`).join('')}</ul>
            </div>` : ''}
            <button class="btn btn-primary">Buy Now</button>
        </div>
    `;
}

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Currency toggle
    const currencyToggle = document.getElementById('currency-toggle');
    if (currencyToggle) {
        currencyToggle.textContent = currentCurrency;
        currencyToggle.addEventListener('click', function() {
            currentCurrency = currentCurrency === "INR" ? "USD" : "INR";
            this.textContent = currentCurrency;
            updateDisplayedPrices();
        });
    }

    // Setup core features
    setupSearch();
    setupMobileNav();

    // Homepage
    if (document.body.classList.contains('homepage')) {
        if (typeof categories !== 'undefined') {
            const categoryContainer = document.getElementById('category-list');
            if (categoryContainer) {
                categoryContainer.innerHTML = categories.map(category => `
                    <a href="products.html?category=${category.slug}" class="category-card">
                        <img src="${category.image}" alt="${category.name}">
                        <h3>${category.name}</h3>
                    </a>
                `).join('');
            }
        }

        if (typeof featuredProducts !== 'undefined') {
            renderProducts(featuredProducts, 'product-grid');
        }
    }

    // Products Page
    if (document.body.classList.contains('products-page')) {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const searchQuery = urlParams.get('search');

        let productsToRender = products || [];
        
        if (category) {
            productsToRender = productsToRender.filter(p => p.categorySlug === category);
            const heading = document.getElementById('products-heading');
            if (heading) {
                const categoryName = categories?.find(c => c.slug === category)?.name || category;
                heading.textContent = `${categoryName} Products`;
            }
        } else if (searchQuery) {
            productsToRender = productsToRender.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            const heading = document.getElementById('products-heading');
            if (heading) heading.textContent = `Search Results for "${searchQuery}"`;
        }

        renderProducts(productsToRender, 'product-grid');
    }

    // Product Detail Page
    if (document.body.classList.contains('product-detail-page')) {
        const productId = new URLSearchParams(window.location.search).get('id');
        if (productId) renderProductDetail(productId);
    }

    // Adjust hero section margin
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero-section');
    if (header && hero) {
        hero.style.marginTop = `${header.offsetHeight}px`;
    }
});
