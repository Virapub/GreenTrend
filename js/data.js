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

function getPriceBasedCategory(priceINR) {
  if (priceINR >= 0 && priceINR <= 1999) {
    return 'Low Budget Finds';
  } else if (priceINR >= 2000 && priceINR <= 29999) {
    return 'Mid Range Picks';
  } else if (priceINR >= 30000) {
    return 'Premium Products';
  } else {
    return 'Uncategorized';
  }
}
// --- Products Data (Includes previously discussed products + your new list) ---
const products = [ { id: "collapsible-electric-kettle", name: "Collapsible Electric Kettle", description: "Space-saving collapsible kettle with auto shut-off and boil-dry protection, perfect for travel or small kitchens.", priceINR: 1499, priceUSD: 17.51, category: "Low Budget", categorySlug: "low-budget", affiliateLink: "https://amzn.to/44Ms6VN?tag=greentrend08-20", image: "https://m.media-amazon.com/images/I/512mRNNNbkL.SL1500.jpg", rating: 4.5, features: [ "Collapsible design for portability", "800W rapid boil power", "BPA-free food-grade silicone", "Auto shut-off & boil-dry protection", "Capacity: 0.6 Liters (approx)" ], details: "This innovative collapsible electric kettle is designed for convenience and portability. Its compact size makes it ideal for travel, camping, or small apartments. Made with food-grade silicone, it's safe and durable. Features include fast boiling, automatic shut-off when water boils, and boil-dry protection for safety. A must-have for modern kitchens and travelers alike!" }, { id: "automatic-soap-dispenser", name: "Automatic Soap Dispenser", description: "Touchless soap dispenser with infrared sensor for hygienic, hands-free operation. Ideal for kitchen or bathroom.", priceINR: 1388, priceUSD: 16.21, category: "Low Budget", categorySlug: "low-budget", affiliateLink: "https://www.amazon.com/dp/B08Y6HV4DY?tag=greentrend08-20", image: "https://m.media-amazon.com/images/I/5173SHrfbyL.SL1024.jpg", rating: 4.2, features: [ "Touchless operation for germ-free use", "Adjustable soap volume (3 levels)", "Battery-powered (AA batteries)", "Sleek and modern design", "Capacity: 300ml (approx)" ], details: "Enhance hygiene in your kitchen or bathroom with this automatic soap dispenser. Its infrared motion sensor ensures a touch-free experience, reducing germ spread. You can easily adjust the dispensed soap volume to your preference. The modern design seamlessly integrates with any decor. Perfect for homes, offices, and public restrooms." }, { id: "magnetic-fridge-shelf", name: "Magnetic Fridge Shelf Rack", description: "Multi-purpose magnetic storage organizer that attaches easily to your refrigerator, saving counter space.", priceINR: 1199, priceUSD: 14.0, category: "Low Budget", categorySlug: "low-budget", affiliateLink: "https://www.amazon.com/dp/B08KHN7SS4?tag=greentrend08-20", image: "https://m.media-amazon.com/images/I/81aAamdevaL.SL1500.jpg", rating: 4.3, features: [ "Strong magnetic back for secure hold", "Multi-tier design for various items", "Durable carbon steel construction", "Easy to install and reposition", "Space-saving solution" ], details: "Maximize your kitchen space with this magnetic fridge shelf rack. Its powerful magnets provide a secure hold on your refrigerator, eliminating the need for drilling. The multi-tiered design is perfect for spices, condiments, paper towels, or small kitchen tools, keeping your countertops clutter-free and organized. Made of durable carbon steel for long-lasting use." }, { id: "mini-food-chopper", name: "Mini Electric Food Chopper", description: "Compact and powerful wireless food chopper for garlic, ginger, chilies, and small quantities of vegetables.", priceINR: 999, priceUSD: 11.67, category: "Low Budget", categorySlug: "low-budget", affiliateLink: "https://www.amazon.com/dp/B093F9RY28?tag=greentrend08-20", image: "https://m.media-amazon.com/images/I/61IK+zdG-IL.SL1200.jpg", rating: 4.6, features: [ "USB rechargeable for cordless convenience", "One-button operation for ease of use", "Easy to clean components", "Portable design for small kitchens or travel", "Capacity: 250ml (approx)" ], details: "This mini electric food chopper is your perfect companion for quick meal prep. Its cordless, USB rechargeable design offers ultimate convenience. Ideal for chopping garlic, onions, ginger, chilies, and even small amounts of baby food. The powerful motor ensures efficient chopping with a single button press. A compact solution for all your chopping needs." }, { id: "digital-kitchen-scale", name: "Digital Kitchen Scale", description: "High-precision digital scale for accurate measurements of ingredients, perfect for baking and cooking.", priceINR: 850, priceUSD: 9.93, category: "Low Budget", categorySlug: "low-budget", affiliateLink: "https://www.amazon.com/dp/B00V5IM580?tag=greentrend08-20", image: "https://m.media-amazon.com/images/I/313SCZswZZL.jpg", rating: 4.7, features: [ "Tare function for zeroing containers", "Multiple unit conversion (g, oz, ml, lb)", "Clear LCD display", "Sleek, slim design for easy storage", "Weight Capacity: 5kg" ], details: "Achieve culinary precision with this high-precision digital kitchen scale. Its accurate sensors ensure perfect measurements for baking, cooking, and portion control. The tare function allows you to weigh ingredients directly in your bowl, and the multiple unit conversion makes it versatile for all recipes. Slim design for easy storage and a clear LCD for easy reading." } ];



// --- Featured Products (You can adjust this list as needed for your homepage) ---
// Currently featuring some from your original list and some newly added ones.
const featuredProducts = products.filter(product =>
    ['collapsible-electric-kettle', 'automatic-soap-dispenser', 'magnetic-fridge-shelf', 'mini-food-chopper', 'fridge-organizer-bins', 'smart-trash-can', 'roll-up-drying-rack', 'automatic-pan-stirrer'].includes(product.id)
);
