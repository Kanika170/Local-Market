import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

const ProductCard = ({ 
  product, 
  onPress, 
  onAddToCart,
  style 
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity 
      style={[styles.container, style]}
      onPress={() => onPress(product)}
    >
      <Image 
        source={product.image} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>
          {product.price}
        </Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: theme.borderRadius.s,
    marginBottom: theme.spacing.m,
  },
  info: {
    alignItems: 'flex-start',
  },
  name: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  price: {
    ...theme.typography.body1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.s,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.xl,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  addButtonText: {
    color: theme.colors.text.inverse,
    ...theme.typography.h3,
  },
});

export default ProductCard;
