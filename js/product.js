// products.js - Final Optimized Version
window.addEventListener("DOMContentLoaded", () => {
  // Get product ID from URL
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const container = document.getElementById("product-details");

  // Check if container exists
  if (!container) {
    console.error("Product details container not found");
    return;
  }

  // Find product in database
  const product = products.find(p => p.id == productId); // Loose equality for URL string vs number ID

  // Handle product not found
  if (!product) {
    container.innerHTML = `
      <div class="product-not-found">
        <img src="images/product-not-found.svg" alt="Product not found">
        <h3>Product Not Available</h3>
        <p>The requested product could not be found.</p>
        <a href="products.html" class="btn">Browse All Products</a>
      </div>
    `;
    return;
  }

  // Render product details
  container.innerHTML = `
    <div class="product-detail-grid">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      
      <div class="product-info">
        <h1>${product.name}</h1>
        
        <div class="price-section">
          <span class="current-price">₹${product.priceINR.toLocaleString('en-IN')}</span>
          ${product.priceUSD ? `<span class="usd-price">($${product.priceUSD.toLocaleString('en-US')})</span>` : ''}
        </div>
        
        ${product.rating ? `
        <div class="rating">
          ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
          ${product.rating % 1 ? '.5' : ''}
        </div>
        ` : ''}
        
        <div class="description">
          <h3>Description</h3>
          <p>${product.description}</p>
        </div>
        
        ${product.features?.length ? `
        <div class="features">
          <h3>Features</h3>
          <ul>
            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        ` : ''}
        
        <div class="action-buttons">
          <a href="${product.link || 'javascript:void(0)'}" 
             class="buy-btn" 
             ${product.link ? 'target="_blank"' : ''}
             ${!product.link ? 'style="opacity:0.7; cursor:not-allowed"' : ''}>
            ${product.link ? 'Buy Now' : 'Out of Stock'}
          </a>
          <a href="products.html" class="secondary-btn">Back to Products</a>
        </div>
      </div>
    </div>
  `;
});
 <!-- Scripts -->
  <script src="data.js"></script>
  <script src="product.js"></script>
</body>
</html>
