// js/data.js - CORRECTED: All original fields (priceINR, priceUSD, link) are present,
//              plus 'details' field and suggested local image paths.

// --- Categories Data (Derived from your product categories for consistency) ---
// These are used for rendering category cards and filtering products
const categories = [
    {
        id: 'cat-appliances', // Unique ID for internal use
        name: 'Appliances', // Display name
        slug: 'appliances', // URL-friendly slug
        image: 'images/categories/kitchen-appliances.jpg' // Example image for this category (ensure this image exists)
    },
    {
        id: 'cat-smart-gadgets',
        name: 'Smart Gadgets',
        slug: 'smart-gadgets',
        image: 'images/categories/smart-gadgets.jpg' // Example image (ensure this image exists)
    },
    {
        id: 'cat-storage',
        name: 'Storage',
        slug: 'storage',
        image: 'images/categories/food-storage.jpg' // Example image (ensure this image exists)
    },
    // Add other categories if you introduce more products with new categories
];


// --- Products Data (Now correctly includes priceINR, priceUSD, and link as originally provided, plus details & local image paths) ---
const products = [
  {
    id: "collapsible-electric-kettle",
    name: "Collapsible Electric Kettle",
    description: "Space-saving collapsible kettle with auto shut-off and boil-dry protection, perfect for travel or small kitchens.",
    priceINR: 1499,
    priceUSD: 17.51, // USD price, calculated based on current rates (approx)
    category: "Appliances",
    link: "https://amzn.to/448SSZx", // CORRECT: Amazon affiliate link is here
    image: "images/products/collapsible-electric-kettle.jpg", // SUGGESTION: Download and host locally!
    rating: 4.5,
    features: ["Collapsible design for portability", "800W rapid boil power", "BPA-free food-grade silicone", "Auto shut-off & boil-dry protection", "Capacity: 0.6 Liters (approx)"],
    details: "This innovative collapsible electric kettle is designed for convenience and portability. Its compact size makes it ideal for travel, camping, or small apartments. Made with food-grade silicone, it's safe and durable. Features include fast boiling, automatic shut-off when water boils, and boil-dry protection for safety. A must-have for modern kitchens and travelers alike!" // Added a 'details' field for longer description on product-detail page
  },
  {
    id: "automatic-soap-dispenser",
    name: "Automatic Soap Dispenser",
    description: "Touchless soap dispenser with infrared sensor for hygienic, hands-free operation. Ideal for kitchen or bathroom.",
    priceINR: 1388,
    priceUSD: 16.21,
    category: "Smart Gadgets",
    link: "https://amzn.to/46sLIRc", // CORRECT: Amazon affiliate link is here
    image: "images/products/automatic-soap-dispenser.jpg", // SUGGESTION: Download and host locally!
    rating: 4.2,
    features: ["Touchless operation for germ-free use", "Adjustable soap volume (3 levels)", "Battery-powered (AA batteries)", "Sleek and modern design", "Capacity: 300ml (approx)"],
    details: "Enhance hygiene in your kitchen or bathroom with this automatic soap dispenser. Its infrared motion sensor ensures a touch-free experience, reducing germ spread. You can easily adjust the dispensed soap volume to your preference. The modern design seamlessly integrates with any decor. Perfect for homes, offices, and public restrooms."
  },
  {
    id: "magnetic-fridge-shelf",
    name: "Magnetic Fridge Shelf Rack",
    description: "Multi-purpose magnetic storage organizer that attaches easily to your refrigerator, saving counter space.",
    priceINR: 1199,
    priceUSD: 14.00,
    category: "Storage",
    link: "https://amzn.to/44rEZEO", // CORRECT: Amazon affiliate link is here
    image: "images/products/magnetic-fridge-shelf.jpg", // SUGGESTION: Download and host locally!
    rating: 4.3,
    features: ["Strong magnetic back for secure hold", "Multi-tier design for various items", "Durable carbon steel construction", "Easy to install and reposition", "Space-saving solution"],
    details: "Maximize your kitchen space with this magnetic fridge shelf rack. Its powerful magnets provide a secure hold on your refrigerator, eliminating the need for drilling. The multi-tiered design is perfect for spices, condiments, paper towels, or small kitchen tools, keeping your countertops clutter-free and organized. Made of durable carbon steel for long-lasting use."
  },
  {
    id: "mini-food-chopper",
    name: "Mini Electric Food Chopper",
    description: "Compact and powerful wireless food chopper for garlic, ginger, chilies, and small quantities of vegetables.",
    priceINR: 999,
    priceUSD: 11.67,
    category: "Appliances",
    link: "https://amzn.to/44k5wVJ", // CORRECT: Amazon affiliate link is here
    image: "images/products/mini-food-chopper.jpg", // SUGGESTION: Download and host locally!
    rating: 4.6,
    features: ["USB rechargeable for cordless convenience", "One-button operation for ease of use", "Easy to clean components", "Portable design for small kitchens or travel", "Capacity: 250ml (approx)"],
    details: "This mini electric food chopper is your perfect companion for quick meal prep. Its cordless, USB rechargeable design offers ultimate convenience. Ideal for chopping garlic, onions, ginger, chilies, and even small amounts of baby food. The powerful motor ensures efficient chopping with a single button press. A compact solution for all your chopping needs."
  },
  {
    id: "digital-kitchen-scale",
    name: "Digital Kitchen Scale",
    description: "High-precision digital scale for accurate measurements of ingredients, perfect for baking and cooking.",
    priceINR: 850,
    priceUSD: 9.93,
    category: "Smart Gadgets",
    link: "https://amzn.to/3Iffdfu", // CORRECT: Amazon affiliate link is here
    image: "images/products/digital-kitchen-scale.jpg", // SUGGESTION: Download and host locally!
    rating: 4.7,
    features: ["Tare function for zeroing containers", "Multiple unit conversion (g, oz, ml, lb)", "Clear LCD display", "Sleek, slim design for easy storage", "Weight Capacity: 5kg"],
    details: "Achieve culinary precision with this high-precision digital kitchen scale. Its accurate sensors ensure perfect measurements for baking, cooking, and portion control. The tare function allows you to weigh ingredients directly in your bowl, and the multiple unit conversion makes it versatile for all recipes. Slim design for easy storage and a clear LCD for easy reading."
  },
  {
    id: "instant-pot-duo-7-in-1-electric-pressure-cooker",
    name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
    description: "7-in-1 functionality: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker and warmer. A versatile kitchen essential.",
    priceINR: 6999,
    priceUSD: 85.48,
    category: "Appliances",
    link: "https://amzn.to/3Go8aR6", // CORRECT: Amazon affiliate link is here
    image: "images/products/instant-pot-duo-7-in-1-electric-pressure-cooker.jpg", // SUGGESTION: Download and host locally!
    rating: 4.6,
    features: [
      "Automatic Keep Warm Setting",
      "Push-button Control Method",
      "Automatic Operation Mode",
      "Voltage: 230 Volts (ideal for India)",
      "Stainless Steel Inner Pot",
      "Capacity: 6 Liters (Most common for Duo 7-in-1)"
    ],
    details: "The Instant Pot Duo is a revolutionary kitchen appliance combining 7 functions in one. It acts as a pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and food warmer. With smart programs and a user-friendly interface, cooking healthy and delicious meals has never been easier. Its 6-liter capacity is perfect for families, making meal prep a breeze."
   },
  {
    id: "ninja-foodi-8-in-1-digital-air-fryer",
    name: "Ninja Foodi 8-in-1 Digital Air Fryer",
    description: "8-in-1 functionality: Air Fry, Air Roast, Bake, Reheat, Dehydrate, Air Broil, Bagel and Toast. Cook healthier meals with less oil.",
    priceINR: 12999,
    priceUSD: 158.82,
    category: "Appliances",
    link: "https://amzn.to/3Tpn64r", // CORRECT: Amazon affiliate link is here
    image: "images/products/ninja-foodi-8-in-1-digital-air-fryer.jpg", // SUGGESTION: Download and host locally!
    rating: 4.6,
    features: [
      "Automatic Shut-Off for safety",
      "Powerful 1500 Watts Output",
      "Voltage: 120 Volts (NOTE: Indian users need a 230V compatible version or a step-down converter)",
      "Touch Panel Control Method",
      "Wide Temperature Range: 75°C to 232°C (167°F to 450°F)"
    ],
    details: "Experience healthier cooking with the Ninja Foodi 8-in-1 Digital Air Fryer. This versatile appliance allows you to air fry, roast, bake, reheat, dehydrate, air broil, and even prepare bagels and toast. Its powerful circulation technology ensures crispy results with little to no oil. The digital controls offer precise temperature and time settings for perfect cooking every time, making healthy meals accessible."
  },
  {
    id: "ibell-smart-digital-kitchen-scale",
    name: "iBell Smart Digital Kitchen Scale",
    description: "Precision digital kitchen scale with LCD display, measures up to 5kg with 1g accuracy.",
    priceINR: 899,
    priceUSD: 10.98,
    category: "Smart Gadgets",
    link: "https://amzn.to/4nwJpml", // CORRECT: Amazon affiliate link is here
    image: "images/products/ibell-smart-digital-kitchen-scale.jpg", // SUGGESTION: Download and host locally!
    rating: 4.2,
    features: [
      "Portable design",
      "LCD display",
      "Weight Capacity: 5 Kilograms",
      "Form Factor: Mini",
      "High Readout Accuracy: 1g",
      "Type: Counter Scale",
      "Measurement Type: Weight"
    ],
    details: "The iBell Smart Digital Kitchen Scale provides accurate and consistent measurements for all your cooking and baking needs. Featuring a clear LCD display, it's easy to read. Its compact and portable design makes it convenient for any kitchen size, and the 1g accuracy ensures precision for even the most delicate recipes. Max capacity 5kg, ideal for precise measurements."
  },
  {
    id: "wonderchef-nutri-blend-400w-mixer-grinder",
    name: "Wonderchef Nutri-Blend 400W Mixer Grinder",
    description: "High performance mixer grinder with 400W motor, 3 stainless steel jars and 2 years warranty.",
    priceINR: 3499,
    priceUSD: 42.75,
    category: "Appliances",
    link: "https://amzn.to/45ZhPIm", // CORRECT: Amazon affiliate link is here
    image: "images/products/wonderchef-nutri-blend-400w-mixer-grinder.jpg", // SUGGESTION: Download and host locally!
    rating: 4.3,
    features: [
      "Preset Blend Modes",
      "6-leaf laser-cut stainless steel blades",
      "Unbreakable jars",
      "Power Source Type: Electric",
      "Wattage: 400 Watts",
      "Number Of Jars: 3",
      "Voltage: 220 Volts",
      "Controls Type: Push Button",
      "Warranty: 2 years"
    ],
    details: "The Wonderchef Nutri-Blend is a powerful 400W mixer grinder designed for efficient blending and grinding. It comes with three durable stainless steel jars for various tasks. The laser-cut blades ensure fine grinding and smooth blending. Its compact design is perfect for modern kitchens, and the 2-year warranty provides peace of mind for long-term use."
  },
  {
    id: "morphy-richards-400-watt-hand-blender",
    name: "Morphy Richards 400-Watt Hand Blender",
    description: "400W powerful motor with 2 speed control, stainless steel blades and whisk attachment.",
    priceINR: 1999,
    priceUSD: 24.42,
    category: "Appliances",
    link: "https://amzn.to/4eC6HTT", // CORRECT: Amazon affiliate link is here
    image: "images/products/morphy-richards-400-watt-hand-blender.jpg", // SUGGESTION: Download and host locally!
    rating: 4.1,
    features: [
      "Power Source Type: Corded Electric",
      "Wattage: 400 Watts",
      "2-speed control",
      "Stainless steel blades",
      "Whisk attachment",
      "Dishwasher Safe Parts: No (often the case for motor units)"
    ],
    details: "The Morphy Richards 400-Watt Hand Blender offers powerful and convenient blending for your everyday cooking needs. With two-speed control, you can easily blend soups, smoothies, and sauces. It comes with durable stainless steel blades and a whisk attachment for versatile use in the kitchen. Its ergonomic design ensures comfortable handling, making it a valuable kitchen tool."
  }
];

// --- Featured Products (for Homepage) ---
const featuredProducts = products.filter(product =>
    ['collapsible-electric-kettle', 'automatic-soap-dispenser', 'magnetic-fridge-shelf', 'mini-food-chopper'].includes(product.id)
);
