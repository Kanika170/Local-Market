import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import PostCard from '../components/PostCard';

const PostsTab = ({ 
  posts, 
  likedPosts,
  onLikePost,
  onCommentPress,
  onSharePost 
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { key: 'all', label: 'All Posts' },
    { key: 'product_showcase', label: 'Products' },
    { key: 'shop_offer', label: 'Offers' },
    { key: 'shop_update', label: 'Updates' },
  ];

  const filteredPosts = filter === 'all' 
    ? posts 
    : posts.filter(post => post.type === filter);

  return (
    <View style={styles.container}>
      {/* Filter Options */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
        >
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.filterButton,
                filter === option.key && styles.activeFilter
              ]}
              onPress={() => setFilter(option.key)}
            >
              <Text style={[
                styles.filterText,
                filter === option.key && styles.activeFilterText
              ]}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Posts List */}
      <ScrollView 
        style={styles.postsContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              isLiked={likedPosts.has(post.id)}
              onLike={onLikePost}
              onComment={onCommentPress}
              onShare={onSharePost}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📝</Text>
            <Text style={styles.emptyTitle}>No Posts Found</Text>
            <Text style={styles.emptyText}>
              {filter === 'all' 
                ? 'This shop hasn\'t posted anything yet.'
                : `No ${filterOptions.find(f => f.key === filter)?.label.toLowerCase()} found.`
              }
            </Text>
          </View>
        )}

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Load More Posts</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  filterContainer: {
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: theme.spacing.m,
  },
  filterScroll: {
    paddingHorizontal: theme.spacing.m,
  },
  filterButton: {
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.s,
    marginRight: theme.spacing.m,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeFilter: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterText: {
    ...theme.typography.button,
    color: theme.colors.text.primary,
  },
  activeFilterText: {
    color: theme.colors.text.inverse,
  },
  postsContainer: {
    flex: 1,
    padding: theme.spacing.m,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xl * 2,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.l,
  },
  emptyTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.m,
  },
  emptyText: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: theme.spacing.xl,
    lineHeight: 20,
  },
  loadMoreButton: {
    backgroundColor: theme.colors.primary + '10',
    borderRadius: theme.borderRadius.m,
    paddingVertical: theme.spacing.m,
    alignItems: 'center',
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.xl,
  },
  loadMoreText: {
    color: theme.colors.primary,
    ...theme.typography.button,
  },
});

export default PostsTab;
