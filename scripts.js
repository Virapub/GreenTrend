function renderProducts(productsToShow, containerId) {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    grid.innerHTML = "";
    productsToShow.forEach(prod => {
        const card = document.createElement('div');
        card.className = "product-card";

        // Badge
        if (prod.badge) {
            const badge = document.createElement('span');
            badge.className = "product-badge";
            badge.textContent = prod.badge;
            card.appendChild(badge);
        }

        // Wishlist button
        const wishBtn = document.createElement('button');
        wishBtn.className = "wishlist-btn";
        wishBtn.setAttribute("aria-label", "Add to wishlist");
        wishBtn.innerHTML = isWishlisted(prod.title)
            ? `<i class="fa-solid fa-heart"></i>`
            : `<i class="fa-regular fa-heart"></i>`;
        if (isWishlisted(prod.title)) {
            wishBtn.classList.add("active");
        }
        wishBtn.onclick = () => toggleWishlist(prod.title, wishBtn);
        card.appendChild(wishBtn);

        // Image
        const img = document.createElement('img');
        img.src = prod.image;
        img.alt = prod.title;
        img.className = "product-image";
        card.appendChild(img);

        // Title
        const title = document.createElement('div');
        title.className = "product-title";
        title.textContent = prod.title;
        card.appendChild(title);

        // Ratings
        if (prod.rating) {
            const rating = document.createElement('div');
            rating.className = "product-rating";
            rating.innerHTML = `⭐ ${prod.rating} <span style="color:#888;">(${prod.reviews})</span>`;
            card.appendChild(rating);
        }

        // Prices
        const priceRow = document.createElement('div');
        priceRow.className = "price-row";
        const inrPrice = document.createElement('span');
        inrPrice.className = "price-label";
        inrPrice.textContent = `₹${prod.priceINR}`;
        const usdPrice = document.createElement('span');
        usdPrice.className = "price-label";
        usdPrice.textContent = `$${prod.priceUSD}`;
        priceRow.appendChild(inrPrice);
        priceRow.appendChild(usdPrice);
        card.appendChild(priceRow);

        // Product Details Button (instead of Buy for India/US)
        const detailsBtn = document.createElement('a');
        detailsBtn.className = "buy-now-btn";
        detailsBtn.textContent = "Product Details";
        // Encode product title for URL
        detailsBtn.href = `product-detail.html?product=${encodeURIComponent(prod.title)}`;
        detailsBtn.style.textAlign = "center";
        // Open in same tab
        card.appendChild(detailsBtn);

        grid.appendChild(card);
    });
}
