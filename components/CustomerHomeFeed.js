import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Animated, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTheme } from '../theme/useTheme';
import FeedSection from './feed/FeedSection';
import EventsSection from './feed/EventsSection';
import ProductsSection from './feed/ProductsSection';
import { FeedInteractionProvider } from '../context/FeedInteractionContext';
import { ShoppingListProvider } from '../context/ShoppingListContext';
import { LocationProvider } from '../context/LocationContext';
import ProductDetailScreen from './ProductDetailScreen';
import ShopDetailScreen from './ShopDetailScreen';
import ScreenWrapper from './common/ScreenWrapper';
import LocationHeader from './common/LocationHeader';
import { generateFeedData, nearbyEvents, popularProducts } from '../data/feedData';

const CustomerHomeFeed = () => {
  const {
    handleScroll,
    scrollEventThrottle,
    bottomBarTranslateY
  } = useScrollAnimation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);
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

  const [feedData, setFeedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeFeed = async () => {
      setIsLoading(true);
      const data = generateFeedData();
      setFeedData(data);
      setIsLoading(false);
    };
    
    initializeFeed();
  }, []);

  // Memoize sections to prevent unnecessary re-renders
  const renderSections = useMemo(() => (
    <>
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
    </>
  ), [feedData, handleProductPress, handleShopPress]);

  return (
    <LocationProvider>
      <ShoppingListProvider>
        <FeedInteractionProvider>
          {selectedProduct ? (
            <ProductDetailScreen 
              product={selectedProduct}
              onBack={() => setSelectedProduct(null)}
            />
          ) : selectedShop ? (
            <ShopDetailScreen
              shop={selectedShop}
              onBack={() => setSelectedShop(null)}
            />
          ) : (
            <ScreenWrapper
              header={<LocationHeader navigation={navigation} />}
              showBottomNav={true}
              bottomNavProps={{
                navigation,
                activeTab: 'Home',
                translateY: bottomBarTranslateY
              }}
              statusBarStyle="light-content"
            >
              <Animated.ScrollView 
                style={styles.content} 
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={scrollEventThrottle}
              >
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                  </View>
                ) : renderSections}
              </Animated.ScrollView>
            </ScreenWrapper>
          )}
        </FeedInteractionProvider>
      </ShoppingListProvider>
    </LocationProvider>
  );
};

const createStyles = (theme) => StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Platform.OS === 'ios' ? 100 : 85,
    paddingHorizontal: theme.spacing.m,
  },
});

export default CustomerHomeFeed;
