document.addEventListener("DOMContentLoaded", () => {
  const productId = getQueryParam("id");
  const product = getProductById(productId);

  if (!product) {
    document.querySelector("#product-detail").innerHTML = "<p>Product not found.</p>";
    return;
  }

  renderProductDetail(product);
  setupCurrencyToggleButton("#currency-btn");
  document.addEventListener("currencyChanged", () => renderProductDetail(product));
});

// ✅ Render Product Details
function renderProductDetail(product) {
  const container = document.querySelector("#product-detail");

  container.innerHTML = `
    <div class="product-detail-container">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-info">
        <h1>${product.name}</h1>
        <p class="price">${formatPrice(product)}</p>
        <p class="desc">${product.description}</p>
        <a href="${getAffiliateLink(product)}" target="_blank" class="btn buy-btn">
          Buy Now
        </a>
      </div>
    </div>
  `;
}
