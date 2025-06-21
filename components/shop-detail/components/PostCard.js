import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

const PostCard = ({ 
  post, 
  isLiked,
  onLike,
  onComment,
  onShare 
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.timestamp}>{post.timestamp}</Text>
        {post.type === 'shop_offer' && (
          <View style={styles.offerBadge}>
            <Text style={styles.offerBadgeText}>Special Offer</Text>
          </View>
        )}
      </View>

      <Text style={styles.content}>{post.content}</Text>
      
      {post.image && (
        <View style={styles.imageContainer}>
          <Text style={styles.image}>{post.image}</Text>
        </View>
      )}

      <View style={styles.interactions}>
        <TouchableOpacity 
          style={styles.interactionButton}
          onPress={() => onLike(post.id)}
        >
          <Text>{isLiked ? '❤️' : '🤍'} {post.likes + (isLiked ? 1 : 0)}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.interactionButton}
          onPress={() => onComment(post.id)}
        >
          <Text>💬 {post.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.interactionButton}
          onPress={() => onShare(post)}
        >
          <Text>↗️ Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  timestamp: {
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
  content: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    lineHeight: 20,
    marginBottom: theme.spacing.m,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  image: {
    fontSize: 40,
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.m,
  },
  interactionButton: {
    padding: theme.spacing.xs,
  },
});

export default PostCard;
