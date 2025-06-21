import React, { useState, useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import { useSeller } from '../../../context/SellerContext';

// Components
import ProductListHeader from './components/ProductListHeader';
import ProductSearchBar from './components/ProductSearchBar';
import ProductFilterModal from './components/ProductFilterModal';
import ProductSortModal from './components/ProductSortModal';
import ProductListItem from './components/ProductListItem';
import EmptyProductList from './components/EmptyProductList';

const ProductListScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { products, updateProduct, deleteProduct } = useSeller();
  const styles = createStyles(theme);

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All',
    stockStatus: 'all',
    b2bStatus: 'all',
  });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Handlers
  const handleAddProduct = () => {
    navigation.navigate('AddProduct');
  };

  const handleEditProduct = (product) => {
    navigation.navigate('EditProduct', { product });
  };

  const handleDeleteProduct = (product) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${product.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteProduct(product.id),
        },
      ]
    );
  };

  const handleToggleStock = (product) => {
    const updatedProduct = {
      ...product,
      stock: product.stock > 0 ? 0 : 1, // Toggle between in stock and out of stock
    };
    updateProduct(product.id, updatedProduct);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const clearFilters = () => {
    setFilters({
      category: 'All',
      stockStatus: 'all',
      b2bStatus: 'all',
    });
    setSearchQuery('');
  };

  // Memoized filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.barcode?.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.category !== 'All') {
      result = result.filter(product => product.category === filters.category);
    }

    if (filters.stockStatus !== 'all') {
      switch (filters.stockStatus) {
        case 'in_stock':
          result = result.filter(product => product.stock > 10);
          break;
        case 'low_stock':
          result = result.filter(product => product.stock > 0 && product.stock <= 10);
          break;
        case 'out_of_stock':
          result = result.filter(product => product.stock === 0);
          break;
      }
    }

    if (filters.b2bStatus !== 'all') {
      result = result.filter(
        product => product.b2bEnabled === (filters.b2bStatus === 'enabled')
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'stock':
          comparison = a.stock - b.stock;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'created':
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [products, searchQuery, filters, sortBy, sortOrder]);

  // Render
  const renderItem = useCallback(({ item }) => (
    <ProductListItem
      product={item}
      onEdit={handleEditProduct}
      onDelete={handleDeleteProduct}
      onToggleStock={handleToggleStock}
      onPress={handleEditProduct}
    />
  ), []);

  const hasActiveFilters = 
    filters.category !== 'All' ||
    filters.stockStatus !== 'all' ||
    filters.b2bStatus !== 'all' ||
    searchQuery !== '';

  return (
    <View style={styles.container}>
      <ProductListHeader onAddProduct={handleAddProduct} />
      
      <ProductSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterPress={() => setShowFilterModal(true)}
        onSortPress={() => setShowSortModal(true)}
      />

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyProductList
            onAddProduct={handleAddProduct}
            hasFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />
        }
      />

      <ProductFilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={() => setShowFilterModal(false)}
        onClearFilters={clearFilters}
      />

      <ProductSortModal
        visible={showSortModal}
        onClose={() => setShowSortModal(false)}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    listContent: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      flexGrow: 1,
    },
  });

export default ProductListScreen;
