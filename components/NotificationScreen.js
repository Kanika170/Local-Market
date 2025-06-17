import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('All');

  const notifications = [
    {
      id: 1,
      type: 'price_drop',
      title: 'Price Drop',
      content: 'Sony WH-1000XM4 is now $50 cheaper at ElectroMart!',
      time: '2h ago',
      oldPrice: '$349.99',
      newPrice: '$299.99',
      image: '🎧',
      action: 'View Product'
    },
    {
      id: 2,
      type: 'shop_post',
      title: 'Shop Post',
      content: 'Fresh Harvest: "Weekend special! 20% off on all organic produce. Valid until Sunday!"',
      time: '5h ago',
      image: '🥬',
      action: 'Visit Shop'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message',
      content: 'Tech Haven: "Yes, we have the iPhone 13 Pro in stock. We close at 8pm today."',
      time: 'Yesterday',
      image: '📱',
      action: 'Reply'
    },
    {
      id: 4,
      type: 'stock',
      title: 'Back in Stock',
      content: 'Nike Air Max 270 (Size 10) is back in stock at SportCity!',
      time: 'Yesterday',
      image: '👟',
      action: 'View Product'
    }
  ];

  const renderNotificationCard = (notification) => {
    return (
      <View key={notification.id} style={styles.notificationCard}>
        <View style={styles.notificationHeader}>
          <View style={styles.imageContainer}>
            <Text style={styles.notificationImage}>{notification.image}</Text>
          </View>
          <View style={styles.notificationContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.notificationType}>{notification.title}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
            <Text style={styles.notificationText}>{notification.content}</Text>
            {notification.type === 'price_drop' && (
              <View style={styles.priceContainer}>
                <Text style={styles.oldPrice}>{notification.oldPrice}</Text>
                <Text style={styles.newPrice}>{notification.newPrice}</Text>
              </View>
            )}
          </View>
        </View>
          <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => {
            if (notification.type === 'shop_post') {
              navigation.navigate('ShopNotificationScreen');
            } else if (notification.action === 'Reply') {
              navigation.navigate('ChatScreen');
            }
          }}
        >
          <Text style={styles.actionButtonText}>{notification.action}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Text style={styles.headerSubtitle}>Stay updated with your tracked items and messages</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {['All', 'Products', 'Shops', 'Chats'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.notificationsList}>
        {notifications.map(renderNotificationCard)}
        
        {/* Limited Time Offer */}
        <View style={styles.limitedOfferCard}>
          <Text style={styles.limitedOfferTitle}>Limited Time Offer</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#9C27B0',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#9C27B0',
  },
  tabText: {
    fontSize: 16,
    color: '#666666',
  },
  activeTabText: {
    color: '#9C27B0',
    fontWeight: '600',
  },
  notificationsList: {
    flex: 1,
    padding: 16,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  notificationHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationImage: {
    fontSize: 24,
  },
  notificationContent: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9C27B0',
  },
  notificationTime: {
    fontSize: 12,
    color: '#666666',
  },
  notificationText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  oldPrice: {
    fontSize: 14,
    color: '#666666',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  newPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9C27B0',
  },
  actionButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  limitedOfferCard: {
    backgroundColor: '#FFB74D',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  limitedOfferTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default NotificationScreen;
