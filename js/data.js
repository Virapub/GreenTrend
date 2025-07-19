// Product data structure
// You can extend this array with real products and affiliate links
const PRODUCTS = [
  {
    id: "smart-blender-01",
    title: "Smart Blender Pro",
    description: "A powerful smart blender with app connectivity and multiple pre-set modes.",
    images: ["assets/blender1.jpg", "assets/blender2.jpg"],
    priceINR: 5999,
    priceUSD: 79,
    affiliateIN: "https://www.amazon.in/dp/B09XYZ/",
    affiliateUS: "https://www.amazon.com/dp/B08XYZ/",
    category: "midrange",
    features: [
      "1200W motor",
      "Bluetooth app control",
      "Stainless steel blades",
      "Self-cleaning mode"
    ],
    tags: ["editors", "trending"]
  },
  {
    id: "smart-scale-02",
    title: "WiFi Kitchen Scale",
    description: "Track your ingredients with instant syncing to your smartphone.",
    images: ["assets/scale1.jpg"],
    priceINR: 2499,
    priceUSD: 39,
    affiliateIN: "https://www.amazon.in/dp/B08ABC/",
    affiliateUS: "https://www.amazon.com/dp/B07ABC/",
    category: "budget",
    features: [
      "WiFi + Bluetooth",
      "Mobile app integration",
      "Precision sensors"
    ],
    tags: ["new"]
  }
  // Add more products here...
];
