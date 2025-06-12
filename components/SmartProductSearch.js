import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';

const SmartProductSearch = ({ onBack }) => {
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerIcon}>🛍️</Text>
          <Text style={styles.headerTitle}>Shopping Companion</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Buy</Text>
          </TouchableOpacity>
        </View>
      </View>

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

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={onBack}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navIcon, styles.activeNavIcon]}>🔍</Text>
          <Text style={[styles.navText, styles.activeNavText]}>Search</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navText}>Lists</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
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
    marginRight: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  searchContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filtersSection: {
    marginBottom: 20,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  clearAllText: {
    color: '#9C27B0',
    fontSize: 14,
    fontWeight: '500',
  },
  filterCategoriesContainer: {
    marginBottom: 16,
  },
  filterCategory: {
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  filterCategoryText: {
    color: '#9C27B0',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFiltersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  activeFilter: {
    backgroundColor: '#9C27B0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  removeFilterText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 4,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultsCount: {
    fontSize: 16,
    color: '#666666',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    color: '#666666',
    marginRight: 8,
  },
  sortDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  sortValue: {
    fontSize: 14,
    color: '#333333',
    marginRight: 4,
  },
  dropdownArrow: {
    fontSize: 10,
    color: '#666666',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCardWrapper: {
    width: '48%',
    marginBottom: 16,
  },
  rightCard: {
    marginLeft: '4%',
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF5722',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  hotBadge: {
    backgroundColor: '#FF5722',
  },
  newBadge: {
    backgroundColor: '#4CAF50',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  productImageContainer: {
    alignItems: 'center',
    marginBottom: 12,
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
    color: '#333333',
    marginBottom: 6,
    textAlign: 'left',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  stars: {
    fontSize: 12,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#9C27B0',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999999',
    textDecorationLine: 'line-through',
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  deliveryText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
    paddingBottom: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
    color: '#666666',
  },
  activeNavIcon: {
    color: '#9C27B0',
  },
  navText: {
    fontSize: 12,
    color: '#666666',
  },
  activeNavText: {
    color: '#9C27B0',
    fontWeight: '500',
  },
});

export default SmartProductSearch;
