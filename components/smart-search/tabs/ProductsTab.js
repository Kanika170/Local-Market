import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import ProductCard from '../../shop-detail/components/ProductCard';
import { popularProducts } from '../../../data/feedData';

const ProductsTab = ({ searchQuery, selectedFilters, sortBy, onProductPress }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Mock data for cake search
  const cakeProducts = [
    {
      id: 1,
      name: 'Chocolate Truffle Cake',
      price: '₹500',
      shop: 'Modern Bakery',
      distance: '2.1 km',
      rating: 4.8,
      reviews: 45,
      image: require('../../../assets/category.jpeg'),
      inStock: true,
      description: 'Rich chocolate truffle cake with premium cocoa'
    },
    {
      id: 2,
      name: 'Black Forest Pastry',
      price: '₹80',
      shop: 'Delicious Cakes',
      distance: '3.5 km',
      rating: 4.6,
      reviews: 32,
      image: require('../../../assets/category.jpeg'),
      inStock: true,
      description: 'Classic black forest pastry with cherries'
    },
    {
      id: 3,
      name: 'Fruit Cake Slice',
      price: '₹50',
      shop: 'City Kirana',
      distance: '1.8 km',
      rating: 4.3,
      reviews: 28,
      image: require('../../../assets/category.jpeg'),
      inStock: true,
      description: 'Fresh fruit cake slice with seasonal fruits'
    },
    {
      id: 4,
      name: 'Vanilla Sponge Cake',
      price: '₹350',
      shop: 'Sweet Treats',
      distance: '2.8 km',
      rating: 4.5,
      reviews: 38,
      image: require('../../../assets/category.jpeg'),
      inStock: true,
      description: 'Light and fluffy vanilla sponge cake'
    },
    {
      id: 5,
      name: 'Red Velvet Cupcake',
      price: '₹120',
      shop: 'Cupcake Corner',
      distance: '1.5 km',
      rating: 4.7,
      reviews: 52,
      image: require('../../../assets/category.jpeg'),
      inStock: true,
      description: 'Moist red velvet cupcake with cream cheese frosting'
    },
    {
      id: 6,
      name: 'Strawberry Shortcake',
      price: '₹280',
      shop: 'Berry Delights',
      distance: '3.2 km',
      rating: 4.4,
      reviews: 29,
      image: require('../../../assets/category.jpeg'),
      inStock: true,
      description: 'Fresh strawberry shortcake with whipped cream'
    }
  ];

  const filterAndSortProducts = () => {
    let filteredProducts = searchQuery.toLowerCase().includes('cake') 
      ? cakeProducts 
      : popularProducts;

    // Apply price filters
    if (selectedFilters.price && selectedFilters.price.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        const price = parseInt(product.price.replace('₹', '').replace(',', ''));
        return selectedFilters.price.some(filter => {
          if (filter === 'Under ₹100') return price < 100;
          if (filter === 'Under ₹200') return price < 200;
          if (filter === '₹200-₹500') return price >= 200 && price <= 500;
          if (filter === 'Over ₹500') return price > 500;
          return true;
        });
      });
    }

    // Apply rating filters
    if (selectedFilters.rating && selectedFilters.rating.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        return selectedFilters.rating.some(filter => {
          if (filter === '3+ Stars') return product.rating >= 3;
          if (filter === '4+ Stars') return product.rating >= 4;
          if (filter === '4.5+ Stars') return product.rating >= 4.5;
          return true;
        });
      });
    }

    // Apply sorting
    const sortedProducts = [...filteredProducts];
    switch (sortBy) {
      case 'Price: Low to High':
        sortedProducts.sort((a, b) => {
          const priceA = parseInt(a.price.replace('₹', '').replace(',', ''));
          const priceB = parseInt(b.price.replace('₹', '').replace(',', ''));
          return priceA - priceB;
        });
        break;
      case 'Price: High to Low':
        sortedProducts.sort((a, b) => {
          const priceA = parseInt(a.price.replace('₹', '').replace(',', ''));
          const priceB = parseInt(b.price.replace('₹', '').replace(',', ''));
          return priceB - priceA;
        });
        break;
      case 'Rating':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'Distance':
        sortedProducts.sort((a, b) => {
          const distanceA = parseFloat(a.distance.replace(' km', ''));
          const distanceB = parseFloat(b.distance.replace(' km', ''));
          return distanceA - distanceB;
        });
        break;
      case 'Newest First':
        // In a real app, we would sort by creation date
        // For now, we'll keep the original order
        break;
      default: // 'Relevance'
        // For relevance, we could implement a scoring system
        // For now, we'll keep the original order
        break;
    }

    return sortedProducts;
  };

  const filteredProducts = filterAndSortProducts();

  const handleAddToCart = (product) => {
    // Handle add to cart functionality
    console.log('Added to cart:', product.name);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
