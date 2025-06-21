import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import PostCard from '../../shop-detail/components/PostCard';
import { searchPosts } from '../../../data/mockSearchData';

const PostsTab = ({ searchQuery, sortBy, onPostInteraction, onScroll, scrollEventThrottle }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const filteredPosts = searchPosts(searchQuery, sortBy);

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
      <View style={styles.header}>
        <Text style={styles.resultCount}>
          {filteredPosts.length} posts found
        </Text>
      </View>

      <View style={styles.postsContainer}>
        {filteredPosts.map((post) => (
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
    </ScrollView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: theme.spacing.m,
  },
  header: {
    marginBottom: theme.spacing.l,
  },
  resultCount: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  postsContainer: {
    paddingBottom: theme.spacing.xl,
  }
});

export default PostsTab;
