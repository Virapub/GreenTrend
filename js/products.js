window.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const searchBox = document.getElementById("searchBox");
  
  // Create no results message element
  const noResultsMessage = document.createElement('div');
  noResultsMessage.className = 'no-results';
  noResultsMessage.innerHTML = `
    <img src="images/no-results.svg" alt="No products found">
    <h3>No Products Found</h3>
    <p>Try adjusting your search or filters</p>
    <button class="btn">Reset Search</button>
  `;
  noResultsMessage.style.display = 'none';
  productList.parentNode.insertBefore(noResultsMessage, productList.nextSibling);

  // Display products function
  function displayProducts(productsToShow) {
    if (!productList) return;
    
    productList.innerHTML = "";
    
    if (productsToShow.length === 0) {
      noResultsMessage.style.display = 'block';
      productList.style.display = 'none';
      
      // Add reset button functionality
      const resetBtn = noResultsMessage.querySelector('.btn');
      resetBtn.addEventListener('click', () => {
        if (searchBox) searchBox.value = '';
        displayProducts(products);
      });
      return;
    } else {
      noResultsMessage.style.display = 'none';
      productList.style.display = 'grid';
    }

    productsToShow.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          ${product.discount ? `<span class="discount-badge">${product.discount}% OFF</span>` : ''}
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-description">${product.description.substring(0, 60)}...</p>
          <div class="price-container">
            <p class="price">₹${product.priceINR.toLocaleString('en-IN')}</p>
            ${product.originalPrice ? `<p class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</p>` : ''}
          </div>
          <div class="product-actions">
            <a href="product.html?id=${product.id}" class="buy-btn">View Details</a>
            <button class="wishlist-btn" data-product-id="${product.id}">
              <i class="far fa-heart"></i>
            </button>
          </div>
          ${product.rating ? `<div class="product-rating">${'★'.repeat(Math.round(product.rating))}${'☆'.repeat(5 - Math.round(product.rating))}</div>` : ''}
        </div>
      `;
      productList.appendChild(card);
    });

    // Add wishlist button functionality
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productId = btn.dataset.productId;
        toggleWishlist(productId);
        btn.querySelector('i').classList.toggle('fas');
        btn.querySelector('i').classList.toggle('far');
      });
    });
  }

  // Search function with debounce
  function handleSearch() {
    if (!searchBox) return;
    
    const query = searchBox.value.trim().toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query)))
    );
    displayProducts(filtered);
  }

  // Debounce function
  function debounce(func, delay) {
    let timeoutId;
    return function() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, arguments), delay);
    };
  }

  // Wishlist toggle function
  function toggleWishlist(productId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.indexOf(productId);
    
    if (index === -1) {
      wishlist.push(productId);
    } else {
      wishlist.splice(index, 1);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }

  // Initialize product display
  displayProducts(products);
  
  // Set up search functionality
  if (searchBox) {
    searchBox.addEventListener("input", debounce(handleSearch, 300));
    
    // Clear search on Escape key
    searchBox.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        searchBox.value = '';
        handleSearch();
      }
    });
    
    // Create clear search button
    const clearSearch = document.createElement('button');
    clearSearch.className = 'clear-search';
    clearSearch.innerHTML = '&times;';
    clearSearch.setAttribute('aria-label', 'Clear search');
    
    clearSearch.addEventListener('click', () => {
      searchBox.value = '';
      handleSearch();
      searchBox.focus();
    });
    
    // Add clear button to search container
    searchBox.parentNode.appendChild(clearSearch);
    
    // Show/hide clear button based on input
    searchBox.addEventListener('input', function() {
      clearSearch.style.display = this.value ? 'block' : 'none';
    });
  }
});
