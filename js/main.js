// js/main.js - GreenTrend E-commerce v2.0

/**
 * Global Configuration
 */
const CONFIG = {
    defaultCurrency: "INR",
    exchangeRates: {
        USD: 83.7, // 1 USD = 83.7 INR
        EUR: 90.5, // Added Euro support
        GBP: 105.2 // Added British Pound support
    },
    priceRounding: {
        USD: 2,
        EUR: 2,
        GBP: 2,
        INR: 0
    },
    search: {
        minChars: 2,
        debounceTime: 300
    },
    breakpoints: {
        mobile: 768,
        tablet: 992
    }
};

// State Management
const APP_STATE = {
    currentCurrency: CONFIG.defaultCurrency,
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    userPreferences: JSON.parse(localStorage.getItem('userPreferences')) || {
        darkMode: false,
        currency: CONFIG.defaultCurrency
    }
};

/**
 * Utility Functions
 */
const Utils = {
    // Format price based on current currency
    formatPrice: (priceInINR) => {
        if (APP_STATE.currentCurrency === "INR") {
            return `₹${priceInINR.toLocaleString('en-IN', { maximumFractionDigits: CONFIG.priceRounding.INR })}`;
        } else {
            const rate = CONFIG.exchangeRates[APP_STATE.currentCurrency];
            const convertedPrice = priceInINR / rate;
            return `${APP_STATE.currentCurrency === 'USD' ? '$' : APP_STATE.currentCurrency === 'EUR' ? '€' : '£'}${convertedPrice.toFixed(CONFIG.priceRounding[APP_STATE.currentCurrency])}`;
        }
    },

    // Debounce function for performance optimization
    debounce: (func, delay) => {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    // Get URL parameters
    getUrlParams: () => {
        return Object.fromEntries(new URLSearchParams(window.location.search).entries());
    },

    // Show loading spinner
    showLoading: (element) => {
        if (element) {
            element.innerHTML = '<div class="loading-spinner"></div>';
            element.classList.add('loading');
        }
    },

    // Hide loading spinner
    hideLoading: (element) => {
        if (element) {
            element.classList.remove('loading');
        }
    },

    // Update localStorage
    updateLocalStorage: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('LocalStorage update failed:', error);
            return false;
        }
    }
};

/**
 * DOM Update Functions
 */
const DOMUpdates = {
    // Update all displayed prices on the page
    updateDisplayedPrices: () => {
        // Product cards
        document.querySelectorAll('[data-inr-price]').forEach(element => {
            const priceInINR = parseFloat(element.dataset.inrPrice);
            if (!isNaN(priceInINR)) {
                const displayElement = element.querySelector('.current-price') || element;
                displayElement.textContent = Utils.formatPrice(priceInINR);
                
                // Update original price if exists
                const originalPriceElement = element.querySelector('.original-price');
                if (originalPriceElement && element.dataset.originalInrPrice) {
                    const originalPriceInINR = parseFloat(element.dataset.originalInrPrice);
                    originalPriceElement.textContent = `₹${originalPriceInINR.toLocaleString('en-IN')}`;
                }
            }
        });

        // Cart totals
        CartManager.updateCartTotal();
    },

    // Toggle currency display
    toggleCurrency: () => {
        const currencyOrder = ['INR', 'USD', 'EUR', 'GBP'];
        const currentIndex = currencyOrder.indexOf(APP_STATE.currentCurrency);
        APP_STATE.currentCurrency = currencyOrder[(currentIndex + 1) % currencyOrder.length];
        
        // Update UI
        const currencyToggle = document.getElementById('currency-toggle');
        if (currencyToggle) {
            currencyToggle.textContent = APP_STATE.currentCurrency;
        }
        
        // Save preference
        APP_STATE.userPreferences.currency = APP_STATE.currentCurrency;
        Utils.updateLocalStorage('userPreferences', APP_STATE.userPreferences);
        
        DOMUpdates.updateDisplayedPrices();
    },

    // Update mobile menu state
    toggleMobileMenu: (forceClose = false) => {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu) {
            if (forceClose) {
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            } else {
                navMenu.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            }
        }
        
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        }
    }
};

/**
 * Search Module
 */
const SearchModule = {
    init: () => {
        const searchInput = document.getElementById('searchBox');
        const searchResults = document.getElementById('searchResults');
        const searchButton = document.getElementById('searchButton');

        if (!searchInput || !searchResults) return;

        // Live search with debouncing
        searchInput.addEventListener('input', Utils.debounce((e) => {
            SearchModule.performSearch(e.target.value.trim(), searchResults);
        }, CONFIG.search.debounceTime));

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

        // Close search results on outside click
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });

        // Keyboard navigation
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchResults.style.display = 'none';
            }
        });
    },

    performSearch: (query, resultsContainer) => {
        resultsContainer.innerHTML = '';
        
        if (query.length < CONFIG.search.minChars) {
            resultsContainer.style.display = 'none';
            return;
        }

        if (typeof products === 'undefined') {
            resultsContainer.innerHTML = '<div class="search-error">Product data not loaded</div>';
            resultsContainer.style.display = 'block';
            return;
        }

        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description?.toLowerCase().includes(query.toLowerCase()) ||
            product.category?.toLowerCase().includes(query.toLowerCase())
        );

        if (filtered.length > 0) {
            filtered.slice(0, 5).forEach(product => {
                const item = document.createElement('a');
                item.href = `product-detail.html?id=${product.id}`;
                item.className = 'search-result-item';
                item.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <h4>${product.name}</h4>
                        <div class="search-price">${Utils.formatPrice(product.priceINR)}</div>
                    </div>
                `;
                resultsContainer.appendChild(item);
            });
            resultsContainer.style.display = 'block';
        } else {
            resultsContainer.innerHTML = '<div class="no-results">No products found</div>';
            resultsContainer.style.display = 'block';
        }
    }
};

/**
 * Product Rendering Module
 */
const ProductRenderer = {
    renderProducts: (productList, containerId, options = {}) => {
        const container = document.getElementById(containerId);
        if (!container) return false;

        container.innerHTML = '';

        if (!productList || productList.length === 0) {
            container.innerHTML = '<div class="no-products">No products available</div>';
            return false;
        }

        productList.forEach(product => {
            const card = document.createElement('div');
            card.className = `product-card ${options.featured ? 'featured' : ''}`;
            card.innerHTML = ProductRenderer.generateProductCardHTML(product);
            container.appendChild(card);
        });

        DOMUpdates.updateDisplayedPrices();
        return true;
    },

    generateProductCardHTML: (product) => {
        return `
            <a href="product-detail.html?id=${product.id}" class="product-link">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.discountPercent ? `<span class="discount-badge">${product.discountPercent}% OFF</span>` : ''}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="price" data-inr-price="${product.priceINR}" ${product.originalPriceINR ? `data-original-inr-price="${product.originalPriceINR}"` : ''}>
                        <span class="current-price"></span>
                        ${product.originalPriceINR ? `<span class="original-price"></span>` : ''}
                    </div>
                    <div class="rating">
                        ${'★'.repeat(Math.floor(product.rating))}
                        ${product.rating % 1 >= 0.5 ? '½' : ''}
                        <span>(${product.reviews || 0})</span>
                    </div>
                    <button class="btn add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </a>
        `;
    },

    renderProductDetail: (productId) => {
        const container = document.getElementById('product-detail-content');
        if (!container) return false;

        Utils.showLoading(container);

        if (typeof products === 'undefined') {
            container.innerHTML = '<div class="error">Product data not available</div>';
            return false;
        }

        const product = products.find(p => p.id === productId);
        if (!product) {
            container.innerHTML = '<div class="error">Product not found</div>';
            return false;
        }

        container.innerHTML = ProductRenderer.generateProductDetailHTML(product);
        DOMUpdates.updateDisplayedPrices();
        
        // Initialize product gallery if exists
        const gallery = container.querySelector('.product-gallery');
        if (gallery) {
            ProductRenderer.initProductGallery(gallery);
        }

        return true;
    },

    generateProductDetailHTML: (product) => {
        return `
            <div class="product-gallery">
                <div class="main-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                ${product.additionalImages ? `
                <div class="thumbnail-container">
                    ${product.additionalImages.map(img => `
                        <img src="${img}" alt="${product.name} - additional view">
                    `).join('')}
                </div>` : ''}
            </div>
            <div class="product-info">
                <h1>${product.name}</h1>
                <div class="price-container">
                    <span class="current-price" data-inr-price="${product.priceINR}"></span>
                    ${product.originalPriceINR ? `
                        <span class="original-price">₹${product.originalPriceINR.toLocaleString('en-IN')}</span>
                        <span class="discount-percent">${product.discountPercent}% OFF</span>
                    ` : ''}
                </div>
                <div class="rating">
                    ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 >= 0.5 ? '½' : ''}
                    <span>${product.rating} (${product.reviews || 0} reviews)</span>
                </div>
                <div class="availability">
                    <span class="in-stock">${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
                        ${product.stock > 0 ? 'Add to Cart' : 'Notify Me'}
                    </button>
                    <button class="btn btn-outline wishlist-btn" data-product-id="${product.id}">
                        <i class="far fa-heart"></i> Wishlist
                    </button>
                </div>
                <div class="product-description">
                    <h3>Description</h3>
                    <p>${product.description}</p>
                </div>
                ${product.features ? `
                <div class="product-features">
                    <h3>Features</h3>
                    <ul>
                        ${product.features.map(feat => `<li>${feat}</li>`).join('')}
                    </ul>
                </div>` : ''}
                ${product.specifications ? `
                <div class="product-specs">
                    <h3>Specifications</h3>
                    <table>
                        ${Object.entries(product.specifications).map(([key, value]) => `
                            <tr>
                                <th>${key}</th>
                                <td>${value}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>` : ''}
            </div>
        `;
    },

    initProductGallery: (galleryElement) => {
        const mainImage = galleryElement.querySelector('.main-image img');
        const thumbnails = galleryElement.querySelectorAll('.thumbnail-container img');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImage.src = thumb.src;
                mainImage.alt = thumb.alt;
            });
        });
    }
};

/**
 * Category Module
 */
const CategoryModule = {
    renderCategories: (categoryList, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return false;

        container.innerHTML = '';

        if (!categoryList || categoryList.length === 0) {
            container.innerHTML = '<div class="no-categories">No categories available</div>';
            return false;
        }

        categoryList.forEach(category => {
            const card = document.createElement('a');
            card.href = `products.html?category=${category.slug}`;
            card.className = 'category-card';
            card.innerHTML = `
                <img src="${category.image}" alt="${category.name}" loading="lazy">
                <h3>${category.name}</h3>
                <p>${category.productCount || 0} products</p>
            `;
            container.appendChild(card);
        });

        return true;
    },

    filterProductsByCategory: (categorySlug) => {
        if (!categorySlug) return products;
        return products.filter(product => product.categorySlug === categorySlug);
    },

    filterProductsByPriceRange: (range) => {
        switch (range) {
            case 'under1000':
                return products.filter(p => p.priceINR < 1000);
            case '1000-5000':
                return products.filter(p => p.priceINR >= 1000 && p.priceINR <= 5000);
            case '5000-10000':
                return products.filter(p => p.priceINR > 5000 && p.priceINR <= 10000);
            case 'over10000':
                return products.filter(p => p.priceINR > 10000);
            default:
                return products;
        }
    }
};

/**
 * Cart Management Module
 */
const CartManager = {
    init: () => {
        CartManager.updateCartCount();
        CartManager.setupCartEventListeners();
    },

    setupCartEventListeners: () => {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart') || e.target.closest('.add-to-cart')) {
                const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
                const productId = button.dataset.productId;
                CartManager.addToCart(productId);
            }
        });
    },

    addToCart: (productId, quantity = 1) => {
        const product = products.find(p => p.id === productId);
        if (!product) return false;

        const existingItem = APP_STATE.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            APP_STATE.cart.push({
                ...product,
                quantity,
                addedAt: new Date().toISOString()
            });
        }

        Utils.updateLocalStorage('cart', APP_STATE.cart);
        CartManager.updateCartCount();
        CartManager.showAddToCartNotification(product.name);
        return true;
    },

    updateCartCount: () => {
        const countElements = document.querySelectorAll('.cart-count');
        const totalItems = APP_STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        countElements.forEach(el => {
            el.textContent = totalItems;
            el.style.display = totalItems > 0 ? 'flex' : 'none';
        });
    },

    updateCartTotal: () => {
        const totalElements = document.querySelectorAll('.cart-total');
        if (!totalElements.length) return;

        const total = APP_STATE.cart.reduce((sum, item) => {
            return sum + (item.priceINR * item.quantity);
        }, 0);

        totalElements.forEach(el => {
            el.textContent = Utils.formatPrice(total);
        });
    },

    showAddToCartNotification: (productName) => {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <span>${productName} added to cart!</span>
            <a href="cart.html" class="btn btn-small">View Cart</a>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
};

/**
 * Initialization Function
 */
const initApp = () => {
    // Set current currency from user preferences
    APP_STATE.currentCurrency = APP_STATE.userPreferences.currency || CONFIG.defaultCurrency;
    
    // Initialize currency toggle
    const currencyToggle = document.getElementById('currency-toggle');
    if (currencyToggle) {
        currencyToggle.textContent = APP_STATE.currentCurrency;
        currencyToggle.addEventListener('click', DOMUpdates.toggleCurrency);
    }

    // Initialize mobile navigation
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navToggle.addEventListener('click', () => DOMUpdates.toggleMobileMenu());
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', () => DOMUpdates.toggleMobileMenu(true));
    });

    // Close mobile menu on larger screens
    window.addEventListener('resize', () => {
        if (window.innerWidth > CONFIG.breakpoints.tablet) {
            DOMUpdates.toggleMobileMenu(true);
        }
    });

    // Initialize search
    SearchModule.init();

    // Initialize cart
    CartManager.init();

    // Set current year in footer
    document.getElementById('current-year')?.textContent = new Date().getFullYear();

    // Page-specific initializations
    if (document.body.classList.contains('homepage')) {
        // Homepage initialization
        if (typeof categories !== 'undefined') {
            CategoryModule.renderCategories(categories, 'category-list');
        }
        if (typeof featuredProducts !== 'undefined') {
            ProductRenderer.renderProducts(featuredProducts, 'featured-products', { featured: true });
        }
    } else if (document.body.classList.contains('products-page')) {
        // Products page initialization
        const params = Utils.getUrlParams();
        let productsToRender = products;
        
        if (params.category) {
            productsToRender = CategoryModule.filterProductsByCategory(params.category);
            const categoryName = categories?.find(c => c.slug === params.category)?.name;
            document.getElementById('products-heading')?.textContent = categoryName || 'Products';
        } else if (params.search) {
            productsToRender = products.filter(p => 
                p.name.toLowerCase().includes(params.search.toLowerCase()) ||
                p.description?.toLowerCase().includes(params.search.toLowerCase())
            );
            document.getElementById('products-heading')?.textContent = `Search: "${params.search}"`;
        } else if (params.priceRange) {
            productsToRender = CategoryModule.filterProductsByPriceRange(params.priceRange);
            document.getElementById('products-heading')?.textContent = 'Filtered Products';
        }
        
        ProductRenderer.renderProducts(productsToRender, 'product-grid');
    } else if (document.body.classList.contains('product-detail-page')) {
        // Product detail page initialization
        const { id } = Utils.getUrlParams();
        if (id) {
            ProductRenderer.renderProductDetail(id);
        }
    } else if (document.body.classList.contains('cart-page')) {
        // Cart page initialization would go here
    }

    // Adjust hero section margin for sticky header
    const header = document.querySelector('.main-header');
    const hero = document.querySelector('.hero-section');
    if (header && hero) {
        hero.style.marginTop = `${header.offsetHeight + 20}px`;
    }
};

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
