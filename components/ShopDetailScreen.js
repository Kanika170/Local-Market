import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PageIndicators from './PageIndicators';

const ShopDetailScreen = ({ shop, onBack }) => {
  const navigation = useNavigation();
  const categories = [
    'Groceries', 'Fresh Produce', 'Dairy', 'Beverages', 'Snacks', 'Household'
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Organic Apples',
      price: '$3.99 per lb',
      image: require('../assets/orange.jpeg')
    },
    {
      id: 2,
      name: 'Fresh Avocados',
      price: '$2.49 each',
      image: require('../assets/fresh_avocados.jpeg')
    },
    {
      id: 3,
      name: 'Sourdough Bread',
      price: '$4.50 loaf',
      image: require('../assets/sourdough_bread.jpeg')
    },
    {
      id: 4,
      name: 'Organic Milk',
      price: '$3.75 per liter',
      image: require('../assets/organic_milk.jpeg')
    }
  ];

  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: '★★★★☆',
      date: '2 days ago',
      comment: 'Always fresh produce and excellent customer service. Highly recommend!'
    },
    {
      id: 2,
      name: 'Michael Chen',
      rating: '★★★★★',
      date: '1 week ago',
      comment: 'Great selection of international foods and friendly staff.'
    }
  ];

  const similarShops = [
    {
      id: 1,
      name: 'Fresh Market',
      distance: '1.2 miles away',
      rating: 4.3,
      reviews: 89,
      image: require('../assets/grocery shop.jpeg')
    },
    {
      id: 2,
      name: 'City Grocers',
      distance: '2.1 miles away',
      rating: 4.1,
      reviews: 156,
      image: require('../assets/grocery shop.jpeg')
    },
    {
      id: 3,
      name: 'Organic Valley',
      distance: '3.0 miles away',
      rating: 4.4,
      reviews: 203,
      image: require('../assets/grocery shop.jpeg')
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shop Details</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('ChatScreen')}
          >
            <Text style={styles.headerIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('NotificationScreen')}
          >
            <Text style={styles.headerIcon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Shop Images */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/grocery shop.jpeg')}
            style={styles.shopImage}
            resizeMode="cover"
          />
          <View style={styles.indicatorsContainer}>
            <PageIndicators total={4} current={0} />
          </View>
        </View>

        {/* Shop Info */}
        <View style={styles.shopInfo}>
          <Text style={styles.shopName}>Green Grocery Store</Text>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★★★★☆</Text>
            <Text style={styles.reviews}>4.5 (256 reviews)</Text>
          </View>

          <View style={styles.locationContainer}>
            <Text style={styles.location}>📍 123 Market Street, Downtown</Text>
            <Text style={styles.distance}>2.3 miles away</Text>
          </View>

          <View style={styles.hoursContainer}>
            <Text style={styles.hoursTitle}>Opening Hours</Text>
            <Text style={styles.hours}>Mon - Sat: 8:00 AM - 9:00 PM</Text>
            <Text style={styles.hours}>Sun: 9:00 AM - 7:00 PM</Text>
          </View>

          {/* Categories */}
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {categories.map((category, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.categoryButton}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Featured Products */}
          <View style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Products</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllButton}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.productsContainer}
            >
              {featuredProducts.map((product) => (
                <TouchableOpacity key={product.id} style={styles.productCard}>
                  <Image source={product.image} style={styles.productImage} />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Customer Reviews */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Customer Reviews</Text>
            
            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  <Text style={styles.reviewRating}>{review.rating}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
            
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All Reviews</Text>
            </TouchableOpacity>
          </View>

          {/* Similar Shops */}
          <View style={styles.similarShopsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Similar Shops</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllButton}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.shopsContainer}
            >
              {similarShops.map((shop) => (
                <TouchableOpacity key={shop.id} style={styles.shopCard}>
                  <Image source={shop.image} style={styles.similarShopImage} />
                  <View style={styles.similarShopInfo}>
                    <Text style={styles.similarShopName}>{shop.name}</Text>
                    <Text style={styles.similarShopDistance}>{shop.distance}</Text>
                    <View style={styles.similarShopRating}>
                      <Text style={styles.rating}>★ {shop.rating}</Text>
                      <Text style={styles.reviews}>({shop.reviews})</Text>
                    </View>
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
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#F5F5F5',
  },
  shopImage: {
    width: '100%',
    height: '100%',
  },
  indicatorsContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  shopInfo: {
    padding: 20,
  },
  shopName: {
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
  locationContainer: {
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  distance: {
    fontSize: 14,
    color: '#666666',
  },
  hoursContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  hoursTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  hours: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryButton: {
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  categoryText: {
    color: '#9C27B0',
    fontSize: 14,
    fontWeight: '500',
  },
  featuredSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllButton: {
    color: '#9C27B0',
    fontSize: 14,
  },
  productsContainer: {
    marginBottom: 16,
  },
  productCard: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  productInfo: {
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#9C27B0',
    textAlign: 'center',
    marginBottom: 8,
  },
  similarShopsSection: {
    marginBottom: 24,
  },
  shopsContainer: {
    marginBottom: 16,
  },
  shopCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  similarShopImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  similarShopInfo: {
    alignItems: 'flex-start',
  },
  similarShopName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },
  similarShopDistance: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  similarShopRating: {
    flexDirection: 'row',
    alignItems: 'center',
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
  addButton: {
    backgroundColor: '#9C27B0',
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  reviewRating: {
    fontSize: 16,
    color: '#FFD700',
    marginRight: 10,
  },
  reviewDate: {
    fontSize: 14,
    color: '#757575',
  },
  reviewComment: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  viewAllButton: {
    backgroundColor: '#F3E5F5',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default ShopDetailScreen;
