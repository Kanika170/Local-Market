import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import ReviewCard from '../components/ReviewCard';

const ReviewsTab = ({ 
  reviews, 
  onAddReview,
  shopRating = 4.5,
  totalReviews = 256 
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [filter, setFilter] = useState('all');

  const ratingDistribution = {
    5: 156,
    4: 67,
    3: 20,
    2: 8,
    1: 5
  };

  const filterOptions = [
    { key: 'all', label: 'All Reviews' },
    { key: '5', label: '5 Stars' },
    { key: '4', label: '4 Stars' },
    { key: '3', label: '3 Stars' },
    { key: '2', label: '2 Stars' },
    { key: '1', label: '1 Star' },
  ];

  const filteredReviews = filter === 'all'
    ? reviews
    : reviews.filter(review => review.rating.startsWith('★'.repeat(parseInt(filter))));

  const calculatePercentage = (count) => {
    return (count / totalReviews) * 100;
  };

  return (
    <View style={styles.container}>
      {/* Rating Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.overallRating}>
          <Text style={styles.ratingNumber}>{shopRating}</Text>
          <Text style={styles.ratingStars}>★★★★☆</Text>
          <Text style={styles.totalReviews}>{totalReviews} reviews</Text>
        </View>

        {/* Rating Distribution */}
        <View style={styles.distributionContainer}>
          {Object.entries(ratingDistribution)
            .sort((a, b) => b[0] - a[0])
            .map(([stars, count]) => (
              <TouchableOpacity
                key={stars}
                style={styles.distributionRow}
                onPress={() => setFilter(stars)}
              >
                <Text style={styles.starCount}>{stars} ★</Text>
                <View style={styles.progressBarContainer}>
                  <View 
                    style={[
                      styles.progressBar,
                      { width: `${calculatePercentage(count)}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.reviewCount}>{count}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>

      {/* Filter Options */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
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

      {/* Add Review Button */}
      <TouchableOpacity 
        style={styles.addReviewButton}
        onPress={onAddReview}
      >
        <Text style={styles.addReviewText}>Write a Review</Text>
      </TouchableOpacity>

      {/* Reviews List */}
      <ScrollView style={styles.reviewsContainer}>
        {filteredReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
        
        {filteredReviews.length > 0 && (
          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Load More Reviews</Text>
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
  summaryContainer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  overallRating: {
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  ratingNumber: {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.s,
  },
  ratingStars: {
    ...theme.typography.h3,
    color: theme.colors.rating,
    marginBottom: theme.spacing.s,
  },
  totalReviews: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  distributionContainer: {
    marginTop: theme.spacing.m,
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  starCount: {
    width: 50,
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.s,
    marginHorizontal: theme.spacing.m,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  reviewCount: {
    width: 40,
    textAlign: 'right',
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  filterContainer: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.surface,
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
  addReviewButton: {
    margin: theme.spacing.m,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.m,
    paddingVertical: theme.spacing.m,
    alignItems: 'center',
  },
  addReviewText: {
    color: theme.colors.text.inverse,
    ...theme.typography.button,
  },
  reviewsContainer: {
    flex: 1,
    padding: theme.spacing.m,
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

export default ReviewsTab;
