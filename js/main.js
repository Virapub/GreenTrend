// js/main.js

// Global Variables
let currentCurrency = "INR"; // Default currency when page loads
const USD_EXCHANGE_RATE = 83.5; // IMPORTANT: Update this value regularly! (e.g. 1 USD = 83.5 INR)

// --- Helper Functions ---

// Function to format price based on current currency
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
    // Update prices on product cards (e.g., home page, products page)
    document.querySelectorAll('.product-card .price[data-inr-price]').forEach(priceElement => {
        const priceInINR = parseFloat(priceElement.dataset.inrPrice);
        if (!isNaN(priceInINR)) {
            // Find or create the span for current price
            let currentPriceSpan = priceElement.querySelector('.current-price');
            if (!currentPriceSpan) {
                currentPriceSpan = document.createElement('span');
                currentPriceSpan.className = 'current-price';
                // Prepend to ensure it's the first child for consistent display
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
    const searchInput = document.getElementById('searchBox');
    const searchResultsContainer = document.getElementById('searchResults');
    const searchButton = document.getElementById('searchButton');

    if (!searchInput || !searchResultsContainer || !searchButton) {
        console.warn('Search elements (searchBox, searchResults, or searchButton) not found. Search functionality may not work.');
        return;
    }

    const performLiveSearch = (query) => {
        searchResultsContainer.innerHTML = ''; // Clear previous results
        if (query.length < 2) { // Show results only if query is at least 2 chars
            searchResultsContainer.style.display = 'none';
            return;
        }

        // Ensure 'products' array is available from data.js
        if (typeof products === 'undefined' || !Array.isArray(products)) {
            console.error('Products data not available for search. Make sure data.js is loaded correctly.');
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

    // Event listener for search input (live search)
    searchInput.addEventListener('input', (e) => {
        performLiveSearch(e.target.value.trim());
    });

    // Event listener for search button click (redirect to products page with search query)
    searchButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission if it's part of a form
        const query = searchInput.value.trim();
        if (query.length > 0) {
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
    });

    // Close search results dropdown on outside click
    document.addEventListener('click', (event) => {
        // Check if the click is outside the search input, search button, and search results container
        if (!searchInput.contains(event.target) && !searchResultsContainer.contains(event.target) && !searchButton.contains(event.target)) {
            searchResultsContainer.style.display = 'none';
        }
    });

    // Optionally close search results on Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            searchResultsContainer.style.display = 'none';
            searchInput.blur(); // Remove focus from search input
        }
    });
}

// --- Mobile Navigation Toggle functionality ---
function setupMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const searchResults = document.getElementById('searchResults'); // To close search results if menu opens

    if (!navToggle) {
        console.warn('Navigation toggle button (#navToggle) not found.');
        return;
    }
    if (!navMenu) {
        console.warn('Navigation menu (#navMenu) not found.');
        return;
    }

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Close search results if the navigation menu is opened
        if (searchResults && searchResults.style.display !== 'none') {
            searchResults.style.display = 'none';
        }
        // Toggle body scroll lock to prevent scrolling when menu is open
        document.body.classList.toggle('no-scroll');
    });

    // Close nav menu when a link is clicked (for single page applications or smooth scroll)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Close nav menu when window is resized to desktop (e.g., from portrait mobile to landscape tablet/desktop)
    window.addEventListener('resize', () => {
        // 992px is typically where desktop styles kick in (adjust as per your CSS media query)
        if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}

// --- Initialize Current Year in Footer ---
function setupFooterYear() {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// --- Product and Category Rendering Functions ---

// Renders a list of products into a specified container
function renderProducts(productList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Error: Product container with ID "${containerId}" not found.`);
        return;
    }

    container.innerHTML = ''; // Clear existing content

    if (!productList || productList.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--secondary-color); margin-top: 20px;">No products found.</p>';
        return;
    }

    productList.forEach(product => {
        const productCard = document.createElement('a');
        productCard.href = `product-detail.html?id=${product.id}`;
        productCard.className = 'product-card';
        // Add a class for specific pages if needed, e.g., 'featured-product-card'
        // productCard.classList.add('featured-product-card');

        // Use data-inr-price to store the base price for currency conversion
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <h3>${product.name}</h3>
                <div class="price" data-inr-price="${product.priceINR}">
                    <span class="current-price">${formatPrice(product.priceINR)}</span>
                    ${product.originalPriceINR ? `<span class="original-price">₹${product.originalPriceINR.toLocaleString('en-IN')}</span>` : ''}
                </div>
                <div class="rating">
                    ${'⭐'.repeat(Math.floor(product.rating))}
                    ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                    <span class="rating-text">(${product.rating}/5)</span>
                </div>
                <button class="btn btn-primary buy-btn">View Details</button>
            </div>
        `;
        container.appendChild(productCard);
    });

    updateDisplayedPrices(); // Update prices after rendering
}

// Renders a list of categories into a specified container
function renderCategories(categoryList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Error: Category container with ID "${containerId}" not found.`);
        return;
    }

    container.innerHTML = ''; // Clear existing content

    if (!categoryList || categoryList.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--secondary-color); margin-top: 20px;">No categories found.</p>';
        return;
    }

    categoryList.forEach(category => {
        const categoryCard = document.createElement('a');
        categoryCard.href = `products.html?category=${category.slug}`; // Link to products page with category filter
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <img src="${category.image}" alt="${category.name} Category">
            <span>${category.name}</span>
        `;
        container.appendChild(categoryCard);
    });
}
if (categorySlug) {
  productsToRender = products.filter(product => {
    const priceCategory = getPriceBasedCategory(product.priceINR);
    const category = categories.find(cat => cat.slug === categorySlug);
    return priceCategory === category?.name;
  });
  // ... rest of the code
}

// Renders a single product's detailed information on the product detail page
async function renderProductDetail(productId) {
    const contentDiv = document.getElementById('product-detail-content');
    if (!contentDiv) {
        console.error('Product detail content container (#product-detail-content) not found.');
        return;
    }

    // Show loading state
    contentDiv.innerHTML = '<div class="loading">Loading product details...</div>';
    contentDiv.classList.add('loading');

    // Ensure 'products' array is available from data.js
    if (typeof products === 'undefined' || !Array.isArray(products)) {
        console.error('Products data not available for product detail. Make sure data.js is loaded correctly.');
        contentDiv.innerHTML = '<div class="error">Error: Product data missing.</div>';
        contentDiv.classList.remove('loading');
        return;
    }

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
                    ${product.originalPriceINR ? `<span class="original-price">₹${product.originalPriceINR.toLocaleString('en-IN')}</span>` : ''}
                    ${product.discountPercent ? `<span class="discount-percent">${product.discountPercent}% Off</span>` : ''}
                </div>
                <div class="rating">
                    ${'⭐'.repeat(Math.floor(product.rating))}
                    ${product.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
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
                    <a href="${product.link}" target="_blank" rel="noopener noreferrer" class="btn btn-accent buy-now-btn">Buy Now</a>
                </div>
            </div>
        `;
        updateDisplayedPrices(); // Update prices after rendering detail page
    } else {
        contentDiv.innerHTML = '<div class="error">Product not found. Please check the URL.</div>';
        contentDiv.classList.remove('loading');
    }
}


// --- DOM Content Loaded Listener (Main Initialization) ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded. Initializing GreenTrend...');

    // Adjust hero-section margin for sticky header (only on index.html)
    const mainHeader = document.querySelector('.main-header');
    const heroSection = document.querySelector('.hero-section');
    if (mainHeader && heroSection) {
        const headerHeight = mainHeader.offsetHeight;
        heroSection.style.marginTop = `${headerHeight + 25}px`; // Add some extra space for better separation
        console.log(`Header height: ${headerHeight}px. Hero section margin top set.`);
    } else {
        console.log('Main header or hero section not found for margin adjustment.');
    }


    // Initialize currency toggle button functionality
    const currencyToggleButton = document.getElementById('currency-toggle-button');
    if (currencyToggleButton) {
        currencyToggleButton.textContent = currentCurrency; // Set initial text
        currencyToggleButton.addEventListener('click', () => {
            currentCurrency = (currentCurrency === "INR" ? "USD" : "INR");
            currencyToggleButton.textContent = currentCurrency;
            updateDisplayedPrices(); // Recalculate and display all prices
            console.log(`Currency toggled to: ${currentCurrency}`);
        });
    } else {
        console.warn('Currency toggle button (#currency-toggle-button) not found.');
    }

    // --- Page-specific rendering logic ---

    // Render content for the homepage (index.html)
    if (document.body.classList.contains('homepage')) {
        console.log('Homepage detected. Rendering categories and featured products.');
        // Ensure 'categories' and 'featuredProducts' are available from data.js
        if (typeof categories !== 'undefined' && Array.isArray(categories) && categories.length > 0) {
            renderCategories(categories, 'category-list');
        } else {
            console.warn('Categories data not available or empty for homepage. Check data.js.');
        }
        if (typeof featuredProducts !== 'undefined' && Array.isArray(featuredProducts) && featuredProducts.length > 0) {
            renderProducts(featuredProducts, 'product-grid');
        } else {
            console.warn('Featured Products data not available or empty for homepage. Check data.js or ensure featuredProducts is defined.');
        }
    }

    // Handle product listing on products.html
    if (document.body.classList.contains('products-page')) {
        console.log('Products page detected. Rendering products based on URL params.');
        const urlParams = new URLSearchParams(window.location.search);
        const categorySlug = urlParams.get('category');
        const searchQuery = urlParams.get('search');
        let productsToRender = []; // Initialize as empty array

        // Ensure 'products' data is available from data.js
        if (typeof products !== 'undefined' && Array.isArray(products)) {
            productsToRender = products; // Default to all products

            if (categorySlug) {
                productsToRender = products.filter(product => {
    const slug = categories.find(cat => cat.name === product.category)?.slug;
    return slug === categorySlug;
});
                const categoryName = categories.find(cat => cat.slug === categorySlug)?.name;
                // Update the heading on the products page
                const productsHeading = document.getElementById('products-heading');
                if (productsHeading) {
                    productsHeading.textContent = categoryName ? `${categoryName} Products` : "Products";
                }
                console.log(`Filtering by category: ${categorySlug}. Found ${productsToRender.length} products.`);
            } else if (searchQuery) {
                productsToRender = products.filter(product =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
                );
                 // Update the heading on the products page
                const productsHeading = document.getElementById('products-heading');
                if (productsHeading) {
                     productsHeading.textContent = `Search Results for "${searchQuery}"`;
                }
                console.log(`Filtering by search query: "${searchQuery}". Found ${productsToRender.length} products.`);
            } else {
                 // Default heading for all products
                 const productsHeading = document.getElementById('products-heading');
                if (productsHeading) {
                     productsHeading.textContent = "All Products";
                }
            }
        } else {
            console.error('Products data not available for products page. Make sure data.js is loaded correctly.');
            const productsHeading = document.getElementById('products-heading');
            if (productsHeading) {
                productsHeading.textContent = "Error: Product data missing";
            }
        }

        // Render the filtered/all products
        if (productsToRender.length > 0) {
            renderProducts(productsToRender, 'product-grid');
        } else {
            const container = document.getElementById('product-grid');
            if (container) {
                container.innerHTML = '<p style="text-align: center; color: var(--secondary-color); margin-top: 20px;">No products found in this category/search.</p>';
                console.log('No products to render. Displaying "No products found" message.');
            } else {
                console.warn('Product grid container (#product-grid) not found on products page.');
            }
        }
    }

    // Handle product detail page
    if (document.body.classList.contains('product-detail-page')) {
        console.log('Product detail page detected. Rendering product details.');
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            if (typeof renderProductDetail !== 'undefined') {
                renderProductDetail(productId);
            } else {
                console.error('renderProductDetail function not defined.');
            }
        } else {
            const productDetailContent = document.getElementById('product-detail-content');
            if (productDetailContent) {
                productDetailContent.innerHTML = '<div class="error">Error: Product ID missing in URL.</div>';
            }
            console.warn('Product ID missing in URL for product detail page.');
        }
    }

    // Initialize core functionalities
    setupSearch();
    setupMobileNav();
    setupFooterYear();

    // Initial price update for any elements not covered by rendering functions (e.g., if hardcoded)
    updateDisplayedPrices();
    console.log('GreenTrend initialization complete.');
});
