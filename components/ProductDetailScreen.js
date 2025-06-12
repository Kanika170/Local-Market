import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import PageIndicators from './PageIndicators';

const ProductDetailScreen = ({ product, onBack }) => {
  const [selectedSize, setSelectedSize] = useState('US 9');
  
  const sizes = ['US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 11.5'];
  
  const stores = [
    {
      name: 'FootLockr',
      logo: require('../assets/shopping bag.jpeg'),
      distance: '2.3 miles away',
      price: '$149.99',
      status: 'In Stock'
    },
    {
      name: 'Nike Store',
      logo: require('../assets/shopping bag.jpeg'),
      distance: 'Online',
      price: '$159.99',
      status: 'In Stock'
    },
    {
      name: 'Finish Line',
      logo: require('../assets/shopping bag.jpeg'),
      distance: '4.1 miles away',
      price: '$154.99',
      status: 'Low Stock'
    }
  ];

  const similarProducts = [
    {
      id: 1,
      name: 'Nike Air Max 90',
      price: 'From $129.99',
      image: require('../assets/shopping bag.jpeg')
    },
    {
      id: 2,
      name: 'Adidas Ultraboost',
      price: 'From $179.99',
      image: require('../assets/shopping bag.jpeg')
    },
    {
      id: 3,
      name: 'New Balance 990',
      price: 'From $184.99',
      image: require('../assets/shopping bag.jpeg')
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Companion</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Button</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/shopping bag.jpeg')}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={styles.indicatorsContainer}>
            <PageIndicators total={4} current={0} />
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5-Math.floor(product.rating))}</Text>
            <Text style={styles.reviews}>{product.rating} ({product.reviews} reviews)</Text>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          {/* Price Comparison */}
          <View style={styles.priceComparisonHeader}>
            <Text style={styles.sectionTitle}>Price Comparison</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.priceComparison}>
            {stores.map((store, index) => (
              <View key={index} style={styles.storeItem}>
                <View style={styles.storeHeader}>
                  <Image source={store.logo} style={styles.storeLogo} />
                  <View style={styles.storeInfo}>
                    <Text style={styles.storeName}>{store.name}</Text>
                    <Text style={styles.storeDistance}>{store.distance}</Text>
                  </View>
                  <Text style={styles.storePrice}>{store.price}</Text>
                </View>
                <Text style={[
                  styles.storeStatus,
                  store.status === 'In Stock' ? styles.inStock : styles.lowStock
                ]}>{store.status}</Text>
              </View>
            ))}
          </View>

          {/* Track Price Changes */}
          <View style={styles.trackPriceContainer}>
            <View style={styles.trackPriceIcon}>
              <Text style={styles.bellIcon}>🔔</Text>
            </View>
            <View style={styles.trackPriceInfo}>
              <Text style={styles.trackPriceTitle}>Track Price Changes</Text>
              <Text style={styles.trackPriceSubtitle}>Get notified when the price drops below your target</Text>
            </View>
            <View style={styles.toggleContainer}>
              <View style={styles.toggle} />
            </View>
          </View>

          {/* Size Selector */}
          <Text style={styles.sectionTitle}>Select Size</Text>
          <View style={styles.sizeContainer}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={[
                  styles.sizeButtonText,
                  selectedSize === size && styles.selectedSizeButtonText
                ]}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Compare Prices Button */}
          <TouchableOpacity style={styles.comparePricesButton}>
            <Text style={styles.comparePricesText}>Compare Prices</Text>
          </TouchableOpacity>

          {/* Similar Products */}
          <View style={styles.similarProductsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Similar Products</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllButton}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {similarProducts.map((item) => (
                <TouchableOpacity key={item.id} style={styles.similarProductCard}>
                  <Image source={item.image} style={styles.similarProductImage} />
                  <View style={styles.similarProductInfo}>
                    <Text style={styles.similarProductName}>{item.name}</Text>
                    <Text style={styles.similarProductPrice}>{item.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image 
            source={require('../assets/6389f902-d158-468d-8f00-45bbb02103b2.png')} 
            style={styles.navIcon} 
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🔍</Text>
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📋</Text>
          <Text style={styles.navText}>Lists</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#9C27B0',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonContainer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#F5F5F5',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  indicatorsContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    color: '#FFC107',
    fontSize: 16,
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
    color: '#666666',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 24,
  },
  priceComparisonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  seeAllButton: {
    color: '#9C27B0',
    fontSize: 14,
  },
  priceComparison: {
    marginBottom: 24,
  },
  storeItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  storeLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  storeDistance: {
    fontSize: 12,
    color: '#666666',
  },
  storePrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  storeStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  inStock: {
    color: '#4CAF50',
  },
  lowStock: {
    color: '#FF9800',
  },
  trackPriceContainer: {
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  trackPriceIcon: {
    marginRight: 12,
  },
  bellIcon: {
    fontSize: 24,
  },
  trackPriceInfo: {
    flex: 1,
  },
  trackPriceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  trackPriceSubtitle: {
    fontSize: 12,
    color: '#666666',
  },
  toggleContainer: {
    width: 40,
    height: 24,
    backgroundColor: '#9C27B0',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggle: {
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedSizeButton: {
    backgroundColor: '#9C27B0',
    borderColor: '#9C27B0',
  },
  sizeButtonText: {
    color: '#333333',
    fontSize: 14,
  },
  selectedSizeButtonText: {
    color: '#FFFFFF',
  },
  comparePricesButton: {
    backgroundColor: '#FF9800',
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 24,
  },
  comparePricesText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  similarProductsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  similarProductCard: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  similarProductImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  similarProductInfo: {
    alignItems: 'flex-start',
  },
  similarProductName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },
  similarProductPrice: {
    fontSize: 12,
    color: '#9C27B0',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingVertical: 12,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    width: 20,
    height: 20,
    marginBottom: 4,
    tintColor: '#666666',
  },
  navText: {
    fontSize: 12,
    color: '#666666',
  },
});

export default ProductDetailScreen;
