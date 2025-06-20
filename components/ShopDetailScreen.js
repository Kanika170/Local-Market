import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/useTheme';
import PageIndicators from './PageIndicators';
import BottomNavigationBar from './BottomNavigationBar';
import ShopReviewModal from './common/ShopReviewModal';


const ShopDetailScreen = ({ shop, onBack }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [isReviewModalVisible, setReviewModalVisible] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());

  const handleLikePost = (postId) => {
    setLikedPosts(prev => {
      const newLikedPosts = new Set(prev);
      if (newLikedPosts.has(postId)) {
        newLikedPosts.delete(postId);
      } else {
        newLikedPosts.add(postId);
      }
      return newLikedPosts;
    });
  };

  const handleCommentPress = (postId) => {
    navigation.navigate('PostComments', { postId });
  };

  const handleSharePost = (post) => {
    // Here you would typically implement share functionality
    console.log('Sharing post:', post.content);
  };
  const [shopPosts, setShopPosts] = useState([
    {
      id: 1,
      type: 'product_showcase',
      content: 'Check out our fresh organic produce!',
      image: '🥬',
      timestamp: '2 hours ago',
      likes: 12,
      comments: 3
    },
    {
      id: 2,
      type: 'shop_offer',
      content: 'Weekend special: 20% off on all dairy products!',
      image: '🥛',
      timestamp: '1 day ago',
      likes: 24,
      comments: 8
    },
    {
      id: 3,
      type: 'shop_update',
      content: 'New items in stock! Fresh artisanal bread delivered daily.',
      image: '🍞',
      timestamp: '2 days ago',
      likes: 18,
      comments: 5
    }
  ]);

  const handleReviewSubmit = (reviewData) => {
    // Here you would typically send this to your backend
    console.log('New review:', reviewData);
    setReviewModalVisible(false);
  };
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
                onPress={() => navigation.navigate('CategoryProducts', { category })}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Featured Products */}
          <View style={styles.featuredSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Products</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ShopProducts', { shopId: shop?.id })}>
                <Text style={styles.seeAllButton}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.productsContainer}
            >
              {featuredProducts.map((product) => (
                <TouchableOpacity 
                  key={product.id} 
                  style={styles.productCard}
                  onPress={() => navigation.navigate('ProductDetail', { product })}
                >
                  <Image source={product.image} style={styles.productImage} />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    <TouchableOpacity 
                      style={styles.addButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        // Add to cart functionality
                        console.log('Added to cart:', product.name);
                      }}
                    >
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Shop Posts */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Shop Posts</Text>
            {shopPosts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postHeader}>
                  <Text style={styles.postTimestamp}>{post.timestamp}</Text>
                  {post.type === 'shop_offer' && (
                    <View style={styles.offerBadge}>
                      <Text style={styles.offerBadgeText}>Special Offer</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.postContent}>{post.content}</Text>
                {post.image && (
                  <View style={styles.postImageContainer}>
                    <Text style={styles.postImage}>{post.image}</Text>
                  </View>
                )}
                <View style={styles.postInteractions}>
                  <TouchableOpacity 
                    style={styles.interactionButton}
                    onPress={() => handleLikePost(post.id)}
                  >
                    <Text>{likedPosts.has(post.id) ? '❤️' : '🤍'} {post.likes + (likedPosts.has(post.id) ? 1 : 0)}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.interactionButton}
                    onPress={() => handleCommentPress(post.id)}
                  >
                    <Text>💬 {post.comments}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.interactionButton}
                    onPress={() => handleSharePost(post)}
                  >
                    <Text>↗️ Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Customer Reviews */}
          <View style={styles.sectionContainer}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Customer Reviews</Text>
              <TouchableOpacity 
                style={styles.addReviewButton}
                onPress={() => setReviewModalVisible(true)}
              >
                <Text style={styles.addReviewText}>Add Review</Text>
              </TouchableOpacity>
            </View>
            
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
            
            <TouchableOpacity 
              style={styles.viewAllButton}
              onPress={() => navigation.navigate('ShopReviews', { shopId: shop?.id })}
            >
              <Text style={styles.viewAllText}>View All Reviews</Text>
            </TouchableOpacity>
          </View>

          {/* Review Modal */}
          <ShopReviewModal
            visible={isReviewModalVisible}
            onClose={() => setReviewModalVisible(false)}
            shop={shop}
            onSubmit={handleReviewSubmit}
          />

          {/* Similar Shops */}
          <View style={styles.similarShopsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Similar Shops</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SimilarShops', { shopId: shop?.id })}>
                <Text style={styles.seeAllButton}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.shopsContainer}
            >
              {similarShops.map((similarShop) => (
                <TouchableOpacity 
                  key={similarShop.id} 
                  style={styles.shopCard}
                  onPress={() => navigation.navigate('ShopDetail', { shop: similarShop })}
                >
                  <Image source={similarShop.image} style={styles.similarShopImage} />
                  <View style={styles.similarShopInfo}>
                    <Text style={styles.similarShopName}>{similarShop.name}</Text>
                    <Text style={styles.similarShopDistance}>{similarShop.distance}</Text>
                    <View style={styles.similarShopRating}>
                      <Text style={styles.rating}>★ {similarShop.rating}</Text>
                      <Text style={styles.reviews}>({similarShop.reviews})</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigationBar navigation={navigation} activeTab="Home" />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: 50,
    paddingBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: theme.spacing.s,
  },
  backButtonText: {
    color: theme.colors.text.inverse,
    ...theme.typography.h2,
  },
  headerTitle: {
    color: theme.colors.text.inverse,
    ...theme.typography.h3,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: theme.borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.s,
  },
  headerIcon: {
    fontSize: 20,
    color: theme.colors.text.inverse,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    backgroundColor: theme.colors.surface,
  },
  shopImage: {
    width: '100%',
    height: '100%',
  },
  indicatorsContainer: {
    position: 'absolute',
    bottom: theme.spacing.l,
    width: '100%',
    alignItems: 'center',
  },
  shopInfo: {
    padding: theme.spacing.l,
  },
  shopName: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.m,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  rating: {
    color: theme.colors.rating,
    ...theme.typography.body1,
    marginRight: theme.spacing.s,
  },
  reviews: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  locationContainer: {
    marginBottom: theme.spacing.l,
  },
  location: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  distance: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  hoursContainer: {
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.l,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
  },
  hoursTitle: {
    ...theme.typography.body1,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.s,
  },
  hours: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.l,
  },
  categoriesContainer: {
    marginBottom: theme.spacing.xl,
  },
  categoryButton: {
    backgroundColor: theme.colors.primary + '10',
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.xl,
    marginRight: theme.spacing.m,
  },
  categoryText: {
    color: theme.colors.primary,
    ...theme.typography.button,
  },
  featuredSection: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  seeAllButton: {
    color: theme.colors.primary,
    ...theme.typography.button,
  },
  productsContainer: {
    marginBottom: theme.spacing.l,
  },
  productCard: {
    width: 160,
    marginRight: theme.spacing.l,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border || '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: theme.borderRadius.s,
    marginBottom: theme.spacing.m,
  },
    backgroundColor: theme.colors.surface,
  productInfo: {
    alignItems: 'flex-start',
  },
  productName: {
    ...theme.typography.body2,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  productPrice: {
    ...theme.typography.body1,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.s,
  },
  similarShopsSection: {
    marginBottom: theme.spacing.xl,
  },
  shopsContainer: {
    marginBottom: theme.spacing.l,
  },
  shopCard: {
    width: 200,
    marginRight: theme.spacing.l,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border || '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  similarShopImage: {
    width: '100%',
    height: 120,
    borderRadius: theme.borderRadius.s,
    marginBottom: theme.spacing.m,
  },
  similarShopInfo: {
    alignItems: 'flex-start',
  },
  similarShopName: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  similarShopDistance: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  similarShopRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingVertical: theme.spacing.m,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    width: 20,
    height: 20,
    marginBottom: theme.spacing.xs,
    tintColor: theme.colors.text.secondary,
  },
  navText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.xl,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  addButtonText: {
    color: theme.colors.text.inverse,
    ...theme.typography.h3,
  },
  reviewCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  reviewName: {
    ...theme.typography.body1,
    marginRight: theme.spacing.m,
  },
  reviewRating: {
    ...theme.typography.body1,
    color: theme.colors.rating,
    marginRight: theme.spacing.m,
  },
  reviewDate: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  reviewComment: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    lineHeight: 20,
  },
  viewAllButton: {
    backgroundColor: theme.colors.primary + '10',
    borderRadius: theme.borderRadius.s,
    paddingVertical: theme.spacing.m,
    alignItems: 'center',
    marginTop: theme.spacing.m,
  },
  viewAllText: {
    color: theme.colors.primary,
    ...theme.typography.button,
  },
  sectionContainer: {
    marginBottom: theme.spacing.xl,
  },
  postCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border || '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  postTimestamp: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  offerBadge: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.m,
  },
  offerBadgeText: {
    color: theme.colors.text.inverse,
    ...theme.typography.caption,
    fontWeight: '600',
  },
  postContent: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    lineHeight: 20,
    marginBottom: theme.spacing.m,
  },
  postImageContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  postImage: {
    fontSize: 40,
  },
  postInteractions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.m,
  },
  interactionButton: {
    padding: theme.spacing.xs,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  addReviewButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.s,
  },
  addReviewText: {
    color: theme.colors.text.inverse,
    ...theme.typography.button,
  },
});

export default ShopDetailScreen;
