// Static data for shops, products, and other app content
export const shops = [
  {
    id: 1,
    name: 'Green Grocery Store',
    type: 'Grocery',
    rating: 4.5,
    reviews: 256,
    location: {
      address: '123 Market Street, Mumbai',
      coordinates: { latitude: 19.0760, longitude: 72.8777 },
      distance: 0.5
    },
    hours: {
      weekday: '8:00 AM - 9:00 PM',
      weekend: '9:00 AM - 7:00 PM'
    },
    image: require('../assets/grocery shop.jpeg'),
    verified: true,
    deliveryAvailable: true,
    offers: [
      { id: 1, title: '20% off on vegetables', validUntil: '2024-02-15' },
      { id: 2, title: 'Buy 2 Get 1 Free on fruits', validUntil: '2024-02-10' }
    ],
    categories: ['Vegetables', 'Fruits', 'Dairy', 'Grains'],
    followers: 1250,
    products: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  },
  {
    id: 2,
    name: 'Super Bazaar',
    type: 'Supermarket',
    rating: 4.2,
    reviews: 189,
    location: {
      address: '456 Shopping Complex, Mumbai',
      coordinates: { latitude: 19.0850, longitude: 72.8850 },
      distance: 1.2
    },
    hours: {
      weekday: '9:00 AM - 10:00 PM',
      weekend: '9:00 AM - 10:00 PM'
    },
    image: require('../assets/groceryshop1.jpeg'),
    verified: true,
    deliveryAvailable: true,
    offers: [
      { id: 3, title: 'Flat 15% off on groceries above ₹500', validUntil: '2024-02-20' }
    ],
    categories: ['Groceries', 'Electronics', 'Household', 'Personal Care'],
    followers: 890,
    products: [1, 3, 5, 7, 9, 11, 12, 13, 14, 15]
  },
  {
    id: 3,
    name: 'Fresh Mart',
    type: 'Organic Store',
    rating: 4.7,
    reviews: 145,
    location: {
      address: '789 Organic Lane, Mumbai',
      coordinates: { latitude: 19.0650, longitude: 72.8650 },
      distance: 2.1
    },
    hours: {
      weekday: '7:00 AM - 8:00 PM',
      weekend: '8:00 AM - 6:00 PM'
    },
    image: require('../assets/category.jpeg'),
    verified: true,
    deliveryAvailable: false,
    offers: [
      { id: 4, title: 'Organic vegetables at 25% off', validUntil: '2024-02-12' }
    ],
    categories: ['Organic Vegetables', 'Organic Fruits', 'Health Foods'],
    followers: 567,
    products: [2, 4, 6, 8, 16, 17, 18]
  },
  {
    id: 4,
    name: 'Tech World',
    type: 'Electronics',
    rating: 4.3,
    reviews: 234,
    location: {
      address: '321 Electronics Hub, Mumbai',
      coordinates: { latitude: 19.0900, longitude: 72.8900 },
      distance: 1.8
    },
    hours: {
      weekday: '10:00 AM - 9:00 PM',
      weekend: '10:00 AM - 8:00 PM'
    },
    image: require('../assets/category.jpeg'),
    verified: true,
    deliveryAvailable: true,
    offers: [
      { id: 5, title: 'Up to 30% off on smartphones', validUntil: '2024-02-25' }
    ],
    categories: ['Smartphones', 'Laptops', 'Accessories', 'Home Appliances'],
    followers: 1100,
    products: [19, 20, 21, 22, 23]
  },
  {
    id: 5,
    name: 'Local Kirana',
    type: 'General Store',
    rating: 4.0,
    reviews: 89,
    location: {
      address: '567 Residential Area, Mumbai',
      coordinates: { latitude: 19.0700, longitude: 72.8700 },
      distance: 0.8
    },
    hours: {
      weekday: '6:00 AM - 10:00 PM',
      weekend: '6:00 AM - 10:00 PM'
    },
    image: require('../assets/grocery shop.jpeg'),
    verified: false,
    deliveryAvailable: false,
    offers: [],
    categories: ['Daily Essentials', 'Snacks', 'Beverages'],
    followers: 234,
    products: [1, 3, 5, 7, 9, 24, 25]
  }
];

export const products = [
  {
    id: 1,
    name: 'Basmati Rice (5kg)',
    category: 'Grains',
    brand: 'India Gate',
    image: '🌾',
    description: 'Premium quality basmati rice, aged for perfect aroma and taste',
    prices: [
      { shopId: 1, price: 450, originalPrice: 500, discount: 10, inStock: true },
      { shopId: 2, price: 480, originalPrice: 480, discount: 0, inStock: true },
      { shopId: 5, price: 470, originalPrice: 470, discount: 0, inStock: false }
    ],
    rating: 4.5,
    reviews: 234,
    tags: ['Premium', 'Aged']
  },
  {
    id: 2,
    name: 'Organic Tomatoes (1kg)',
    category: 'Vegetables',
    brand: 'Fresh Farm',
    image: '🍅',
    description: 'Fresh organic tomatoes, pesticide-free and naturally grown',
    prices: [
      { shopId: 1, price: 60, originalPrice: 70, discount: 14, inStock: true },
      { shopId: 3, price: 55, originalPrice: 55, discount: 0, inStock: true }
    ],
    rating: 4.3,
    reviews: 156,
    tags: ['Organic', 'Fresh']
  },
  {
    id: 3,
    name: 'Fortune Sunflower Oil (1L)',
    category: 'Cooking Oil',
    brand: 'Fortune',
    image: '🛢️',
    description: 'Pure sunflower oil for healthy cooking',
    prices: [
      { shopId: 1, price: 120, originalPrice: 130, discount: 8, inStock: true },
      { shopId: 2, price: 125, originalPrice: 125, discount: 0, inStock: true },
      { shopId: 5, price: 128, originalPrice: 128, discount: 0, inStock: true }
    ],
    rating: 4.4,
    reviews: 189,
    tags: ['Pure', 'Healthy']
  },
  {
    id: 4,
    name: 'Organic Milk (1L)',
    category: 'Dairy',
    brand: 'Amul Organic',
    image: '🥛',
    description: 'Fresh organic milk from grass-fed cows',
    prices: [
      { shopId: 1, price: 65, originalPrice: 65, discount: 0, inStock: true },
      { shopId: 3, price: 70, originalPrice: 70, discount: 0, inStock: true }
    ],
    rating: 4.6,
    reviews: 298,
    tags: ['Organic', 'Fresh', 'Grass-fed']
  },
  {
    id: 5,
    name: 'Whole Wheat Flour (5kg)',
    category: 'Grains',
    brand: 'Aashirvaad',
    image: '🌾',
    description: 'Premium whole wheat flour for healthy rotis',
    prices: [
      { shopId: 1, price: 280, originalPrice: 300, discount: 7, inStock: true },
      { shopId: 2, price: 290, originalPrice: 290, discount: 0, inStock: true },
      { shopId: 5, price: 285, originalPrice: 285, discount: 0, inStock: true }
    ],
    rating: 4.5,
    reviews: 267,
    tags: ['Whole Wheat', 'Premium']
  },
  {
    id: 6,
    name: 'Organic Bananas (1 dozen)',
    category: 'Fruits',
    brand: 'Fresh Farm',
    image: '🍌',
    description: 'Sweet organic bananas, rich in potassium',
    prices: [
      { shopId: 1, price: 48, originalPrice: 50, discount: 4, inStock: true },
      { shopId: 3, price: 45, originalPrice: 45, discount: 0, inStock: true }
    ],
    rating: 4.2,
    reviews: 134,
    tags: ['Organic', 'Sweet']
  },
  {
    id: 7,
    name: 'Tata Salt (1kg)',
    category: 'Spices & Condiments',
    brand: 'Tata',
    image: '🧂',
    description: 'Iodized salt for healthy cooking',
    prices: [
      { shopId: 1, price: 22, originalPrice: 25, discount: 12, inStock: true },
      { shopId: 2, price: 24, originalPrice: 24, discount: 0, inStock: true },
      { shopId: 5, price: 23, originalPrice: 23, discount: 0, inStock: true }
    ],
    rating: 4.1,
    reviews: 89,
    tags: ['Iodized', 'Pure']
  },
  {
    id: 8,
    name: 'Organic Carrots (1kg)',
    category: 'Vegetables',
    brand: 'Fresh Farm',
    image: '🥕',
    description: 'Fresh organic carrots, rich in beta-carotene',
    prices: [
      { shopId: 1, price: 55, originalPrice: 60, discount: 8, inStock: true },
      { shopId: 3, price: 50, originalPrice: 50, discount: 0, inStock: true }
    ],
    rating: 4.4,
    reviews: 167,
    tags: ['Organic', 'Fresh']
  },
  {
    id: 9,
    name: 'Britannia Bread',
    category: 'Bakery',
    brand: 'Britannia',
    image: '🍞',
    description: 'Fresh white bread, perfect for breakfast',
    prices: [
      { shopId: 1, price: 25, originalPrice: 25, discount: 0, inStock: true },
      { shopId: 2, price: 26, originalPrice: 26, discount: 0, inStock: true },
      { shopId: 5, price: 25, originalPrice: 25, discount: 0, inStock: true }
    ],
    rating: 4.0,
    reviews: 78,
    tags: ['Fresh', 'Soft']
  },
  {
    id: 10,
    name: 'Amul Butter (100g)',
    category: 'Dairy',
    brand: 'Amul',
    image: '🧈',
    description: 'Fresh butter made from pure cream',
    prices: [
      { shopId: 1, price: 52, originalPrice: 55, discount: 5, inStock: true }
    ],
    rating: 4.5,
    reviews: 145,
    tags: ['Fresh', 'Pure Cream']
  },
  // Electronics products
  {
    id: 19,
    name: 'Samsung Galaxy A54',
    category: 'Smartphones',
    brand: 'Samsung',
    image: '📱',
    description: 'Latest Samsung smartphone with excellent camera',
    prices: [
      { shopId: 4, price: 35999, originalPrice: 39999, discount: 10, inStock: true }
    ],
    rating: 4.4,
    reviews: 234,
    tags: ['Latest', '5G', 'Camera']
  },
  {
    id: 20,
    name: 'Sony WH-1000XM4 Headphones',
    category: 'Electronics',
    brand: 'Sony',
    image: '🎧',
    description: 'Premium noise-cancelling wireless headphones',
    prices: [
      { shopId: 4, price: 24999, originalPrice: 29999, discount: 17, inStock: true }
    ],
    rating: 4.7,
    reviews: 189,
    tags: ['Wireless', 'Noise-Cancelling', 'Premium']
  }
];

export const categories = [
  { id: 1, name: 'Vegetables', icon: '🥬', color: '#4CAF50' },
  { id: 2, name: 'Fruits', icon: '🍎', color: '#FF9800' },
  { id: 3, name: 'Dairy', icon: '🥛', color: '#2196F3' },
  { id: 4, name: 'Grains', icon: '🌾', color: '#795548' },
  { id: 5, name: 'Cooking Oil', icon: '🛢️', color: '#FFC107' },
  { id: 6, name: 'Spices & Condiments', icon: '🧂', color: '#E91E63' },
  { id: 7, name: 'Bakery', icon: '🍞', color: '#FF5722' },
  { id: 8, name: 'Electronics', icon: '📱', color: '#9C27B0' },
  { id: 9, name: 'Personal Care', icon: '🧴', color: '#00BCD4' },
  { id: 10, name: 'Household', icon: '🏠', color: '#607D8B' }
];

export const feedPosts = [
  {
    id: 1,
    type: 'shop_offer',
    shop: {
      id: 1,
      name: 'Green Grocery Store',
      verified: true,
      time: '2 hours ago',
      avatar: '🏪'
    },
    content: 'Fresh vegetables just arrived! 🥬🥕 Get 20% off on all organic produce this weekend. Limited time offer!',
    image: '🥬🥕🍅',
    offer: {
      title: 'Weekend Vegetable Sale',
      validity: 'Valid until Sunday',
      discount: '20% off'
    },
    likes: 45,
    comments: 12,
    shares: 8
  },
  {
    id: 2,
    type: 'user_post',
    user: {
      name: 'Priya Sharma',
      type: 'Customer',
      time: '4 hours ago',
      avatar: '👩‍💼'
    },
    content: 'Looking for good quality basmati rice in Andheri area. Any recommendations for shops with competitive prices?',
    tags: ['#basmatirice', '#andheri', '#recommendations'],
    likes: 23,
    comments: 15,
    shares: 3
  },
  {
    id: 3,
    type: 'shop_offer',
    shop: {
      id: 4,
      name: 'Tech World',
      verified: true,
      time: '6 hours ago',
      avatar: '📱'
    },
    content: 'New smartphone arrivals! 📱✨ Samsung Galaxy A54 now available with special launch offers. Visit our store today!',
    image: '📱💫',
    offer: {
      title: 'Smartphone Launch Offer',
      validity: 'Valid for 7 days',
      discount: 'Up to ₹4000 off'
    },
    likes: 67,
    comments: 28,
    shares: 15
  },
  {
    id: 4,
    type: 'price_alert',
    product: {
      name: 'Fortune Sunflower Oil (1L)',
      image: '🛢️'
    },
    content: 'Price drop alert! Fortune Sunflower Oil is now available at ₹120 (was ₹130) at Green Grocery Store.',
    shop: {
      id: 1,
      name: 'Green Grocery Store'
    },
    priceChange: {
      oldPrice: 130,
      newPrice: 120,
      discount: 8
    },
    time: '1 day ago',
    likes: 34,
    comments: 7,
    shares: 12
  }
];

// Helper functions
export const getShopsByLocation = (userLocation, radius = 5) => {
  return shops.filter(shop => shop.location.distance <= radius)
    .sort((a, b) => a.location.distance - b.location.distance);
};

export const getProductsByShop = (shopId) => {
  const shop = shops.find(s => s.id === shopId);
  if (!shop) return [];
  
  return products.filter(product => 
    product.prices.some(price => price.shopId === shopId)
  );
};

export const getProductPriceComparison = (productId) => {
  const product = products.find(p => p.id === productId);
  if (!product) return null;
  
  const pricesWithShops = product.prices.map(price => ({
    ...price,
    shop: shops.find(s => s.id === price.shopId)
  })).sort((a, b) => a.price - b.price);
  
  return {
    product,
    prices: pricesWithShops
  };
};

export const searchProducts = (query, filters = {}) => {
  let filteredProducts = products;
  
  // Text search
  if (query) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.brand.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  // Category filter
  if (filters.category) {
    filteredProducts = filteredProducts.filter(product =>
      product.category === filters.category
    );
  }
  
  // Price range filter
  if (filters.priceRange) {
    filteredProducts = filteredProducts.filter(product => {
      const minPrice = Math.min(...product.prices.map(p => p.price));
      return minPrice >= filters.priceRange.min && minPrice <= filters.priceRange.max;
    });
  }
  
  // Rating filter
  if (filters.minRating) {
    filteredProducts = filteredProducts.filter(product =>
      product.rating >= filters.minRating
    );
  }
  
  return filteredProducts;
};

export const findBestShopsForList = (shoppingList) => {
  const listItems = shoppingList.items.map(item => item.name.toLowerCase());
  
  return shops.map(shop => {
    const shopProducts = getProductsByShop(shop.id);
    const matchingProducts = shopProducts.filter(product =>
      listItems.some(item => 
        product.name.toLowerCase().includes(item) ||
        item.includes(product.name.toLowerCase().split(' ')[0])
      )
    );
    
    const matchPercentage = Math.round((matchingProducts.length / listItems.length) * 100);
    
    return {
      shop,
      matchingProducts: matchingProducts.length,
      totalItems: listItems.length,
      matchPercentage,
      estimatedTotal: matchingProducts.reduce((total, product) => {
        const price = product.prices.find(p => p.shopId === shop.id);
        return total + (price ? price.price : 0);
      }, 0)
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);
};
