// Product data (add "badge" property for badges)
// Add these fields in each product for details demo
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
    // Add more products with similar specs and description fields as needed
];

// No change needed for existing rendering functions, as product-detail page loads directly from this array.

let currentCurrency = "INR";

function getCurrency() {
    return currentCurrency;
}

function renderProducts(productsToShow, containerId) {
    const grid = document.getElementById(containerId);
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
        wishBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
        if (isWishlisted(prod.title)) {
            wishBtn.classList.add("active");
            wishBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`;
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

        // Buy Now links
        const buyLinks = document.createElement('div');
        buyLinks.className = "buy-links";
        const buyIN = document.createElement('a');
        buyIN.className = "buy-now-btn";
        buyIN.href = prod.affiliateIN;
        buyIN.target = "_blank";
        buyIN.textContent = "Buy for India";
        const buyUS = document.createElement('a');
        buyUS.className = "buy-now-btn";
        buyUS.href = prod.affiliateUS;
        buyUS.target = "_blank";
        buyUS.textContent = "Buy for US";
        buyLinks.appendChild(buyIN);
        buyLinks.appendChild(buyUS);
        card.appendChild(buyLinks);

        // Show only selected currency (hide other price/link)
        if (getCurrency() === "INR") {
            usdPrice.style.opacity = "0.4";
            buyUS.style.display = "none";
            buyIN.style.display = "inline-block";
        } else {
            inrPrice.style.opacity = "0.4";
            buyIN.style.display = "none";
            buyUS.style.display = "inline-block";
        }

        grid.appendChild(card);
    });
}

function updateFeaturedProducts(filteredCategory = "All") {
    let featured = products.filter(p => p.featured);
    if (filteredCategory !== "All") {
        featured = featured.filter(p => p.category === filteredCategory);
    }
    renderProducts(featured, "featured-products");
}

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

// Currency toggle event
document.addEventListener("DOMContentLoaded", () => {
    // Currency toggle
    document.querySelectorAll('.currency-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.currency-btn').forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentCurrency = btn.dataset.currency;
            updateFeaturedProducts(document.querySelector(".chip.active").dataset.category);
        };
        if (btn.dataset.currency === currentCurrency) btn.classList.add("active");
    });

    // Auto-detect country using browser language
    const lang = navigator.language || navigator.userLanguage;
    if (lang && lang.endsWith("IN")) {
        currentCurrency = "INR";
    } else if (lang && lang.endsWith("US")) {
        currentCurrency = "USD";
    }

    // Hero carousel (simple)
    let carouselIdx = 0;
    const imgs = document.querySelectorAll('.carousel-img');
    setInterval(() => {
        imgs.forEach((img, i) => img.classList.toggle('active', i === carouselIdx));
        carouselIdx = (carouselIdx + 1) % imgs.length;
    }, 3500);

    // Mobile nav toggle
    const navToggle = document.getElementById("navToggle");
    navToggle.onclick = () => {
        document.querySelector(".nav-list").classList.toggle("mobile-active");
    };

    // Category chips
    document.querySelectorAll(".chip").forEach(chip => {
        chip.onclick = () => {
            document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            updateFeaturedProducts(chip.dataset.category);
        };
    });

    // Initial render
    updateFeaturedProducts();
});
