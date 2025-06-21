import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ActivityScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createSellerStyles(theme);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const activities = [
    {
      id: 1,
      type: 'review',
      title: 'New Review Received',
      description: 'Priya K. left a 5-star review for Fortune Sunlite Oil',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      icon: 'star',
      color: theme.colors.warning,
      link: 'reviews/123',
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      description: 'Rohan S. asked about Lays Potato Chips availability',
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      icon: 'message-text',
      color: theme.colors.primary,
      link: 'chat/456',
    },
    {
      id: 3,
      type: 'like',
      title: 'Post Engagement',
      description: 'Your "Diwali Sale!" post received 10 new likes',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      icon: 'heart',
      color: theme.colors.error,
      link: 'posts/789',
    },
    {
      id: 4,
      type: 'order',
      title: 'New Order',
      description: 'Order #ORD-001 placed by Amit Kumar (₹450)',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      icon: 'shopping',
      color: theme.colors.success,
      link: 'orders/001',
    },
    {
      id: 5,
      type: 'quote',
      title: 'B2B Quote Request',
      description: 'Gupta General Store requested quote for bulk items',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      icon: 'file-document',
      color: theme.colors.info,
      link: 'quotes/101',
    },
    {
      id: 6,
      type: 'product',
      title: 'Product Added',
      description: 'Successfully added "Britannia Good Day Cookies" to inventory',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      icon: 'package-variant',
      color: theme.colors.secondary,
      link: 'products/new',
    },
    {
      id: 7,
      type: 'visitor',
      title: 'Shop Visit',
      description: '5 new customers visited your shop profile',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      icon: 'eye',
      color: theme.colors.primary,
      link: 'analytics/visitors',
    },
    {
      id: 8,
      type: 'stock',
      title: 'Stock Alert',
      description: 'Maggi Noodles stock is running low (8 units left)',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      icon: 'alert-circle',
      color: theme.colors.warning,
      link: 'stock/low',
    },
    {
      id: 9,
      type: 'post',
      title: 'Post Published',
      description: 'Your "Fresh Vegetables Arrived" post is now live',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      icon: 'post',
      color: theme.colors.secondary,
      link: 'posts/fresh-vegetables',
    },
    {
      id: 10,
      type: 'payment',
      title: 'Payment Received',
      description: 'Payment of ₹1,250 received for Order #ORD-002',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      icon: 'currency-inr',
      color: theme.colors.success,
      link: 'payments/002',
    },
  ];

  const filters = [
    { id: 'all', label: 'All', icon: 'view-grid' },
    { id: 'order', label: 'Orders', icon: 'shopping' },
    { id: 'message', label: 'Messages', icon: 'message-text' },
    { id: 'review', label: 'Reviews', icon: 'star' },
    { id: 'product', label: 'Products', icon: 'package-variant' },
  ];

  const getFilteredActivities = () => {
    if (selectedFilter === 'all') return activities;
    return activities.filter(activity => activity.type === selectedFilter);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const handleActivityPress = (activity) => {
    if (activity.link) {
      const [screen, params] = activity.link.split('/');
      switch (screen) {
        case 'reviews':
          navigation.navigate('Settings', { screen: 'Reviews' });
          break;
        case 'chat':
          navigation.navigate('Chat', { screen: 'ChatDashboard' });
          break;
        case 'posts':
          navigation.navigate('Feed', { screen: 'Feed' });
          break;
        case 'orders':
          navigation.navigate('Dashboard', { screen: 'Orders' });
          break;
        case 'products':
          navigation.navigate('Products', { screen: 'ProductsList' });
          break;
        case 'analytics':
          navigation.navigate('Dashboard', { screen: 'Analytics', params: { tab: 'visitors' } });
          break;
        case 'stock':
          navigation.navigate('Products', { screen: 'StockManagement' });
          break;
        default:
          console.log('Navigate to:', screen, params);
      }
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const ActivityItem = ({ activity }) => (
    <TouchableOpacity 
      style={[styles.card, { 
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: activity.color,
      }]}
      onPress={() => handleActivityPress(activity)}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: `${activity.color}20`,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}>
          <Icon name={activity.icon} size={20} color={activity.color} />
        </View>
        
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Text style={[styles.cardTitle, { flex: 1 }]}>{activity.title}</Text>
            <Text style={[styles.cardSubtitle, { fontSize: 11 }]}>
              {formatTimestamp(activity.timestamp)}
            </Text>
          </View>
          <Text style={[styles.cardSubtitle, { marginTop: 4 }]}>
            {activity.description}
          </Text>
        </View>
        
        <Icon name="chevron-right" size={16} color={theme.colors.text.tertiary} style={{ marginLeft: 8 }} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: 50 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recent Activity</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Filters */}
      <View style={{ 
        flexDirection: 'row', 
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
      }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: selectedFilter === filter.id ? theme.colors.primary : 'transparent',
                borderRadius: 16,
                paddingHorizontal: 12,
                paddingVertical: 6,
                marginRight: 8,
                borderWidth: 1,
                borderColor: selectedFilter === filter.id ? theme.colors.primary : theme.colors.border,
              }}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Icon 
                name={filter.icon} 
                size={16} 
                color={selectedFilter === filter.id ? theme.colors.white : theme.colors.text.primary} 
              />
              <Text style={{
                marginLeft: 4,
                fontSize: 12,
                color: selectedFilter === filter.id ? theme.colors.white : theme.colors.text.primary,
              }}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Activity List */}
      <ScrollView 
        style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {getFilteredActivities().map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
        
        {getFilteredActivities().length === 0 && (
          <View style={{ 
            alignItems: 'center', 
            justifyContent: 'center', 
            paddingVertical: 60 
          }}>
            <Icon name="history" size={60} color={theme.colors.text.tertiary} />
            <Text style={[styles.cardTitle, { marginTop: 16, textAlign: 'center' }]}>
              No activities found
            </Text>
            <Text style={[styles.cardSubtitle, { textAlign: 'center', marginTop: 8 }]}>
              Activities will appear here as they happen
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ActivityScreen;
