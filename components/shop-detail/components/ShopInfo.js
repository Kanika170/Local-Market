import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

const ShopInfo = ({ 
  rating, 
  reviewCount, 
  location, 
  distance 
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>★★★★☆</Text>
        <Text style={styles.reviews}>{rating} ({reviewCount} reviews)</Text>
      </View>

      <View style={styles.locationContainer}>
        <Text style={styles.location}>📍 {location}</Text>
        <Text style={styles.distance}>{distance}</Text>
      </View>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  rating: {
    color: theme.colors.rating,
    ...theme.typography.body1,
    marginRight: theme.spacing.s,
  },
  reviews: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  locationContainer: {
    marginTop: theme.spacing.m,
  },
  location: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  distance: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
});

export default ShopInfo;
