import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Animated } from 'react-native';
import { useTheme } from '../theme/useTheme';
import ScreenWrapper from './common/ScreenWrapper';
import AppHeader from './common/AppHeader';
import SearchResults from './smart-search/SearchResults';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SmartProductSearch = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [searchQuery, setSearchQuery] = useState('cake');
  const [selectedFilters, setSelectedFilters] = useState({
    price: ['Under ₹200'],
    rating: ['4+ Stars'],
    availability: [],
    delivery: []
  });
  const [sortBy, setSortBy] = useState('Relevance');
  const [showResults, setShowResults] = useState(true);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilterCategory, setActiveFilterCategory] = useState(null);
  const [showSortModal, setShowSortModal] = useState(false);

  const { bottomBarTranslateY, handleScroll, scrollEventThrottle } = useScrollAnimation();

  const filterCategories = [
    { key: 'price', label: 'Price', options: ['Under ₹100', 'Under ₹200', '₹200-₹500', 'Over ₹500'] },
    { key: 'rating', label: 'Rating', options: ['3+ Stars', '4+ Stars', '4.5+ Stars'] },
    { key: 'availability', label: 'Availability', options: ['In Stock', 'Same Day Delivery', 'Next Day Delivery'] },
    { key: 'delivery', label: 'Delivery', options: ['Free Delivery', 'Express Delivery', 'Store Pickup'] }
  ];

  const sortOptions = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Rating', 'Distance', 'Newest First'];

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

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetailScreen', { product });
  };

  const handleShopPress = (shop) => {
    navigation.navigate('ShopDetail', { shop });
  };

  const handlePostInteraction = (type, data) => {
    console.log(`Post ${type}:`, data);
  };

  const openFilterModal = (category) => {
    setActiveFilterCategory(category);
    setShowFilterModal(true);
  };

  const closeFilterModal = () => {
    setShowFilterModal(false);
    setActiveFilterCategory(null);
  };

  const openSortModal = () => {
    setShowSortModal(true);
  };

  const closeSortModal = () => {
    setShowSortModal(false);
  };

  const selectSortOption = (option) => {
    setSortBy(option);
    closeSortModal();
  };

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).reduce((count, filters) => count + filters.length, 0);
  };

  const renderFilterModal = () => {
    if (!activeFilterCategory) return null;

    const category = filterCategories.find(cat => cat.key === activeFilterCategory);
    
    return (
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeFilterModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{category.label}</Text>
              <TouchableOpacity onPress={closeFilterModal}>
                <Text style={styles.modalCloseButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              {category.options.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.filterOption,
                    selectedFilters[activeFilterCategory].includes(option) && styles.selectedFilterOption
                  ]}
                  onPress={() => toggleFilter(activeFilterCategory, option)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedFilters[activeFilterCategory].includes(option) && styles.selectedFilterOptionText
                  ]}>
                    {option}
                  </Text>
                  {selectedFilters[activeFilterCategory].includes(option) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  const renderSortModal = () => (
    <Modal
      visible={showSortModal}
      transparent={true}
      animationType="slide"
      onRequestClose={closeSortModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Sort By</Text>
            <TouchableOpacity onPress={closeSortModal}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalBody}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.filterOption,
                  sortBy === option && styles.selectedFilterOption
                ]}
                onPress={() => selectSortOption(option)}
              >
                <Text style={[
                  styles.filterOptionText,
                  sortBy === option && styles.selectedFilterOptionText
                ]}>
                  {option}
                </Text>
                {sortBy === option && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const headerRightComponent = (
    <TouchableOpacity style={styles.headerButton}>
      <Text style={styles.headerButtonText}>🛒</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenWrapper
      header={
        <AppHeader
          title="Smart Search"
          leftComponent={<Text style={styles.headerIcon}>🔍</Text>}
          rightComponent={headerRightComponent}
        />
      }
      showBottomNav={true}
      bottomNavProps={{
        navigation,
        activeTab: 'Search',
        translateY: bottomBarTranslateY
      }}
    >
      <View style={styles.container}>
        {/* Sticky Header Section */}
        <View style={styles.stickyHeader}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search for products, shops, or posts..."
              placeholderTextColor={theme.colors.text.tertiary}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>🔍</Text>
            </TouchableOpacity>
          </View>

          {/* Filters Section */}
          <View style={styles.filtersSection}>
            <View style={styles.filtersHeader}>
              <Text style={styles.filtersTitle}>
                Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
              </Text>
              <View style={styles.filterActions}>
                <TouchableOpacity onPress={openSortModal} style={styles.sortButton}>
                  <Text style={styles.sortButtonText}>Sort: {sortBy}</Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={clearAllFilters}>
                  <Text style={styles.clearAllText}>Clear All</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Filter Categories */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterCategoriesContainer}>
              {filterCategories.map((category) => (
                <TouchableOpacity 
                  key={category.key} 
                  style={[
                    styles.filterCategory,
                    selectedFilters[category.key].length > 0 && styles.activeFilterCategory
                  ]}
                  onPress={() => openFilterModal(category.key)}
                >
                  <Text style={[
                    styles.filterCategoryText,
                    selectedFilters[category.key].length > 0 && styles.activeFilterCategoryText
                  ]}>
                    {category.label}
                    {selectedFilters[category.key].length > 0 && ` (${selectedFilters[category.key].length})`}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Active Filters */}
            {getActiveFiltersCount() > 0 && (
              <View style={styles.activeFiltersContainer}>
                {Object.entries(selectedFilters).map(([category, filters]) =>
                  filters.map((filter) => (
                    <TouchableOpacity 
                      key={`${category}-${filter}`} 
                      style={styles.activeFilter}
                      onPress={() => toggleFilter(category, filter)}
                    >
                      <Text style={styles.activeFilterText}>{filter}</Text>
                      <Text style={styles.removeFilterText}> ✕</Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            )}
          </View>
        </View>

        {/* Scrollable Search Results */}
        {showResults && (
          <View style={styles.resultsContainer}>
            <SearchResults
              searchQuery={searchQuery}
              selectedFilters={selectedFilters}
              sortBy={sortBy}
              onProductPress={handleProductPress}
              onShopPress={handleShopPress}
              onPostInteraction={handlePostInteraction}
              onScroll={handleScroll}
              scrollEventThrottle={scrollEventThrottle}
            />
          </View>
        )}
      </View>

      {/* Filter Modal */}
      {renderFilterModal()}

      {/* Sort Modal */}
      {renderSortModal()}
    </ScreenWrapper>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  stickyHeader: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  resultsContainer: {
    flex: 1,
    zIndex: 0,
    paddingTop: theme.spacing.s,
    backgroundColor: theme.colors.background,
  },
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
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.l,
  },
  searchInput: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.s,
  },
  searchButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.l,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 18,
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
  filterActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.m,
    marginRight: theme.spacing.m,
  },
  sortButtonText: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    marginRight: theme.spacing.xs,
  },
  dropdownArrow: {
    fontSize: 10,
    color: theme.colors.text.secondary,
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
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.l,
    marginRight: theme.spacing.s,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeFilterCategory: {
    backgroundColor: theme.colors.primary + '10',
    borderColor: theme.colors.primary,
  },
  filterCategoryText: {
    color: theme.colors.text.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterCategoryText: {
    color: theme.colors.primary,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.l,
    borderTopRightRadius: theme.borderRadius.l,
    paddingBottom: theme.spacing.xl + 20, // Extra padding for bottom safe area
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  modalCloseButton: {
    fontSize: 20,
    color: theme.colors.text.secondary,
    padding: theme.spacing.s,
  },
  modalBody: {
    padding: theme.spacing.m,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  selectedFilterOption: {
    backgroundColor: theme.colors.primary + '10',
  },
  filterOptionText: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
  },
  selectedFilterOptionText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  checkmark: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: '600',
  }
});

export default SmartProductSearch;
