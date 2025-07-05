// products.js - Final Optimized Version
window.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const container = document.getElementById("product-details");
  
  // Check if container exists
  if (!container) {
    console.error("Product details container not found");
    return;
  }

  // Find product in database
  const product = products.find(p => p.id === productId);
  
  // Handle product not found
  if (!product) {
    container.innerHTML = `
      <div class="product-not-found">
        <img src="images/product-not-found.svg" alt="Product not found">
        <h2>Product Not Found</h2>
        <p>We couldn't find the product you're looking for.</p>
        <a href="products.html" class="btn-primary">Browse All Products</a>
      </div>
    `;
    return;
  }

  // Render product details
  container.innerHTML = `
    <div class="product-detail-container">
      <div class="product-gallery">
        <img src="${product.image}" alt="${product.name}" class="main-image" loading="lazy">
        ${product.images?.length ? `
          <div class="thumbnails">
            ${product.images.map(img => `
              <img src="${img}" alt="${product.name} thumbnail" class="thumbnail">
            `).join('')}
          </div>
        ` : ''}
      </div>
      
      <div class="product-info">
        <div class="product-header">
          <h1>${product.name}</h1>
          <div class="product-meta">
            ${product.brand ? `<span class="brand">${product.brand}</span>` : ''}
            ${product.category ? `<span class="category">${product.category}</span>` : ''}
          </div>
        </div>
        
        ${product.rating ? `
        <div class="product-rating">
          <div class="stars">
            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
            <span>${product.rating.toFixed(1)}</span>
          </div>
          ${product.reviews ? `<a href="#reviews" class="review-count">${product.reviews.length} reviews</a>` : ''}
        </div>
        ` : ''}
        
        <div class="price-container">
          <span class="current-price">₹${product.priceINR.toLocaleString('en-IN')}</span>
          ${product.originalPrice ? `
            <span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>
            <span class="discount">${Math.round((1 - product.priceINR/product.originalPrice)*100)}% OFF</span>
          ` : ''}
          ${product.priceUSD ? `<span class="usd-price">($${product.priceUSD.toLocaleString('en-US')})</span>` : ''}
        </div>
        
        <div class="product-description">
          <h3>Description</h3>
          <p>${product.description}</p>
        </div>
        
        ${product.features?.length ? `
        <div class="product-features">
          <h3>Features</h3>
          <ul>
            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
        
        <div class="product-actions">
          <a href="${product.link || 'javascript:void(0)'}" 
             class="btn-primary" 
             ${product.link ? 'target="_blank"' : ''}
             ${!product.link ? 'aria-disabled="true"' : ''}>
            ${product.link ? 'Buy Now' : 'Out of Stock'}
          </a>
          <button class="btn-wishlist" data-product-id="${product.id}">
            <i class="far fa-heart"></i> Add to Wishlist
          </button>
        </div>
        
        <div class="product-specs">
          ${product.specifications ? `
          <h3>Specifications</h3>
          <table>
            ${Object.entries(product.specifications).map(([key, value]) => `
              <tr>
                <th>${key}</th>
                <td>${value}</td>
              </tr>
            `).join('')}
          </table>
          ` : ''}
        </div>
      </div>
    </div>
    
    ${product.reviews?.length ? `
    <section id="reviews" class="product-reviews">
      <h2>Customer Reviews</h2>
      <div class="reviews-container">
        ${product.reviews.map(review => `
          <div class="review">
            <div class="review-header">
              <span class="review-author">${review.author}</span>
              <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
            </div>
            <div class="review-content">
              <p>${review.comment}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
    ` : ''}
  `;

  // Initialize interactive elements
  initProductPage();
});

function initProductPage() {
  // Thumbnail click handler
  document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const mainImg = document.querySelector('.main-image');
      mainImg.src = thumb.src;
    });
  });

  // Wishlist button
  const wishlistBtn = document.querySelector('.btn-wishlist');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', function() {
      const productId = this.dataset.productId;
      toggleWishlist(productId, this);
    });
  }
}

function toggleWishlist(productId, button) {
  const icon = button.querySelector('i');
  icon.classList.toggle('far');
  icon.classList.toggle('fas');
  
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const index = wishlist.indexOf(productId);
  
  if (index === -1) {
    wishlist.push(productId);
    button.textContent = ' Remove from Wishlist';
  } else {
    wishlist.splice(index, 1);
    button.textContent = ' Add to Wishlist';
  }
  
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}
