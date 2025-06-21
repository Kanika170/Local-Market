import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import ProductCard from '../components/ProductCard';

const ProductsTab = ({
  products,
  featuredProducts,
  onProductPress,
  onAddToCart,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [activeSection, setActiveSection] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'Groceries',
    'Fresh Produce',
    'Dairy',
    'Beverages',
    'Snacks',
    'Household',
  ];

  // Filter by category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      {/* Section Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeSection === 'featured' && styles.activeToggle,
          ]}
          onPress={() => setActiveSection('featured')}
        >
          <Text
            style={[
              styles.toggleText,
              activeSection === 'featured' && styles.activeToggleText,
            ]}
          >
            Featured
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeSection === 'all' && styles.activeToggle,
          ]}
          onPress={() => setActiveSection('all')}
        >
          <Text
            style={[
              styles.toggleText,
              activeSection === 'all' && styles.activeToggleText,
            ]}
          >
            All Products
          </Text>
        </TouchableOpacity>
      </View>

      {activeSection === 'featured' ? (
        // Featured Products Section
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.featuredContainer}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.productsRow}
            >
              {featuredProducts.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No featured products</Text>
                </View>
              ) : (
                featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onPress={onProductPress}
                    onAddToCart={onAddToCart}
                    style={styles.featuredCard}
                  />
                ))
              )}
            </ScrollView>
          </View>
        </ScrollView>
      ) : (
        // All Products Section
        <View style={styles.allProductsContainer}>
          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              placeholderTextColor={theme.colors.text.tertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
            />
          </View>

          {/* Categories Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Products Grid */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.productsGrid}>
              {filteredProducts.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No products found</Text>
                </View>
              ) : (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onPress={onProductPress}
                    onAddToCart={onAddToCart}
                    style={styles.gridCard}
                  />
                ))
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    toggleContainer: {
      flexDirection: 'row',
      padding: theme.spacing.m,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    toggleButton: {
      flex: 1,
      paddingVertical: theme.spacing.m,
      alignItems: 'center',
    },
    activeToggle: {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.primary,
    },
    toggleText: {
      ...theme.typography.body1,
      color: theme.colors.text.secondary,
    },
    activeToggleText: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
    featuredContainer: {
      padding: theme.spacing.l,
    },
    sectionTitle: {
      ...theme.typography.h3,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.m,
    },
    productsRow: {
      marginHorizontal: -theme.spacing.l,
      paddingHorizontal: theme.spacing.l,
    },
    featuredCard: {
      marginRight: theme.spacing.l,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    allProductsContainer: {
      flex: 1,
    },
    searchBarContainer: {
      paddingHorizontal: theme.spacing.m,
      paddingTop: theme.spacing.m,
      paddingBottom: 2,
      backgroundColor: theme.colors.surface,
    },
    searchInput: {
      backgroundColor: theme.colors.background,
      borderRadius: 24,
      paddingHorizontal: 18,
      paddingVertical: 10,
      fontSize: 16,
      color: theme.colors.text.primary,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    categoriesContainer: {
      backgroundColor: theme.colors.surface,
      paddingVertical: 8,
    },
    categoriesContent: {
      paddingHorizontal: theme.spacing.m,
    },
    categoryButton: {
      paddingHorizontal: theme.spacing.l,
      paddingVertical: theme.spacing.s,
      marginRight: theme.spacing.m,
      borderRadius: theme.borderRadius.xl,
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    selectedCategory: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    categoryText: {
      ...theme.typography.button,
      color: theme.colors.text.primary,
    },
    selectedCategoryText: {
      color: theme.colors.text.inverse,
    },
    productsGrid: {
      padding: theme.spacing.m,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    gridCard: {
      width: '48%',
      marginBottom: theme.spacing.m,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },
    emptyContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
    },
    emptyText: {
      color: theme.colors.text.secondary,
      fontSize: 16,
      marginTop: 8,
    },
  });

export default ProductsTab;