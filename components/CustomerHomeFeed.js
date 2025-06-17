import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/useTheme';
import BottomNavigationBar from './BottomNavigationBar';
import ProductDetailScreen from './ProductDetailScreen';
import ShopDetailScreen from './ShopDetailScreen';

const CustomerHomeFeed = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);

  const handleProductPress = (product) => {
    product = {
      id: 1,
      shop: 'Urban Outfitters',
      category: 'Fashion & Apparel',
      name: 'Leather Crossbody Bag',
      price: '$49.99',
      discount: '20% Off',
      description: 'Premium leather crossbody bag with adjustable strap and gold hardware.',
      rating: 4.5,
      reviews: 124,
      image: require('../assets/shopping bag.jpeg'),
    }
    setSelectedProduct(product || null);
  };

  const handleShopPress = (shop) => {
    const shopData = {
      id: 1,
      name: 'Green Grocery Store',
      rating: 4.5,
      reviews: 256,
      location: '123 Market Street, Downtown',
      distance: '2.3 miles away',
      hours: {
        weekday: '8:00 AM - 9:00 PM',
        weekend: '9:00 AM - 7:00 PM'
      },
      image: require('../assets/grocery shop.jpeg'),
    };
    setSelectedShop(shopData);
  };

  if (selectedProduct) {
    return (
      <ProductDetailScreen 
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  if (selectedShop) {
    return (
      <ShopDetailScreen
        shop={selectedShop}
        onBack={() => setSelectedShop(null)}
      />
    );
  }

  // Static data for the feed
  const feedData = [
    {
      id: 1,
      type: 'user_post',
      user: {
        name: 'Sarah Johnson',
        type: 'Customer',
        time: '35 min ago',
        avatar: '👩‍💼'
      },
      content: 'Looking for organic honey in the downtown area. Any shops have special offers this week?',
      tags: ['#organic', '#honey', '#downtown'],
      comments: 3
    },
    {
      id: 2,
      type: 'shop_offer',
      shop: {
        name: 'Green Market',
        verified: true,
        time: '1 hour ago',
        avatar: '🏪'
      },
      content: 'Weekend special! 20% off on all organic produce. Fresh vegetables and fruits just arrived!',
      image: '🥬🥕🍎',
      offer: {
        title: 'Weekend Offer',
        validity: 'Valid until Sunday'
      },
      comments: 8
    }
  ];

  const nearbyEvents = [
    {
      id: 1,
      title: 'Summer Sale',
      subtitle: 'Up to 50% off at Fashion',
      distance: '0.5 miles away',
      image: '👕'
    },
    {
      id: 2,
      title: 'Tech Expo',
      subtitle: 'Latest gadgets at TechWin',
      distance: '1.2 miles away',
      image: '📱'
    }
  ];

  const popularProducts = [
    {
      id: 1,
      shop: 'Urban Outfitters',
      category: 'Fashion & Apparel',
      name: 'Leather Crossbody Bag',
      price: '$49.99',
      discount: '20% Off',
      description: 'Premium leather crossbody bag with adjustable strap and gold hardware.',
      rating: 4.5,
      reviews: 124,
      image: '👜'
    },
    {
      id: 2,
      shop: 'TechWorld',
      category: 'Electronics',
      name: 'Wireless Headphones',
      price: '$129.99',
      tag: 'NEW',
      description: 'Noise-cancelling wireless headphones with 30-hour battery life.',
      rating: 4.8,
      reviews: 89,
      image: '🎧'
    }
  ];

  const renderFeedItem = (item) => {
    const isShopPost = item.type === 'shop_offer' || item.type === 'shop_response';
    const author = isShopPost ? item.shop : item.user;

    return (
      <View key={item.id} style={[styles.feedItem, isShopPost && styles.shopFeedItem]}>
        <View style={styles.feedHeader}>
          <Text style={styles.avatar}>{author.avatar}</Text>
          <TouchableOpacity 
            style={styles.authorInfo}
            onPress={() => isShopPost ? handleShopPress(item) : null}
          >
            <View style={styles.authorNameRow}>
              <Text style={styles.authorName}>{author.name}</Text>
              {author.verified && <Text style={styles.verifiedBadge}>Verified Shop</Text>}
            </View>
            <Text style={styles.authorMeta}>
              {author.type || 'Shop'} • {author.time}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.feedContent}>{item.content}</Text>

        {item.tags && (
          <View style={styles.tagsContainer}>
            {item.tags.map((tag, index) => (
              <Text key={index} style={styles.tag}>{tag}</Text>
            ))}
          </View>
        )}

        {item.image && (
          <View style={styles.imageContainer}>
            <Text style={styles.feedImage}>{item.image}</Text>
          </View>
        )}

        {item.offer && (
          <View style={styles.offerContainer}>
            <View style={styles.offerBadge}>
              <Text style={styles.offerTitle}>{item.offer.title}</Text>
              <Text style={styles.offerDetails}>
                {item.offer.validity || item.offer.deal}
              </Text>
            </View>
            <TouchableOpacity style={styles.offerButton}>
              <Text style={styles.offerButtonText}>
                {item.offer.deal ? 'Claim' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.feedActions}>
          <TouchableOpacity>
            <Text style={styles.actionText}>Comment ({item.comments})</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderProductCard = (product) => {
    return (
      <TouchableOpacity 
        key={product.id} 
        style={styles.productCard}
        onPress={() => handleProductPress(product)}
      >
        <View style={styles.productHeader}>
          <Text style={styles.productShop}>{product.shop}</Text>
          <Text style={styles.productCategory}>{product.category}</Text>
        </View>
        
        <View style={styles.productContent}>
          <Text style={styles.productImage}>{product.image}</Text>
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
            {product.discount && (
              <Text style={styles.productDiscount}>{product.discount}</Text>
            )}
            {product.tag && (
              <Text style={styles.productTag}>{product.tag}</Text>
            )}
            <Text style={styles.productDescription} numberOfLines={2}>
              {product.description}
            </Text>
            <Text style={styles.productRating}>⭐ {product.rating} ({product.reviews})</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerIcon}>🛍️</Text>
          <Text style={styles.headerTitle}>Shopping Companion</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('ChatScreen')}
          >
            <Text style={styles.headerIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('NotificationScreen')}
          >
            <Text style={styles.headerIcon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Feed</Text>
        {feedData.map(renderFeedItem)}

        <Text style={styles.sectionTitle}>Nearby Events</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.eventsContainer}>
          {nearbyEvents.map((event) => (
            <TouchableOpacity 
              key={event.id} 
              style={styles.eventCard}
              onPress={() => handleProductPress(event)}
            >
              <Text style={styles.eventImage}>{event.image}</Text>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
                <Text style={styles.eventDistance}>{event.distance}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Popular Products</Text>
        <View style={styles.productsGrid}>
          {popularProducts.map(renderProductCard)}
        </View>
      </ScrollView>

      <BottomNavigationBar navigation={navigation} activeTab="Home" />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: 50,
    paddingBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 20,
    marginRight: theme.spacing.s,
    color: theme.colors.text.inverse,
  },
  headerTitle: {
    color: theme.colors.text.inverse,
    ...theme.typography.h3,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: theme.borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.s,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    paddingBottom: Platform.OS === 'ios' ? 90 : 65,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.m,
  },
  feedItem: {
    backgroundColor: theme.components.card.backgroundColor,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
  },
  shopFeedItem: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  feedHeader: {
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
  },
  avatar: {
    fontSize: 24,
    marginRight: theme.spacing.m,
  },
  authorInfo: {
    flex: 1,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    ...theme.typography.body1,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  verifiedBadge: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.text.inverse,
    fontSize: 10,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.s,
    marginLeft: theme.spacing.s,
  },
  authorMeta: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  feedContent: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    lineHeight: 20,
    marginBottom: theme.spacing.m,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.m,
  },
  tag: {
    color: theme.colors.primary,
    ...theme.typography.caption,
    marginRight: theme.spacing.s,
    marginBottom: theme.spacing.xs,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  feedImage: {
    fontSize: 60,
  },
  offerContainer: {
    backgroundColor: theme.colors.secondary + '20',
    borderRadius: theme.borderRadius.s,
    padding: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  offerBadge: {
    flex: 1,
  },
  offerTitle: {
    ...theme.typography.body2,
    fontWeight: '600',
    color: theme.colors.secondary,
  },
  offerDetails: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  offerButton: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.xs,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  offerButtonText: {
    color: theme.colors.secondary,
    ...theme.typography.caption,
    fontWeight: '500',
  },
  feedActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surface,
  },
  actionText: {
    color: theme.colors.text.secondary,
    ...theme.typography.body2,
  },
  eventsContainer: {
    marginBottom: theme.spacing.l,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: theme.components.card.backgroundColor,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    marginRight: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
    width: 200,
  },
  eventImage: {
    fontSize: 40,
    marginRight: theme.spacing.m,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    ...theme.typography.body1,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  eventSubtitle: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  eventDistance: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginTop: theme.spacing.xs,
  },
  productCard: {
    backgroundColor: theme.components.card.backgroundColor,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
    elevation: 2,
    shadowColor: theme.components.card.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productHeader: {
    marginBottom: theme.spacing.m,
  },
  productShop: {
    ...theme.typography.body1,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  productCategory: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  productContent: {
    marginBottom: theme.spacing.m,
  },
  productImage: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: theme.spacing.m,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    ...theme.typography.body1,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  productPrice: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  productDiscount: {
    ...theme.typography.caption,
    color: theme.colors.secondary,
    backgroundColor: theme.colors.secondary + '20',
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  productTag: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    backgroundColor: theme.colors.ripple,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  productDescription: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    lineHeight: 16,
    marginBottom: theme.spacing.xs,
  },
  productRating: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  productsGrid: {
    marginBottom: theme.spacing.xl,
  },
});

export default CustomerHomeFeed;
