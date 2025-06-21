import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import ShopCard from '../../shop-detail/components/ShopCard';

const ShopsTab = ({ searchQuery, sortBy, onShopPress }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Mock data for cake-related shops
  const cakeShops = [
    {
      id: 1,
      name: 'Modern Bakery',
      image: require('../../../assets/groceryshop1.jpeg'),
      distance: '2.1 km away',
      rating: 4.5,
      reviews: 128,
      specialOffer: true,
      categories: ['Bakery', 'Cakes', 'Desserts'],
      description: 'Premium bakery known for custom cakes and pastries'
    },
    {
      id: 2,
      name: 'Delicious Cakes',
      image: require('../../../assets/groceryshop1.jpeg'),
      distance: '3.5 km away',
      rating: 4.7,
      reviews: 95,
      specialOffer: false,
      categories: ['Bakery', 'Cakes', 'Pastries'],
      description: 'Specializing in fresh cakes and pastries'
    },
    {
      id: 3,
      name: 'City Kirana',
      image: require('../../../assets/groceryshop1.jpeg'),
      distance: '1.8 km away',
      rating: 4.3,
      reviews: 67,
      specialOffer: true,
      categories: ['Grocery', 'Bakery', 'General Store'],
      description: 'Local store with fresh baked goods'
    },
    {
      id: 4,
      name: 'Sweet Treats',
      image: require('../../../assets/groceryshop1.jpeg'),
      distance: '2.8 km away',
      rating: 4.6,
      reviews: 82,
      specialOffer: false,
      categories: ['Desserts', 'Cakes', 'Ice Cream'],
      description: 'Dessert paradise with wide variety of cakes'
    },
    {
      id: 5,
      name: 'Berry Delights',
      image: require('../../../assets/groceryshop1.jpeg'),
      distance: '3.2 km away',
      rating: 4.4,
      reviews: 54,
      specialOffer: true,
      categories: ['Bakery', 'Cafe', 'Desserts'],
      description: 'Famous for fruit cakes and pastries'
    }
  ];

  const filterAndSortShops = () => {
    let filteredShops = searchQuery.toLowerCase().includes('cake') 
      ? cakeShops 
      : cakeShops.filter(shop => 
          shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          shop.categories.some(category => 
            category.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          shop.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Apply sorting
    const sortedShops = [...filteredShops];
    switch (sortBy) {
      case 'Rating':
        sortedShops.sort((a, b) => b.rating - a.rating);
        break;
      case 'Distance':
        sortedShops.sort((a, b) => {
          const distanceA = parseFloat(a.distance.replace(' km away', ''));
          const distanceB = parseFloat(b.distance.replace(' km away', ''));
          return distanceA - distanceB;
        });
        break;
      case 'Newest First':
        // In a real app, we would sort by creation date
        // For now, we'll keep the original order
        break;
      case 'Reviews':
        sortedShops.sort((a, b) => b.reviews - a.reviews);
        break;
      default: // 'Relevance'
        // For relevance, we could implement a scoring system
        // For now, we'll keep the original order
        break;
    }

    return sortedShops;
  };

  const filteredShops = filterAndSortShops();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.resultCount}>
          {filteredShops.length} shops found
        </Text>
      </View>

      <View style={styles.shopsContainer}>
        {filteredShops.map((shop) => (
          <View key={shop.id} style={styles.shopWrapper}>
            <ShopCard
              shop={shop}
              onPress={onShopPress}
              style={styles.shopCard}
            />
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
  },
  header: {
    marginBottom: theme.spacing.l,
  },
  resultCount: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  shopsContainer: {
    paddingBottom: theme.spacing.xl,
  },
  shopWrapper: {
    marginBottom: theme.spacing.l,
  },
  shopCard: {
    width: '100%',
  }
});

export default ShopsTab;
