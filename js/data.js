// data.js
const products = [
  {
    id: "1",
    name: "Bamboo Utensil Set",
    price: { INR: 999, USD: 12 },
    image: "images/utensils.jpg",
    category: "Low Budget",
    description: "Sustainable bamboo utensils for everyday use.",
    rating: 3.8,
    features: ["100% natural bamboo", "Ergonomic design", "Dishwasher safe"],
    buyLinkIN: "https://example.com/buy-utensils-inr",
    buyLinkUS: "https://example.com/buy-utensils-usd"
  },
  {
    id: "2",
    name: "Solar-Powered Kettle",
    price: { INR: 2999, USD: 36 },
    image: "images/kettle.jpg",
    category: "Mid-Range",
    description: "Eco-friendly kettle powered by solar energy.",
    rating: 4.2,
    features: ["Solar charging", "Fast boil technology", "Sleek design"],
    buyLinkIN: "https://example.com/buy-kettle-inr",
    buyLinkUS: "https://example.com/buy-kettle-usd"
  },
  {
    id: "3",
    name: "Smart Eco Blender",
    price: { INR: 4999, USD: 60 },
    image: "images/blender.jpg",
    category: "Premium",
    description: "Energy-efficient blender with smart controls.",
    rating: 4.5,
    features: ["Variable speed control", "Eco-friendly materials", "Smart app integration"],
    buyLinkIN: "https://example.com/buy-blender-inr",
    buyLinkUS: "https://example.com/buy-blender-usd"
  }
];

const categories = [
  { name: "Low Budget", image: "images/low-budget.jpg" },
  { name: "Mid-Range", image: "images/mid-range.jpg" },
  { name: "Premium", image: "images/premium.jpg" }
];
