import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Switch } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductListItem = ({ 
  product, 
  onEdit, 
  onDelete, 
  onToggleStock, 
  onPress 
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: theme.colors.error };
    if (stock <= 10) return { text: 'Low Stock', color: theme.colors.warning };
    return { text: 'In Stock', color: theme.colors.success };
  };

  const stockStatus = getStockStatus(product.stock);
  const discount = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const getProductImage = () => {
    if (product.image && product.image.startsWith('http')) {
      return { uri: product.image };
    }
    // Use assets folder images based on category or default
    switch (product.category?.toLowerCase()) {
      case 'vegetables':
        return require('../../../../../assets/fresh_avocados.jpeg');
      case 'fruits':
        return require('../../../../../assets/orange.jpeg');
      case 'dairy':
        return require('../../../../../assets/organic_milk.jpeg');
      case 'grains':
      case 'bakery':
        return require('../../../../../assets/sourdough_bread.jpeg');
      default:
        return require('../../../../../assets/category.jpeg');
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(product)}>
      <View style={styles.productCard}>
        <View style={styles.productHeader}>
          <View style={styles.productImageContainer}>
            {product.image && typeof product.image === 'string' && product.image.length === 2 ? (
              <Text style={styles.productEmoji}>{product.image}</Text>
            ) : (
              <Image source={getProductImage()} style={styles.productImage} />
            )}
          </View>
          
          <View style={styles.productInfo}>
            <Text style={styles.productName} numberOfLines={2}>
              {product.name}
            </Text>
            <Text style={styles.productCategory}>{product.category}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{product.price}</Text>
              {discount > 0 && (
                <>
                  <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
                  <Text style={styles.discount}>{discount}% off</Text>
                </>
              )}
            </View>
          </View>

          <View style={styles.productActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onEdit(product)}
            >
              <Icon name="pencil" size={18} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onDelete(product)}
            >
              <Icon name="delete" size={18} color={theme.colors.error} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.productStats}>
          <View style={styles.stockInfo}>
            <Icon name="package-variant" size={16} color={stockStatus.color} />
            <Text style={[styles.stockText, { color: stockStatus.color }]}>
              {product.stock} units
            </Text>
          </View>
          
          <View style={styles.quickToggle}>
            <Text style={styles.toggleLabel}>In Stock</Text>
            <Switch
              value={product.stock > 0}
              onValueChange={() => onToggleStock(product)}
              trackColor={{ 
                false: theme.colors.disabled, 
                true: theme.colors.success + '40' 
              }}
              thumbColor={product.stock > 0 ? theme.colors.success : theme.colors.text.tertiary}
              style={styles.switch}
            />
          </View>
        </View>

        <View style={styles.stockStatusContainer}>
          <View style={[styles.stockBadge, { backgroundColor: stockStatus.color + '20' }]}>
            <Text style={[styles.stockBadgeText, { color: stockStatus.color }]}>
              {stockStatus.text}
            </Text>
          </View>
          
          {product.isBestSeller && (
            <View style={styles.bestSellerBadge}>
              <Icon name="star" size={12} color={theme.colors.warning} />
              <Text style={styles.bestSellerText}>Best Seller</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 12,
    },
    productCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.m,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    productHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    productImageContainer: {
      width: 60,
      height: 60,
      borderRadius: theme.borderRadius.s,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      overflow: 'hidden',
    },
    productImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    productEmoji: {
      fontSize: 32,
    },
    productInfo: {
      flex: 1,
      paddingRight: 8,
    },
    productName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 4,
    },
    productCategory: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginBottom: 8,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    price: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.primary,
      marginRight: 8,
    },
    originalPrice: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      textDecorationLine: 'line-through',
      marginRight: 8,
    },
    discount: {
      fontSize: 12,
      color: theme.colors.success,
      fontWeight: '500',
    },
    productActions: {
      flexDirection: 'row',
    },
    actionButton: {
      padding: 8,
      marginLeft: 4,
    },
    productStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    stockInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    stockText: {
      fontSize: 14,
      fontWeight: '500',
      marginLeft: 4,
    },
    quickToggle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    toggleLabel: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginRight: 8,
    },
    switch: {
      transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
    stockStatusContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    stockBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: theme.borderRadius.xs,
    },
    stockBadgeText: {
      fontSize: 12,
      fontWeight: '500',
    },
    bestSellerBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.warning + '20',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: theme.borderRadius.xs,
    },
    bestSellerText: {
      fontSize: 12,
      color: theme.colors.warning,
      fontWeight: '500',
      marginLeft: 4,
    },
  });

export default ProductListItem;
