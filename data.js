// ✅ GreenTrend - Professional Data JS

// Category Data
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
    image: 'images/premium.png'
  }
];

// Category Helper Function
function getPriceBasedCategory(priceINR) {
  if (priceINR <= 1999) return 'Low Budget Finds';
  if (priceINR <= 29999) return 'Mid Range Picks';
  return 'Premium Products';
}

// Product Data
const products = [
  {
    id: "collapsible-electric-kettle",
    name: "Collapsible Electric Kettle",
    description: "Compact kettle for travel. BPA-free silicone that collapses for easy storage. 500ml capacity with auto shut-off.",
    image: "images/collapsible-kettle.jpg",
    priceINR: 1199,
    priceUSD: 18.99,
    buyLinkIN: "https://amzn.to/xyz",
    buyLinkUS: "https://amzn.to/abc",
    countryAvailability: "ALL",
    rating: 4.2,
    features: [
      "Collapsible design saves space",
      "BPA-free food-grade silicone",
      "500ml capacity",
      "Auto shut-off and boil-dry protection",
      "Quick boiling in 3-5 minutes"
    ]
  },
  {
    id: "smart-trash-can",
    name: "Smart Motion Sensor Trash Can",
    description: "Touchless lid opening. Hygienic waste disposal with infrared sensor and odor control system.",
    image: "images/smart-trash.jpg",
    priceINR: 2999,
    priceUSD: 35.99,
    buyLinkIN: "https://amzn.to/in-trash",
    buyLinkUS: "https://amzn.to/us-trash",
    countryAvailability: "ALL",
    rating: 4.5,
    features: [
      "Infrared motion sensor",
      "Hands-free operation",
      "Odor control system",
      "12-liter capacity",
      "Battery operated (4 AA batteries)"
    ]
  },
  {
    id: "electric-pooja-diffuser",
    name: "Electric Pooja Diffuser",
    description: "Modern electric diya with fragrance diffuser. Timer function and LED lights.",
    image: "images/pooja-diffuser.jpg",
    priceINR: 899,
    priceUSD: 12.99,
    buyLinkIN: "https://amzn.to/pooja-in",
    buyLinkUS: "https://amzn.to/pooja-us",
    countryAvailability: "ALL",
    rating: 4.0,
    features: [
      "Built-in fragrance diffuser",
      "Timer function (2/4/6 hours)",
      "LED lights with warm glow",
      "Waterless operation",
      "Modern traditional design"
    ]
  },
  {
    id: "3-in-1-breakfast-maker",
    name: "3-in-1 Breakfast Maker",
    description: "Make sandwiches, boil eggs, and brew coffee simultaneously. Saves time and counter space.",
    image: "images/breakfast-maker.jpg",
    priceINR: 2499,
    priceUSD: 29.99,
    buyLinkIN: "https://amzn.to/breakfast-in",
    buyLinkUS: "https://amzn.to/breakfast-us",
    countryAvailability: "ALL",
    rating: 4.3,
    features: [
      "Simultaneous cooking",
      "Non-stick plates",
      "Automatic shut-off",
      "Ready indicator lights",
      "Compact design"
    ]
  },
  {
    id: "automatic-oil-dispenser",
    name: "Automatic Oil Dispenser",
    description: "Touch-free oil dispenser with precise measurement. Prevents spills and waste.",
    image: "images/oil-dispenser.jpg",
    priceINR: 1599,
    priceUSD: 19.99,
    buyLinkIN: "https://amzn.to/oil-in",
    buyLinkUS: "https://amzn.to/oil-us",
    countryAvailability: "ALL",
    rating: 4.1,
    features: [
      "Infrared sensor operation",
      "Adjustable dispensing amount",
      "500ml capacity",
      "Battery powered",
      "Leak-proof design"
    ]
  },
  {
    id: "mini-electric-chopper",
    name: "Mini Electric Chopper",
    description: "Compact food chopper for herbs, nuts, and small quantities. USB rechargeable.",
    image: "images/mini-chopper.jpg",
    priceINR: 799,
    priceUSD: 10.99,
    buyLinkIN: "https://amzn.to/chopper-in",
    buyLinkUS: "https://amzn.to/chopper-us",
    countryAvailability: "ALL",
    rating: 3.9,
    features: [
      "200ml capacity",
      "USB rechargeable",
      "One-touch operation",
      "Dishwasher safe parts",
      "Compact and portable"
    ]
  }
  // Add more products as needed
];

// Featured Products (homepage display)
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
