import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import PostCard from '../components/PostCard';
import { mockFeedData } from '../mockFeedData';

const MyCommunityTab = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [posts, setPosts] = useState(mockFeedData.communityPosts);

  const handleLikePress = (postId) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: (post.likes || 0) + 1 }
          : post
      )
    );
  };

  const handleCommentPress = (post) => {
    // In a real app, this would open a comment modal or navigate to comments screen
    Alert.alert(
      'Comments',
      `View comments for ${post.author?.name}'s post`,
      [{ text: 'OK' }]
    );
  };

  const handleSharePress = (post) => {
    // In a real app, this would open share options
    Alert.alert(
      'Share Post',
      `Share ${post.author?.name}'s post`,
      [{ text: 'Cancel' }, { text: 'Share' }]
    );
  };

  const handleMessagePress = (post) => {
    // In a real app, this would open chat with the author
    const messageText = getMessageSuggestion(post);
    Alert.alert(
      'Send Message',
      `Message ${post.author?.name}:\n\n"${messageText}"`,
      [
        { text: 'Cancel' },
        { text: 'Send', onPress: () => sendMessage(post, messageText) }
      ]
    );
  };

  const getMessageSuggestion = (post) => {
    switch (post.type) {
      case 'customer_query':
        return "Hi! We have that product in stock. Would you like me to check availability and pricing?";
      case 'customer_request':
        return "Hello! We provide that service. Let me share our details with you.";
      case 'wholesale_offer':
        return "Hi! I'm interested in your wholesale offer. Can you share more details?";
      case 'supply_request':
        return "Hello! We can supply what you need. Let's discuss the requirements.";
      case 'asset_sharing':
        return "Hi! We can help you with that. Let me know when you need it.";
      default:
        return "Hi! I saw your post and would like to connect.";
    }
  };

  const sendMessage = (post, message) => {
    // In a real app, this would send the message
    Alert.alert(
      'Message Sent!',
      `Your message has been sent to ${post.author?.name}`,
      [{ text: 'OK' }]
    );
  };

  const renderPost = ({ item }) => (
    <PostCard
      post={item}
      onLikePress={() => handleLikePress(item.id)}
      onCommentPress={() => handleCommentPress(item)}
      onSharePress={() => handleSharePress(item)}
      onMessagePress={() => handleMessagePress(item)}
      showActions={true}
      showMetrics={true}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No Community Posts</Text>
      <Text style={styles.emptySubtitle}>
        Community posts from customers and other businesses will appear here
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
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
  listContainer: {
    padding: theme.spacing.m,
    paddingBottom: theme.spacing.xl,
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
    marginBottom: theme.spacing.s,
  },
  emptySubtitle: {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});

export default MyCommunityTab;
