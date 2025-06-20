import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/useTheme';
import { useShoppingList } from '../context/ShoppingListContext';
import { getProductPriceComparison } from '../data/staticData';
import PageIndicators from './PageIndicators';
import SaveToListModal from './common/SaveToListModal';

const ProductDetailScreen = ({ route, onBack }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { trackProduct, untrackProduct, trackedProducts } = useShoppingList();
  const [comparisonData, setComparisonData] = useState(null);
  const [selectedSize, setSelectedSize] = useState('US 9');
  const [isTracking, setIsTracking] = useState(false);
  const [isSaveToListModalVisible, setSaveToListModalVisible] = useState(false);
  
  // Get product from route params or props with fallback data
  const rawProduct = route?.params?.product || route?.params || {};
  
  // Create a complete product object with fallbacks
  const product = {
    id: rawProduct.id || Math.random().toString(),
    name: rawProduct.name || rawProduct.title || 'Product Name',
    price: rawProduct.price || '99.99',
    image: rawProduct.image || '📦',
    shop: rawProduct.shop || rawProduct.brand || 'Local Shop',
    category: rawProduct.category || 'General',
    rating: rawProduct.rating || '4.5',
    reviews: rawProduct.reviews || '128',
    description: rawProduct.description || 'This is a high-quality product available at local shops. Check out the price comparison below to find the best deals.',
    discount: rawProduct.discount,
    tag: rawProduct.tag,
    ...rawProduct
  };

  // Check if product is being tracked
  useEffect(() => {
    if (product.id) {
      const isBeingTracked = trackedProducts.some(p => p.id === product.id);
      setIsTracking(isBeingTracked);
    }
  }, [product.id, trackedProducts]);

  const handleTrackToggle = () => {
    if (isTracking) {
      untrackProduct(product.id);
    } else {
      trackProduct(product);
    }
    setIsTracking(!isTracking);
  };

  const handleSaveToList = (listId, product) => {
    // This will be handled by the SaveToListModal component
    setSaveToListModalVisible(false);
  };
  
  useEffect(() => {
    if (product.id) {
      const data = getProductPriceComparison(product.id);
      setComparisonData(data);
    }
  }, [product.id]);
  
  const sizes = ['US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 11.5'];
  
  const styles = createStyles(theme);
  
  // Remove the error check since we now provide fallback data

  const lowestPrice = comparisonData ? Math.min(...comparisonData.prices.map(p => p.price)) : (product.price || 0);
  const availableShops = comparisonData ? comparisonData.prices.length : 1;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onBack || (() => navigation.goBack())}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {product.image && typeof product.image === 'string' ? (
            <Text style={styles.productImageEmoji}>{product.image}</Text>
          ) : product.image ? (
            <Image source={product.image} style={styles.productImage} />
          ) : (
            <Text style={styles.productImageEmoji}>📦</Text>
          )}
          <View style={styles.indicatorsContainer}>
            <PageIndicators total={4} current={0} />
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <View style={styles.shopInfo}>
            <Text style={styles.shopName}>{product.shop || product.brand}</Text>
            <Text style={styles.category}>{product.category}</Text>
          </View>
          
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{lowestPrice}</Text>
            {product.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{product.discount}% OFF</Text>
              </View>
            )}
            {product.tag && (
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>{product.tag}</Text>
              </View>
            )}
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {product.rating}</Text>
            <Text style={styles.reviews}>({product.reviews} reviews)</Text>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          {/* Price Comparison Section */}
          {comparisonData && (
            <View style={styles.priceComparisonSection}>
              <View style={styles.comparisonHeader}>
                <Text style={styles.comparisonTitle}>Price Comparison</Text>
                <TouchableOpacity 
                  style={styles.viewAllButton}
                  onPress={() => navigation.navigate('ProductComparison', { productId: product.id })}
                >
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>
              
              <View style={styles.comparisonSummary}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Available at</Text>
                  <Text style={styles.summaryValue}>{availableShops} shops</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Best Price</Text>
                  <Text style={styles.summaryValue}>₹{lowestPrice}</Text>
                </View>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {comparisonData.prices.slice(0, 3).map((priceData) => (
                  <View key={priceData.shop.id} style={styles.priceCard}>
                    <Text style={styles.priceCardShop}>{priceData.shop.name}</Text>
                    <Text style={styles.priceCardPrice}>₹{priceData.price}</Text>
                    <Text style={styles.priceCardDistance}>
                      {priceData.shop.location.distance} km
                    </Text>
                    <Text style={[
                      styles.priceCardStock,
                      priceData.inStock ? styles.inStock : styles.outOfStock
                    ]}>
                      {priceData.inStock ? 'In Stock' : 'Out of Stock'}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Track Price Changes */}
          <TouchableOpacity 
            style={[
              styles.trackPriceContainer,
              isTracking && styles.trackPriceContainerActive
            ]}
            onPress={handleTrackToggle}
          >
            <View style={styles.trackPriceIcon}>
              <Text style={styles.bellIcon}>🔔</Text>
            </View>
            <View style={styles.trackPriceInfo}>
              <Text style={styles.trackPriceTitle}>Track Price Changes</Text>
              <Text style={styles.trackPriceSubtitle}>
                {isTracking 
                  ? 'You will be notified of price changes'
                  : 'Get notified when the price drops below your target'
                }
              </Text>
            </View>
            <View style={[
              styles.toggleContainer,
              isTracking && styles.toggleContainerActive
            ]}>
              <View style={[
                styles.toggle,
                isTracking && styles.toggleActive
              ]} />
            </View>
          </TouchableOpacity>

          {/* Size Selector (if applicable) */}
          {product.category === 'Footwear' && (
            <>
              <Text style={styles.sectionTitle}>Select Size</Text>
              <View style={styles.sizeContainer}>
                {sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.sizeButton,
                      selectedSize === size && styles.selectedSizeButton
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text style={[
                      styles.sizeButtonText,
                      selectedSize === size && styles.selectedSizeButtonText
                    ]}>{size}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.addToListButton}
            onPress={() => setSaveToListModalVisible(true)}
          >
            <Text style={styles.addToListText}>Add to List</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.compareButton}
            onPress={() => navigation.navigate('ProductComparison', { productId: product.id })}
          >
            <Text style={styles.compareText}>Compare Prices</Text>
          </TouchableOpacity>
        </View>

        {/* Save to List Modal */}
        <SaveToListModal
          visible={isSaveToListModalVisible}
          onClose={() => setSaveToListModalVisible(false)}
          product={product}
          onSave={handleSaveToList}
        />

        {/* Price Alert */}
        <View style={styles.alertSection}>
          <View style={styles.alertCard}>
            <Text style={styles.alertIcon}>🔔</Text>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Price Alert</Text>
              <Text style={styles.alertDescription}>
                Get notified when price drops or back in stock
              </Text>
            </View>
            <TouchableOpacity style={styles.alertButton}>
              <Text style={styles.alertButtonText}>Set Alert</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('CustomerHomeFeed')}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('SmartProductSearch')}>
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Lists')}>
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navText}>Lists</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ProfileScreen')}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    flex: 1,
  },
  backButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
  },
  headerTitle: {
    color: theme.colors.text.inverse,
    fontSize: 18,
    fontWeight: '600',
    flex: 2,
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.text.secondary,
  },
  imageContainer: {
    backgroundColor: theme.colors.surface,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  productImageEmoji: {
    fontSize: 120,
  },
  indicatorsContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  productInfo: {
    padding: 20,
  },
  shopInfo: {
    marginBottom: 12,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  category: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.primary,
    marginRight: 12,
  },
  discountBadge: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  discountText: {
    color: theme.colors.text.inverse,
    fontSize: 12,
    fontWeight: '600',
  },
  tagBadge: {
    backgroundColor: theme.colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: theme.colors.text.inverse,
    fontSize: 12,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  description: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  priceComparisonSection: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  comparisonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  viewAllButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewAllText: {
    color: theme.colors.text.inverse,
    fontSize: 12,
    fontWeight: '500',
  },
  comparisonSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  priceCard: {
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    minWidth: 120,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  priceCardShop: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  priceCardPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 2,
  },
  priceCardDistance: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  priceCardStock: {
    fontSize: 10,
    fontWeight: '500',
  },
  inStock: {
    color: theme.colors.success,
  },
  outOfStock: {
    color: theme.colors.error,
  },
  trackPriceContainer: {
    backgroundColor: theme.colors.primary + '10',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: theme.colors.primary + '30',
  },
  trackPriceContainerActive: {
    backgroundColor: theme.colors.primary + '20',
    borderColor: theme.colors.primary,
  },
  trackPriceIcon: {
    marginRight: 12,
  },
  bellIcon: {
    fontSize: 24,
  },
  trackPriceInfo: {
    flex: 1,
  },
  trackPriceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  trackPriceSubtitle: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  toggleContainer: {
    width: 40,
    height: 24,
    backgroundColor: theme.colors.disabled,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleContainerActive: {
    backgroundColor: theme.colors.primary,
  },
  toggle: {
    width: 20,
    height: 20,
    backgroundColor: theme.colors.text.inverse,
    borderRadius: 10,
  },
  toggleActive: {
    alignSelf: 'flex-end',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSizeButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  sizeButtonText: {
    color: theme.colors.text.primary,
    fontSize: 14,
  },
  selectedSizeButtonText: {
    color: theme.colors.text.inverse,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  addToListButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    marginRight: 6,
  },
  addToListText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  shareButton: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    paddingVertical: 16,
    borderRadius: 8,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  shareText: {
    color: theme.colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  compareButton: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    paddingVertical: 16,
    borderRadius: 8,
    marginLeft: 6,
  },
  compareText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  alertSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  alertCard: {
    backgroundColor: theme.colors.primary + '10',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primary + '30',
  },
  alertIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  alertButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  alertButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 12,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingVertical: 12,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
    color: theme.colors.text.secondary,
  },
  navText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
});

export default ProductDetailScreen;
