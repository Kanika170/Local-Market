import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import ProductCard from '../../shop-detail/components/ProductCard';
import PostCard from '../../shop-detail/components/PostCard';
import ShopCard from '../../shop-detail/components/ShopCard';
import { searchProducts, searchShops, searchPosts } from '../../../data/mockSearchData';

const AllTab = ({ 
  searchQuery, 
  selectedFilters,
  sortBy,
  onProductPress,
  onShopPress,
  onPostInteraction,
  onScroll,
  scrollEventThrottle
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const allResults = {
    products: searchProducts(searchQuery, selectedFilters, sortBy),
    shops: searchShops(searchQuery, sortBy),
    posts: searchPosts(searchQuery, sortBy)
  };

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
    <ScrollView 
      style={styles.container} 
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
    >
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
