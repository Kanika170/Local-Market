import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import PostCard from '../../shop-detail/components/PostCard';
import { generateFeedData } from '../../../data/feedData';

const PostsTab = ({ searchQuery, sortBy, onPostInteraction }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  // Mock data for cake-related posts
  const cakePosts = [
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
    },
    {
      id: 3,
      type: 'user_post',
      content: 'Just tried the Black Forest cake from Delicious Cakes. Absolutely amazing! 😋',
      timestamp: '5 hours ago',
      likes: 12,
      comments: 2,
      user: {
        name: 'Mike Chen',
        type: 'Customer',
        avatar: '👨‍💻'
      }
    },
    {
      id: 4,
      type: 'shop_offer',
      content: 'New! Introducing our signature Red Velvet Cake. Limited time offer!',
      timestamp: '6 hours ago',
      likes: 20,
      comments: 8,
      shop: {
        name: 'Delicious Cakes',
        verified: true,
        avatar: '🏪',
        rating: 4.7
      },
      image: '🍰'
    }
  ];

  const filterAndSortPosts = () => {
    let filteredPosts = searchQuery.toLowerCase().includes('cake')
      ? cakePosts
      : generateFeedData().filter(post => 
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Apply sorting
    const sortedPosts = [...filteredPosts];
    switch (sortBy) {
      case 'Newest First':
        sortedPosts.sort((a, b) => {
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
        sortedPosts.sort((a, b) => b.likes - a.likes);
        break;
      case 'Most Commented':
        sortedPosts.sort((a, b) => b.comments - a.comments);
        break;
      default: // 'Relevance'
        // For relevance, we could implement a scoring system
        // For now, we'll keep the original order
        break;
    }

    return sortedPosts;
  };

  const filteredPosts = filterAndSortPosts();

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
