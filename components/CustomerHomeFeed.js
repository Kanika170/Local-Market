import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/useTheme';
import BottomNavigationBar from './BottomNavigationBar';
import SafeAreaWrapper from './common/SafeAreaWrapper';
import LocationHeader from './common/LocationHeader';
import FeedSection from './feed/FeedSection';
import EventsSection from './feed/EventsSection';
import ProductsSection from './feed/ProductsSection';
import { FeedInteractionProvider } from '../context/FeedInteractionContext';
import { ShoppingListProvider } from '../context/ShoppingListContext';
import { LocationProvider } from '../context/LocationContext';
import ProductDetailScreen from './ProductDetailScreen';
import ShopDetailScreen from './ShopDetailScreen';
import { generateFeedData, nearbyEvents, popularProducts } from '../data/feedData';

const CustomerHomeFeed = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const navigation = useNavigation();
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  const handleProductPress = (product) => {
    const enhancedProduct = {
      ...product,
      id: product.id || Date.now(),
      shop: product.shop || 'Local Shop',
      category: product.category || 'General',
      name: product.name || 'Product',
      price: product.price || '₹0',
      description: product.description || 'No description available',
      rating: product.rating || 4.0,
      reviews: product.reviews || 0,
      image: product.image || '📦',
      inStock: product.inStock !== false,
      stockCount: product.stockCount || 10,
      features: product.features || [],
      specifications: product.specifications || {}
    };
    setSelectedProduct(enhancedProduct);
  };

  const handleShopPress = (shop) => {
    const shopData = {
      id: shop.id || Date.now(),
      name: shop.name || 'Local Shop',
      rating: shop.rating || 4.0,
      reviews: shop.reviews || 0,
      location: '123 Market Street, Downtown',
      distance: '2.3 miles away',
      hours: {
        weekday: '8:00 AM - 9:00 PM',
        weekend: '9:00 AM - 7:00 PM'
      },
      avatar: shop.avatar || '🏪',
      verified: shop.verified || false,
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

  // Generate dynamic feed data
  const feedData = generateFeedData();

  return (
    <LocationProvider>
      <ShoppingListProvider>
        <FeedInteractionProvider>
          <SafeAreaWrapper edges={['top']} statusBarStyle="light-content">
            <View style={styles.container}>
              <LocationHeader navigation={navigation} />

              <ScrollView 
                style={styles.content} 
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
              >
                <FeedSection 
                  feedData={feedData}
                  onProductPress={handleProductPress}
                  onShopPress={handleShopPress}
                />

                <EventsSection 
                  events={nearbyEvents}
                  onEventPress={handleProductPress}
                />

                <ProductsSection 
                  products={popularProducts}
                  onProductPress={handleProductPress}
                />
              </ScrollView>

              <BottomNavigationBar navigation={navigation} activeTab="Home" />
            </View>
          </SafeAreaWrapper>
        </FeedInteractionProvider>
      </ShoppingListProvider>
    </LocationProvider>
  );
};

const createStyles = (theme, insets) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Math.max(insets.bottom, Platform.OS === 'ios' ? 100 : 85),
  },
});

export default CustomerHomeFeed;
