import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../theme/useTheme';
import { getPostTypeColor, getPostTypeLabel } from '../mockFeedData';

const PostCard = ({ 
  post,
  onLikePress,
  onCommentPress,
  onSharePress,
  onMessagePress,
  showActions = true,
  showMetrics = true,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const renderAuthorInfo = () => (
    <View style={styles.authorContainer}>
      <View style={styles.authorInfo}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{post.author?.avatar || '🏪'}</Text>
        </View>
        <View style={styles.authorDetails}>
          <View style={styles.authorNameRow}>
            <Text style={styles.authorName}>
              {post.author?.name || 'Local Shop'}
            </Text>
            {post.author?.verified && (
              <Icon name="check-decagram" size={14} color={theme.colors.primary} style={styles.verifiedIcon} />
            )}
          </View>
          <Text style={styles.postMeta}>
            {post.timestamp} • {post.author?.location || 'Local Area'}
          </Text>
        </View>
      </View>
      {post.isUrgent && (
        <View style={styles.urgentBadge}>
          <Text style={styles.urgentText}>Urgent</Text>
        </View>
      )}
    </View>
  );

  const renderPostType = () => (
    <View style={[styles.typeBadge, { backgroundColor: `${getPostTypeColor(post.type)}20` }]}>
      <Text style={[styles.typeText, { color: getPostTypeColor(post.type) }]}>
        {getPostTypeLabel(post.type)}
      </Text>
    </View>
  );

  const renderContent = () => (
    <>
      <Text style={styles.content}>{post.content}</Text>
      {post.images?.length > 0 && (
        <Image 
          source={{ uri: post.images[0] }} 
          style={styles.image}
          resizeMode="cover"
        />
      )}
    </>
  );

  const renderMetrics = () => {
    if (!showMetrics) return null;
    return (
      <View style={styles.metrics}>
        <Text style={styles.metricText}>{post.likes || 0} Likes</Text>
        <Text style={styles.metricText}>{post.comments || 0} Comments</Text>
        {post.views && <Text style={styles.metricText}>{post.views} Views</Text>}
      </View>
    );
  };

  const renderActions = () => {
    if (!showActions) return null;
    return (
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onLikePress}>
          <Icon name="thumb-up-outline" size={20} color={theme.colors.text.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onCommentPress}>
          <Icon name="comment-outline" size={20} color={theme.colors.text.secondary} />
        </TouchableOpacity>
        {post.interactions?.canShare && (
          <TouchableOpacity style={styles.actionButton} onPress={onSharePress}>
            <Icon name="share-outline" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        )}
        {post.interactions?.canMessage && (
          <TouchableOpacity 
            style={[styles.messageButton, { backgroundColor: theme.colors.primary }]}
            onPress={onMessagePress}
          >
            <Icon name="message" size={16} color={theme.colors.text.inverse} />
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderAuthorInfo()}
      {renderPostType()}
      {renderContent()}
      {renderMetrics()}
      {renderActions()}
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.default,
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.s,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${theme.colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.s,
  },
  avatarText: {
    fontSize: 20,
  },
  authorDetails: {
    flex: 1,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    ...theme.typography.body1,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  postMeta: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  urgentBadge: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.s,
  },
  urgentText: {
    ...theme.typography.caption,
    color: theme.colors.text.inverse,
    fontWeight: '600',
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.s,
  },
  typeText: {
    ...theme.typography.body2,
    fontWeight: '600',
  },
  content: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.m,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: theme.borderRadius.s,
    marginBottom: theme.spacing.m,
  },
  metrics: {
    flexDirection: 'row',
    marginBottom: theme.spacing.s,
  },
  metricText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginRight: theme.spacing.m,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: theme.spacing.s,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  actionButton: {
    marginRight: theme.spacing.l,
    padding: theme.spacing.xs,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    marginLeft: 'auto',
  },
  messageButtonText: {
    ...theme.typography.button,
    color: theme.colors.text.inverse,
    marginLeft: theme.spacing.xs,
  },
});

export default PostCard;
