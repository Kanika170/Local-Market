import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Share } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import LikeButton from './LikeButton';
import { useFeedInteraction } from '../../context/FeedInteractionContext';

const InteractionBar = ({ postId, initialLikes = 0, initialComments = 0, onCommentPress }) => {
  const { theme } = useTheme();
  const { getPostInteraction, updateLike } = useFeedInteraction();
  const styles = createStyles(theme);
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this post from Local Market!',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const { likeCount } = getPostInteraction(postId);

  return (
    <View style={styles.container}>
      <LikeButton
        initialCount={initialLikes}
        onLike={(isLiked) => updateLike(postId, isLiked, isLiked ? initialLikes + 1 : initialLikes - 1)}
      />
      
      <TouchableOpacity style={styles.button} onPress={onCommentPress}>
        <Text style={styles.text}>💬 Comment ({initialComments})</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleShare}>
        <Text style={styles.text}>📤 Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surface,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  text: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
});

export default InteractionBar;
