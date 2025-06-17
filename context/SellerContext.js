import React, { createContext, useContext, useState } from 'react';
import { mockSellerData } from './mockSellerData';

const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
  // Initialize state with mock data
  const [shopData, setShopData] = useState(mockSellerData.shopData);
  const [analytics, setAnalytics] = useState(mockSellerData.analytics);
  const [notifications, setNotifications] = useState(mockSellerData.notifications);
  const [products, setProducts] = useState(mockSellerData.products);
  const [posts, setPosts] = useState(mockSellerData.posts);
  const [chats, setChats] = useState(mockSellerData.chats);

  const updateShopData = (data) => {
    setShopData(data);
  };

  const updateAnalytics = (newAnalytics) => {
    setAnalytics(prev => ({ ...prev, ...newAnalytics }));
  };

  const addProduct = (product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (productId, updates) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const createPost = (post) => {
    setPosts(prev => [post, ...prev]);
  };

  const addChat = (chat) => {
    setChats(prev => [...prev, chat]);
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  // Additional methods for better functionality
  const markChatAsRead = (chatId) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, unreadCount: 0, lastMessage: { ...chat.lastMessage, isRead: true } }
        : chat
    ));
  };

  const sendMessage = (chatId, message) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? {
            ...chat,
            lastMessage: {
              text: message,
              timestamp: new Date().toISOString(),
              isFromCustomer: false,
              isRead: true,
            },
          }
        : chat
    ));
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, isRead: true } : notif
    ));
  };

  const refreshAnalytics = () => {
    // In a real app, this would fetch new data from the backend
    setAnalytics(mockSellerData.analytics);
  };

  const value = {
    shopData,
    analytics,
    notifications,
    products,
    posts,
    chats,
    updateShopData,
    updateAnalytics,
    addProduct,
    updateProduct,
    deleteProduct,
    createPost,
    addChat,
    addNotification,
    markChatAsRead,
    sendMessage,
    markNotificationAsRead,
    refreshAnalytics,
  };

  return (
    <SellerContext.Provider value={value}>
      {children}
    </SellerContext.Provider>
  );
};

export const useSeller = () => {
  const context = useContext(SellerContext);
  if (!context) {
    throw new Error('useSeller must be used within a SellerProvider');
  }
  return context;
};

export default SellerContext;
