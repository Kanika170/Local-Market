import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import ShopCard from '../../shop-detail/components/ShopCard';
import { searchShops } from '../../../data/mockSearchData';

const ShopsTab = ({ searchQuery, sortBy, onShopPress, onScroll, scrollEventThrottle }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const filteredShops = searchShops(searchQuery, sortBy);

  return (
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
    >
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
