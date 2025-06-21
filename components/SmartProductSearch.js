import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../theme/useTheme';
import ScreenWrapper from './common/ScreenWrapper';
import AppHeader from './common/AppHeader';

const SmartProductSearch = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [searchQuery, setSearchQuery] = useState('wireless headphones');
  const [selectedFilters, setSelectedFilters] = useState({
    price: ['Under $200'],
    rating: ['4+ Stars'],
    availability: [],
    delivery: []
  });
  const [sortBy, setSortBy] = useState('Relevance');

  // Static product data for search results
  const searchResults = [
    {
      id: 1,
      name: 'Sony WH-1000XM4',
      image: '🎧',
      rating: 4.5,
      reviews: 432,
      price: 249.99,
      originalPrice: 249.99,
      discount: 20,
      freeDelivery: true,
      badge: null
    },
    {
      id: 2,
      name: 'Bose QuietComfort 45',
      image: '🎧',
      rating: 4.7,
      reviews: 289,
      price: 179.99,
      originalPrice: 179.99,
      discount: null,
      freeDelivery: true,
      badge: null
    },
    {
      id: 3,
      name: 'Apple AirPods Pro',
      image: '🎧',
      rating: 4.6,
      reviews: 512,
      price: 189.99,
      originalPrice: 189.99,
      discount: null,
      freeDelivery: true,
      badge: 'New'
    },
    {
      id: 4,
      name: 'Jabra Elite 85t',
      image: '🎧',
      rating: 4.4,
      reviews: 178,
      price: 149.99,
      originalPrice: 179.99,
      discount: null,
      freeDelivery: true,
      badge: null
    },
    {
      id: 5,
      name: 'Sennheiser Momentum 3',
      image: '🎧',
      rating: 4.3,
      reviews: 203,
      price: 199.95,
      originalPrice: 199.95,
      discount: null,
      freeDelivery: true,
      badge: 'Hot'
    },
    {
      id: 6,
      name: 'Samsung Galaxy Buds Pro',
      image: '🎧',
      rating: 4.5,
      reviews: 156,
      price: 129.99,
      originalPrice: 169.99,
      discount: null,
      freeDelivery: true,
      badge: null
    }
  ];

  const filterCategories = [
    { key: 'price', label: 'Price', options: ['Under $100', 'Under $200', '$200-$300', 'Over $300'] },
    { key: 'rating', label: 'Rating', options: ['3+ Stars', '4+ Stars', '4.5+ Stars'] },
    { key: 'availability', label: 'Availability', options: ['In Stock', 'Same Day Delivery', 'Next Day Delivery'] },
    { key: 'delivery', label: 'Delivery', options: ['Free Delivery', 'Express Delivery', 'Store Pickup'] }
  ];

  const toggleFilter = (category, option) => {
    setSelectedFilters(prev => {
      const categoryFilters = prev[category];
      const isSelected = categoryFilters.includes(option);
      
      return {
        ...prev,
        [category]: isSelected 
          ? categoryFilters.filter(f => f !== option)
          : [...categoryFilters, option]
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      price: [],
      rating: [],
      availability: [],
      delivery: []
    });
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }

    return stars.join('');
  };

  const renderProductCard = (product) => (
    <View key={product.id} style={styles.productCard}>
      {product.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-{product.discount}%</Text>
        </View>
      )}
      {product.badge && (
        <View style={[styles.badge, product.badge === 'Hot' ? styles.hotBadge : styles.newBadge]}>
          <Text style={styles.badgeText}>{product.badge}</Text>
        </View>
      )}
      
      <View style={styles.productImageContainer}>
        <Text style={styles.productImage}>{product.image}</Text>
      </View>
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>{renderStars(product.rating)}</Text>
          <Text style={styles.reviewCount}>({product.reviews})</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price}</Text>
          {product.originalPrice !== product.price && (
            <Text style={styles.originalPrice}>${product.originalPrice}</Text>
          )}
        </View>
        
        {product.freeDelivery && (
          <View style={styles.deliveryContainer}>
            <Text style={styles.deliveryIcon}>🚚</Text>
            <Text style={styles.deliveryText}>Free delivery</Text>
          </View>
        )}
      </View>
    </View>
  );

  const headerRightComponent = (
    <TouchableOpacity style={styles.headerButton}>
      <Text style={styles.headerButtonText}>Buy</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper
      header={
        <AppHeader
          title="Shopping Companion"
          leftComponent={<Text style={styles.headerIcon}>🛍️</Text>}
          rightComponent={headerRightComponent}
        />
      }
      showBottomNav={true}
      bottomNavProps={{
        navigation,
        activeTab: 'Search'
      }}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search products..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Filters Section */}
        <View style={styles.filtersSection}>
          <View style={styles.filtersHeader}>
            <Text style={styles.filtersTitle}>Filters</Text>
            <TouchableOpacity onPress={clearAllFilters}>
              <Text style={styles.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          {/* Filter Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterCategoriesContainer}>
            {filterCategories.map((category) => (
              <TouchableOpacity key={category.key} style={styles.filterCategory}>
                <Text style={styles.filterCategoryText}>{category.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Active Filters */}
          <View style={styles.activeFiltersContainer}>
            {selectedFilters.price.map((filter) => (
              <TouchableOpacity 
                key={filter} 
                style={styles.activeFilter}
                onPress={() => toggleFilter('price', filter)}
              >
                <Text style={styles.activeFilterText}>{filter}</Text>
                <Text style={styles.removeFilterText}> ✕</Text>
              </TouchableOpacity>
            ))}
            {selectedFilters.rating.map((filter) => (
              <TouchableOpacity 
                key={filter} 
                style={styles.activeFilter}
                onPress={() => toggleFilter('rating', filter)}
              >
                <Text style={styles.activeFilterText}>{filter}</Text>
                <Text style={styles.removeFilterText}> ✕</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Results Header */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>24 results found</Text>
          <View style={styles.sortContainer}>
            <Text style={styles.sortLabel}>Sort by:</Text>
            <TouchableOpacity style={styles.sortDropdown}>
              <Text style={styles.sortValue}>{sortBy}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Grid */}
        <View style={styles.productGrid}>
          {searchResults.map((product, index) => (
            <View key={product.id} style={[styles.productCardWrapper, index % 2 === 1 && styles.rightCard]}>
              {renderProductCard(product)}
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const createStyles = (theme) => StyleSheet.create({
  headerIcon: {
    fontSize: 20,
    color: theme.colors.text.inverse,
  },
  headerButton: {
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  headerButtonText: {
    color: theme.colors.text.inverse,
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    paddingBottom: 80,
  },
  searchContainer: {
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.l,
  },
  searchInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filtersSection: {
    marginBottom: theme.spacing.l,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  filtersTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  clearAllText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  filterCategoriesContainer: {
    marginBottom: theme.spacing.m,
  },
  filterCategory: {
    backgroundColor: theme.colors.primary + '10',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.l,
    marginRight: theme.spacing.s,
  },
  filterCategoryText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  activeFiltersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  activeFilter: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.m,
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeFilterText: {
    color: theme.colors.text.inverse,
    fontSize: 12,
    fontWeight: '500',
  },
  removeFilterText: {
    color: theme.colors.text.inverse,
    fontSize: 12,
    marginLeft: theme.spacing.xs,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  resultsCount: {
    fontSize: 16,
    color: theme.colors.text.secondary,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginRight: theme.spacing.xs,
  },
  sortDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.s,
  },
  sortValue: {
    fontSize: 14,
    color: theme.colors.text.primary,
    marginRight: theme.spacing.xs,
  },
  dropdownArrow: {
    fontSize: 10,
    color: theme.colors.text.secondary,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCardWrapper: {
    width: '48%',
    marginBottom: theme.spacing.m,
  },
  rightCard: {
    marginLeft: '4%',
  },
  productCard: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.s,
    borderWidth: 1,
    borderColor: theme.colors.border,
    position: 'relative',
    ...theme.shadows.default,
  },
  discountBadge: {
    position: 'absolute',
    top: theme.spacing.xs,
    left: theme.spacing.xs,
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
    zIndex: 1,
  },
  discountText: {
    color: theme.colors.text.inverse,
    fontSize: 10,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
    zIndex: 1,
  },
  hotBadge: {
    backgroundColor: theme.colors.error,
  },
  newBadge: {
    backgroundColor: theme.colors.success,
  },
  badgeText: {
    color: theme.colors.text.inverse,
    fontSize: 10,
    fontWeight: '600',
  },
  productImageContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  productImage: {
    fontSize: 60,
  },
  productInfo: {
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
    textAlign: 'left',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  stars: {
    fontSize: 12,
    marginRight: theme.spacing.xs,
  },
  reviewCount: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.primary,
    marginRight: theme.spacing.xs,
  },
  originalPrice: {
    fontSize: 12,
    color: theme.colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryIcon: {
    fontSize: 12,
    marginRight: theme.spacing.xs,
  },
  deliveryText: {
    fontSize: 12,
    color: theme.colors.success,
    fontWeight: '500',
  }
});

export default SmartProductSearch;
