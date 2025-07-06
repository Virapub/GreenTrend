window.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const searchBox = document.getElementById("searchBox");

  function displayProducts(productsToShow) {
    productList.innerHTML = "";
    productsToShow.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">₹${product.priceINR.toLocaleString()}</p>
        <a href="product.html?id=${product.id}" class="buy-btn">View Details</a>
      `;
      productList.appendChild(card);
    });
  }

  displayProducts(products);

  if (searchBox) {
    searchBox.addEventListener("input", () => {
      const query = searchBox.value.toLowerCase();
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
      displayProducts(filtered);
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  toggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });
});
