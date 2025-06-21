import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StockManagementScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createSellerStyles(theme);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const stockData = {
    lowStock: [
      { id: 1, name: 'Parle-G Biscuit', currentStock: 3, minStock: 10, price: 10, sku: 'PGB001' },
      { id: 2, name: 'Tata Salt', currentStock: 5, minStock: 15, price: 20, sku: 'TS001' },
      { id: 3, name: 'Maggi Noodles', currentStock: 8, minStock: 20, price: 12, sku: 'MG001' },
    ],
    inStock: [
      { id: 4, name: 'Amul Milk', currentStock: 48, minStock: 20, price: 25, sku: 'AM001' },
      { id: 5, name: 'Fortune Oil', currentStock: 35, minStock: 15, price: 140, sku: 'FO001' },
      { id: 6, name: 'Aashirvaad Atta', currentStock: 25, minStock: 10, price: 350, sku: 'AA001' },
    ],
    outOfStock: [
      { id: 7, name: 'Dove Soap', currentStock: 0, minStock: 12, price: 45, sku: 'DS001' },
      { id: 8, name: 'Colgate Toothpaste', currentStock: 0, minStock: 15, price: 55, sku: 'CT001' },
    ],
  };

  const filters = [
    { id: 'all', label: 'All Items', icon: 'view-grid' },
    { id: 'low', label: 'Low Stock', icon: 'alert' },
    { id: 'out', label: 'Out of Stock', icon: 'close-circle' },
  ];

  const getFilteredData = () => {
    let items = [];
    if (selectedFilter === 'low' || selectedFilter === 'all') {
      items = [...items, ...stockData.lowStock];
    }
    if (selectedFilter === 'all') {
      items = [...items, ...stockData.inStock];
    }
    if (selectedFilter === 'out' || selectedFilter === 'all') {
      items = [...items, ...stockData.outOfStock];
    }

    if (searchQuery) {
      return items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return items;
  };

  const StockItem = ({ item }) => {
    const isLowStock = item.currentStock > 0 && item.currentStock <= item.minStock;
    const isOutOfStock = item.currentStock === 0;

    return (
      <TouchableOpacity 
        style={[styles.card, { marginBottom: 12 }]}
        onPress={() => navigation.navigate('EditProduct', { productId: item.id })}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>SKU: {item.sku}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Icon 
                name={isOutOfStock ? 'close-circle' : isLowStock ? 'alert' : 'check-circle'} 
                size={16} 
                color={isOutOfStock ? theme.colors.error : isLowStock ? theme.colors.warning : theme.colors.success} 
              />
              <Text style={[styles.cardSubtitle, { marginLeft: 4 }]}>
                {isOutOfStock ? 'Out of Stock' : `${item.currentStock} units left`}
              </Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[styles.cardValue, { fontSize: 16 }]}>₹{item.price}</Text>
            <TouchableOpacity 
              style={{
                backgroundColor: theme.colors.primary,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 4,
                marginTop: 8,
              }}
              onPress={() => navigation.navigate('UpdateStock', { productId: item.id })}
            >
              <Text style={{ color: theme.colors.white, fontSize: 12 }}>Update Stock</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: 50 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Stock Management</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddProduct')}>
          <Icon name="plus" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={{ 
        flexDirection: 'row', 
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
      }}>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: theme.colors.border,
          paddingHorizontal: 12,
        }}>
          <Icon name="magnify" size={20} color={theme.colors.text.tertiary} />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 14,
              color: theme.colors.text.primary,
            }}
            placeholder="Search by name or SKU"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filters */}
      <View style={{ 
        flexDirection: 'row', 
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: selectedFilter === filter.id ? theme.colors.primary : 'transparent',
              borderRadius: 16,
              paddingHorizontal: 12,
              paddingVertical: 6,
              marginRight: 8,
            }}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Icon 
              name={filter.icon} 
              size={16} 
              color={selectedFilter === filter.id ? theme.colors.white : theme.colors.text.primary} 
            />
            <Text style={{
              marginLeft: 4,
              fontSize: 12,
              color: selectedFilter === filter.id ? theme.colors.white : theme.colors.text.primary,
            }}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Stock List */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingTop: 8 }}>
        {getFilteredData().map((item) => (
          <StockItem key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default StockManagementScreen;
