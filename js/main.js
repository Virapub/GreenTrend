// js/main.js - FINAL UPDATED VERSION (Includes all previous corrections for price display,
//              affiliate links, ratings, categories, and HTML ID compatibility)

// --- Global Variables ---
let currentCurrency = 'INR'; // Default currency when page loads
// const USD_EXCHANGE_RATE = 83.5; // Not needed if priceUSD is directly in data.js, but kept for context.

// --- Helper Functions ---

// Function to format price based on the current currency
// It now takes the product object directly to access both INR and USD prices
function formatPrice(product) {
    if (currentCurrency === 'INR') {
        // Ensure priceINR is a number before using toLocaleString
        const price = typeof product.priceINR === 'number' ? product.priceINR : parseFloat(product.priceINR);
        return `₹${price.toLocaleString('en-IN')}`;
    } else {
        // Use the pre-calculated priceUSD from the product data
        const price = typeof product.priceUSD === 'number' ? product.priceUSD : parseFloat(product.priceUSD);
        return `$${price.toFixed(2)}`;
    }
}

// Function to update all displayed prices on the current page
function updateDisplayedPrices() {
    // 1. Update prices in all product cards (on Home/Products page)
    document.querySelectorAll('.product-card').forEach(cardElement => {
        // Get product ID from the link inside the card
        const linkElement = cardElement.querySelector('a');
        if (linkElement && linkElement.href) {
            // Use URL object for safer parsing of query parameters
            const url = new URL(linkElement.href);
            const productId = url.searchParams.get('id');
            const product = products.find(p => p.id === productId);

            if (product) {
                const priceElement = cardElement.querySelector('.price');
                let currentPriceSpan = priceElement.querySelector('.current-price');
                if (!currentPriceSpan) {
                    // If .current-price span doesn't exist, create it (for robustness)
                    currentPriceSpan = document.createElement('span');
                    currentPriceSpan.className = 'current-price';
                    priceElement.appendChild(currentPriceSpan);
                }
                currentPriceSpan.textContent = formatPrice(product);
            }
        }
    });

    // 2. Update price on the single product detail page (product-detail.html)
    const detailPriceElement = document.getElementById('product-detail-price');
    if (detailPriceElement) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = products.find(p => p.id === productId);

        if (product) {
            detailPriceElement.textContent = formatPrice(product);
            // If you have an oldPrice element and want it to toggle currency too, you'd add similar logic here
            // For now, oldPrice is displayed only in INR from data.js.
        }
    }
}

// Function to render star ratings
function renderStars(rating) {
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    // Fill remaining with empty stars for a fixed 5-star display
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="far fa-star"></i>'; // 'far' for empty star icon
    }
    return starsHtml;
}


// --- Render Functions ---

function renderProducts(productList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // Clear existing content

    if (!productList || productList.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #777; margin-top: 30px;">No products found.</p>';
        return;
    }

    productList.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        // Corrected price rendering for dynamic display using formatPrice(product)
        productCard.innerHTML = `
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-details">
                    <h4>${product.name}</h4>
                    <div class="price">
                        <span class="current-price">${formatPrice(product)}</span>
                    </div>
                    <button class="buy-btn">View Details</button>
                </div>
            </a>
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
        container.innerHTML = '<p style="text-align: center; color: #777; margin-top: 30px;">No categories found.</p>';
        return;
    }

    categoryList.forEach(category => {
        const categoryCard = document.createElement('a');
        // Use category.slug for cleaner URLs
        categoryCard.href = `products.html?category=${category.slug}`;
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <img src="${category.image}" alt="${category.name}">
            <span>${category.name}</span>
        `;
        container.appendChild(categoryCard);
    });
}

// Async function to render product detail as it might fetch data (though here we use local data)
async function renderProductDetail(productId) {
    const contentDiv = document.getElementById('product-detail-content');
    if (!contentDiv) return; // Exit if the container is not found

    // Show loading state
    contentDiv.innerHTML = '<div class="loading">Loading product details...</div>';
    contentDiv.classList.add('loading');
    contentDiv.classList.remove('error'); // Remove error class if present

    const product = products.find(p => p.id === productId);

    if (!product) {
        contentDiv.innerHTML = '<div class="error">Product not found. Please check the URL.</div>';
        contentDiv.classList.add('error');
        contentDiv.classList.remove('loading');
        return;
    }

    contentDiv.classList.remove('loading', 'error'); // Remove loading/error classes

    document.title = `${product.name} - GreenTrend`; // Update page title

    // Create features list HTML
    const featuresHtml = product.features && product.features.length > 0
        ? product.features.map(feature => `<li>${feature}</li>`).join('')
        : '';

    // Use product.description for the short description, and product.details for the long one (if it exists)
    const longDescription = product.details ? product.details : product.description;

    // Render product details
    contentDiv.innerHTML = `
        <div class="product-image-gallery">
            <img src="${product.image}" alt="${product.name}" class="product-main-image">
        </div>
        <div class="product-info">
            <h1>${product.name}</h1>
            <div class="price-details">
                <span id="product-detail-price">${formatPrice(product)}</span>
                ${product.oldPrice ? `<span class="original-price">₹${product.oldPrice.toLocaleString('en-IN')}</span>` : ''}
            </div>
            <div class="rating">
                ${renderStars(product.rating)}
                <span>(${product.rating}/5)</span>
            </div>
            <p>${product.description}</p>
            ${featuresHtml ? `
            <div class="product-features">
                <h3>Key Features:</h3>
                <ul>${featuresHtml}</ul>
            </div>` : ''}
            <h4>${longDescription}</h4>
            <div class="action-buttons">
                <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="buy-now-btn">Buy Now</a>
            </div>
        </div>
    `;

    updateDisplayedPrices(); // Update prices after rendering detail page
}

// --- Search Functionality ---
function setupSearch() {
    const searchBoxDesktop = document.getElementById('searchBox');
    const searchBoxMobile = document.getElementById('searchBoxMobile'); // Mobile search input
    const searchResultsDiv = document.getElementById('searchResults');

    const performSearch = (query, resultsContainer) => {
        resultsContainer.innerHTML = '';
        if (query.length < 2) {
            resultsContainer.style.display = 'none';
            return;
        }

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            (product.details && product.details.toLowerCase().includes(query.toLowerCase())) || // Search in 'details' too
            product.category.toLowerCase().includes(query.toLowerCase()) // Search by category name
        );

        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const resultItem = document.createElement('a');
                resultItem.href = `product-detail.html?id=${product.id}`;
                resultItem.className = 'search-result-item';
                resultItem.textContent = product.name;
                resultsContainer.appendChild(resultItem);
            });
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.innerHTML = '<div class="no-results-msg">No results found.</div>';
            resultsResultsContainer.style.display = 'block';
        }
    };

    // Event listener for desktop search box
    if (searchBoxDesktop && searchResultsDiv) {
        searchBoxDesktop.addEventListener('input', (e) => {
            performSearch(e.target.value, searchResultsDiv);
        });
        searchBoxDesktop.addEventListener('focus', (e) => {
            if (e.target.value.length >= 2) {
                performSearch(e.target.value, searchResultsDiv);
            }
        });
        searchBoxDesktop.addEventListener('blur', () => {
            // Delay hiding results to allow click on a result link
            setTimeout(() => {
                searchResultsDiv.style.display = 'none';
            }, 200);
        });
    }

    // Event listener for mobile search box (if you want real-time search on mobile too)
    if (searchBoxMobile) {
        searchBoxMobile.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query.length > 0) {
                    window.location.href = `products.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }
}


// --- DOM Content Loaded Event Listener ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Adjust hero-section margin for sticky header (only on index.html)
    const header = document.querySelector('.main-header');
    const heroSection = document.querySelector('.hero-section');
    if (header && heroSection) {
        const headerHeight = header.offsetHeight;
        heroSection.style.marginTop = `${headerHeight}px`;
    }

    // 2. Setup Currency Toggle Button functionality
    const currencyToggleButton = document.getElementById('currency-toggle-button');
    if (currencyToggleButton) {
        currencyToggleButton.textContent = currentCurrency; // Set initial text
        currencyToggleButton.addEventListener('click', () => {
            currentCurrency = currentCurrency === 'INR' ? 'USD' : 'INR';
            currencyToggleButton.textContent = currentCurrency; // Update button text
            updateDisplayedPrices(); // Recalculate and display all prices
        });
    }

    // 3. Render initial content based on the current page
    if (document.body.classList.contains('index-page') || document.URL.endsWith('index.html') || document.URL.endsWith('/')) {
        // Only render categories and featured products on the home page
        if (typeof categories !== 'undefined') { // Check if categories data is loaded
            renderCategories(categories, 'category-list');
        }
        if (typeof featuredProducts !== 'undefined') { // Check if featuredProducts data is loaded
            renderProducts(featuredProducts, 'featured-product-list');
        }
    } else if (document.body.classList.contains('products-page')) {
        const urlParams = new URLSearchParams(window.location.search);
        const categorySlug = urlParams.get('category'); // We now get slug, but filter by category name
        const searchQuery = urlParams.get('search');
        const productsPageHeading = document.getElementById('all-products-heading');

        let productsToRender = [];
        let headingText = "All Products";

        if (searchQuery) {
            productsToRender = products.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (p.details && p.details.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            headingText = `Search Results for "${searchQuery}"`;
        } else if (categorySlug) {
            // Find category by slug, then filter products by its name
            const selectedCategory = categories.find(cat => cat.slug === categorySlug);
            if (selectedCategory) {
                productsToRender = products.filter(p => p.category === selectedCategory.name);
                headingText = selectedCategory.name + ' Products';
            } else {
                productsToRender = products; // Fallback to all if category not found
                headingText = "All Products (Category Not Found)";
            }
        } else {
            productsToRender = products; // Default: show all products
        }

        if (productsPageHeading) {
            productsPageHeading.textContent = headingText;
        }
        if (typeof products !== 'undefined') { // Check if products data is loaded
            renderProducts(productsToRender, 'product-grid');
        }

    } else if (document.body.classList.contains('product-detail-page')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            if (typeof products !== 'undefined') { // Check if products data is loaded
                renderProductDetail(productId);
            } else {
                console.error("Products data not loaded. Cannot render product detail.");
                document.getElementById('product-detail-content').innerHTML = '<div class="error">Error: Product data not available.</div>';
            }
        } else {
            document.getElementById('product-detail-content').innerHTML = '<div class="error">Product ID is missing in the URL.</div>';
        }
    }

    // 4. Initialize Search Functionality
    setupSearch();

    // 5. Automatically update current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 6. Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Close search results if nav opens (for desktop search results dropdown)
            const searchResults = document.getElementById('searchResults');
            if (searchResults) searchResults.style.display = 'none';
        });

        // Close nav menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Close mobile menu if window is resized to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });

    // Close search results dropdown on outside click
    document.addEventListener('click', (event) => {
        const searchBox = document.getElementById('searchBox');
        const searchResults = document.getElementById('searchResults');
        // Check if the click was outside the search box and results
        if (searchResults && searchBox && !searchBox.contains(event.target) && !searchResults.contains(event.target)) {
            searchResults.style.display = 'none';
        }
    });
});
