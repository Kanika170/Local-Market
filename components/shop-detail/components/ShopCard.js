import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

const ShopCard = ({ 
  shop, 
  onPress,
  style 
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity 
      style={[styles.container, style]}
      onPress={() => onPress(shop)}
    >
      <Image 
        source={shop.image} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {shop.name}
        </Text>
        <Text style={styles.distance}>
          {shop.distance}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {shop.rating}</Text>
          <Text style={styles.reviews}>({shop.reviews})</Text>
        </View>
        {shop.specialOffer && (
          <View style={styles.offerBadge}>
            <Text style={styles.offerText}>Special Offer</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    width: 200,
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
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
    fontWeight: '600',
  },
  distance: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  rating: {
    ...theme.typography.body2,
    color: theme.colors.rating,
    marginRight: theme.spacing.xs,
  },
  reviews: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  offerBadge: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.s,
    marginTop: theme.spacing.xs,
  },
  offerText: {
    ...theme.typography.caption,
    color: theme.colors.text.inverse,
    fontWeight: '600',
  },
});

export default ShopCard;
