export const mockFeedData = {
  communityPosts: [
    // Customer Posts (C2C content, B2C opportunity)
    {
      id: 1,
      type: 'customer_query',
      author: {
        id: 'customer_1',
        name: 'Priya Sharma',
        avatar: '👩',
        type: 'customer',
        location: 'Pimpri Colony'
      },
      content: 'Where can I find almond flour in Pimpri? Urgently need it for a cake. Any shops that deliver today?',
      timestamp: '2 hours ago',
      likes: 5,
      comments: 12,
      isUrgent: true,
      tags: ['almond flour', 'baking', 'delivery'],
      interactions: {
        canComment: true,
        canMessage: true,
        canShare: false
      }
    },
    {
      id: 2,
      type: 'customer_request',
      author: {
        id: 'customer_2',
        name: 'Rajesh Kumar',
        avatar: '👨',
        type: 'customer',
        location: 'Chinchwad'
      },
      content: 'Looking for a reliable shop that delivers fresh vegetables daily. Quality should be good and prices reasonable. Any recommendations?',
      timestamp: '4 hours ago',
      likes: 8,
      comments: 15,
      tags: ['vegetables', 'daily delivery', 'quality'],
      interactions: {
        canComment: true,
        canMessage: true,
        canShare: false
      }
    },
    {
      id: 3,
      type: 'customer_review',
      author: {
        id: 'customer_3',
        name: 'Anita Desai',
        avatar: '👩‍🦳',
        type: 'customer',
        location: 'Pimpri'
      },
      content: 'The new ice cream flavor at Modern Bakery is amazing! Tried their mango kulfi today - highly recommended! 🍦',
      timestamp: '6 hours ago',
      likes: 23,
      comments: 8,
      tags: ['ice cream', 'Modern Bakery', 'review'],
      rating: 5,
      interactions: {
        canComment: true,
        canMessage: false,
        canShare: true
      }
    },

    // Other Shopkeeper Posts (B2B opportunity)
    {
      id: 4,
      type: 'wholesale_offer',
      author: {
        id: 'shop_1',
        name: 'Gupta Wholesalers',
        avatar: '🏪',
        type: 'wholesaler',
        location: 'Market Yard',
        verified: true
      },
      content: 'Bulk deal on 50kg Toor Dal bags for local shopkeepers. Special rate ₹85/kg. Minimum order 10 bags. Message for prices and delivery details.',
      timestamp: '8 hours ago',
      likes: 12,
      comments: 6,
      tags: ['wholesale', 'toor dal', 'bulk deal'],
      offer: {
        product: 'Toor Dal',
        quantity: '50kg bags',
        price: '₹85/kg',
        minOrder: '10 bags'
      },
      interactions: {
        canComment: true,
        canMessage: true,
        canShare: true
      }
    },
    {
      id: 5,
      type: 'supply_request',
      author: {
        id: 'shop_2',
        name: 'Spice Garden Restaurant',
        avatar: '🍽️',
        type: 'restaurant',
        location: 'FC Road'
      },
      content: 'Seeking a daily supplier for 20 liters of milk and 5kg paneer. Need consistent quality and timely delivery. Any local dairies interested?',
      timestamp: '10 hours ago',
      likes: 7,
      comments: 9,
      tags: ['milk supplier', 'paneer', 'daily supply'],
      requirement: {
        items: ['20L milk daily', '5kg paneer daily'],
        type: 'regular supply'
      },
      interactions: {
        canComment: true,
        canMessage: true,
        canShare: true
      }
    },
    {
      id: 6,
      type: 'asset_sharing',
      author: {
        id: 'shop_3',
        name: 'Sharma Kirana Store',
        avatar: '🛒',
        type: 'kirana',
        location: 'Pimpri',
        verified: true
      },
      content: 'Our weighing scale is broken and repair will take 2 days. Can anyone lend us a spare digital scale for the day? Will return by evening.',
      timestamp: '12 hours ago',
      likes: 15,
      comments: 4,
      tags: ['weighing scale', 'help needed', 'equipment'],
      isUrgent: true,
      interactions: {
        canComment: true,
        canMessage: true,
        canShare: true
      }
    },

    // Event Announcements
    {
      id: 7,
      type: 'event_announcement',
      author: {
        id: 'admin_1',
        name: 'Pimpri-Chinchwad Municipal Corp',
        avatar: '🏛️',
        type: 'official',
        verified: true
      },
      content: 'Pimpri-Chinchwad is hosting a Diwali Mela next weekend at Central Park. Great opportunity for local businesses to participate. Registration open till tomorrow.',
      timestamp: '1 day ago',
      likes: 45,
      comments: 18,
      tags: ['Diwali Mela', 'business opportunity', 'event'],
      event: {
        name: 'Diwali Mela',
        date: 'Next Weekend',
        location: 'Central Park',
        registrationDeadline: 'Tomorrow'
      },
      interactions: {
        canComment: true,
        canMessage: false,
        canShare: true
      }
    },
    {
      id: 8,
      type: 'traffic_update',
      author: {
        id: 'admin_2',
        name: 'Traffic Police Pimpri',
        avatar: '🚦',
        type: 'official',
        verified: true
      },
      content: 'Road closed near City Pride theatre for Ganpati Visarjan from 6 PM to 10 PM today. Plan your deliveries accordingly.',
      timestamp: '3 hours ago',
      likes: 28,
      comments: 5,
      tags: ['traffic update', 'road closure', 'delivery planning'],
      isImportant: true,
      interactions: {
        canComment: true,
        canMessage: false,
        canShare: true
      }
    }
  ],

  myPosts: [
    {
      id: 101,
      type: 'new_arrival',
      content: 'Fresh Organic Produce just arrived! Strawberries, blueberries, and avocados - all locally sourced and pesticide-free. Limited quantities available!',
      images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'],
      timestamp: '4 hours ago',
      likes: 42,
      comments: 8,
      shares: 3,
      views: 156,
      taggedProducts: ['Organic Strawberries', 'Blueberries', 'Avocados'],
      performance: 'high'
    },
    {
      id: 102,
      type: 'special_offer',
      content: 'Buy 1 Get 1 Free on Sourdough Bread today only! Perfect for weekend brunches. Offer valid until 6 PM.',
      images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'],
      timestamp: '1 day ago',
      likes: 31,
      comments: 12,
      shares: 8,
      views: 203,
      offer: {
        title: 'Buy 1 Get 1 Free',
        validUntil: '6 PM Today'
      },
      performance: 'medium'
    }
  ],

  postTypes: [
    { id: 'general', title: 'General Post', icon: 'post', color: '#2196F3' },
    { id: 'offer', title: 'Special Offer', icon: 'tag', color: '#FF9800' },
    { id: 'new_arrival', title: 'New Arrival', icon: 'new-box', color: '#4CAF50' },
    { id: 'limited_stock', title: 'Limited Stock', icon: 'alert-circle', color: '#F44336' },
  ]
};

export const getPostTypeColor = (type) => {
  switch (type) {
    case 'customer_query':
    case 'customer_request':
      return '#2196F3'; // Blue for customer posts
    case 'customer_review':
      return '#4CAF50'; // Green for reviews
    case 'wholesale_offer':
    case 'supply_request':
      return '#FF9800'; // Orange for B2B
    case 'asset_sharing':
      return '#9C27B0'; // Purple for sharing
    case 'event_announcement':
      return '#673AB7'; // Deep purple for events
    case 'traffic_update':
      return '#F44336'; // Red for important updates
    case 'new_arrival':
      return '#4CAF50'; // Green for new arrivals
    case 'special_offer':
      return '#FF9800'; // Orange for offers
    default:
      return '#757575'; // Gray for general
  }
};

export const getPostTypeLabel = (type) => {
  switch (type) {
    case 'customer_query':
      return 'Customer Query';
    case 'customer_request':
      return 'Looking For';
    case 'customer_review':
      return 'Customer Review';
    case 'wholesale_offer':
      return 'Wholesale Offer';
    case 'supply_request':
      return 'Supply Needed';
    case 'asset_sharing':
      return 'Help Needed';
    case 'event_announcement':
      return 'Event';
    case 'traffic_update':
      return 'Traffic Update';
    case 'new_arrival':
      return 'New Arrival';
    case 'special_offer':
      return 'Special Offer';
    default:
      return 'Post';
  }
};
