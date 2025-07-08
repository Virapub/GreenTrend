const products = [
  {
    id: "collapsible-electric-kettle",
    name: "Collapsible Electric Kettle",
    description: "Space-saving collapsible kettle with auto shut-off and boil-dry protection, perfect for travel or small kitchens.",
    priceINR: 1499,
    priceUSD: 17.51,
    category: "Appliances",
    link: "https://amzn.to/448SSZx", // IMPORTANT: Verify this Amazon link is correct and active.
    image: "https://m.media-amazon.com/images/I/61WQVNM0LCL._SL1500_.jpg", // Consider optimizing image size/format for web performance.
    rating: 4.5,
    features: ["Collapsible design for portability", "800W rapid boil power", "BPA-free food-grade silicone", "Auto shut-off & boil-dry protection"]
  },
  {
    id: "automatic-soap-dispenser",
    name: "Automatic Soap Dispenser",
    description: "Touchless soap dispenser with infrared sensor for hygienic, hands-free operation. Ideal for kitchen or bathroom.",
    priceINR: 1388,
    priceUSD: 16.21,
    category: "Smart Gadgets",
    link: "https://amzn.to/46sLIRc", // IMPORTANT: Verify this Amazon link is correct and active.
    image: "https://m.media-amazon.com/images/I/61Vqx4KEHuL._SL1024_.jpg", // Consider optimizing image size/format for web performance.
    rating: 4.2,
    features: ["Touchless operation for germ-free use", "Adjustable soap volume (3 levels)", "Battery-powered (AA batteries)", "Sleek and modern design"]
  },
  {
    id: "magnetic-fridge-shelf",
    name: "Magnetic Fridge Shelf Rack",
    description: "Multi-purpose magnetic storage organizer that attaches easily to your refrigerator, saving counter space.",
    priceINR: 1199,
    priceUSD: 14.00,
    category: "Storage",
    link: "https://amzn.to/44rEZEO", // IMPORTANT: Verify this Amazon link is correct and active.
    image: "https://m.media-amazon.com/images/I/81gCEjDOpSL._SL1500_.jpg", // Consider optimizing image size/format for web performance.
    rating: 4.3,
    features: ["Strong magnetic back for secure hold", "Multi-tier design for various items", "Durable carbon steel construction", "Easy to install and reposition"]
  },
  {
    id: "mini-food-chopper",
    name: "Mini Electric Food Chopper",
    description: "Compact and powerful wireless food chopper for garlic, ginger, chilies, and small quantities of vegetables.",
    priceINR: 999,
    priceUSD: 11.67,
    category: "Appliances",
    link: "https://amzn.to/your-mini-chopper-link", // IMPORTANT: Replace with your actual Amazon affiliate link.
    image: "https://m.media-amazon.com/images/I/71b2k7+vKBL._SL1500_.jpg", // Consider optimizing image size/format for web performance.
    rating: 4.6,
    features: ["USB rechargeable for cordless convenience", "One-button operation for ease of use", "Easy to clean components", "Portable design for small kitchens or travel"]
  },
  {
    id: "digital-kitchen-scale",
    name: "Digital Kitchen Scale",
    description: "High-precision digital scale for accurate measurements of ingredients, perfect for baking and cooking.",
    priceINR: 850,
    priceUSD: 9.93,
    category: "Smart Gadgets",
    link: "https://amzn.to/your-kitchen-scale-link", // IMPORTANT: Replace with your actual Amazon affiliate link.
    image: "https://m.media-amazon.com/images/I/71v-sB1lFmL._SL1500_.jpg", // Consider optimizing image size/format for web performance.
    rating: 4.7,
    features: ["Tare function for zeroing containers", "Multiple unit conversion (g, oz, ml, lb)", "Clear LCD display", "Sleek, slim design for easy storage"]
  },
  {
    id: "instant-pot-duo-7-in-1-electric-pressure-cooker",
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    description: "7-in-1 functionality: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker and warmer. A versatile kitchen essential.",
    priceINR: 6999,
    priceUSD: 85.48,
    category: "Appliances",
    link: "https://amzn.to/3Go8aR6", // IMPORTANT: Verify this Amazon link is correct and active.
    image: "https://m.media-amazon.com/images/I/81SQ-TvA+2L._SL1500.jpg", // Consider optimizing image size/format for web performance.
    rating: 4.6,
    features: [
      "Automatic Keep Warm Setting",
      "Push-button Control Method",
      "Automatic Operation Mode",
      "Voltage: 230 Volts (ideal for India)",
      "Stainless Steel Inner Pot"
    ]
   },
  {
    id: "ninja-foodi-8-in-1-digital-air-fryer",
    name: "Ninja Foodi 8-in-1 Digital Air Fryer",
    description: "8-in-1 functionality: Air Fry, Air Roast, Bake, Reheat, Dehydrate, Air Broil, Bagel and Toast. Cook healthier meals with less oil.",
    priceINR: 12999,
    priceUSD: 158.82,
    category: "Appliances",
    link: "https://amzn.to/3Tpn64r", // IMPORTANT: Verify this Amazon link is correct and active.
    image: "https://m.media-amazon.com/images/I/81UnVRZkvbL._SL1500_.jpg", // Consider optimizing image size/format for web performance.
    rating: 4.6,
    features: [
      "Automatic Shut-Off for safety",
      "Powerful 1500 Watts Output",
      "Voltage: 120 Volts (Note: Check for 230V version for India)", // Specific note for India
      "Touch Panel Control Method",
      "Wide Temperature Range: 75°C to 232°C (167°F to 450°F)"
    ]
  },
  {
    id: "ibell-smart-digital-kitchen-scale",
    name: "iBell Smart Digital Kitchen Scale",
    description: "Precision digital kitchen scale with LCD display, measures up to 5kg with 1g accuracy.",
    priceINR: 899,
    priceUSD: 10.98,
    category: "Smart Gadgets", // Changed from 'measuring' for consistency.
    link: "https://amzn.to/4nwJpml", // IMPORTANT: Verify this Amazon link is correct and active.
    image: "https://m.media-amazon.com/images/I/41ZZg0CayBL.jpg", // Consider optimizing image size/format for web performance.
    rating: 4.2,
    features: [
      "Portable design",
      "LCD display",
      "Weight Capacity: 5 Kilograms (corrected from 0.2kg based on description)",
      "Form Factor: Mini",
      "High Readout Accuracy: 1g", // Clarified accuracy
      "Type: Counter Scale",
      "Measurement Type: Weight"
    ]
  },
  {
    id: "wonderchef-nutri-blend-400w-mixer-grinder",
    name: "Wonderchef Nutri-Blend 400W Mixer Grinder",
    description: "High performance mixer grinder with 400W motor, 3 stainless steel jars and 2 years warranty.",
    priceINR: 3499,
    priceUSD: 42.75,
    category: "Appliances", // Changed from 'blenders' for consistency.
    link: "https://amzn.to/45ZhPIm", // IMPORTANT: Verify this Amazon link is correct and active.
    image: "https://m.media-amazon.com/images/I/618cVgk6ELL._SL1080_.jpg", // Consider optimizing image size/format for web performance.
    rating: 4.3,
    features: [
      "Preset Blend Modes",
      "6-leaf laser-cut stainless steel blades",
      "Unbreakable jars",
      "Power Source Type: Electric",
      "Wattage: 400 Watts (corrected from 1200W based on title)", // Corrected wattage
      "Number Of Speeds: 4",
      "Voltage: 220 Volts",
      "Controls Type: Push Button"
    ]
  },
  {
    id: "morphy-richards-400-watt-hand-blender",
    name: "Morphy Richards 400-Watt Hand Blender",
    description: "400W powerful motor with 2 speed control, stainless steel blades and whisk attachment.",
    priceINR: 1999,
    priceUSD: 24.42,
    category: "Appliances", // Changed from 'blenders' for consistency.
    link: "https://amzn.to/4eC6HTT", // IMPORTANT: Verify this Amazon link is correct and active.
    image: "https://m.media-amazon.com/images/I/61LRXlumFTL._SL1200_.jpg", // Consider optimizing image size/format for web performance.
    rating: 4.1,
    features: [
      "Power Source Type: Corded Electric",
      "Wattage: 400 Watts (corrected from 1500W based on title)", // Corrected wattage
      "2-speed control",
      "Stainless steel blades",
      "Whisk attachment"
    ]
  }
];
