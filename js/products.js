window.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const productList = document.getElementById("product-list");
  const searchBox = document.getElementById("searchBox");
  const productContainer = productList?.parentElement;
  
  // Create no results message element
  const noResultsMessage = document.createElement('div');
  noResultsMessage.className = 'no-results';
  noResultsMessage.innerHTML = `
    <img src="images/no-results.svg" alt="No products found" class="no-results-img">
    <h3>No Products Found</h3>
    <p>Try adjusting your search or filters</p>
    <button class="clear-search-btn">Reset Search</button>
  `;
  noResultsMessage.style.display = 'none';
  productContainer.insertBefore(noResultsMessage, productList.nextSibling);

  // Display Products Function
  function displayProducts(productsToShow) {
    if (!productList || !productContainer) {
      console.error("Product container not found!");
      return;
    }

    productList.innerHTML = "";
    
    if (productsToShow.length === 0) {
      productContainer.appendChild(noResultsMessage);
      productList.style.display = 'none';
      noResultsMessage.style.display = 'flex';
      
      // Add event listener to clear search button
      const clearBtn = noResultsMessage.querySelector('.clear-search-btn');
      clearBtn?.addEventListener('click', () => {
        if (searchBox) searchBox.value = '';
        displayProducts(products);
      });
      return;
    }
    
    productList.style.display = 'grid';
    if (productContainer.contains(noResultsMessage)) {
      productContainer.removeChild(noResultsMessage);
    }
    
    // Create product cards
    productsToShow.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          ${product.discount ? `<span class="discount-badge">${product.discount}% OFF</span>` : ''}
          <button class="quick-view-btn" data-product-id="${product.id}">Quick View</button>
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-description">${product.description.substring(0, 60)}${product.description.length > 60 ? '...' : ''}</p>
          <div class="price-container">
            <p class="price">₹${product.priceINR.toLocaleString('en-IN')}</p>
            ${product.originalPrice ? `<p class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</p>` : ''}
          </div>
          <div class="product-actions">
            <a href="product.html?id=${product.id}" class="buy-btn">View Details</a>
            <button class="wishlist-btn" aria-label="Add to wishlist" data-product-id="${product.id}">
              ♡
            </button>
          </div>
          ${product.rating ? `
          <div class="product-rating">
            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
            <span>(${product.rating.toFixed(1)})</span>
          </div>` : ''}
        </div>
      `;
      productList.appendChild(card);
    });

    // Add event listeners to interactive elements
    addProductEventListeners();
  }

  // Search Functionality with Debounce
  function handleSearch() {
    if (!searchBox) return;
    
    const query = searchBox.value.trim().toLowerCase();
    const filtered = products.filter(product => {
      const searchFields = [
        product.name.toLowerCase(),
        product.description.toLowerCase(),
        product.category.toLowerCase(),
        ...(product.tags?.map(tag => tag.toLowerCase()) || [])
      ];
      return searchFields.some(field => field.includes(query));
    });
    
    displayProducts(filtered);
  }

  // Debounce Function for Search
  function debounce(func, delay) {
    let timeoutId;
    return function() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, arguments), delay);
    };
  }

  // Add Event Listeners to Product Elements
  function addProductEventListeners() {
    // Wishlist Buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const productId = this.dataset.productId;
        toggleWishlist(productId, this);
      });
    });

    // Quick View Buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const productId = this.dataset.productId;
        showQuickView(productId);
      });
    });
  }

  // Wishlist Functionality
  function toggleWishlist(productId, button) {
    button.textContent = button.textContent === '♡' ? '♥' : '♡';
    button.classList.toggle('in-wishlist');
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.indexOf(productId);
    
    if (index === -1) {
      wishlist.push(productId);
    } else {
      wishlist.splice(index, 1);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }

  // Quick View Modal
  function showQuickView(productId) {
    // Implement your quick view modal here
    console.log(`Show quick view for product ${productId}`);
  }

  // Initialize the product listing
  displayProducts(products);
  
  // Set up search functionality
  if (searchBox) {
    // Add search input event with debounce
    searchBox.addEventListener("input", debounce(handleSearch, 300));
    
    // Add clear search functionality
    const searchContainer = searchBox.parentElement;
    const clearSearchBtn = document.createElement('button');
    clearSearchBtn.className = 'clear-search-btn';
    clearSearchBtn.innerHTML = '&times;';
    clearSearchBtn.setAttribute('aria-label', 'Clear search');
    
    clearSearchBtn.addEventListener('click', () => {
      searchBox.value = '';
      handleSearch();
      searchBox.focus();
    });
    
    searchContainer.appendChild(clearSearchBtn);
    
    // Show/hide clear button based on input
    searchBox.addEventListener('input', function() {
      clearSearchBtn.style.display = this.value ? 'block' : 'none';
    });
  }
});
