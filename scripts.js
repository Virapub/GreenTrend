// --- Product Data ---
const products = [
    {
        title: "Smart Electric Kettle",
        image: "https://images-na.ssl-images-amazon.com/images/I/71ie6vWckhL._AC_SL1500_.jpg",
        priceINR: 2499,
        priceUSD: 29.99,
        affiliateIN: "https://www.amazon.in/dp/B07XY7Q6N6/?tag=yourtag-21",
        affiliateUS: "https://www.amazon.com/dp/B07XY7Q6N6/?tag=yourtag-20",
        category: "Low Budget Finds",
        featured: true,
        badge: "Best Seller",
        rating: 4.6,
        reviews: 31,
        specs: [
            "Material: Stainless Steel & BPA Free Plastic",
            "Capacity: 1.7 Liters",
            "Connectivity: WiFi Enabled",
            "Warranty: 1 Year",
            "Auto Shut-off: Yes"
        ],
        description: "This smart electric kettle boils water quickly with WiFi-enabled controls. Use your phone to set the temperature, enjoy auto shut-off and child lock features. Perfect for modern kitchens and safe for families."
    },
    {
        title: "Automatic Roti Maker",
        image: "https://images-na.ssl-images-amazon.com/images/I/81WbGd+BbXL._AC_SL1500_.jpg",
        priceINR: 5999,
        priceUSD: 72.99,
        affiliateIN: "https://www.amazon.in/dp/B08FZ8FH5K/?tag=yourtag-21",
        affiliateUS: "https://www.amazon.com/dp/B08FZ8FH5K/?tag=yourtag-20",
        category: "Mid Range Picks",
        featured: true,
        badge: "Deal",
        rating: 4.3,
        reviews: 18,
        specs: [
            "Material: Non-Stick Ceramic Plate",
            "Auto Press & Cook: Yes",
            "Size: 10 inch Diameter",
            "Warranty: 2 Years",
            "Voltage: 220V/110V"
        ],
        description: "Make perfect rotis in seconds! This automatic roti maker saves you time and effort with its non-stick plate and auto-press features. Ideal for Indian kitchens and busy families."
    },
    {
        title: "Smart WiFi Air Fryer",
        image: "https://images-na.ssl-images-amazon.com/images/I/81TfU8vXQkL._AC_SL1500_.jpg",
        priceINR: 10999,
        priceUSD: 129.99,
        affiliateIN: "https://www.amazon.in/dp/B07V3H7J8V/?tag=yourtag-21",
        affiliateUS: "https://www.amazon.com/dp/B07V3H7J8V/?tag=yourtag-20",
        category: "Premium Products",
        featured: true,
        badge: "Premium",
        rating: 4.8,
        reviews: 45,
        specs: [
            "Capacity: 5.5 Liters",
            "Connectivity: WiFi + App Control",
            "Preset Cooking Modes: 12",
            "Warranty: 1 Year",
            "Dishwasher Safe Basket"
        ],
        description: "Fry, bake, grill and roast with this smart air fryer! Control everything from your phone, choose among 12 preset modes, and enjoy healthy oil-free cooking. A must-have for tech-savvy kitchen enthusiasts."
    },
    {
        title: "Mini Blender Portable",
        image: "https://images-na.ssl-images-amazon.com/images/I/71KNSJzH4QL._AC_SL1500_.jpg",
        priceINR: 1399,
        priceUSD: 16.99,
        affiliateIN: "https://www.amazon.in/dp/B08HRW4X7S/?tag=yourtag-21",
        affiliateUS: "https://www.amazon.com/dp/B08HRW4X7S/?tag=yourtag-20",
        category: "Low Budget Finds",
        featured: false,
        badge: "New",
        rating: 4.2,
        reviews: 12,
        specs: [
            "Material: BPA Free Plastic",
            "Capacity: 400ml",
            "Battery: USB Rechargeable",
            "Usage: Smoothies, Juices",
            "Colors: Multiple"
        ],
        description: "Blend your favorite smoothies anywhere! This portable mini blender is lightweight, rechargeable, and safe for travel. Make juices, smoothies, and shakes in seconds."
    }
];

// Wishlist
function isWishlisted(title) {
    const wishes = JSON.parse(localStorage.getItem("wishlist") || "[]");
    return wishes.includes(title);
}
function toggleWishlist(title, btn) {
    let wishes = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (wishes.includes(title)) {
        wishes = wishes.filter(t => t !== title);
        btn.classList.remove("active");
        btn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    } else {
        wishes.push(title);
        btn.classList.add("active");
        btn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    }
    localStorage.setItem("wishlist", JSON.stringify(wishes));
}

// Product List Render
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

        // Product Details Button
        const detailsBtn = document.createElement('a');
        detailsBtn.className = "buy-now-btn";
        detailsBtn.textContent = "Product Details";
        detailsBtn.href = `product-detail.html?product=${encodeURIComponent(prod.title)}`;
        detailsBtn.style.textAlign = "center";
        card.appendChild(detailsBtn);

        grid.appendChild(card);
    });
}

// Category Chips Render and click
function renderCategoryChips(categories, chipContainerId, productsContainerId) {
    const chipContainer = document.getElementById(chipContainerId);
    chipContainer.innerHTML = "";
    const allChip = document.createElement("button");
    allChip.className = "chip active";
    allChip.textContent = "All";
    allChip.onclick = () => {
        document.querySelectorAll('.chip').forEach(c => c.classList.remove("active"));
        allChip.classList.add("active");
        renderProducts(products, productsContainerId);
    };
    chipContainer.appendChild(allChip);

    categories.forEach(cat => {
        const chip = document.createElement("button");
        chip.className = "chip";
        chip.textContent = cat;
        chip.onclick = () => {
            document.querySelectorAll('.chip').forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            renderProducts(products.filter(p => p.category === cat), productsContainerId);
        };
        chipContainer.appendChild(chip);
    });
}

// Hamburger menu, category dropdown logic
document.addEventListener("DOMContentLoaded", () => {
    // Hamburger mobile nav
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    navToggle && navToggle.addEventListener("click", () => {
        navList.classList.toggle("mobile-active");
    });

    // Category dropdown
    document.querySelectorAll('.has-dropdown > a').forEach(drop => {
        drop.onclick = (e) => {
            e.preventDefault();
            const parent = drop.parentElement;
            document.querySelectorAll('.has-dropdown').forEach(d => {
                if (d !== parent) d.classList.remove("open");
            });
            parent.classList.toggle("open");
        };
    });

    // Category chips (if element exists)
    const chipContainer = document.getElementById("category-chips");
    const productsContainerId = "all-products";
    if (chipContainer) {
        const categories = [...new Set(products.map(p => p.category))];
        renderCategoryChips(categories, "category-chips", productsContainerId);
    }

    // Initial products render
    if (document.getElementById(productsContainerId)) {
        renderProducts(products, productsContainerId);
    }

    // Currency toggle
    document.querySelectorAll('input[name="currency"]').forEach(input => {
        input.addEventListener("change", () => renderProducts(
            document.querySelector(".chip.active")?.textContent === "All"
                ? products
                : products.filter(p => p.category === document.querySelector(".chip.active").textContent),
            productsContainerId
        ));
    });
});
