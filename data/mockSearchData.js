// Comprehensive mock data for smart search functionality

export const mockProducts = [
  // Bakery & Cakes
  {
    id: 1,
    name: 'Chocolate Truffle Cake',
    price: '₹500',
    originalPrice: '₹600',
    shop: 'Modern Bakery',
    shopId: 1,
    distance: '2.1 km',
    rating: 4.8,
    reviews: 45,
    image: require('../assets/category.jpeg'),
    inStock: true,
    sameDay: true,
    freeDelivery: true,
    category: 'Bakery',
    description: 'Rich chocolate truffle cake with premium cocoa',
    tags: ['cake', 'chocolate', 'dessert', 'birthday']
  },
  {
    id: 2,
    name: 'Black Forest Pastry',
    price: '₹80',
    shop: 'Delicious Cakes',
    shopId: 2,
    distance: '3.5 km',
    rating: 4.6,
    reviews: 32,
    image: require('../assets/category.jpeg'),
    inStock: true,
    sameDay: false,
    freeDelivery: false,
    category: 'Bakery',
    description: 'Classic black forest pastry with cherries',
    tags: ['pastry', 'black forest', 'cherry', 'cake']
  },
  {
    id: 3,
    name: 'Red Velvet Cupcake',
    price: '₹120',
    shop: 'Cupcake Corner',
    shopId: 5,
    distance: '1.5 km',
    rating: 4.7,
    reviews: 52,
    image: require('../assets/category.jpeg'),
    inStock: true,
    sameDay: true,
    freeDelivery: true,
    category: 'Bakery',
    description: 'Moist red velvet cupcake with cream cheese frosting',
    tags: ['cupcake', 'red velvet', 'frosting']
  },

  // Fruits & Vegetables
  {
    id: 4,
    name: 'Fresh Avocados',
    price: '₹150',
    originalPrice: '₹180',
    shop: 'Green Valley Fruits',
    shopId: 6,
    distance: '1.2 km',
    rating: 4.5,
    reviews: 89,
    image: require('../assets/fresh_avocados.jpeg'),
    inStock: true,
    sameDay: true,
    freeDelivery: true,
    category: 'Fruits',
    description: 'Premium quality fresh avocados, perfect for salads',
    tags: ['avocado', 'fresh', 'healthy', 'organic']
  },
  {
    id: 5,
    name: 'Organic Oranges',
    price: '₹80',
    shop: 'Fresh Mart',
    shopId: 7,
    distance: '2.3 km',
    rating: 4.3,
    reviews: 67,
    image: require('../assets/orange.jpeg'),
    inStock: true,
    sameDay: true,
    freeDelivery: false,
    category: 'Fruits',
    description: 'Sweet and juicy organic oranges, vitamin C rich',
    tags: ['orange', 'citrus', 'vitamin c', 'organic']
  },
  {
    id: 6,
    name: 'Fresh Spinach',
    price: '₹40',
    shop: 'Veggie World',
    shopId: 8,
    distance: '1.8 km',
    rating: 4.4,
    reviews: 34,
    image: require('../assets/category.jpeg'),
    inStock: true,
    sameDay: true,
    freeDelivery: false,
    category: 'Vegetables',
    description: 'Fresh green spinach leaves, rich in iron',
    tags: ['spinach', 'green', 'leafy', 'healthy']
  },

  // Dairy & Beverages
  {
    id: 7,
    name: 'Organic Milk',
    price: '₹65',
    shop: 'Dairy Fresh',
    shopId: 9,
    distance: '0.8 km',
    rating: 4.6,
    reviews: 156,
    image: require('../assets/organic_milk.jpeg'),
    inStock: true,
    sameDay: true,
    freeDelivery: true,
    category: 'Dairy',
    description: 'Pure organic milk from grass-fed cows',
    tags: ['milk', 'organic', 'dairy', 'fresh']
  },
  {
    id: 8,
    name: 'Greek Yogurt',
    price: '₹120',
    shop: 'Dairy Fresh',
    shopId: 9,
    distance: '0.8 km',
    rating: 4.5,
    reviews: 78,
    image: require('../assets/category.jpeg'),
    inStock: true,
    sameDay: true,
    freeDelivery: true,
    category: 'Dairy',
    description: 'Creamy Greek yogurt with probiotics',
    tags: ['yogurt', 'greek', 'probiotic', 'healthy']
  },

  // Bakery & Bread
  {
    id: 9,
    name: 'Sourdough Bread',
    price: '₹180',
    shop: 'Artisan Bakery',
    shopId: 10,
    distance: '2.7 km',
    rating: 4.8,
    reviews: 92,
    image: require('../assets/sourdough_bread.jpeg'),
    inStock: true,
    sameDay: false,
    freeDelivery: false,
    category: 'Bakery',
    description: 'Handcrafted sourdough bread with crispy crust',
    tags: ['bread', 'sourdough', 'artisan', 'handmade']
  },
  {
    id: 10,
    name: 'Whole Wheat Bread',
    price: '₹45',
    shop: 'Daily Bread',
    shopId: 11,
    distance: '1.9 km',
    rating: 4.2,
    reviews: 45,
    image: require('../assets/category.jpeg'),
    inStock: true,
    sameDay: true,
    freeDelivery: false,
    category: 'Bakery',
    description: 'Nutritious whole wheat bread, perfect for daily use',
    tags: ['bread', 'whole wheat', 'healthy', 'daily']
  },

  // Snacks & Beverages
  {
    id: 11,
    name: 'Mixed Nuts Pack',
    price: '₹250',
    originalPrice: '₹300',
    shop: 'Nutty Delights',
    shopId: 12,
    distance: '3.1 km',
    rating: 4.4,
    reviews: 67,
    image: require('../assets/category.jpeg'),
    inStock: true,
    sameDay: false,
    freeDelivery: true,
    category: 'Snacks',
    description: 'Premium mixed nuts - almonds, cashews, walnuts',
    tags: ['nuts', 'healthy', 'snack', 'protein']
  },
  {
    id: 12,
    name: 'Green Tea',
    price: '₹180',
    shop: 'Tea Garden',
    shopId: 13,
    distance: '2.5 km',
    rating: 4.6,
    reviews: 89,
    image: require('../assets/category.jpeg'),
    inStock: true,
    sameDay: true,
    freeDelivery: false,
    category: 'Beverages',
    description: 'Premium green tea leaves with antioxidants',
    tags: ['tea', 'green tea', 'antioxidant', 'healthy']
  },

  // More variety
  {
    id: 13,
    name: 'Basmati Rice',
    price: '₹120',
    shop: 'Grain Store',
    shopId: 14,
    distance: '1.6 km',
    rating: 4.3,
    reviews: 123,
    image: require('../assets/category.jpeg'),
    inStock: true,
    sameDay: true,
    freeDelivery: true,
    category: 'Grains',
    description: 'Premium basmati rice with long grains',
    tags: ['rice', 'basmati', 'grain', 'staple']
  },
  {
    id: 14,
    name: 'Honey',
    price: '₹280',
    shop: 'Natural Store',
    shopId: 15,
    distance: '2.8 km',
    rating: 4.7,
    reviews: 56,
    image: require('../assets/category.jpeg'),
    inStock: true,
    sameDay: false,
    freeDelivery: false,
    category: 'Natural',
    description: 'Pure natural honey from local beekeepers',
    tags: ['honey', 'natural', 'sweet', 'organic']
  },
  {
    id: 15,
    name: 'Chicken Breast',
    price: '₹320',
    shop: 'Fresh Meat Co',
    shopId: 16,
    distance: '3.2 km',
    rating: 4.5,
    reviews: 78,
    image: require('../assets/category.jpeg'),
    inStock: true,
    sameDay: true,
    freeDelivery: false,
    category: 'Meat',
    description: 'Fresh chicken breast, hormone-free',
    tags: ['chicken', 'meat', 'protein', 'fresh']
  }
];

export const mockShops = [
  {
    id: 1,
    name: 'Modern Bakery',
    image: require('../assets/groceryshop1.jpeg'),
    distance: '2.1 km away',
    rating: 4.5,
    reviews: 128,
    specialOffer: true,
    categories: ['Bakery', 'Cakes', 'Desserts'],
    description: 'Premium bakery known for custom cakes and pastries',
    openTime: '7:00 AM - 10:00 PM',
    deliveryTime: '30-45 mins',
    freeDelivery: true,
    verified: true
  },
  {
    id: 2,
    name: 'Delicious Cakes',
    image: require('../assets/groceryshop1.jpeg'),
    distance: '3.5 km away',
    rating: 4.7,
    reviews: 95,
    specialOffer: false,
    categories: ['Bakery', 'Cakes', 'Pastries'],
    description: 'Specializing in fresh cakes and pastries',
    openTime: '8:00 AM - 9:00 PM',
    deliveryTime: '45-60 mins',
    freeDelivery: false,
    verified: true
  },
  {
    id: 3,
    name: 'City Kirana',
    image: require('../assets/grocery shop.jpeg'),
    distance: '1.8 km away',
    rating: 4.3,
    reviews: 67,
    specialOffer: true,
    categories: ['Grocery', 'Bakery', 'General Store'],
    description: 'Local store with fresh baked goods and daily essentials',
    openTime: '6:00 AM - 11:00 PM',
    deliveryTime: '20-30 mins',
    freeDelivery: true,
    verified: false
  },
  {
    id: 4,
    name: 'Sweet Treats',
    image: require('../assets/groceryshop1.jpeg'),
    distance: '2.8 km away',
    rating: 4.6,
    reviews: 82,
    specialOffer: false,
    categories: ['Desserts', 'Cakes', 'Ice Cream'],
    description: 'Dessert paradise with wide variety of cakes and ice cream',
    openTime: '10:00 AM - 11:00 PM',
    deliveryTime: '40-50 mins',
    freeDelivery: false,
    verified: true
  },
  {
    id: 5,
    name: 'Cupcake Corner',
    image: require('../assets/groceryshop1.jpeg'),
    distance: '1.5 km away',
    rating: 4.8,
    reviews: 156,
    specialOffer: true,
    categories: ['Bakery', 'Cupcakes', 'Custom Cakes'],
    description: 'Specialty cupcake store with custom designs',
    openTime: '9:00 AM - 10:00 PM',
    deliveryTime: '25-35 mins',
    freeDelivery: true,
    verified: true
  },
  {
    id: 6,
    name: 'Green Valley Fruits',
    image: require('../assets/groceryshop1.jpeg'),
    distance: '1.2 km away',
    rating: 4.5,
    reviews: 234,
    specialOffer: true,
    categories: ['Fruits', 'Vegetables', 'Organic'],
    description: 'Fresh organic fruits and vegetables daily',
    openTime: '6:00 AM - 9:00 PM',
    deliveryTime: '15-25 mins',
    freeDelivery: true,
    verified: true
  },
  {
    id: 7,
    name: 'Fresh Mart',
    image: require('../assets/groceryshop1.jpeg'),
    distance: '2.3 km away',
    rating: 4.3,
    reviews: 189,
    specialOffer: false,
    categories: ['Grocery', 'Fruits', 'Vegetables'],
    description: 'Complete grocery store with fresh produce',
    openTime: '7:00 AM - 10:00 PM',
    deliveryTime: '30-40 mins',
    freeDelivery: false,
    verified: false
  },
  {
    id: 8,
    name: 'Veggie World',
    image: require('../assets/groceryshop1.jpeg'),
    distance: '1.8 km away',
    rating: 4.4,
    reviews: 145,
    specialOffer: true,
    categories: ['Vegetables', 'Organic', 'Herbs'],
    description: 'Specialized in fresh vegetables and herbs',
    openTime: '6:30 AM - 8:30 PM',
    deliveryTime: '20-30 mins',
    freeDelivery: true,
    verified: true
  },
  {
    id: 9,
    name: 'Dairy Fresh',
    image: require('../assets/groceryshop1.jpeg'),
    distance: '0.8 km away',
    rating: 4.6,
    reviews: 298,
    specialOffer: true,
    categories: ['Dairy', 'Milk', 'Cheese'],
    description: 'Fresh dairy products delivered daily',
    openTime: '5:00 AM - 10:00 PM',
    deliveryTime: '10-20 mins',
    freeDelivery: true,
    verified: true
  },
  {
    id: 10,
    name: 'Artisan Bakery',
    image: require('../assets/groceryshop1.jpeg'),
    distance: '2.7 km away',
    rating: 4.8,
    reviews: 167,
    specialOffer: false,
    categories: ['Artisan Bread', 'Pastries', 'Coffee'],
    description: 'Handcrafted breads and pastries with coffee',
    openTime: '7:00 AM - 8:00 PM',
    deliveryTime: '35-45 mins',
    freeDelivery: false,
    verified: true
  }
];

export const mockPosts = [
  {
    id: 1,
    type: 'user_post',
    content: 'Where can I get a good custom birthday cake near me? Looking for something special for my daughter\'s 5th birthday! 🎂',
    timestamp: '2 hours ago',
    likes: 15,
    comments: 8,
    shares: 2,
    user: {
      name: 'Sarah Johnson',
      type: 'Customer',
      avatar: '👩‍💼',
      verified: false
    },
    tags: ['cake', 'birthday', 'custom']
  },
  {
    id: 2,
    type: 'shop_offer',
    content: '🎉 Special offer on all our chocolate cakes this week! Get 20% off on orders above ₹500. Limited time offer! 🎉',
    timestamp: '3 hours ago',
    likes: 45,
    comments: 12,
    shares: 8,
    shop: {
      name: 'Modern Bakery',
      verified: true,
      avatar: '🏪',
      rating: 4.5
    },
    image: '🎂',
    tags: ['offer', 'chocolate', 'cake', 'discount']
  },
  {
    id: 3,
    type: 'user_post',
    content: 'Just tried the Black Forest cake from Delicious Cakes. Absolutely amazing! The cherry topping was perfect 😋 Highly recommended!',
    timestamp: '5 hours ago',
    likes: 28,
    comments: 6,
    shares: 3,
    user: {
      name: 'Mike Chen',
      type: 'Customer',
      avatar: '👨‍💻',
      verified: false
    },
    tags: ['review', 'black forest', 'cake']
  },
  {
    id: 4,
    type: 'shop_offer',
    content: 'New! Introducing our signature Red Velvet Cake. Made with premium ingredients and cream cheese frosting. Limited time offer - Try it today!',
    timestamp: '6 hours ago',
    likes: 52,
    comments: 18,
    shares: 12,
    shop: {
      name: 'Delicious Cakes',
      verified: true,
      avatar: '🏪',
      rating: 4.7
    },
    image: '🍰',
    tags: ['new', 'red velvet', 'cake', 'premium']
  },
  {
    id: 5,
    type: 'user_post',
    content: 'Looking for fresh organic vegetables. Any recommendations for good stores with home delivery? 🥬🥕',
    timestamp: '8 hours ago',
    likes: 12,
    comments: 15,
    shares: 1,
    user: {
      name: 'Priya Sharma',
      type: 'Customer',
      avatar: '👩‍🌾',
      verified: false
    },
    tags: ['vegetables', 'organic', 'delivery']
  },
  {
    id: 6,
    type: 'shop_offer',
    content: 'Fresh avocados just arrived! 🥑 Perfect for your healthy breakfast. Get them while they\'re fresh. Free delivery on orders above ₹200!',
    timestamp: '10 hours ago',
    likes: 34,
    comments: 7,
    shares: 5,
    shop: {
      name: 'Green Valley Fruits',
      verified: true,
      avatar: '🏪',
      rating: 4.5
    },
    image: '🥑',
    tags: ['avocado', 'fresh', 'healthy', 'delivery']
  },
  {
    id: 7,
    type: 'user_post',
    content: 'Best place for artisan bread in the city? I\'m looking for good sourdough and whole grain options 🍞',
    timestamp: '12 hours ago',
    likes: 19,
    comments: 11,
    shares: 2,
    user: {
      name: 'David Wilson',
      type: 'Customer',
      avatar: '👨‍🍳',
      verified: false
    },
    tags: ['bread', 'artisan', 'sourdough']
  },
  {
    id: 8,
    type: 'shop_offer',
    content: 'Farm fresh milk delivered daily! 🥛 Now offering organic milk from grass-fed cows. Subscribe for daily delivery and save 15%!',
    timestamp: '1 day ago',
    likes: 67,
    comments: 23,
    shares: 15,
    shop: {
      name: 'Dairy Fresh',
      verified: true,
      avatar: '🏪',
      rating: 4.6
    },
    image: '🥛',
    tags: ['milk', 'organic', 'fresh', 'subscription']
  },
  {
    id: 9,
    type: 'user_post',
    content: 'Tried the new cupcakes from Cupcake Corner today. The red velvet ones are to die for! 🧁 Perfect for my office party.',
    timestamp: '1 day ago',
    likes: 41,
    comments: 9,
    shares: 4,
    user: {
      name: 'Lisa Anderson',
      type: 'Customer',
      avatar: '👩‍💼',
      verified: false
    },
    tags: ['cupcake', 'red velvet', 'review']
  },
  {
    id: 10,
    type: 'shop_offer',
    content: 'Weekend Special! 🌟 All pastries at 30% off. Perfect for your weekend treats. Visit us or order online for home delivery!',
    timestamp: '2 days ago',
    likes: 89,
    comments: 31,
    shares: 22,
    shop: {
      name: 'Sweet Treats',
      verified: true,
      avatar: '🏪',
      rating: 4.6
    },
    image: '🥐',
    tags: ['weekend', 'pastry', 'discount', 'special']
  }
];

// Helper functions for filtering and searching
export const searchProducts = (query, filters = {}, sortBy = 'Relevance') => {
  let results = mockProducts;

  // Text search
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase().trim();
    results = results.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.shop.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Apply filters
  if (filters.price && filters.price.length > 0) {
    results = results.filter(product => {
      const price = parseInt(product.price.replace('₹', '').replace(',', ''));
      return filters.price.some(filter => {
        if (filter === 'Under ₹100') return price < 100;
        if (filter === 'Under ₹200') return price < 200;
        if (filter === '₹200-₹500') return price >= 200 && price <= 500;
        if (filter === 'Over ₹500') return price > 500;
        return true;
      });
    });
  }

  if (filters.rating && filters.rating.length > 0) {
    results = results.filter(product => {
      return filters.rating.some(filter => {
        if (filter === '3+ Stars') return product.rating >= 3;
        if (filter === '4+ Stars') return product.rating >= 4;
        if (filter === '4.5+ Stars') return product.rating >= 4.5;
        return true;
      });
    });
  }

  if (filters.availability && filters.availability.length > 0) {
    results = results.filter(product => {
      return filters.availability.some(filter => {
        if (filter === 'In Stock') return product.inStock;
        if (filter === 'Same Day Delivery') return product.sameDay;
        if (filter === 'Next Day Delivery') return true; // Assume all have next day
        return true;
      });
    });
  }

  if (filters.delivery && filters.delivery.length > 0) {
    results = results.filter(product => {
      return filters.delivery.some(filter => {
        if (filter === 'Free Delivery') return product.freeDelivery;
        if (filter === 'Express Delivery') return product.sameDay;
        if (filter === 'Store Pickup') return true; // Assume all allow pickup
        return true;
      });
    });
  }

  // Apply sorting
  switch (sortBy) {
    case 'Price: Low to High':
      results.sort((a, b) => {
        const priceA = parseInt(a.price.replace('₹', '').replace(',', ''));
        const priceB = parseInt(b.price.replace('₹', '').replace(',', ''));
        return priceA - priceB;
      });
      break;
    case 'Price: High to Low':
      results.sort((a, b) => {
        const priceA = parseInt(a.price.replace('₹', '').replace(',', ''));
        const priceB = parseInt(b.price.replace('₹', '').replace(',', ''));
        return priceB - priceA;
      });
      break;
    case 'Rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'Distance':
      results.sort((a, b) => {
        const distanceA = parseFloat(a.distance.replace(' km', ''));
        const distanceB = parseFloat(b.distance.replace(' km', ''));
        return distanceA - distanceB;
      });
      break;
    case 'Newest First':
      // For demo, we'll reverse the array
      results.reverse();
      break;
    default: // 'Relevance'
      // Keep original order for relevance
      break;
  }

  return results;
};

export const searchShops = (query, sortBy = 'Relevance') => {
  let results = mockShops;

  // Text search
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase().trim();
    results = results.filter(shop => 
      shop.name.toLowerCase().includes(searchTerm) ||
      shop.description.toLowerCase().includes(searchTerm) ||
      shop.categories.some(category => 
        category.toLowerCase().includes(searchTerm)
      )
    );
  }

  // Apply sorting
  switch (sortBy) {
    case 'Rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'Distance':
      results.sort((a, b) => {
        const distanceA = parseFloat(a.distance.replace(' km away', ''));
        const distanceB = parseFloat(b.distance.replace(' km away', ''));
        return distanceA - distanceB;
      });
      break;
    case 'Reviews':
      results.sort((a, b) => b.reviews - a.reviews);
      break;
    default: // 'Relevance'
      // Keep original order for relevance
      break;
  }

  return results;
};

export const searchPosts = (query, sortBy = 'Relevance') => {
  let results = mockPosts;

  // Text search
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase().trim();
    results = results.filter(post => 
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      (post.shop && post.shop.name.toLowerCase().includes(searchTerm)) ||
      (post.user && post.user.name.toLowerCase().includes(searchTerm))
    );
  }

  // Apply sorting
  switch (sortBy) {
    case 'Newest First':
      results.sort((a, b) => {
        const timeA = a.timestamp.includes('hour') 
          ? parseInt(a.timestamp) 
          : a.timestamp.includes('day') 
            ? parseInt(a.timestamp) * 24
            : parseInt(a.timestamp) * 60;
        const timeB = b.timestamp.includes('hour') 
          ? parseInt(b.timestamp) 
          : b.timestamp.includes('day') 
            ? parseInt(b.timestamp) * 24
            : parseInt(b.timestamp) * 60;
        return timeA - timeB;
      });
      break;
    case 'Most Liked':
      results.sort((a, b) => b.likes - a.likes);
      break;
    case 'Most Commented':
      results.sort((a, b) => b.comments - a.comments);
      break;
    default: // 'Relevance'
      // Keep original order for relevance
      break;
  }

  return results;
};
