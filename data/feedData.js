// Comprehensive feed data with 100+ items
export const generateFeedData = () => {
  const categories = ['Groceries', 'Electronics', 'Fashion', 'Home & Garden', 'Health & Beauty', 'Sports', 'Books', 'Toys', 'Automotive', 'Food & Beverages'];
  const shops = [
    { name: 'Green Market', verified: true, avatar: '🏪', rating: 4.5 },
    { name: 'Tech World', verified: true, avatar: '💻', rating: 4.8 },
    { name: 'Fashion Hub', verified: false, avatar: '👗', rating: 4.2 },
    { name: 'Home Essentials', verified: true, avatar: '🏠', rating: 4.6 },
    { name: 'Beauty Corner', verified: false, avatar: '💄', rating: 4.3 },
    { name: 'Sports Zone', verified: true, avatar: '⚽', rating: 4.7 },
    { name: 'Book Haven', verified: false, avatar: '📚', rating: 4.4 },
    { name: 'Toy Kingdom', verified: true, avatar: '🧸', rating: 4.5 },
    { name: 'Auto Parts Plus', verified: false, avatar: '🚗', rating: 4.1 },
    { name: 'Fresh Foods', verified: true, avatar: '🍎', rating: 4.9 }
  ];

  const users = [
    { name: 'Sarah Johnson', type: 'Customer', avatar: '👩‍💼' },
    { name: 'Mike Chen', type: 'Customer', avatar: '👨‍💻' },
    { name: 'Emily Davis', type: 'Customer', avatar: '👩‍🎓' },
    { name: 'Alex Rodriguez', type: 'Customer', avatar: '👨‍🍳' },
    { name: 'Lisa Wang', type: 'Customer', avatar: '👩‍⚕️' },
    { name: 'David Kumar', type: 'Customer', avatar: '👨‍🏫' },
    { name: 'Anna Smith', type: 'Customer', avatar: '👩‍🎨' },
    { name: 'John Wilson', type: 'Customer', avatar: '👨‍🔧' }
  ];

  const products = [
    { name: 'Organic Honey', price: '₹299', category: 'Groceries', image: '🍯', description: 'Pure organic honey from local farms' },
    { name: 'Wireless Headphones', price: '₹2,999', category: 'Electronics', image: '🎧', description: 'Noise-cancelling wireless headphones' },
    { name: 'Cotton T-Shirt', price: '₹599', category: 'Fashion', image: '👕', description: 'Premium cotton casual t-shirt' },
    { name: 'LED Desk Lamp', price: '₹1,299', category: 'Home & Garden', image: '💡', description: 'Adjustable LED desk lamp with USB charging' },
    { name: 'Face Moisturizer', price: '₹899', category: 'Health & Beauty', image: '🧴', description: 'Hydrating face moisturizer for all skin types' },
    { name: 'Yoga Mat', price: '₹1,199', category: 'Sports', image: '🧘', description: 'Non-slip yoga mat with carrying strap' },
    { name: 'Programming Book', price: '₹799', category: 'Books', image: '📖', description: 'Learn modern programming techniques' },
    { name: 'Building Blocks', price: '₹1,499', category: 'Toys', image: '🧱', description: 'Educational building blocks set' },
    { name: 'Car Phone Mount', price: '₹399', category: 'Automotive', image: '📱', description: 'Universal car phone mount holder' },
    { name: 'Green Tea', price: '₹249', category: 'Food & Beverages', image: '🍵', description: 'Premium green tea leaves' }
  ];

  const postTypes = ['user_post', 'shop_offer', 'product_showcase', 'shop_update'];
  const feedData = [];

  // Generate 120 feed items
  for (let i = 1; i <= 120; i++) {
    const type = postTypes[Math.floor(Math.random() * postTypes.length)];
    const isShopPost = type !== 'user_post';
    const author = isShopPost ? shops[Math.floor(Math.random() * shops.length)] : users[Math.floor(Math.random() * users.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const timeAgo = Math.floor(Math.random() * 1440); // Random time up to 24 hours ago

    const getTimeString = (minutes) => {
      if (minutes < 60) return `${minutes} min ago`;
      if (minutes < 1440) return `${Math.floor(minutes / 60)} hr ago`;
      return `${Math.floor(minutes / 1440)} day ago`;
    };

    let feedItem = {
      id: i,
      type: type,
      likes: Math.floor(Math.random() * 50) + 1,
      comments: Math.floor(Math.random() * 20) + 1,
      shares: Math.floor(Math.random() * 10) + 1,
      timestamp: new Date(Date.now() - timeAgo * 60000).toISOString()
    };

    if (isShopPost) {
      feedItem.shop = {
        ...author,
        time: getTimeString(timeAgo)
      };

      switch (type) {
        case 'shop_offer':
          feedItem.content = `Special offer! ${Math.floor(Math.random() * 50) + 10}% off on ${product.name}. Limited time only!`;
          feedItem.offer = {
            title: `${Math.floor(Math.random() * 50) + 10}% Off`,
            validity: `Valid until ${new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}`,
            originalPrice: product.price,
            discountedPrice: `₹${Math.floor(parseInt(product.price.replace('₹', '').replace(',', '')) * 0.8)}`
          };
          feedItem.image = product.image;
          feedItem.product = product;
          break;

        case 'product_showcase':
          feedItem.content = `New arrival! Check out our latest ${product.name}. ${product.description}`;
          feedItem.image = product.image;
          feedItem.product = product;
          break;

        case 'shop_update':
          const updates = [
            'We are now open for extended hours!',
            'New stock arrived! Come check out our latest collection.',
            'Thank you for your continued support!',
            'Special weekend hours: 9 AM - 10 PM',
            'Free delivery available for orders above ₹500'
          ];
          feedItem.content = updates[Math.floor(Math.random() * updates.length)];
          break;
      }
    } else {
      feedItem.user = {
        ...author,
        time: getTimeString(timeAgo)
      };

      const userPosts = [
        `Looking for ${product.name} in the ${categories[Math.floor(Math.random() * categories.length)]} category. Any recommendations?`,
        `Just bought ${product.name} from ${shops[Math.floor(Math.random() * shops.length)].name}. Great quality!`,
        `Does anyone know where I can find ${product.name} at a good price?`,
        `Highly recommend ${product.name}! Worth every penny.`,
        `Can someone suggest a good shop for ${categories[Math.floor(Math.random() * categories.length)]} items?`
      ];

      feedItem.content = userPosts[Math.floor(Math.random() * userPosts.length)];
      
      if (Math.random() > 0.7) {
        feedItem.tags = [`#${categories[Math.floor(Math.random() * categories.length)].toLowerCase().replace(' & ', '').replace(' ', '')}`, `#${product.name.toLowerCase().replace(' ', '')}`];
      }
    }

    feedData.push(feedItem);
  }

  return feedData;
};

export const nearbyEvents = [
  {
    id: 1,
    title: 'Summer Sale',
    subtitle: 'Up to 50% off at Fashion Hub',
    distance: '0.5 miles away',
    image: '👕',
    startDate: '2024-01-15',
    endDate: '2024-01-31'
  },
  {
    id: 2,
    title: 'Tech Expo',
    subtitle: 'Latest gadgets at Tech World',
    distance: '1.2 miles away',
    image: '📱',
    startDate: '2024-01-20',
    endDate: '2024-01-22'
  },
  {
    id: 3,
    title: 'Organic Food Festival',
    subtitle: 'Fresh produce at Green Market',
    distance: '0.8 miles away',
    image: '🥬',
    startDate: '2024-01-18',
    endDate: '2024-01-25'
  },
  {
    id: 4,
    title: 'Home Decor Exhibition',
    subtitle: 'Beautiful items at Home Essentials',
    distance: '2.1 miles away',
    image: '🏠',
    startDate: '2024-01-22',
    endDate: '2024-01-28'
  }
];

export const popularProducts = [
  {
    id: 1,
    shop: 'Tech World',
    shopId: 2,
    category: 'Electronics',
    name: 'Wireless Headphones',
    price: '₹2,999',
    originalPrice: '₹3,999',
    discount: '25% Off',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.',
    rating: 4.8,
    reviews: 156,
    image: '🎧',
    inStock: true,
    stockCount: 25,
    features: ['Noise Cancelling', '30hr Battery', 'Wireless', 'Premium Sound'],
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '250g',
      'Warranty': '1 year'
    }
  },
  {
    id: 2,
    shop: 'Fashion Hub',
    shopId: 3,
    category: 'Fashion',
    name: 'Cotton T-Shirt',
    price: '₹599',
    originalPrice: '₹799',
    discount: '25% Off',
    description: 'Premium 100% cotton casual t-shirt available in multiple colors and sizes.',
    rating: 4.5,
    reviews: 89,
    image: '👕',
    inStock: true,
    stockCount: 50,
    features: ['100% Cotton', 'Multiple Colors', 'Comfortable Fit', 'Machine Washable'],
    specifications: {
      'Material': '100% Cotton',
      'Sizes': 'S, M, L, XL, XXL',
      'Colors': 'White, Black, Blue, Red',
      'Care': 'Machine Wash'
    }
  },
  {
    id: 3,
    shop: 'Green Market',
    shopId: 1,
    category: 'Groceries',
    name: 'Organic Honey',
    price: '₹299',
    originalPrice: '₹399',
    discount: '25% Off',
    description: 'Pure organic honey sourced directly from local farms. Rich in antioxidants and natural enzymes.',
    rating: 4.9,
    reviews: 234,
    image: '🍯',
    inStock: true,
    stockCount: 15,
    features: ['100% Organic', 'Local Farms', 'Rich in Antioxidants', 'Natural Enzymes'],
    specifications: {
      'Weight': '500g',
      'Source': 'Local Farms',
      'Type': 'Raw Honey',
      'Shelf Life': '2 years'
    }
  }
];
