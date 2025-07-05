window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  const product = products.find(p => p.id === productId);
  const container = document.getElementById("product-details");

const allProductsButton = document.createElement("a");
allProductsButton.href = "products.html";
allProductsButton.style.display = "inline-block";
allProductsButton.style.marginTop = "10px";

const allBtn = document.createElement("button");
allBtn.textContent = "← All Products";
allBtn.style.backgroundColor = "#6c757d";
allBtn.style.color = "#fff";
allBtn.style.border = "none";
allBtn.style.padding = "10px 20px";
allBtn.style.borderRadius = "5px";
allBtn.style.cursor = "pointer";
allBtn.style.fontWeight = "bold";

allProductsButton.appendChild(allBtn);
productCard.appendChild(allProductsButton);
  
  if (!product) {
    container.innerHTML = "<p>Product not found.</p>";
    return;
  }

  container.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="price">Price: ₹${product.priceINR} / $${product.priceUSD}</p>
    <p>${product.description}</p>
    <ul>
      ${product.features.map(feature => `<li>${feature}</li>`).join("")}
    </ul>
    <a href="${product.link}" class="buy-btn" target="_blank">Buy Now</a>
    </div>
  </div>
    <p>Rating: ${"★".repeat(Math.round(product.rating))}${".5".repeat(product.rating % 1 ? 1 : 0)}</p>
  `;
});
