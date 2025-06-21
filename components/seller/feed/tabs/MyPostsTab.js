import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../theme/useTheme';
import PostCard from '../components/PostCard';
import { mockFeedData } from '../mockFeedData';

const MyPostsTab = ({ onCreatePost }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [posts, setPosts] = useState(mockFeedData.myPosts);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'High Performance', 'Medium Performance', 'Low Performance'];

  const getFilteredPosts = () => {
    if (selectedFilter === 'All') return posts;
    const performanceLevel = selectedFilter.toLowerCase().split(' ')[0];
    return posts.filter(post => post.performance === performanceLevel);
  };

  const handleDeletePost = (postId) => {
    Alert.alert(
      'Delete Post',
      'Are you sure you want to delete this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
          }
        }
      ]
    );
  };

  const handleEditPost = (post) => {
    Alert.alert(
      'Edit Post',
      'Edit post functionality would open here',
      [{ text: 'OK' }]
    );
  };

  const handleViewAnalytics = (post) => {
    Alert.alert(
      'Post Analytics',
      `Views: ${post.views}\nLikes: ${post.likes}\nComments: ${post.comments}\nShares: ${post.shares || 0}`,
      [{ text: 'OK' }]
    );
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'high': return theme.colors.success;
      case 'medium': return theme.colors.warning;
      case 'low': return theme.colors.error;
      default: return theme.colors.text.secondary;
    }
  };

  const getPerformanceIcon = (performance) => {
    switch (performance) {
      case 'high': return 'trending-up';
      case 'medium': return 'trending-neutral';
      case 'low': return 'trending-down';
      default: return 'chart-line';
    }
  };

  const renderFilterButton = (filter) => (
    <TouchableOpacity
      key={filter}
      style={[
        styles.filterButton,
        selectedFilter === filter && styles.selectedFilter,
      ]}
      onPress={() => setSelectedFilter(filter)}
    >
      <Text
        style={[
          styles.filterText,
          selectedFilter === filter && styles.selectedFilterText,
        ]}
      >
        {filter}
      </Text>
    </TouchableOpacity>
  );

  const renderPostActions = (post) => (
    <View style={styles.postActions}>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => handleViewAnalytics(post)}
      >
        <Icon name="chart-line" size={16} color={theme.colors.text.secondary} />
        <Text style={styles.actionText}>Analytics</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => handleEditPost(post)}
      >
        <Icon name="pencil" size={16} color={theme.colors.text.secondary} />
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => handleDeletePost(post.id)}
      >
        <Icon name="delete" size={16} color={theme.colors.error} />
        <Text style={[styles.actionText, { color: theme.colors.error }]}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPost = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.performanceHeader}>
        <View style={styles.performanceIndicator}>
          <Icon 
            name={getPerformanceIcon(item.performance)} 
            size={16} 
            color={getPerformanceColor(item.performance)} 
          />
          <Text style={[styles.performanceText, { color: getPerformanceColor(item.performance) }]}>
            {item.performance?.charAt(0).toUpperCase() + item.performance?.slice(1)} Performance
          </Text>
        </View>
        <Text style={styles.viewsText}>{item.views} views</Text>
      </View>
      
      <PostCard
        post={item}
        showActions={false}
        showMetrics={true}
      />
      
      {renderPostActions(item)}
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="post" size={64} color={theme.colors.text.tertiary} />
      <Text style={styles.emptyTitle}>No Posts Yet</Text>
      <Text style={styles.emptySubtitle}>
        Create your first post to start engaging with customers and other businesses
      </Text>
      <TouchableOpacity 
        style={styles.createButton}
        onPress={onCreatePost}
      >
        <Icon name="plus" size={20} color={theme.colors.text.inverse} />
        <Text style={styles.createButtonText}>Create First Post</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Filter Bar */}
      <View style={styles.filterContainer}>
        {filters.map(renderFilterButton)}
      </View>

      {/* Posts List */}
      <FlatList
        data={getFilteredPosts()}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    backgroundColor: theme.colors.surface,
  },
  filterButton: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.background,
    marginRight: theme.spacing.s,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  selectedFilter: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  selectedFilterText: {
    color: theme.colors.text.inverse,
  },
  listContainer: {
    padding: theme.spacing.m,
    paddingBottom: theme.spacing.xl,
  },
  postContainer: {
    marginBottom: theme.spacing.m,
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.borderRadius.m,
    borderTopRightRadius: theme.borderRadius.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  performanceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  performanceText: {
    ...theme.typography.caption,
    fontWeight: '600',
    marginLeft: theme.spacing.xs,
  },
  viewsText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderBottomLeftRadius: theme.borderRadius.m,
    borderBottomRightRadius: theme.borderRadius.m,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
  },
  actionText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.xs,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.xxl,
  },
  emptyTitle: {
    ...theme.typography.h4,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.s,
  },
  emptySubtitle: {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.l,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.round,
  },
  createButtonText: {
    ...theme.typography.button,
    color: theme.colors.text.inverse,
    marginLeft: theme.spacing.s,
  },
});

export default MyPostsTab;
