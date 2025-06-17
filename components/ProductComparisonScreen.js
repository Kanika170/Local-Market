import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/useTheme';
import { getProductPriceComparison } from '../data/staticData';

const ProductComparisonScreen = ({ route }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { productId } = route.params;
  const [comparisonData, setComparisonData] = useState(null);
  const [sortBy, setSortBy] = useState('price'); // 'price', 'distance', 'rating'

  useEffect(() => {
    const data = getProductPriceComparison(productId);
    setComparisonData(data);
  }, [productId]);

  const sortPrices = (prices, sortType) => {
    switch (sortType) {
      case 'price':
        return [...prices].sort((a, b) => a.price - b.price);
      case 'distance':
        return [...prices].sort((a, b) => a.shop.location.distance - b.shop.location.distance);
      case 'rating':
        return [...prices].sort((a, b) => b.shop.rating - a.shop.rating);
      default:
        return prices;
    }
  };

  const renderPriceCard = (priceData, index) => {
    const { shop, price, originalPrice, discount, inStock } = priceData;
    const isLowestPrice = index === 0 && sortBy === 'price';
    
    return (
      <TouchableOpacity 
        key={shop.id}
        style={[
          styles.priceCard,
          isLowestPrice && styles.bestPriceCard,
          !inStock && styles.outOfStockCard
        ]}
        onPress={() => navigation.navigate('ShopDetailScreen', { shop })}
      >
        {isLowestPrice && (
          <View style={styles.bestPriceBadge}>
            <Text style={styles.bestPriceText}>Best Price</Text>
          </View>
        )}
        
        {!inStock && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}

        <View style={styles.shopInfo}>
          <View style={styles.shopHeader}>
            <Text style={styles.shopName}>
              {shop.name} {shop.verified && '✓'}
            </Text>
            <View style={styles.shopRating}>
              <Text style={styles.ratingText}>⭐ {shop.rating}</Text>
            </View>
          </View>
          
          <View style={styles.shopDetails}>
            <Text style={styles.shopDistance}>
              📍 {shop.location.distance} km away
            </Text>
            <Text style={styles.shopType}>{shop.type}</Text>
          </View>
        </View>

        <View style={styles.priceInfo}>
          <View style={styles.priceContainer}>
            <Text style={[
              styles.currentPrice,
              !inStock && styles.disabledText
            ]}>
              ₹{price}
            </Text>
            {originalPrice > price && (
              <Text style={styles.originalPrice}>₹{originalPrice}</Text>
            )}
          </View>
          
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{discount}% OFF</Text>
            </View>
          )}
          
          <Text style={[
            styles.stockStatus,
            inStock ? styles.inStockText : styles.outOfStockText
          ]}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity 
            style={[
              styles.actionButton,
              styles.chatButton,
              !inStock && styles.disabledButton
            ]}
            disabled={!inStock}
            onPress={() => navigation.navigate('ChatScreen', { shopId: shop.id })}
          >
            <Text style={styles.chatButtonText}>💬 Ask Shop</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.actionButton,
              styles.directionsButton
            ]}
            onPress={() => {
              // Open directions
              console.log('Opening directions to', shop.name);
            }}
          >
            <Text style={styles.directionsButtonText}>🗺️ Directions</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const styles = createStyles(theme);

  if (!comparisonData) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Price Comparison</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  const { product, prices } = comparisonData;
  const sortedPrices = sortPrices(prices, sortBy);
  const lowestPrice = Math.min(...prices.map(p => p.price));
  const highestPrice = Math.max(...prices.map(p => p.price));
  const savings = highestPrice - lowestPrice;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Price Comparison</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Info */}
        <View style={styles.productSection}>
          <View style={styles.productHeader}>
            <Text style={styles.productImage}>{product.image}</Text>
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productBrand}>{product.brand}</Text>
              <Text style={styles.productCategory}>{product.category}</Text>
              <View style={styles.productRating}>
                <Text style={styles.ratingText}>⭐ {product.rating}</Text>
                <Text style={styles.reviewCount}>({product.reviews} reviews)</Text>
              </View>
            </View>
          </View>
          
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>

        {/* Price Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Price Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Lowest Price</Text>
              <Text style={styles.summaryValue}>₹{lowestPrice}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Highest Price</Text>
              <Text style={styles.summaryValue}>₹{highestPrice}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>You Save</Text>
              <Text style={[styles.summaryValue, styles.savingsText]}>₹{savings}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Available At</Text>
              <Text style={styles.summaryValue}>{prices.length} shops</Text>
            </View>
          </View>
        </View>

        {/* Sort Options */}
        <View style={styles.sortSection}>
          <Text style={styles.sectionTitle}>Sort by:</Text>
          <View style={styles.sortButtons}>
            {[
              { key: 'price', label: 'Price' },
              { key: 'distance', label: 'Distance' },
              { key: 'rating', label: 'Rating' }
            ].map(option => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.sortButton,
                  sortBy === option.key && styles.activeSortButton
                ]}
                onPress={() => setSortBy(option.key)}
              >
                <Text style={[
                  styles.sortButtonText,
                  sortBy === option.key && styles.activeSortButtonText
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Price Comparison Cards */}
        <View style={styles.comparisonSection}>
          <Text style={styles.sectionTitle}>
            Compare Prices ({sortedPrices.length} shops)
          </Text>
          {sortedPrices.map((priceData, index) => renderPriceCard(priceData, index))}
        </View>

        {/* Price Alert */}
        <View style={styles.alertSection}>
          <View style={styles.alertCard}>
            <Text style={styles.alertIcon}>🔔</Text>
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>Get Price Alerts</Text>
              <Text style={styles.alertDescription}>
                Get notified when the price drops or when it's back in stock
              </Text>
            </View>
            <TouchableOpacity style={styles.alertButton}>
              <Text style={styles.alertButtonText}>Set Alert</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    paddingTop: Platform.OS === 'ios' ? 50 : 25,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    color: theme.colors.text.inverse,
    fontSize: 16,
    marginRight: 16,
  },
  headerTitle: {
    color: theme.colors.text.inverse,
    fontSize: 20,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: theme.colors.text.secondary,
  },
  productSection: {
    backgroundColor: theme.colors.surface,
    margin: 15,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  productHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  productImage: {
    fontSize: 60,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 2,
  },
  productCategory: {
    fontSize: 12,
    color: theme.colors.primary,
    marginBottom: 8,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  productDescription: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  summarySection: {
    backgroundColor: theme.colors.surface,
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    marginBottom: 12,
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
  savingsText: {
    color: theme.colors.secondary,
  },
  sortSection: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  sortButtons: {
    flexDirection: 'row',
  },
  sortButton: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeSortButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  sortButtonText: {
    fontSize: 14,
    color: theme.colors.text.primary,
  },
  activeSortButtonText: {
    color: theme.colors.text.inverse,
  },
  comparisonSection: {
    paddingHorizontal: 15,
  },
  priceCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    position: 'relative',
  },
  bestPriceCard: {
    borderColor: theme.colors.secondary,
    borderWidth: 2,
  },
  outOfStockCard: {
    opacity: 0.6,
  },
  bestPriceBadge: {
    position: 'absolute',
    top: -8,
    left: 15,
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  bestPriceText: {
    color: theme.colors.text.inverse,
    fontSize: 12,
    fontWeight: '600',
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: theme.colors.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  outOfStockText: {
    color: theme.colors.text.inverse,
    fontSize: 10,
    fontWeight: '600',
  },
  shopInfo: {
    marginBottom: 12,
  },
  shopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  shopDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shopDistance: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  shopType: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  priceInfo: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: theme.colors.secondary + '20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  discountText: {
    fontSize: 10,
    color: theme.colors.secondary,
    fontWeight: '600',
  },
  stockStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  inStockText: {
    color: theme.colors.success,
  },
  disabledText: {
    color: theme.colors.text.secondary,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  chatButton: {
    backgroundColor: theme.colors.primary,
  },
  directionsButton: {
    backgroundColor: theme.colors.secondary,
  },
  disabledButton: {
    backgroundColor: theme.colors.text.secondary,
    opacity: 0.5,
  },
  chatButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  directionsButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  alertSection: {
    padding: 15,
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
});

export default ProductComparisonScreen;
