import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/useTheme';
import { useShoppingList } from '../context/ShoppingListContext';

const ShopComparisonScreen = ({ route }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { getBestShopsForList } = useShoppingList();
  
  const { shoppingList, shopMatches } = route.params || {};
  const [selectedShop, setSelectedShop] = useState(null);
  const [sortBy, setSortBy] = useState('match'); // 'match', 'price', 'distance'

  const styles = createStyles(theme);

  const sortShops = (shops, sortType) => {
    switch (sortType) {
      case 'match':
        return [...shops].sort((a, b) => b.matchPercentage - a.matchPercentage);
      case 'price':
        return [...shops].sort((a, b) => a.estimatedTotal - b.estimatedTotal);
      case 'distance':
        return [...shops].sort((a, b) => a.shop.location.distance - b.shop.location.distance);
      default:
        return shops;
    }
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return theme.colors.success;
    if (percentage >= 70) return theme.colors.secondary;
    if (percentage >= 50) return '#FF9800';
    return theme.colors.error;
  };

  const renderShopCard = (shopMatch, index) => {
    const { shop, matchingProducts, totalItems, matchPercentage, estimatedTotal } = shopMatch;
    const isTopMatch = index === 0 && sortBy === 'match';
    const isBestPrice = index === 0 && sortBy === 'price';
    const isNearest = index === 0 && sortBy === 'distance';
    
    return (
      <TouchableOpacity 
        key={shop.id}
        style={[
          styles.shopCard,
          isTopMatch && styles.topMatchCard,
          isBestPrice && styles.bestPriceCard,
          isNearest && styles.nearestCard
        ]}
        onPress={() => setSelectedShop(shopMatch)}
      >
        {/* Badge */}
        {isTopMatch && (
          <View style={styles.topMatchBadge}>
            <Text style={styles.badgeText}>🏆 Best Match</Text>
          </View>
        )}
        {isBestPrice && sortBy === 'price' && (
          <View style={styles.bestPriceBadge}>
            <Text style={styles.badgeText}>💰 Best Price</Text>
          </View>
        )}
        {isNearest && sortBy === 'distance' && (
          <View style={styles.nearestBadge}>
            <Text style={styles.badgeText}>📍 Nearest</Text>
          </View>
        )}

        <View style={styles.shopHeader}>
          <View style={styles.shopInfo}>
            <Text style={styles.shopName}>
              {shop.name} {shop.verified && '✅'}
            </Text>
            <Text style={styles.shopType}>{shop.type}</Text>
            <View style={styles.shopMeta}>
              <Text style={styles.shopRating}>⭐ {shop.rating}</Text>
              <Text style={styles.shopDistance}>📍 {shop.location.distance} km</Text>
            </View>
          </View>
          
          <View style={styles.matchInfo}>
            <View style={[styles.matchCircle, { borderColor: getMatchColor(matchPercentage) }]}>
              <Text style={[styles.matchPercentage, { color: getMatchColor(matchPercentage) }]}>
                {matchPercentage}%
              </Text>
            </View>
            <Text style={styles.matchText}>
              {matchingProducts}/{totalItems} items
            </Text>
          </View>
        </View>

        <View style={styles.shopDetails}>
          <View style={styles.priceInfo}>
            <Text style={styles.estimatedTotal}>₹{estimatedTotal}</Text>
            <Text style={styles.priceLabel}>Estimated Total</Text>
          </View>
          
          <View style={styles.availabilityInfo}>
            <Text style={styles.availableItems}>
              {matchingProducts} available
            </Text>
            <Text style={styles.missingItems}>
              {totalItems - matchingProducts} missing
            </Text>
          </View>
        </View>

        <View style={styles.shopFeatures}>
          {shop.deliveryAvailable && (
            <View style={styles.featureTag}>
              <Text style={styles.featureText}>🚚 Delivery</Text>
            </View>
          )}
          {shop.offers && shop.offers.length > 0 && (
            <View style={styles.featureTag}>
              <Text style={styles.featureText}>🎯 {shop.offers.length} Offers</Text>
            </View>
          )}
          <View style={styles.featureTag}>
            <Text style={styles.featureText}>👥 {shop.followers} followers</Text>
          </View>
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('ShopDetailScreen', { shop })}
          >
            <Text style={styles.actionButtonText}>View Shop</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.chatButton]}
            onPress={() => navigation.navigate('ChatScreen', { shopId: shop.id })}
          >
            <Text style={styles.chatButtonText}>💬 Chat</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const renderDetailedComparison = () => {
    if (!selectedShop) return null;

    const { shop, matchingProducts, totalItems, estimatedTotal } = selectedShop;
    
    return (
      <View style={styles.detailModal}>
        <View style={styles.detailHeader}>
          <TouchableOpacity onPress={() => setSelectedShop(null)}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.detailTitle}>{shop.name}</Text>
        </View>

        <ScrollView style={styles.detailContent}>
          <View style={styles.detailSummary}>
            <Text style={styles.summaryTitle}>Shopping Summary</Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>{matchingProducts}</Text>
                <Text style={styles.summaryLabel}>Available Items</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>{totalItems - matchingProducts}</Text>
                <Text style={styles.summaryLabel}>Missing Items</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>₹{estimatedTotal}</Text>
                <Text style={styles.summaryLabel}>Estimated Cost</Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>{shop.location.distance} km</Text>
                <Text style={styles.summaryLabel}>Distance</Text>
              </View>
            </View>
          </View>

          <View style={styles.itemsList}>
            <Text style={styles.itemsTitle}>Item Availability</Text>
            {shoppingList.items.map(item => {
              const isAvailable = Math.random() > 0.3; // Mock availability
              return (
                <View key={item.id} style={styles.itemRow}>
                  <Text style={styles.itemStatus}>
                    {isAvailable ? '✅' : '❌'}
                  </Text>
                  <Text style={[
                    styles.itemName,
                    !isAvailable && styles.unavailableItem
                  ]}>
                    {item.name} ({item.quantity})
                  </Text>
                  <Text style={styles.itemPrice}>
                    {isAvailable ? `₹${item.price || 0}` : 'N/A'}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.shopActions}>
            <TouchableOpacity 
              style={styles.primaryAction}
              onPress={() => {
                Alert.alert(
                  'Navigate to Shop',
                  `Get directions to ${shop.name}?`,
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Get Directions', onPress: () => console.log('Opening directions') }
                  ]
                );
              }}
            >
              <Text style={styles.primaryActionText}>🗺️ Get Directions</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryAction}
              onPress={() => {
                setSelectedShop(null);
                navigation.navigate('ChatScreen', { shopId: shop.id });
              }}
            >
              <Text style={styles.secondaryActionText}>💬 Chat with Shop</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  if (!shoppingList || !shopMatches) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shop Comparison</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No comparison data available</Text>
        </View>
      </View>
    );
  }

  const sortedShops = sortShops(shopMatches, sortBy);
  const bestMatch = sortedShops[0];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shop Comparison</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* List Summary */}
        <View style={styles.listSummary}>
          <Text style={styles.listName}>{shoppingList.name}</Text>
          <Text style={styles.listMeta}>
            {shoppingList.totalItems} items • {shoppingList.category}
          </Text>
          <Text style={styles.listDescription}>
            Find the best shops that have most of your items in one place
          </Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{shopMatches.length}</Text>
            <Text style={styles.statLabel}>Shops Found</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{bestMatch.matchPercentage}%</Text>
            <Text style={styles.statLabel}>Best Match</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>₹{Math.min(...shopMatches.map(s => s.estimatedTotal))}</Text>
            <Text style={styles.statLabel}>Lowest Cost</Text>
          </View>
        </View>

        {/* Sort Options */}
        <View style={styles.sortSection}>
          <Text style={styles.sortTitle}>Sort by:</Text>
          <View style={styles.sortButtons}>
            {[
              { key: 'match', label: 'Best Match', icon: '🎯' },
              { key: 'price', label: 'Price', icon: '💰' },
              { key: 'distance', label: 'Distance', icon: '📍' }
            ].map(option => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.sortButton,
                  sortBy === option.key && styles.activeSortButton
                ]}
                onPress={() => setSortBy(option.key)}
              >
                <Text style={styles.sortIcon}>{option.icon}</Text>
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

        {/* Shop Cards */}
        <View style={styles.shopsSection}>
          <Text style={styles.sectionTitle}>
            Compare Shops ({sortedShops.length})
          </Text>
          {sortedShops.map((shopMatch, index) => renderShopCard(shopMatch, index))}
        </View>

        {/* Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Smart Shopping Tips</Text>
          <Text style={styles.tipsText}>
            • Choose shops with highest match percentage to get most items in one trip{'\n'}
            • Consider distance and delivery options for convenience{'\n'}
            • Check shop offers and discounts before visiting{'\n'}
            • Chat with shops to confirm availability before traveling
          </Text>
        </View>
      </ScrollView>

      {/* Detailed Comparison Modal */}
      {selectedShop && renderDetailedComparison()}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.text.secondary,
  },
  listSummary: {
    backgroundColor: theme.colors.surface,
    margin: 15,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
  },
  listName: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  listMeta: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 8,
  },
  listDescription: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.primary + '10',
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  sortSection: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  sortTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  sortButtons: {
    flexDirection: 'row',
  },
  sortButton: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeSortButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  sortIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  sortButtonText: {
    fontSize: 14,
    color: theme.colors.text.primary,
  },
  activeSortButtonText: {
    color: theme.colors.text.inverse,
  },
  shopsSection: {
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
  shopCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
    position: 'relative',
  },
  topMatchCard: {
    borderColor: theme.colors.success,
    borderWidth: 2,
  },
  bestPriceCard: {
    borderColor: theme.colors.secondary,
    borderWidth: 2,
  },
  nearestCard: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  topMatchBadge: {
    position: 'absolute',
    top: -8,
    left: 15,
    backgroundColor: theme.colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
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
  nearestBadge: {
    position: 'absolute',
    top: -8,
    left: 15,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  badgeText: {
    color: theme.colors.text.inverse,
    fontSize: 10,
    fontWeight: '600',
  },
  shopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  shopInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  shopType: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: 8,
  },
  shopMeta: {
    flexDirection: 'row',
  },
  shopRating: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginRight: 12,
  },
  shopDistance: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  matchInfo: {
    alignItems: 'center',
  },
  matchCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  matchPercentage: {
    fontSize: 14,
    fontWeight: '700',
  },
  matchText: {
    fontSize: 10,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  shopDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceInfo: {
    alignItems: 'flex-start',
  },
  estimatedTotal: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  priceLabel: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  availabilityInfo: {
    alignItems: 'flex-end',
  },
  availableItems: {
    fontSize: 14,
    color: theme.colors.success,
    fontWeight: '600',
    marginBottom: 2,
  },
  missingItems: {
    fontSize: 12,
    color: theme.colors.error,
  },
  shopFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  featureTag: {
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 10,
    color: theme.colors.primary,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  chatButton: {
    backgroundColor: theme.colors.secondary,
  },
  actionButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  chatButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  tipsSection: {
    backgroundColor: theme.colors.primary + '10',
    margin: 15,
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  detailModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background,
    zIndex: 1000,
  },
  detailHeader: {
    backgroundColor: theme.colors.primary,
    paddingTop: Platform.OS === 'ios' ? 50 : 25,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    color: theme.colors.text.inverse,
    fontSize: 20,
    marginRight: 16,
  },
  detailTitle: {
    color: theme.colors.text.inverse,
    fontSize: 18,
    fontWeight: '600',
  },
  detailContent: {
    flex: 1,
    padding: 15,
  },
  detailSummary: {
    backgroundColor: theme.colors.surface,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  summaryTitle: {
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
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  itemsList: {
    backgroundColor: theme.colors.surface,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  itemStatus: {
    fontSize: 16,
    marginRight: 12,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text.primary,
  },
  unavailableItem: {
    color: theme.colors.text.secondary,
    textDecorationLine: 'line-through',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.secondary,
  },
  shopActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryAction: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  secondaryAction: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
  primaryActionText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryActionText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default ShopComparisonScreen;
