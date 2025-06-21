import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import ProductCard from '../../shop-detail/components/ProductCard';
import { searchProducts } from '../../../data/mockSearchData';

const ProductsTab = ({ searchQuery, selectedFilters, sortBy, onProductPress, onScroll, scrollEventThrottle }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const filteredProducts = searchProducts(searchQuery, selectedFilters, sortBy);

  const handleAddToCart = (product) => {
    // Handle add to cart functionality
    console.log('Added to cart:', product.name);
  };

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
    >
      <View style={styles.header}>
        <Text style={styles.resultCount}>
          {filteredProducts.length} products found
        </Text>
      </View>
      
      <View style={styles.productGrid}>
        {filteredProducts.map((product, index) => (
          <View key={product.id} style={[
            styles.productWrapper,
            index % 2 === 1 && styles.rightProduct
          ]}>
            <ProductCard
              product={product}
              onPress={onProductPress}
              onAddToCart={handleAddToCart}
            />
            <View style={styles.shopInfo}>
              <Text style={styles.shopName}>{product.shop}</Text>
              <Text style={styles.distance}>{product.distance}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.spacing.m,
    backgroundColor: theme.colors.background,
  },
  header: {
    marginBottom: theme.spacing.l,
  },
  resultCount: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productWrapper: {
    width: '48%',
    marginBottom: theme.spacing.l,
  },
  shopInfo: {
    marginTop: theme.spacing.s,
    paddingHorizontal: theme.spacing.s,
  },
  shopName: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  distance: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
});

export default ProductsTab;
