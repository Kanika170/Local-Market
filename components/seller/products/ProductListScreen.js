import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import { useSeller } from '../../../context/SellerContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductListScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { products, deleteProduct } = useSeller();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Mock products data for demo
  const [mockProducts] = useState([
    {
      id: 1,
      name: 'Organic Tomatoes',
      category: 'Vegetables',
      price: 60,
      originalPrice: 70,
      stock: 25,
      image: '🍅',
      status: 'active',
      views: 145,
      likes: 23,
    },
    {
      id: 2,
      name: 'Basmati Rice 5kg',
      category: 'Grains',
      price: 450,
      originalPrice: 500,
      stock: 5,
      image: '🌾',
      status: 'active',
      views: 89,
      likes: 12,
    },
    {
      id: 3,
      name: 'Fresh Milk 1L',
      category: 'Dairy',
      price: 65,
      originalPrice: 65,
      stock: 0,
      image: '🥛',
      status: 'out_of_stock',
      views: 67,
      likes: 8,
    },
    {
      id: 4,
      name: 'Whole Wheat Flour',
      category: 'Grains',
      price: 280,
      originalPrice: 300,
      stock: 15,
      image: '🌾',
      status: 'active',
      views: 234,
      likes: 45,
    },
  ]);

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Others'];

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, mockProducts]);

  const filterProducts = () => {
    let filtered = mockProducts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Out of Stock', color: theme.colors.error };
    if (stock <= 10) return { text: 'Low Stock', color: theme.colors.warning };
    return { text: 'In Stock', color: theme.colors.success };
  };

  const handleDeleteProduct = (productId, productName) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${productName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteProduct(productId),
        },
      ]
    );
  };

  const renderProduct = ({ item }) => {
    const stockStatus = getStockStatus(item.stock);
    const discount = item.originalPrice > item.price 
      ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
      : 0;

    return (
      <View style={styles.productCard}>
        <View style={styles.productHeader}>
          <View style={styles.productImage}>
            <Text style={styles.productEmoji}>{item.image}</Text>
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productCategory}>{item.category}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>₹{item.price}</Text>
              {discount > 0 && (
                <>
                  <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
                  <Text style={styles.discount}>{discount}% off</Text>
                </>
              )}
            </View>
          </View>
          <View style={styles.productActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('EditProduct', { product: item })}
            >
              <Icon name="pencil" size={20} color={theme.colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleDeleteProduct(item.id, item.name)}
            >
              <Icon name="delete" size={20} color={theme.colors.error} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.productStats}>
          <View style={styles.statItem}>
            <Icon name="package-variant" size={16} color={stockStatus.color} />
            <Text style={[styles.statText, { color: stockStatus.color }]}>
              {item.stock} units
            </Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="eye" size={16} color={theme.colors.text.secondary} />
            <Text style={styles.statText}>{item.views} views</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name="heart" size={16} color={theme.colors.text.secondary} />
            <Text style={styles.statText}>{item.likes} likes</Text>
          </View>
        </View>

        <View style={styles.stockStatusContainer}>
          <View style={[styles.stockBadge, { backgroundColor: stockStatus.color + '20' }]}>
            <Text style={[styles.stockText, { color: stockStatus.color }]}>
              {stockStatus.text}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Products</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProduct')}
        >
          <Icon name="plus" size={24} color={theme.colors.text.inverse} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={theme.colors.text.secondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor={theme.colors.text.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filter */}
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.selectedCategory,
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.selectedCategoryText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="package-variant-closed" size={64} color={theme.colors.text.tertiary} />
            <Text style={styles.emptyText}>No products found</Text>
            <TouchableOpacity
              style={styles.addFirstProductButton}
              onPress={() => navigation.navigate('AddProduct')}
            >
              <Text style={styles.addFirstProductText}>Add Your First Product</Text>
            </TouchableOpacity>
          </View>
        }
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
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    addButton: {
      backgroundColor: theme.colors.primary,
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      marginHorizontal: 20,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: theme.borderRadius.s,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text.primary,
      marginLeft: 8,
    },
    categoryContainer: {
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    categoryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: theme.borderRadius.s,
      backgroundColor: theme.colors.surface,
      marginRight: 8,
    },
    selectedCategory: {
      backgroundColor: theme.colors.primary,
    },
    categoryText: {
      fontSize: 14,
      color: theme.colors.text.primary,
      fontWeight: '500',
    },
    selectedCategoryText: {
      color: theme.colors.text.inverse,
    },
    productsList: {
      paddingHorizontal: 20,
    },
    productCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.m,
      padding: 16,
      marginBottom: 16,
    },
    productHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    productImage: {
      width: 60,
      height: 60,
      borderRadius: theme.borderRadius.s,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    productEmoji: {
      fontSize: 32,
    },
    productInfo: {
      flex: 1,
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
      marginBottom: 12,
    },
    statItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statText: {
      fontSize: 12,
      color: theme.colors.text.secondary,
      marginLeft: 4,
    },
    stockStatusContainer: {
      alignItems: 'flex-start',
    },
    stockBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: theme.borderRadius.xs,
    },
    stockText: {
      fontSize: 12,
      fontWeight: '500',
    },
    emptyContainer: {
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyText: {
      fontSize: 16,
      color: theme.colors.text.secondary,
      marginTop: 16,
      marginBottom: 24,
    },
    addFirstProductButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: theme.borderRadius.s,
    },
    addFirstProductText: {
      color: theme.colors.text.inverse,
      fontSize: 16,
      fontWeight: '500',
    },
  });

export default ProductListScreen;
