// ✅ GreenTrend - data.js

// --- Category Data ---
const categories = [
  {
    id: 'cat-low-price',
    name: 'Low Budget Finds',
    slug: 'low-budget',
    image: 'images/low-budget.png'
  },
  {
    id: 'cat-mid-price',
    name: 'Mid Range Picks',
    slug: 'mid-range',
    image: 'images/mid-range.png'
  },
  {
    id: 'cat-high-price',
    name: 'Premium Products',
    slug: 'premium',
    image: 'images/cat-premium.png'
  }
];

// --- Category Helper Function ---
function getPriceBasedCategory(priceINR) {
  if (priceINR <= 1999) return 'Low Budget Finds';
  if (priceINR <= 29999) return 'Mid Range Picks';
  return 'Premium Products';
}

// --- Product Data (short demo, tu "..." jagah pe baaki products paste kare) ---
const products = [
  {
    id: "collapsible-electric-kettle",
    name: "Collapsible Electric Kettle",
    description: "Compact kettle for travel. BPA-free silicone.",
    image: "images/collapsible-kettle.jpg",
    priceINR: 1199,
    priceUSD: 18.99,
    buyLinkIN: "https://amzn.to/xyz",
    buyLinkUS: "https://amzn.to/abc",
    countryAvailability: "ALL"
  },
  {
    id: "smart-trash-can",
    name: "Smart Motion Sensor Trash Can",
    description: "Touchless lid opening. Hygienic waste disposal.",
    image: "images/smart-trash.jpg",
    priceINR: 2999,
    priceUSD: 35.99,
    buyLinkIN: "https://amzn.to/in-trash",
    buyLinkUS: "https://amzn.to/us-trash",
    countryAvailability: "ALL"
  },
  // ... (baaki 30 products tu paste kar)
];

// --- Featured Products (homepage display) ---
const featuredProducts = products.filter(product =>
  [
    "collapsible-electric-kettle",
    "smart-trash-can",
    "electric-pooja-diffuser",
    "3-in-1-breakfast-maker",
    "automatic-oil-dispenser",
    "mini-electric-chopper"
  ].includes(product.id)
);
