import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

const TaggedProducts = ({ postData, setPostData }) => {
  const { theme } = useTheme();
  const [availableProducts] = useState([
    { id: 1, name: 'Organic Tomatoes', image: '🍅' },
    { id: 2, name: 'Basmati Rice 5kg', image: '🌾' },
    { id: 3, name: 'Fresh Milk 1L', image: '🥛' },
    { id: 4, name: 'Whole Wheat Flour', image: '🌾' },
  ]);

  const handleTagProduct = (product) => {
    if (!postData.taggedProducts.find(p => p.id === product.id)) {
      setPostData({
        ...postData,
        taggedProducts: [...postData.taggedProducts, product],
      });
    }
  };

  const handleUntagProduct = (productId) => {
    setPostData({
      ...postData,
      taggedProducts: postData.taggedProducts.filter(p => p.id !== productId),
    });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Tag Products (Optional)</Text>
      {postData.taggedProducts.length > 0 && (
        <View style={styles.taggedProductsContainer}>
          <Text style={styles.taggedProductsTitle}>Tagged Products:</Text>
          <View style={styles.taggedProducts}>
            {postData.taggedProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.taggedProduct}
                onPress={() => handleUntagProduct(product.id)}
              >
                <Text style={styles.taggedProductEmoji}>{product.image}</Text>
                <Text style={styles.taggedProductName}>{product.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      <Text style={styles.availableProductsTitle}>Available Products:</Text>
      <View style={styles.availableProducts}>
        {availableProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={[
              styles.productTag,
              postData.taggedProducts.find(p => p.id === product.id) && styles.selectedProductTag,
            ]}
            onPress={() => handleTagProduct(product)}
            disabled={!!postData.taggedProducts.find(p => p.id === product.id)}
          >
            <Text style={styles.productTagEmoji}>{product.image}</Text>
            <Text style={styles.productTagName}>{product.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  taggedProductsContainer: {
    marginBottom: 16,
  },
  taggedProductsTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  taggedProducts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  taggedProduct: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  taggedProductEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  taggedProductName: {
    color: '#fff',
    fontSize: 14,
  },
  availableProductsTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  availableProducts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedProductTag: {
    opacity: 0.5,
  },
  productTagEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  productTagName: {
    color: '#000',
    fontSize: 14,
  },
});

export default TaggedProducts;
