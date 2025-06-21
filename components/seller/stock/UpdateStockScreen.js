import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UpdateStockScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const styles = createSellerStyles(theme);
  const { productId } = route.params || {};

  // Mock product data
  const [product] = useState({
    id: productId || 1,
    name: 'Parle-G Biscuit',
    sku: 'PGB001',
    currentStock: 3,
    minStock: 10,
    price: 10,
  });

  const [newStock, setNewStock] = useState(product.currentStock.toString());
  const [minStockLevel, setMinStockLevel] = useState(product.minStock.toString());

  const handleUpdateStock = () => {
    const stockValue = parseInt(newStock);
    const minValue = parseInt(minStockLevel);

    if (isNaN(stockValue) || stockValue < 0) {
      Alert.alert('Error', 'Please enter a valid stock quantity');
      return;
    }

    if (isNaN(minValue) || minValue < 0) {
      Alert.alert('Error', 'Please enter a valid minimum stock level');
      return;
    }

    Alert.alert(
      'Stock Updated',
      `Stock for ${product.name} has been updated to ${stockValue} units`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const quickActions = [
    { label: '+5', value: 5 },
    { label: '+10', value: 10 },
    { label: '+20', value: 20 },
    { label: '+50', value: 50 },
  ];

  const addQuickStock = (value) => {
    const currentValue = parseInt(newStock) || 0;
    setNewStock((currentValue + value).toString());
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: 50 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Stock</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={{ flex: 1, padding: 16 }}>
        {/* Product Info */}
        <View style={[styles.card, { marginBottom: 20 }]}>
          <Text style={styles.cardTitle}>{product.name}</Text>
          <Text style={styles.cardSubtitle}>SKU: {product.sku}</Text>
          <Text style={styles.cardSubtitle}>Price: ₹{product.price}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Icon name="package-variant" size={16} color={theme.colors.primary} />
            <Text style={[styles.cardSubtitle, { marginLeft: 4 }]}>
              Current Stock: {product.currentStock} units
            </Text>
          </View>
        </View>

        {/* Update Stock */}
        <View style={[styles.card, { marginBottom: 20 }]}>
          <Text style={[styles.cardTitle, { marginBottom: 12 }]}>New Stock Quantity</Text>
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              marginBottom: 12,
              textAlign: 'center',
            }}
            value={newStock}
            onChangeText={setNewStock}
            keyboardType="numeric"
            placeholder="Enter stock quantity"
          />

          {/* Quick Actions */}
          <Text style={[styles.cardSubtitle, { marginBottom: 8 }]}>Quick Add:</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.value}
                style={{
                  backgroundColor: theme.colors.primary,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 6,
                  flex: 1,
                  marginHorizontal: 2,
                }}
                onPress={() => addQuickStock(action.value)}
              >
                <Text style={{
                  color: theme.colors.white,
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: '500',
                }}>
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Minimum Stock Level */}
        <View style={[styles.card, { marginBottom: 20 }]}>
          <Text style={[styles.cardTitle, { marginBottom: 12 }]}>Minimum Stock Level</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 8,
              padding: 12,
              fontSize: 16,
              textAlign: 'center',
            }}
            value={minStockLevel}
            onChangeText={setMinStockLevel}
            keyboardType="numeric"
            placeholder="Enter minimum stock level"
          />
          <Text style={[styles.cardSubtitle, { marginTop: 8, textAlign: 'center' }]}>
            You'll be notified when stock falls below this level
          </Text>
        </View>

        {/* Stock Status Preview */}
        <View style={[styles.card, { marginBottom: 20 }]}>
          <Text style={[styles.cardTitle, { marginBottom: 12 }]}>Stock Status Preview</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.cardSubtitle}>New Stock Level</Text>
              <Text style={[styles.cardValue, { fontSize: 18 }]}>{newStock || '0'} units</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Icon 
                name={
                  parseInt(newStock) === 0 ? 'close-circle' : 
                  parseInt(newStock) <= parseInt(minStockLevel) ? 'alert-circle' : 
                  'check-circle'
                } 
                size={32} 
                color={
                  parseInt(newStock) === 0 ? theme.colors.error : 
                  parseInt(newStock) <= parseInt(minStockLevel) ? theme.colors.warning : 
                  theme.colors.success
                } 
              />
              <Text style={[styles.cardSubtitle, { marginTop: 4 }]}>
                {parseInt(newStock) === 0 ? 'Out of Stock' : 
                 parseInt(newStock) <= parseInt(minStockLevel) ? 'Low Stock' : 
                 'In Stock'}
              </Text>
            </View>
          </View>
        </View>

        {/* Update Button */}
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.primary,
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 'auto',
          }}
          onPress={handleUpdateStock}
        >
          <Text style={{
            color: theme.colors.white,
            fontSize: 16,
            fontWeight: '600',
          }}>
            Update Stock
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdateStockScreen;
