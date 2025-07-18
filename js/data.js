const products = [
  {
    id: 'kettle-usb',
    name: 'USB Electric Kettle',
    price: 999,
    image: 'images/products/kettle.jpg',
    category: 'Low Budget Finds',
    availability: ['IN', 'US'],
    link: {
      IN: 'https://amzn.to/usb-kettle-in',
      US: 'https://amzn.to/usb-kettle-us'
    }
  },
  {
    id: 'mini-blender',
    name: 'Portable Mini Blender',
    price: 1899,
    image: 'images/products/blender.jpg',
    category: 'Mid Range Picks',
    availability: ['IN'],
    link: {
      IN: 'https://amzn.to/mini-blender-in'
    }
  },
  {
    id: 'smart-coffee',
    name: 'Smart Coffee Maker',
    price: 6499,
    image: 'images/products/coffee.jpg',
    category: 'Premium Products',
    availability: ['US'],
    link: {
      US: 'https://amzn.to/smart-coffee-us'
    }
  }
];

// Category list for homepage filter
const categories = [
  {
    id: 'cat-low',
    name: 'Low Budget Finds',
    slug: 'low-budget',
    image: 'images/categories/low-budget.png'
  },
  {
    id: 'cat-mid',
    name: 'Mid Range Picks',
    slug: 'mid-range',
    image: 'images/categories/mid-range.png'
  },
  {
    id: 'cat-premium',
    name: 'Premium Products',
    slug: 'premium',
    image: 'images/categories/premium.png'
  }
];
