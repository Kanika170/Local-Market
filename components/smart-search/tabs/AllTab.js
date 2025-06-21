import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import ProductCard from '../../shop-detail/components/ProductCard';
import PostCard from '../../shop-detail/components/PostCard';
import ShopCard from '../../shop-detail/components/ShopCard';

const AllTab = ({ 
  searchQuery, 
  selectedFilters,
  sortBy,
  onProductPress,
  onShopPress,
  onPostInteraction
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Mock data for cake search
  const getFilteredAndSortedResults = () => {
    // Products section
    let products = [
      {
        id: 1,
        name: 'Chocolate Truffle Cake',
        price: '₹500',
        shop: 'Modern Bakery',
        distance: '2.1 km',
        rating: 4.8,
        reviews: 45,
        image: require('../../../assets/category.jpeg'),
        inStock: true,
        description: 'Rich chocolate truffle cake with premium cocoa'
      },
      {
        id: 2,
        name: 'Black Forest Pastry',
        price: '₹80',
        shop: 'Delicious Cakes',
        distance: '3.5 km',
        rating: 4.6,
        reviews: 32,
        image: require('../../../assets/category.jpeg'),
        inStock: true,
        description: 'Classic black forest pastry with cherries'
      }
    ];

    // Sort products
    switch (sortBy) {
      case 'Price: Low to High':
        products.sort((a, b) => {
          const priceA = parseInt(a.price.replace('₹', '').replace(',', ''));
          const priceB = parseInt(b.price.replace('₹', '').replace(',', ''));
          return priceA - priceB;
        });
        break;
      case 'Price: High to Low':
        products.sort((a, b) => {
          const priceA = parseInt(a.price.replace('₹', '').replace(',', ''));
          const priceB = parseInt(b.price.replace('₹', '').replace(',', ''));
          return priceB - priceA;
        });
        break;
      case 'Rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'Distance':
        products.sort((a, b) => {
          const distanceA = parseFloat(a.distance.replace(' km', ''));
          const distanceB = parseFloat(b.distance.replace(' km', ''));
          return distanceA - distanceB;
        });
        break;
    }

    // Shops section
    let shops = [
      {
        id: 1,
        name: 'Modern Bakery',
        image: require('../../../assets/groceryshop1.jpeg'),
        distance: '2.1 km away',
        rating: 4.5,
        reviews: 128,
        specialOffer: true,
        categories: ['Bakery', 'Cakes', 'Desserts']
      },
      {
        id: 2,
        name: 'Delicious Cakes',
        image: require('../../../assets/groceryshop1.jpeg'),
        distance: '3.5 km away',
        rating: 4.7,
        reviews: 95,
        specialOffer: false,
        categories: ['Bakery', 'Cakes', 'Pastries']
      }
    ];

    // Sort shops
    switch (sortBy) {
      case 'Rating':
        shops.sort((a, b) => b.rating - a.rating);
        break;
      case 'Distance':
        shops.sort((a, b) => {
          const distanceA = parseFloat(a.distance.replace(' km away', ''));
          const distanceB = parseFloat(b.distance.replace(' km away', ''));
          return distanceA - distanceB;
        });
        break;
      case 'Reviews':
        shops.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    // Posts section
    let posts = [
      {
        id: 1,
        type: 'user_post',
        content: 'Where can I get a good custom birthday cake near me?',
        timestamp: '2 hours ago',
        likes: 5,
        comments: 3,
        user: {
          name: 'Sarah Johnson',
          type: 'Customer',
          avatar: '👩‍💼'
        }
      },
      {
        id: 2,
        type: 'shop_offer',
        content: '🎉 Special offer on all our chocolate cakes this week! 🎉',
        timestamp: '3 hours ago',
        likes: 15,
        comments: 4,
        shop: {
          name: 'Modern Bakery',
          verified: true,
          avatar: '🏪',
          rating: 4.5
        },
        image: '🎂'
      }
    ];

    // Sort posts
    switch (sortBy) {
      case 'Newest First':
        posts.sort((a, b) => {
          const timeA = a.timestamp.includes('hour') 
            ? parseInt(a.timestamp) 
            : parseInt(a.timestamp) * 60;
          const timeB = b.timestamp.includes('hour') 
            ? parseInt(b.timestamp) 
            : parseInt(b.timestamp) * 60;
          return timeA - timeB;
        });
        break;
      case 'Most Liked':
        posts.sort((a, b) => b.likes - a.likes);
        break;
      case 'Most Commented':
        posts.sort((a, b) => b.comments - a.comments);
        break;
    }

    return {
      products,
      shops,
      posts
    };
  };

  const allResults = getFilteredAndSortedResults();

  const handleAddToCart = (product) => {
    // Handle add to cart functionality
    console.log('Added to cart:', product.name);
  };

  const handleLike = (postId) => {
    onPostInteraction?.('like', postId);
  };

  const handleComment = (postId) => {
    onPostInteraction?.('comment', postId);
  };

  const handleShare = (post) => {
    onPostInteraction?.('share', post);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Shops Section */}
      {allResults.shops.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shops</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {allResults.shops.map((shop) => (
              <View key={shop.id} style={styles.shopWrapper}>
                <ShopCard
                  shop={shop}
                  onPress={onShopPress}
                  style={styles.shopCard}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Products Section */}
      {allResults.products.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {allResults.products.map((product) => (
              <View key={product.id} style={styles.productWrapper}>
                <ProductCard
                  product={product}
                  onPress={onProductPress}
                  onAddToCart={handleAddToCart}
                />
                <View style={styles.shopInfo}>
                  <Text style={styles.shopName}>{product.shop}</Text>
                  <Text style={styles.distance}>{product.distance}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Posts Section */}
      {allResults.posts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Posts</Text>
          <View style={styles.postsContainer}>
            {allResults.posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isLiked={false}
                onLike={() => handleLike(post.id)}
                onComment={() => handleComment(post.id)}
                onShare={() => handleShare(post)}
              />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.spacing.m,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.s,
  },
  shopWrapper: {
    width: 280,
    marginRight: theme.spacing.m,
  },
  shopCard: {
    width: '100%',
  },
  productWrapper: {
    width: 200,
    marginRight: theme.spacing.m,
  },
  shopInfo: {
    marginTop: theme.spacing.s,
    paddingHorizontal: theme.spacing.s,
  },
  shopName: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  distance: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  postsContainer: {
    paddingHorizontal: theme.spacing.s,
  }
});

export default AllTab;
