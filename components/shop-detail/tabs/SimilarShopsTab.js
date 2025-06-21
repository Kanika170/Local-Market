import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import ShopCard from '../components/ShopCard';

const SimilarShopsTab = ({ 
  shops, 
  onShopPress,
  currentLocation = "Your Location" 
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [sortBy, setSortBy] = useState('distance');

  const sortOptions = [
    { key: 'distance', label: 'Distance' },
    { key: 'rating', label: 'Rating' },
    { key: 'reviews', label: 'Reviews' },
  ];

  const getSortedShops = () => {
    return [...shops].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'distance':
        default:
          return parseFloat(a.distance) - parseFloat(b.distance);
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Location Header */}
      <View style={styles.locationHeader}>
        <Text style={styles.locationTitle}>Showing shops near</Text>
        <Text style={styles.locationText}>📍 {currentLocation}</Text>
      </View>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.sortOptionsContainer}
        >
          {sortOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.sortButton,
                sortBy === option.key && styles.activeSortButton
              ]}
              onPress={() => setSortBy(option.key)}
            >
              <Text style={[
                styles.sortButtonText,
                sortBy === option.key && styles.activeSortButtonText
              ]}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Shops Grid */}
      <ScrollView 
        style={styles.shopsContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.shopsGrid}>
          {getSortedShops().map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              onPress={onShopPress}
              style={styles.shopCard}
            />
          ))}
        </View>

        {/* Load More Button */}
        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Load More Shops</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  locationHeader: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  locationTitle: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  locationText: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sortLabel: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginRight: theme.spacing.m,
  },
  sortOptionsContainer: {
    flexGrow: 0,
  },
  sortButton: {
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.s,
    marginRight: theme.spacing.m,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeSortButton: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  sortButtonText: {
    ...theme.typography.button,
    color: theme.colors.text.primary,
  },
  activeSortButtonText: {
    color: theme.colors.text.inverse,
  },
  shopsContainer: {
    flex: 1,
    padding: theme.spacing.m,
  },
  shopsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shopCard: {
    width: '48%',
    marginBottom: theme.spacing.m,
  },
  loadMoreButton: {
    backgroundColor: theme.colors.primary + '10',
    borderRadius: theme.borderRadius.m,
    paddingVertical: theme.spacing.m,
    alignItems: 'center',
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.xl,
  },
  loadMoreText: {
    color: theme.colors.primary,
    ...theme.typography.button,
  },
});

export default SimilarShopsTab;
