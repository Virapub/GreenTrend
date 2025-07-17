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
const products = [
  {
    id: "electric-pooja-diffuser",
    name: "Smokeless Electric Pooja Diffuser",
    description: "No smoke, only divinity. Ideal for festive poojas.",
    image: "images/electric-pooja-diffuser.jpg",
    priceINR: 899,
    priceUSD: 11.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "mini-electric-chopper",
    name: "USB Rechargeable Mini Chopper",
    description: "Chop veggies fast & safely. A smart time-saver!",
    image: "images/mini-chopper.jpg",
    priceINR: 649,
    priceUSD: 9.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "electric-roti-maker",
    name: "Electric Roti/Chapati Maker",
    description: "Make perfect round rotis quickly with ease.",
    image: "images/roti-maker.jpg",
    priceINR: 1899,
    priceUSD: 24.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "collapsible-electric-kettle",
    name: "Foldable Electric Kettle",
    description: "Compact travel-friendly kettle. Boil water anywhere.",
    image: "images/collapsible-kettle.jpg",
    priceINR: 1199,
    priceUSD: 18.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "pan-lid-holder",
    name: "Kitchen Pan & Lid Organizer",
    description: "Neat storage for pots, lids & boards.",
    image: "images/pan-lid-holder.jpg",
    priceINR: 399,
    priceUSD: 8.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "silicone-oil-dispenser",
    name: "Silicone Oil Brush Dispenser",
    description: "Control oil usage while cooking. Less mess!",
    image: "images/oil-dispenser.jpg",
    priceINR: 299,
    priceUSD: 6.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "3-in-1-breakfast-maker",
    name: "3-in-1 Breakfast Maker",
    description: "Toaster, egg cooker & coffee all-in-one device.",
    image: "images/3in1-breakfast.jpg",
    priceINR: 1999,
    priceUSD: 28.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "milk-frother-handheld",
    name: "Portable Milk Frother",
    description: "Make creamy froth for coffee in seconds.",
    image: "images/milk-frother.jpg",
    priceINR: 299,
    priceUSD: 5.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "vegetable-spiral-cutter",
    name: "Vegetable Spiralizer Cutter",
    description: "Create healthy veggie noodles in seconds.",
    image: "images/spiral-cutter.jpg",
    priceINR: 449,
    priceUSD: 7.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "reusable-fridge-bags",
    name: "Reusable Silicone Food Storage Bags",
    description: "Eco-friendly alternative to plastic bags.",
    image: "images/fridge-bags.jpg",
    priceINR: 499,
    priceUSD: 9.49,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "egg-boiler-auto-cutoff",
    name: "Electric Egg Boiler with Auto-Cutoff",
    description: "Boil up to 7 eggs perfectly every time.",
    image: "images/egg-boiler.jpg",
    priceINR: 499,
    priceUSD: 10.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "kitchen-timer-digital",
    name: "Digital Kitchen Timer",
    description: "Compact & accurate. Keeps cooking on track.",
    image: "images/kitchen-timer.jpg",
    priceINR: 299,
    priceUSD: 5.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "mini-juicer-bottle",
    name: "Mini USB Juicer Bottle",
    description: "Perfect for travel, gym, or small kitchens.",
    image: "images/juicer-bottle.jpg",
    priceINR: 899,
    priceUSD: 15.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "magnetic-knife-strip",
    name: "Magnetic Knife Holder Strip",
    description: "Organize knives safely without drawers.",
    image: "images/knife-strip.jpg",
    priceINR: 499,
    priceUSD: 9.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "kitchen-sink-organizer",
    name: "Over Sink Shelf Organizer",
    description: "Maximize space above your sink.",
    image: "images/sink-organizer.jpg",
    priceINR: 899,
    priceUSD: 14.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "microwave-cleaner-lady",
    name: "Angry Mama Microwave Cleaner",
    description: "Cleans with steam. Just add vinegar & water!",
    image: "images/microwave-cleaner.jpg",
    priceINR: 399,
    priceUSD: 6.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "gas-leakage-detector",
    name: "LPG Gas Leak Detector Alarm",
    description: "Alerts instantly. Safety first!",
    image: "images/gas-leak-detector.jpg",
    priceINR: 1299,
    priceUSD: 19.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "water-pump-dispenser",
    name: "Automatic Water Bottle Pump",
    description: "Touch to dispense. No lifting heavy bottles.",
    image: "images/water-dispenser.jpg",
    priceINR: 349,
    priceUSD: 7.49,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "fruit-infusion-bottle",
    name: "Fruit Infuser Water Bottle",
    description: "Stay hydrated with natural fruit flavors.",
    image: "images/fruit-bottle.jpg",
    priceINR: 499,
    priceUSD: 8.99,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  },
  {
    id: "dishwashing-gloves-scrubber",
    name: "Silicone Scrubber Dish Gloves",
    description: "Wash dishes without touching dirt directly.",
    image: "images/dishwashing-gloves.jpg",
    priceINR: 399,
    priceUSD: 6.49,
    buyLinkIN: "",
    buyLinkUS: "",
    countryAvailability: "ALL"
  }
];


// --- Featured Products (You can adjust this list as needed for your homepage) ---
// Currently featuring some from your original list and some newly added ones.
const featuredProducts = products.filter(product =>
    ['collapsible-electric-kettle', 'automatic-soap-dispenser', 'magnetic-fridge-shelf', 'mini-food-chopper', 'fridge-organizer-bins', 'smart-trash-can', 'roll-up-drying-rack', 'automatic-pan-stirrer'].includes(product.id)
);
