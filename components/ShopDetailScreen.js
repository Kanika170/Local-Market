import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../theme/useTheme';
import TabNavigator from './shop-detail/TabNavigator';
import ShopHeader from './shop-detail/components/ShopHeader';
import ShopInfo from './shop-detail/components/ShopInfo';
import ShopImageGallery from './shop-detail/components/ShopImageGallery';
import AboutTab from './shop-detail/tabs/AboutTab';
import ProductsTab from './shop-detail/tabs/ProductsTab';
import PostsTab from './shop-detail/tabs/PostsTab';
import ReviewsTab from './shop-detail/tabs/ReviewsTab';
import SimilarShopsTab from './shop-detail/tabs/SimilarShopsTab';
import ShopReviewModal from './common/ShopReviewModal';
import BottomNavigationBar from './BottomNavigationBar';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ShopDetailScreen = () => {
  const {
    handleScroll,
    scrollEventThrottle,
    bottomBarTranslateY
  } = useScrollAnimation();
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [activeTab, setActiveTab] = useState('about');
  const [isReviewModalVisible, setReviewModalVisible] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());

  const shop = route.params?.shop;

  // Mock data - would come from API in production
  const shopImages = [
    require('../assets/grocery shop.jpeg'),
    require('../assets/groceryshop1.jpeg'),
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

  const allProducts = [...featuredProducts];

  const shopPosts = [
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

  const tabs = [
    { key: 'about', title: 'About' },
    { key: 'products', title: 'Products' },
    { key: 'posts', title: 'Posts' },
    { key: 'reviews', title: 'Reviews' },
    { key: 'similar', title: 'Similar' },
  ];

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
    console.log('Sharing post:', post.content);
  };

  const handleReviewSubmit = (reviewData) => {
    console.log('New review:', reviewData);
    setReviewModalVisible(false);
  };

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product.name);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'about':
        return <AboutTab shop={shop} />;
      case 'products':
        return (
          <ProductsTab
            products={allProducts}
            featuredProducts={featuredProducts}
            onProductPress={(product) => navigation.navigate('ProductDetailScreen', { product })}
            onAddToCart={handleAddToCart}
          />
        );
      case 'posts':
        return (
          <PostsTab
            posts={shopPosts}
            likedPosts={likedPosts}
            onLikePost={handleLikePost}
            onCommentPress={handleCommentPress}
            onSharePost={handleSharePost}
          />
        );
      case 'reviews':
        return (
          <ReviewsTab
            reviews={reviews}
            onAddReview={() => setReviewModalVisible(true)}
          />
        );
      case 'similar':
        return (
          <SimilarShopsTab
            shops={similarShops}
            onShopPress={(shop) => navigation.navigate('ShopDetail', { shop })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <ShopHeader
        onBack={() => navigation.goBack()}
        onChat={() => navigation.navigate('ChatScreen')}
        onNotification={() => navigation.navigate('NotificationScreen')}
        shopName={shop?.name || "Green Grocery Store"}
      />

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 50 }} // Add this line
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={scrollEventThrottle}
      >
        {/* Shop Info Section */}
        <ShopInfo
          shopName={shop?.name || "Green Grocery Store"}
          rating={shop?.rating || 4.5}
          reviewCount={shop?.reviewCount || 256}
          location={shop?.location || "123 Market Street, Downtown"}
          distance={shop?.distance || "2.3 miles away"}
        />

        {/* Shop Images */}
        <ShopImageGallery images={shopImages} />

        {/* Tab Content */}
        <View style={styles.tabContent}>
          <TabNavigator
            tabs={tabs}
            activeTab={activeTab}
            onTabPress={setActiveTab}
          />
          {renderActiveTab()}
        </View>
      </ScrollView>

      <ShopReviewModal
        visible={isReviewModalVisible}
        onClose={() => setReviewModalVisible(false)}
        onSubmit={handleReviewSubmit}
        shop={shop}
      />

      <BottomNavigationBar
        navigation={navigation}
        activeTab="Home"
        translateY={bottomBarTranslateY}
      />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
  },
});

export default ShopDetailScreen;
