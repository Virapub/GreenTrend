//js/data.js - New products added to the existing array, following the specified format.

// --- Categories Data (Existing categories, add new ones if product categories change) ---
const categories = [
    {
        id: 'cat-appliances',
        name: 'Appliances',
        slug: 'appliances',
        image: 'images/categories/kitchen-appliances.jpg'
    },
    {
        id: 'cat-smart-gadgets',
        name: 'Smart Gadgets',
        slug: 'smart-gadgets',
        image: 'images/categories/smart-gadgets.jpg'
    },
    {
        id: 'cat-storagees/cleaning.jpg' // Ensure this image exists
    },
    {
        id: 'cat-accessories', // New category for "Mini Ice Cube Tray", "Air Fryer Liners"
        name: 'Accessories',
        slug: 'accessories',
        image: 'images/categories/accessories.jpg' // Ensure this image exists
    },
    {
        id: 'cat-prep-tools', // New category for "Cutting Board", "Digital Measuring Spoon", "Magnetic Measuring Spoons", "Electric Garlic Chopper"
        name: 'Prep Tools',
        slug: 'prep-tools',
        image: 'images/categories/prep-tools.jpg' // Ensure this image exists
    },
    {
        id: 'cat-cooking', // New category for "Automatic Pan Stirrer", "INKBIRD Thermometer"
        name: 'Cooking',
        slug: 'cooking',
        image: 'images/categories/cooking.jpg' // Ensure this image exists
    },
    {
        id: 'cat-safety', // New category for "BBQ Grill Gloves"
        name: 'Safety',
        slug: 'safety',
        image: 'images/categories/safety.jpg' // Ensure this image exists
    }
];


// --- Products Data (Includes previously discussed products + your new list) ---
const products = [
  {
    id: "collapsible-electric-kettle",
    name: "Collapsible Electric Kettle",
    description: "Space-saving collapsible kettle with auto shut-off and boil-dry protection, perfect for travel or small kitchens.",
    priceINR: 1499,
    priceUSD: 17.51,
    category: "Appliances",
    link: "https://amzn.to/3Ig7oGl",
    image: "https://m.media-amazon.com/images/I/512mRNNNbkL._SL1500_.jpg", // Amazon direct link
    rating: 4.5,
    features: ["Collapsible design for portability", "800W rapid boil power", "BPA-free food-grade silicone", "Auto shut-off & boil-dry protection", "Capacity: 0.6 Liters (approx)"],
    details: "This innovative collapsible electric kettle is designed for convenience and portability. Its compact size makes it ideal for travel, camping, or small apartments. Made with food-grade silicone, it's safe and durable. Features include fast boiling, automatic shut-off when water boils, and boil-dry protection for safety. A must-have for modern kitchens and travelers alike!"
  },
  {
    id: "automatic-soap-dispenser",
    name: "Automatic Soap Dispenser",
    description: "Touchless soap dispenser with infrared sensor for hygienic, hands-free operation. Ideal for kitchen or bathroom.",
    priceINR: 1388,
    priceUSD: 16.21,
    category: "Smart Gadgets",
    link: "https://amzn.to/46sLIRc",
    image: "https://m.media-amazon.com/images/I/61mNn+4mF3L._SL1500_.jpg", // Example: Use correct image URL if different
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
    link: "https://amzn.to/44rEZEO",
    image: "https://m.media-amazon.com/images/I/71Y-oR7W7jL._SL1500_.jpg", // Example: Use correct image URL if different
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
    link: "https://amzn.to/44k5wVJ",
    image: "https://m.media-amazon.com/images/I/71P7uD9M72L._SL1500_.jpg", // Example: Use correct image URL if different
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
    link: "https://amzn.to/3Iffdfu",
    image: "https://m.media-amazon.com/images/I/71U2cQxXm2L._SL1500_.jpg", // Example: Use correct image URL if different
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
    link: "https://amzn.to/3Go8aR6",
    image: "https://m.media-amazon.com/images/I/71K2-3l3rBL._SL1500_.jpg", // Example: Use correct image URL if different
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
    link: "https://amzn.to/3Tpn64r",
    image: "https://m.media-amazon.com/images/I/71tQ0Y4R8LL._SL1500_.jpg", // Example: Use correct image URL if different
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
    link: "https://amzn.to/4nwJpml",
    image: "https://m.media-amazon.com/images/I/61U0jM57PQL._SL1500_.jpg", // Example: Use correct image URL if different
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
    link: "https://amzn.to/45ZhPIm",
    image: "https://m.media-amazon.com/images/I/71u9B4+YQ6L._SL1500_.jpg", // Example: Use correct image URL if different
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
    link: "https://amzn.to/4eC6HTT",
    image: "https://m.media-amazon.com/images/I/61kYgYk-43L._SL1500_.jpg", // Example: Use correct image URL if different
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
  },
  // --- Your NEW Products start here ---
  {
    id: "fridge-organizer-bins",
    name: "Fridge Organizer Bins (Clear, Stackable)",
    description: "Set of clear plastic bins for better fridge organization",
    priceINR: 2395,
    priceUSD: 27.97,
    category: "Storage",
    link: "https://amzn.to/3I98vaY",
    image: "https://m.media-amazon.com/images/I/71S+IrhvQPL._SL1500_.jpg",
    rating: 4.6,
    features: ["Stackable design", "See-through material", "Easy-grip handles"],
    details: "Organize your refrigerator effortlessly with this set of clear, stackable bins. Made from durable plastic, these bins allow you to easily see contents, reducing food waste and clutter. The easy-grip handles make them convenient to pull out and transport. Perfect for fruits, vegetables, drinks, and pantry items, transforming your fridge into a neat and tidy space."
  },
  {
    id: "smart-trash-can",
    name: "Smart Trash Can with Motion Sensor",
    description: "Automatic opening trash can with touch-free operation",
    priceINR: 2999,
    priceUSD: 35.03,
    category: "Smart Gadgets",
    link: "https://amzn.to/4euARZe",
    image: "https://m.media-amazon.com/images/I/615kYHdRG0L._SL1500_.jpg",
    rating: 4.4,
    features: ["Motion sensor", "Battery operated", "Odor control"],
    details: "Experience ultimate convenience and hygiene with this smart trash can. Equipped with a motion sensor, it opens automatically with a wave of your hand, ensuring touch-free operation and reducing germ spread. Its sleek design fits perfectly in any modern kitchen or office, and the built-in odor control helps keep your space fresh. Battery operated for versatile placement."
  },
  {
    id: "electric-jar-opener",
    name: "Electric Jar Opener",
    description: "Battery-powered device that opens tight jar lids effortlessly",
    priceINR: 1571,
    priceUSD: 18.35,
    category: "Helpers",
    link: "https://amzn.to/44sVwbo",
    image: "https://m.media-amazon.com/images/I/71XbxJC8QLL._SL1500_.jpg",
    rating: 4.1,
    features: ["One-touch operation", "Non-slip grip", "Works on most jars"],
    details: "Say goodbye to stubborn jar lids with this electric jar opener. This battery-powered device offers effortless one-touch operation, making it ideal for anyone with weak grips or arthritis. Its non-slip grip securely holds jars of various sizes, opening them quickly and safely. A simple yet highly effective kitchen aid for daily convenience."
  },
  {
    id: "automatic-oil-dispenser",
    name: "Automatic Oil Dispenser Bottle (with sensor)",
    description: "Touch-free oil dispenser with precise measurement",
    priceINR: 304,
    priceUSD: 3.55,
    category: "Smart Gadgets",
    link: "https://amzn.to/3In9G6p",
    image: "https://m.media-amazon.com/images/I/814ea9qZTML._SL1500_.jpg",
    rating: 4.0,
    features: ["No-drip spout", "Adjustable flow", "Battery included"],
    details: "Achieve perfect portion control with this automatic oil dispenser bottle. Featuring a touch-free sensor, it dispenses oil precisely without any drips or mess. The adjustable flow allows you to control the amount of oil, making it perfect for cooking, baking, or dressing salads. Battery operated for convenience, it's a smart addition to any kitchen."
  },
  {
    id: "roll-up-drying-rack",
    name: "Roll-Up Over-Sink Drying Rack",
    description: "Space-saving drying rack that fits over your sink",
    priceINR: 649,
    priceUSD: 7.58,
    category: "Storage",
    link: "https://amzn.to/3GpXMIo",
    image: "https://m.media-amazon.com/images/I/81lEuQodtVL._SL1466_.jpg",
    rating: 4.2,
    features: ["Collapsible design", "Stainless steel", "Drip tray included"],
    details: "Maximize your kitchen counter space with this innovative roll-up over-sink drying rack. Its collapsible design allows it to be easily rolled up and stored when not in use. Made from durable stainless steel, it's perfect for drying dishes, fruits, or vegetables right over your sink. Includes a drip tray for mess-free draining."
  },
  {
    id: "microwave-cleaner",
    name: "Microwave Cleaner Steamer (Angry Mama Style)",
    description: "Easy way to clean your microwave with steam",
    priceINR: 399,
    priceUSD: 4.66,
    category: "Cleaning",
    link: "https://amzn.to/4nuE7rE",
    image: "https://m.media-amazon.com/images/I/61PvRIsez6L._SL1500_.jpg",
    rating: 4.3,
    features: ["Non-toxic cleaning", "Reusable", "Fun design"],
    details: "Effortlessly clean your microwave with this fun and effective Angry Mama-style cleaner. Simply fill it with water and vinegar, microwave for a few minutes, and steam will loosen grime for easy wiping. A non-toxic, reusable solution that eliminates the need for harsh chemicals, making microwave cleaning quick and enjoyable."
  },
  {
    id: "mini-ice-tray",
    name: "Mini Ice Cube Tray with Lid & Scoop",
    description: "Silicone ice cube tray with lid and scoop for easy use",
    priceINR: 745,
    priceUSD: 8.70,
    category: "Accessories",
    link: "https://amzn.to/4klNqY9",
    image: "https://m.media-amazon.com/images/I/71Ce4GiWbZL._SL1500_.jpg",
    rating: 4.5,
    features: ["Flexible silicone", "Leak-proof lid", "Includes scoop"],
    details: "Create perfectly shaped mini ice cubes with this silicone tray. Its flexible silicone material allows for easy release of ice, and the leak-proof lid prevents spills and odors. Comes with a convenient scoop for serving. Ideal for chilling drinks, making baby food portions, or adding a fun touch to cocktails."
  },
  {
    id: "cutting-board-drain",
    name: "2-in-1 Cutting Board with Drain Tray",
    description: "Cutting board with built-in drain tray for juices",
    priceINR: 3397,
    priceUSD: 39.68,
    category: "Prep Tools",
    link: "https://amzn.to/4lbuc8R",
    image: "https://m.media-amazon.com/images/I/71lTRNr2zmL._SL1500_.jpg",
    rating: 4.4,
    features: ["Non-slip base", "Dishwasher safe", "Juice groove"],
    details: "Simplify your food preparation with this innovative 2-in-1 cutting board. It features a built-in drain tray to collect juices from meats or fruits, keeping your counter clean. The non-slip base ensures stability during chopping, and it's dishwasher safe for easy cleanup. A smart design for efficient and hygienic meal prep."
  },
  {
    id: "automatic-pan-stirrer",
    name: "Automatic Pan Stirrer with Timer",
    description: "Hands-free stirring for sauces and other dishes",
    priceINR: 1299,
    priceUSD: 15.17,
    category: "Cooking",
    link: "https://amzn.to/44rdDOR",
    image: "https://m.media-amazon.com/images/I/51PuutE8okL._SL1500_.jpg",
    rating: 3.9,
    features: ["Adjustable speed", "Timer function", "Non-stick paddles"],
    details: "Achieve perfectly stirred sauces and dishes without constant supervision with this automatic pan stirrer. It offers adjustable speed settings and a built-in timer for hands-free cooking. The non-stick paddles are safe for various cookware surfaces. Ideal for busy cooks, ensuring consistent results every time."
  },
  {
    id: "grain-dispenser",
    name: "Wall-Mounted Rice & Grain Dispenser",
    description: "Convenient dispenser for rice, grains and cereals",
    priceINR: 2299,
    priceUSD: 26.85,
    category: "Storage",
    link: "https://amzn.to/4lBVDsk",
    image: "https://m.media-amazon.com/images/I/51emxzXRleL._SL1000_.jpg",
    rating: 4.2,
    features: ["Wall mounted", "Clear container", "Easy-pour spout"],
    details: "Streamline your pantry with this wall-mounted rice and grain dispenser. Its clear container allows you to easily monitor supply levels, and the easy-pour spout ensures convenient, mess-free dispensing. Ideal for rice, cereals, and various grains, saving valuable counter and cabinet space while keeping your staples fresh and accessible."
  },
  {
    id: "milk-frother",
    name: "Electric Milk Frother Wand",
    description: "Battery-operated milk frother for lattes and cappuccinos",
    priceINR: 1299,
    priceUSD: 15.17,
    category: "Appliances",
    link: "https://amzn.to/4eycpWQ",
    image: "https://m.media-amazon.com/images/I/71MYVP0d-9L._SL1500_.jpg",
    rating: 4.1,
    features: ["One-button operation", "Stainless steel", "Easy to clean"],
    details: "Create creamy lattes and cappuccinos at home with this electric milk frother wand. Its battery-operated design offers cordless convenience and one-button operation for quick frothing. The stainless steel whisk is easy to clean and delivers rich, velvety foam in seconds. Perfect for coffee lovers and home baristas."
  },
  {
    id: "digital-measuring-spoon",
    name: "Digital Measuring Spoon",
    description: "Precision digital spoon scale for accurate measurements",
    priceINR: 999,
    priceUSD: 11.67,
    category: "Prep Tools",
    link: "https://amzn.to/45LPtkF",
    image: "https://m.media-amazon.com/images/I/613c9s2femL._SL1500_.jpg",
    rating: 4.0,
    features: ["LCD display", "Tare function", "Multiple units"],
    details: "Measure small quantities with precision using this digital measuring spoon. Its built-in LCD display provides instant, accurate readings, and the tare function allows you to zero out the weight of ingredients. Supports multiple units for versatile use in baking and cooking. Ideal for spices, liquids, and powders, ensuring accurate recipes every time."
  },
  {
    id: "silicone-food-covers",
    name: "Silicone Food Covers (Stretch Lids)",
    description: "Reusable silicone covers that stretch over bowls and plates",
    priceINR: 228,
    priceUSD: 2.66,
    category: "Storage",
    link: "https://amzn.to/4ljDu2o",
    image: "https://m.media-amazon.com/images/I/71KD-jSETqL._SL1500_.jpg",
    rating: 4.3,
    features: ["Set of 6", "Stretch to fit", "Microwave safe"],
    details: "Reduce plastic waste with these reusable silicone food covers. This set of 6 stretchable lids fits snugly over various bowls, cups, and plates, keeping food fresh. They are microwave and dishwasher safe, making cleanup a breeze. An eco-friendly and versatile solution for food storage in your kitchen."
  },
  {
    id: "magnetic-measuring-spoons",
    name: "Magnetic Measuring Spoons Set",
    description: "Stainless steel measuring spoons that stick together",
    priceINR: 3960,
    priceUSD: 46.25,
    category: "Prep Tools",
    link: "https://amzn.to/4lx0DOF",
    image: "https://m.media-amazon.com/images/I/618pvaVahwS._SL1500_.jpg",
    rating: 4.7,
    features: ["Magnetic connection", "Dishwasher safe", "Lifetime warranty"],
    details: "Keep your measuring spoons organized with this magnetic set. Made from durable stainless steel, these spoons snap together neatly, preventing clutter in your drawers. Each spoon is clearly marked for accurate measurements, and the set is dishwasher safe for easy cleaning. A premium and practical addition to any kitchen."
  },
  {
    id: "electric-garlic-chopper",
    name: "Mini Electric Garlic Chopper",
    description: "Compact chopper for garlic, herbs and small vegetables",
    priceINR: 1199,
    priceUSD: 14.00,
    category: "Prep Tools",
    link: "https://amzn.to/4lTqxwv",
    image: "https://m.media-amazon.com/images/I/91eGUYYMfAL._SL1500_.jpg",
    rating: 4.2,
    features: ["One-touch operation", "Easy to clean", "Non-slip base"],
    details: "Effortlessly chop garlic, herbs, and small vegetables with this mini electric chopper. Its compact size and one-touch operation make it quick and convenient for daily meal prep. The easy-to-clean design ensures hygiene, and the non-slip base provides stability during use. A powerful little tool for any busy kitchen."
  },
  {
    id: "under-shelf-basket",
    name: "Cupboard/Under-Shelf Basket Organizer",
    description: "Space-saving basket that hangs under shelves",
    priceINR: 527,
    priceUSD: 6.15,
    category: "Storage",
    link: "https://amzn.to/400tdQd",
    image: "https://m.media-amazon.com/images/I/61fNmHMWj3L._SL1001_.jpg",
    rating: 4.1,
    features: ["No tools needed", "Adjustable width", "Durable steel"],
    details: "Maximize your cabinet space with this convenient under-shelf basket organizer. It easily hooks onto existing shelves without the need for tools, instantly adding storage. Made from durable steel, it's perfect for holding wraps, foil, small dishes, or snacks, keeping your kitchen tidy and efficient."
  },
  {
    id: "airfryer-liners",
    name: "Silicone Air Fryer Liners (Reusable)",
    description: "Non-stick liners for easy air fryer cleaning",
    priceINR: 579,
    priceUSD: 6.76,
    category: "Accessories",
    link: "https://amzn.to/4km5dOF",
    image: "https://m.media-amazon.com/images/I/71j85bJWMJL._SL1500_.jpg",
    rating: 4.4,
    features: ["Reusable", "Non-stick", "Fits most air fryers"],
    details: "Simplify air fryer cleanup with these reusable silicone liners. Their non-stick surface prevents food from sticking, making washing a breeze. Designed to fit most standard air fryers, they are a practical accessory for healthier cooking and hassle-free maintenance. An eco-friendly alternative to disposable parchment paper."
  },
  {
    id: "inkbird-thermometer",
    name: "INKBIRD Bluetooth Meat Thermometer",
    description: "Wireless thermometer with smartphone connectivity",
    priceINR: 2090,
    priceUSD: 25.18,
    category: "Cooking",
    link: "https://amzn.to/3TjlTvu",
    image: "https://m.media-amazon.com/images/I/71UtnkqnYCL._SL1500_.jpg",
    rating: 4.5,
    features: ["Bluetooth 4.0", "4 probes", "Alarm function"],
    details: "Achieve perfectly cooked meats every time with the INKBIRD Bluetooth Meat Thermometer. Monitor cooking temperatures wirelessly via your smartphone, allowing you to multitask. Equipped with 4 probes for tracking multiple cuts and an alarm function to alert you when your food is ready. Ideal for grilling, smoking, and oven cooking."
  },
  {
    id: "bbq-grill-gloves",
    name: "BBQGO BBQ Grill Gloves",
    description: "Heat-resistant gloves for grilling and cooking",
    priceINR: 1292,
    priceUSD: 15.57,
    category: "Safety",
    link: "https://amzn.to/3ZTGlXp",
    image: "https://m.media-amazon.com/images/I/61vMY+WRAZL._SL1500_.jpg",
    rating: 4.3,
    features: ["Heat resistant", "Non-slip grip", "Machine washable"],
    details: "Protect your hands while grilling and cooking with BBQGO heat-resistant gloves. Made with advanced materials, they provide excellent protection from high temperatures. The non-slip grip ensures secure handling of hot tools and food, while being machine washable for easy cleanup. Essential safety gear for any BBQ enthusiast or kitchen chef."
  }
];

// --- Featured Products (You can adjust this list as needed for your homepage) ---
// Currently featuring some from your original list and some newly added ones.
const featuredProducts = products.filter(product =>
    ['collapsible-electric-kettle', 'automatic-soap-dispenser', 'magnetic-fridge-shelf', 'mini-food-chopper', 'fridge-organizer-bins', 'smart-trash-can', 'roll-up-drying-rack', 'automatic-pan-stirrer'].includes(product.id)
);
