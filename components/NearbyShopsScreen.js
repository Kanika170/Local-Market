import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Platform,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/useTheme';
import { useLocation } from '../context/LocationContext';
import { shops, getShopsByLocation } from '../data/staticData';
import BottomNavigationBar from './BottomNavigationBar';

const NearbyShopsScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { selectedLocation } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [radius, setRadius] = useState(5); // 5km radius
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  
  const [nearbyShops, setNearbyShops] = useState([]);
  
  useEffect(() => {
    if (selectedLocation) {
      let filtered = getShopsByLocation(selectedLocation, radius);
      
      // Apply search filter
      if (searchQuery) {
        filtered = filtered.filter(shop => 
          shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          shop.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply category filter
      if (selectedCategory) {
        filtered = filtered.filter(shop => 
          shop.categories.includes(selectedCategory)
        );
      }
      
      setNearbyShops(filtered);
    }
  }, [selectedLocation, radius, searchQuery, selectedCategory]);

  const categories = [
    { id: 'Grocery', name: 'Grocery', icon: '🛒' },
    { id: 'Vegetables', name: 'Vegetables', icon: '🥬' },
    { id: 'Electronics', name: 'Electronics', icon: '📱' },
    { id: 'Pharmacy', name: 'Pharmacy', icon: '💊' },
    { id: 'Restaurant', name: 'Restaurant', icon: '🍽️' }
  ];

  const renderShopCard = (shop) => {
    const styles = createStyles(theme);
    return (
      <TouchableOpacity 
        key={shop.id} 
        style={styles.shopCard}
        onPress={() => navigation.navigate('ShopDetailScreen', { shop })}
      >
        <View style={styles.shopHeader}>
          <View style={styles.shopInfo}>
            <Text style={styles.shopName}>
              {shop.name} {shop.verified && '✓'}
            </Text>
            <Text style={styles.shopType}>{shop.type}</Text>
          </View>
          <View style={styles.shopRating}>
            <Text style={styles.ratingText}>⭐ {shop.rating}</Text>
            <Text style={styles.reviewCount}>({shop.reviews})</Text>
          </View>
        </View>

        <View style={styles.shopDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>📍</Text>
            <Text style={styles.detailText}>
              {shop.location.distance} km • {shop.location.address}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailIcon}>🕒</Text>
            <Text style={styles.detailText}>
              {new Date().getDay() === 0 || new Date().getDay() === 6 
                ? shop.hours.weekend 
                : shop.hours.weekday}
            </Text>
          </View>

          {shop.offers.length > 0 && (
            <View style={styles.offersContainer}>
              {shop.offers.map((offer, index) => (
                <View key={offer.id} style={styles.offerBadge}>
                  <Text style={styles.offerText}>{offer.title}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.shopActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('ChatScreen', { shopId: shop.id })}
          >
            <Text style={styles.actionButtonText}>💬 Chat</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.directionButton]}
            onPress={() => {
              // Open in maps
              const { latitude, longitude } = shop.location.coordinates;
              const url = Platform.select({
                ios: `maps:${latitude},${longitude}`,
                android: `geo:${latitude},${longitude}?q=${shop.name}`
              });
              // Linking.openURL(url);
            }}
          >
            <Text style={styles.actionButtonText}>🗺️ Directions</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const styles = createStyles(theme);
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Nearby Shops</Text>
          <TouchableOpacity 
            style={styles.viewModeButton}
            onPress={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
          >
            <Text style={styles.viewModeIcon}>
              {viewMode === 'list' ? '🗺️' : '📋'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.locationBar}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText}>
            {selectedLocation?.address || 'Select location'}
          </Text>
          <TouchableOpacity 
            style={styles.changeLocationButton}
            onPress={() => {/* Navigate to location selector */}}
          >
            <Text style={styles.changeLocationText}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search shops or items..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.text.secondary}
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          <TouchableOpacity 
            style={[
              styles.categoryChip,
              !selectedCategory && styles.selectedCategoryChip
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={[
              styles.categoryText,
              !selectedCategory && styles.selectedCategoryText
            ]}>All</Text>
          </TouchableOpacity>
          
          {categories.map(category => (
            <TouchableOpacity 
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.selectedCategoryChip
              ]}
              onPress={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText
              ]}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.radiusSelector}>
          <Text style={styles.radiusLabel}>Within: </Text>
          {[2, 5, 10].map(r => (
            <TouchableOpacity 
              key={r}
              style={[
                styles.radiusChip,
                radius === r && styles.selectedRadiusChip
              ]}
              onPress={() => setRadius(r)}
            >
              <Text style={[
                styles.radiusText,
                radius === r && styles.selectedRadiusText
              ]}>{r} km</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Shop List */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.resultsText}>
          {nearbyShops.length} shops found within {radius}km
        </Text>
        
        {nearbyShops.map(renderShopCard)}
        
        {nearbyShops.length === 0 && (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>
              No shops found matching your criteria
            </Text>
            <Text style={styles.noResultsSubtext}>
              Try adjusting your filters or increasing the radius
            </Text>
          </View>
        )}
      </ScrollView>

      <BottomNavigationBar navigation={navigation} activeTab="Search" />
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
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    color: theme.colors.text.inverse,
    fontSize: 24,
    fontWeight: '600',
  },
  viewModeButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewModeIcon: {
    fontSize: 20,
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 8,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  locationText: {
    color: theme.colors.text.inverse,
    flex: 1,
    fontSize: 14,
  },
  changeLocationButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeLocationText: {
    color: theme.colors.text.inverse,
    fontSize: 12,
  },
  searchContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: theme.colors.text.secondary,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: theme.colors.text.primary,
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedCategoryChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  categoryText: {
    color: theme.colors.text.primary,
    fontSize: 14,
  },
  selectedCategoryText: {
    color: theme.colors.text.inverse,
  },
  radiusSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radiusLabel: {
    color: theme.colors.text.secondary,
    marginRight: 8,
  },
  radiusChip: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedRadiusChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  radiusText: {
    color: theme.colors.text.primary,
    fontSize: 12,
  },
  selectedRadiusText: {
    color: theme.colors.text.inverse,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  resultsText: {
    color: theme.colors.text.secondary,
    fontSize: 14,
    marginBottom: 12,
  },
  shopCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  shopRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  shopDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    flex: 1,
  },
  offersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  offerBadge: {
    backgroundColor: theme.colors.secondary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  offerText: {
    fontSize: 12,
    color: theme.colors.secondary,
  },
  shopActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  directionButton: {
    backgroundColor: theme.colors.secondary,
  },
  actionButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  noResults: {
    alignItems: 'center',
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});

export default NearbyShopsScreen;
