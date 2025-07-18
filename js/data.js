// ✅ Categories
const categories = [
  {
    id: "low-budget",
    name: "Low Budget Finds",
    image: "images/low-budget.png"
  },
  {
    id: "mid-range",
    name: "Mid Range Picks",
    image: "images/mid-range.png"
  },
  {
    id: "premium-products",
    name: "Premium Products",
    image: "images/premium.png"
  }
];

// ✅ Products
const products = [
  {
    id: "electric-kettle",
    name: "Portable Electric Kettle",
    priceINR: 1799,
    priceUSD: 21.99,
    image: "images/electric-kettle.jpg",
    category: "low-budget",
    features: ["Boils in 5 mins", "Auto Shutoff", "Compact Travel Size"],
    affiliateLinkIN: "https://amzn.to/IN-kettle",
    affiliateLinkUS: "https://amazon.com/dp/US-kettle"
  },
  {
    id: "auto-stirrer",
    name: "Automatic Pan Stirrer",
    priceINR: 2999,
    priceUSD: 34.99,
    image: "images/auto-stirrer.jpg",
    category: "mid-range",
    features: ["USB Rechargeable", "3 Speed Modes", "Non-Stick Safe"],
    affiliateLinkIN: "https://amzn.to/IN-stirrer",
    affiliateLinkUS: "https://amazon.com/dp/US-stirrer"
  },
  {
    id: "smart-dispenser",
    name: "Smart Soap Dispenser",
    priceINR: 5999,
    priceUSD: 69.99,
    image: "images/smart-dispenser.jpg",
    category: "premium-products",
    features: ["Touchless", "Infrared Sensor", "USB Rechargeable"],
    affiliateLinkIN: "https://amzn.to/IN-dispenser",
    affiliateLinkUS: "https://amazon.com/dp/US-dispenser"
  }
];

// ✅ Featured Products (pick by ID)
const featuredProductIDs = ["electric-kettle", "auto-stirrer"];
