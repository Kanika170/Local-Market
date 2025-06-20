import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';

const LikeButton = ({ initialCount = 0, onLike }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const toggleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    const newCount = newLiked ? count + 1 : count - 1;
    setCount(newCount);
    if (onLike) {
      onLike(newLiked);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={toggleLike} 
      activeOpacity={0.7}
    >
      <Text style={[styles.text, liked && styles.liked]}>
        {liked ? '❤️' : '🤍'} Like ({count})
      </Text>
    </TouchableOpacity>
  );
};

const createStyles = (theme) => StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
  },
  text: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  liked: {
    color: theme.colors.error,
    fontWeight: '600',
  },
});

export default LikeButton;
