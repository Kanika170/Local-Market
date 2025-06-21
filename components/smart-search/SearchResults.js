import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import TabNavigator from '../shop-detail/TabNavigator';
import AllTab from './tabs/AllTab';
import ProductsTab from './tabs/ProductsTab';
import PostsTab from './tabs/PostsTab';
import ShopsTab from './tabs/ShopsTab';

const SearchResults = ({ 
  searchQuery, 
  selectedFilters,
  sortBy,
  onProductPress,
  onShopPress,
  onPostInteraction
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [activeTab, setActiveTab] = React.useState('all');

  const tabs = [
    { key: 'all', title: 'All' },
    { key: 'products', title: 'Products' },
    { key: 'posts', title: 'Posts' },
    { key: 'shops', title: 'Shops' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'all':
        return (
          <AllTab 
            searchQuery={searchQuery}
            selectedFilters={selectedFilters}
            sortBy={sortBy}
            onProductPress={onProductPress}
            onShopPress={onShopPress}
            onPostInteraction={onPostInteraction}
          />
        );
      case 'products':
        return (
          <ProductsTab 
            searchQuery={searchQuery}
            selectedFilters={selectedFilters}
            sortBy={sortBy}
            onProductPress={onProductPress}
          />
        );
      case 'posts':
        return (
          <PostsTab 
            searchQuery={searchQuery}
            sortBy={sortBy}
            onPostInteraction={onPostInteraction}
          />
        );
      case 'shops':
        return (
          <ShopsTab 
            searchQuery={searchQuery}
            sortBy={sortBy}
            onShopPress={onShopPress}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <TabNavigator 
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
      <View style={styles.content}>
        {renderTabContent()}
      </View>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
  }
});

export default SearchResults;
