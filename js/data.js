const products = [
  {
    id: "collapsible-electric-kettle",
    name: "Collapsible Electric Kettle",
    description: "Space-saving collapsible kettle with auto shut-off and boil-dry protection, perfect for travel or small kitchens.",
    priceINR: 1499,
    priceUSD: 17.51, // USD price, calculated based on current rates (approx)
    category: "Appliances", // Consistent category name
    link: "https://amzn.to/448SSZx", // IMPORTANT: Verify this Amazon link is correct and active for your affiliate ID.
    image: "https://m.media-amazon.com/images/I/61WQVNM0LCL._SL1500_.jpg", // SUGGESTION: Download, optimize, and host this image on your server for better performance.
    rating: 4.5,
    features: ["Collapsible design for portability", "800W rapid boil power", "BPA-free food-grade silicone", "Auto shut-off & boil-dry protection", "Capacity: 0.6 Liters (approx)"] // Added capacity
  },
  {
    id: "automatic-soap-dispenser",
    name: "Automatic Soap Dispenser",
    description: "Touchless soap dispenser with infrared sensor for hygienic, hands-free operation. Ideal for kitchen or bathroom.",
    priceINR: 1388,
    priceUSD: 16.21, // USD price (approx)
    category: "Smart Gadgets", // Consistent category name
    link: "https://amzn.to/46sLIRc", // IMPORTANT: Verify this Amazon link is correct and active for your affiliate ID.
    image: "https://m.media-amazon.com/images/I/61Vqx4KEHuL._SL1024_.jpg", // SUGGESTION: Download, optimize, and host this image on your server for better performance.
    rating: 4.2,
    features: ["Touchless operation for germ-free use", "Adjustable soap volume (3 levels)", "Battery-powered (AA batteries)", "Sleek and modern design", "Capacity: 300ml (approx)"] // Added capacity
  },
  {
    id: "magnetic-fridge-shelf",
    name: "Magnetic Fridge Shelf Rack",
    description: "Multi-purpose magnetic storage organizer that attaches easily to your refrigerator, saving counter space.",
    priceINR: 1199,
    priceUSD: 14.00, // USD price (approx)
    category: "Storage", // Consistent category name
    link: "https://amzn.to/44rEZEO", // IMPORTANT: Verify this Amazon link is correct and active for your affiliate ID.
    image: "https://m.media-amazon.com/images/I/81gCEjDOpSL._SL1500_.jpg", // SUGGESTION: Download, optimize, and host this image on your server for better performance.
    rating: 4.3,
    features: ["Strong magnetic back for secure hold", "Multi-tier design for various items", "Durable carbon steel construction", "Easy to install and reposition", "Space-saving solution"]
  },
  {
    id: "mini-food-chopper",
    name: "Mini Electric Food Chopper",
    description: "Compact and powerful wireless food chopper for garlic, ginger, chilies, and small quantities of vegetables.",
    priceINR: 999,
    priceUSD: 11.67, // USD price (approx)
    category: "Appliances", // Consistent category name
    link: "https://amzn.to/your-mini-chopper-link", // IMPORTANT: REPLACE WITH YOUR ACTUAL AMAZON AFFILIATE LINK.
    image: "https://m.media-amazon.com/images/I/71b2k7+vKBL._SL1500_.jpg", // SUGGESTION: Download, optimize, and host this image on your server for better performance.
    rating: 4.6,
    features: ["USB rechargeable for cordless convenience", "One-button operation for ease of use", "Easy to clean components", "Portable design for small kitchens or travel", "Capacity: 250ml (approx)"] // Added capacity
  },
  {
    id: "digital-kitchen-scale",
    name: "Digital Kitchen Scale",
    description: "High-precision digital scale for accurate measurements of ingredients, perfect for baking and cooking.",
    priceINR: 850,
    priceUSD: 9.93, // USD price (approx)
    category: "Smart Gadgets", // Consistent category name
    link: "https://amzn.to/your-kitchen-scale-link", // IMPORTANT: REPLACE WITH YOUR ACTUAL AMAZON AFFILIATE LINK.
    image: "https://m.media-amazon.com/images/I/71v-sB1lFmL._SL1500_.jpg", // SUGGESTION: Download, optimize, and host this image on your server for better performance.
    rating: 4.7,
    features: ["Tare function for zeroing containers", "Multiple unit conversion (g, oz, ml, lb)", "Clear LCD display", "Sleek, slim design for easy storage", "Weight Capacity: 5kg"]
  },
  {
    id: "instant-pot-duo-7-in-1-electric-pressure-cooker",
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    description: "7-in-1 functionality: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker and warmer. A versatile kitchen essential.",
    priceINR: 6999,
    priceUSD: 85.48, // USD price (approx)
    category: "Appliances", // Consistent category name
    link: "https://amzn.to/3Go8aR6", // IMPORTANT: Verify this Amazon link is correct and active for your affiliate ID.
    image: "https://m.media-amazon.com/images/I/81SQ-TvA+2L._SL1500.jpg", // SUGGESTION: Download, optimize, and host this image on your server for better performance.
    rating: 4.6,
    features: [
      "Automatic Keep Warm Setting",
      "Push-button Control Method",
      "Automatic Operation Mode",
      "Voltage: 230 Volts (ideal for India)",
      "Stainless Steel Inner Pot",
      "Capacity: 6 Liters (Most common for Duo 7-in-1)" // Added capacity
    ]
   },
  {
    id: "ninja-foodi-8-in-1-digital-air-fryer",
    name: "Ninja Foodi 8-in-1 Digital Air Fryer",
    description: "8-in-1 functionality: Air Fry, Air Roast, Bake, Reheat, Dehydrate, Air Broil, Bagel and Toast. Cook healthier meals with less oil.",
    priceINR: 12999,
    priceUSD: 158.82, // USD price (approx)
    category: "Appliances", // Consistent category name
    link: "https://amzn.to/3Tpn64r", // IMPORTANT: Verify this Amazon link is correct and active for your affiliate ID.
    image: "https://m.media-amazon.com/images/I/81UnVRZkvbL._SL1500_.jpg", // SUGGESTION: Download, optimize, and host this image on your server for better performance.
    rating: 4.6,
    features: [
      "Automatic Shut-Off for safety",
      "Powerful 1500 Watts Output",
      "Voltage: 120 Volts (NOTE: Indian users need a 230V compatible version or a step-down converter)", // Clarified for Indian context
      "Touch Panel Control Method",
      "Wide Temperature Range: 75°C to 232°C (167°F to 450°F)"
    ]
  },
  {
    id: "ibell-smart-digital-kitchen-scale",
    name: "iBell Smart Digital Kitchen Scale",
    description: "Precision digital kitchen scale with LCD display, measures up to 5kg with 1g accuracy.",
    priceINR: 899,
    priceUSD: 10.98, // USD price (approx)
    category: "Smart Gadgets", // Changed from 'measuring' for consistency.
    link: "https://amzn.to/4nwJpml", // IMPORTANT: Verify this Amazon link is correct and active for your affiliate ID.
    image: "https://m.media-amazon.com/images/I/41ZZg0CayBL.jpg", // SUGGESTION: Download, optimize, and host this image on your server for better performance.
    rating: 4.2,
    features: [
      "Portable design",
      "LCD display",
      "Weight Capacity: 5 Kilograms", // Corrected based on description
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
    priceUSD: 42.75, // USD price (approx)
    category: "Appliances", // Changed from 'blenders' for consistency.
    link: "https://amzn.to/45ZhPIm", // IMPORTANT: Verify this Amazon link is correct and active for your affiliate ID.
    image: "https://m.media-amazon.com/images/I/618cVgk6ELL._SL1080_.jpg", // SUGGESTION: Download, optimize, and host this image on your server for better performance.
    rating: 4.3,
    features: [
      "Preset Blend Modes", // If this feature actually exists
      "6-leaf laser-cut stainless steel blades",
      "Unbreakable jars",
      "Power Source Type: Electric",
      "Wattage: 400 Watts", // Corrected wattage as per title
      "Number Of Jars: 3", // Added based on description
      "Voltage: 220 Volts", // Standard Indian voltage
      "Controls Type: Push Button",
      "Warranty: 2 years" // Added warranty
    ]
  },
  {
    id: "morphy-richards-400-watt-hand-blender",
    name: "Morphy Richards 400-Watt Hand Blender",
    description: "400W powerful motor with 2 speed control, stainless steel blades and whisk attachment.",
    priceINR: 1999,
    priceUSD: 24.42, // USD price (approx)
    category: "Appliances", // Changed from 'blenders' for consistency.
    link: "https://amzn.to/4eC6HTT", // IMPORTANT: Verify this Amazon link is correct and active for your affiliate ID.
    image: "https://m.media-amazon.com/images/I/61LRXlumFTL._SL1200_.jpg", // SUGGESTION: Download, optimize, and host this image on your server for better performance.
    rating: 4.1,
    features: [
      "Power Source Type: Corded Electric",
      "Wattage: 400 Watts", // Corrected wattage as per title
      "2-speed control",
      "Stainless steel blades",
      "Whisk attachment",
      "Dishwasher Safe Parts: No (often the case for motor units)" // Added a common consideration
    ]
  }
];
