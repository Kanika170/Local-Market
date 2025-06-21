import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

const ReviewCard = ({ review }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{review.name}</Text>
        <Text style={styles.rating}>{review.rating}</Text>
        <Text style={styles.date}>{review.date}</Text>
      </View>
      <Text style={styles.comment}>{review.comment}</Text>
      {review.images && review.images.length > 0 && (
        <View style={styles.imagesContainer}>
          {/* Add image gallery implementation if needed */}
        </View>
      )}
      {review.shopResponse && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseHeader}>Shop Response:</Text>
          <Text style={styles.responseText}>{review.shopResponse}</Text>
        </View>
      )}
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
    alignItems: 'center',
    marginBottom: theme.spacing.s,
    flexWrap: 'wrap',
  },
  name: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    marginRight: theme.spacing.m,
    fontWeight: '600',
  },
  rating: {
    ...theme.typography.body1,
    color: theme.colors.rating,
    marginRight: theme.spacing.m,
  },
  date: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  comment: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    lineHeight: 20,
    marginBottom: theme.spacing.m,
  },
  imagesContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
  },
  responseContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.s,
    padding: theme.spacing.m,
    marginTop: theme.spacing.s,
  },
  responseHeader: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  responseText: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
});

export default ReviewCard;
