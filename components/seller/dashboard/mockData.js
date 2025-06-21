export const mockDashboardData = {
  shopData: {
    shopName: 'Modern Kirana Store',
    ownerName: 'Raj Kumar',
    isOpen: true,
  },
  
  notifications: [
    { id: 1, title: 'New Order', message: 'Order #123 received', isRead: false },
    { id: 2, title: 'Low Stock', message: 'Parle-G Biscuit running low', isRead: false },
    { id: 3, title: 'Review', message: 'New 5-star review received', isRead: true },
  ],
  
  stats: {
    todayVisits: 145,
    visitsChange: 15,
    newInquiries: 12,
    inquiriesChange: 8,
    topProduct: {
      name: 'Amul Taaza Milk',
      views: 48,
      image: 'https://example.com/milk.jpg',
    },
    pendingActions: 5,
    pendingChange: -2,
  },
  
  alerts: [
    {
      id: 1,
      type: 'critical',
      subType: 'low_stock',
      title: 'Low Stock Alert',
      message: 'The following products are running low on stock:',
      examples: [
        'Parle-G Biscuit - Only 3 units left',
        'Tata Salt - Only 5 units left',
      ],
      actionText: 'Manage Stock',
    },
    {
      id: 2,
      type: 'info',
      subType: 'performance',
      title: 'Performance Insight',
      message: 'Your post "Fresh Paneer Arrived" is getting a lot of views. Consider creating a "Deal of the Day" post for it to boost sales!',
      actionText: 'Create Post',
    },
  ],
  
  recentActivity: [
    {
      id: 1,
      type: 'review',
      message: 'Priya K. left a 5-star review',
      subtitle: 'for Fortune Sunlite Oil',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      link: 'reviews/123',
    },
    {
      id: 2,
      type: 'message',
      message: 'New message from Rohan S.',
      subtitle: 'regarding Lays Potato Chips',
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      link: 'chat/456',
    },
    {
      id: 3,
      type: 'like',
      message: 'Your post "Diwali Sale!" received 10 new likes',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      link: 'posts/789',
    },
    {
      id: 4,
      type: 'quote',
      message: 'New B2B quote request received',
      subtitle: 'from Gupta General Store',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      link: 'quotes/101',
    },
  ],
  
  analytics: {
    today: {
      sales: 15780,
      orders: 23,
      visitors: 145,
      newCustomers: 12,
    },
    thisMonth: {
      sales: 458900,
      orders: 678,
      growth: 12,
    },
    topProducts: [
      { id: 1, name: 'Amul Taaza Milk', sales: 48 },
      { id: 2, name: 'Fortune Oil', sales: 35 },
      { id: 3, name: 'Tata Salt', sales: 30 },
    ],
  },
};
