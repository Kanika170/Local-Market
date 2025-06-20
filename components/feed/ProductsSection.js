import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { useLocation } from '../../context/LocationContext';

const ProductsSection = ({ products, onProductPress }) => {
  const { theme } = useTheme();
  const { selectedLocation } = useLocation();
  const styles = createStyles(theme);

  // Filter and sort products based on location
  const getLocationBasedProducts = () => {
    if (!selectedLocation) return products;

    // In a real app, this would filter based on shop locations
    // For now, we'll just add availability info based on mock data
    return products.map(product => ({
      ...product,
      nearbyAvailability: {
        isNearby: Math.random() > 0.3, // Mock availability
        shopsNearby: Math.floor(Math.random() * 3) + 1 // Mock number of nearby shops
      }
    })).sort((a, b) => {
      // Sort by nearby availability first
      if (a.nearbyAvailability.isNearby && !b.nearbyAvailability.isNearby) return -1;
      if (!a.nearbyAvailability.isNearby && b.nearbyAvailability.isNearby) return 1;
      return 0;
    });
  };

  const locationBasedProducts = getLocationBasedProducts();

  const renderProductCard = (product) => (
    <TouchableOpacity 
      key={product.id} 
      style={[
        styles.productCard,
        product.nearbyAvailability?.isNearby && styles.nearbyProductCard
      ]}
      onPress={() => onProductPress(product)}
    >
      <View style={styles.productHeader}>
        <Text style={styles.productShop}>{product.shop}</Text>
        <Text style={styles.productCategory}>{product.category}</Text>
      </View>
      
      <View style={styles.productContent}>
        <View style={styles.productImageContainer}>
          <Text style={styles.productImage}>{product.image}</Text>
          {product.nearbyAvailability?.isNearby && (
            <View style={styles.availabilityBadge}>
              <Text style={styles.availabilityText}>
                Available in {product.nearbyAvailability.shopsNearby} nearby shops
              </Text>
            </View>
          )}
        </View>

        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>
          
          {product.discount && (
            <Text style={styles.productDiscount}>{product.discount}</Text>
          )}
          
          {product.tag && (
            <Text style={styles.productTag}>{product.tag}</Text>
          )}
          
          <Text style={styles.productDescription} numberOfLines={2}>
            {product.description}
          </Text>
          
          <View style={styles.productMeta}>
            <Text style={styles.productRating}>⭐ {product.rating} ({product.reviews})</Text>
            {product.nearbyAvailability?.isNearby && (
              <Text style={styles.nearbyIndicator}>📍 Nearby</Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Products</Text>
        {selectedLocation && (
          <Text style={styles.locationInfo}>
            Products available near {selectedLocation.name || 'your location'}
          </Text>
        )}
      </View>

      <View style={styles.productsGrid}>
        {locationBasedProducts.map(renderProductCard)}
      </View>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    marginBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  locationInfo: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  productsGrid: {
    paddingHorizontal: theme.spacing.m,
  },
  productCard: {
    backgroundColor: theme.components.card.backgroundColor,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
    elevation: 2,
    shadowColor: theme.components.card.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nearbyProductCard: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  productHeader: {
    marginBottom: theme.spacing.m,
  },
  productShop: {
    ...theme.typography.body1,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  productContent: {
    marginBottom: theme.spacing.m,
  },
  productImageContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.m,
    position: 'relative',
  },
  productImage: {
    fontSize: 60,
    textAlign: 'center',
  },
  availabilityBadge: {
    position: 'absolute',
    bottom: -theme.spacing.s,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.s,
  },
  availabilityText: {
    color: theme.colors.text.inverse,
    ...theme.typography.caption,
    fontWeight: '500',
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    ...theme.typography.body1,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  productPrice: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  productDiscount: {
    ...theme.typography.caption,
    color: theme.colors.secondary,
    backgroundColor: theme.colors.secondary + '20',
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  productTag: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    backgroundColor: theme.colors.ripple,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.xs,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.xs,
  },
  productDescription: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    lineHeight: 16,
    marginBottom: theme.spacing.s,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productRating: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  nearbyIndicator: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '500',
  },
});

export default ProductsSection;
