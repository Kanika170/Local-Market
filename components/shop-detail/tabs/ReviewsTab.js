import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import ReviewCard from '../components/ReviewCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ReviewsTab = ({ 
  reviews, 
  onAddReview,
  shopRating = 4.5,
  totalReviews = 256 
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const ITEMS_PER_PAGE = 10;

  const ratingDistribution = {
    5: 156,
    4: 67,
    3: 20,
    2: 8,
    1: 5
  };

  const filterOptions = [
    { key: 'all', label: 'All' },
    { key: '5', label: '5★' },
    { key: '4', label: '4★' },
    { key: '3', label: '3★' },
    { key: '2', label: '2★' },
    { key: '1', label: '1★' },
  ];

const parseRating = (ratingStr) => {
  if (!ratingStr) return 0;
  // Count the number of filled stars '★' in the string
  return (ratingStr.match(/★/g) || []).length;
};

const filteredReviews = filter === 'all'
    ? reviews
    : reviews.filter(review => parseRating(review.rating) === parseInt(filter));

  // Reset page when filter changes
  useEffect(() => {
    setPage(1);
  }, [filter]);

  const calculatePercentage = (count) => {
    return (count / totalReviews) * 100;
  };

  // Render stars for the summary
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    return (
      <View style={styles.starsRow}>
        {[...Array(fullStars)].map((_, i) => (
          <Icon key={`full-${i}`} name="star" size={20} color={theme.colors.rating} />
        ))}
        {hasHalfStar && (
          <Icon name="star-half" size={20} color={theme.colors.rating} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Icon key={`empty-${i}`} name="star-outline" size={20} color={theme.colors.rating} />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Rating Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryLeft}>
          <Text style={styles.ratingNumber}>{shopRating.toFixed(1)}</Text>
          {renderStars(shopRating)}
          <Text style={styles.totalReviews}>{totalReviews} reviews</Text>
        </View>
        <View style={styles.summaryRight}>
          {Object.entries(ratingDistribution)
            .sort((a, b) => b[0] - a[0])
            .map(([stars, count]) => {
              const isActive = filter === stars;
              return (
                <TouchableOpacity
                  key={stars}
                  style={[
                    styles.distributionRow,
                    isActive && styles.activeDistributionRow
                  ]}
                  onPress={() => setFilter(stars)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.starCount,
                    isActive && styles.activeStarCount
                  ]}>{stars}★</Text>
                  <View style={styles.progressBarContainer}>
                    <View 
                      style={[
                        styles.progressBar,
                        { width: `${calculatePercentage(count)}%` },
                        isActive && styles.activeProgressBar
                      ]} 
                    />
                  </View>
                  <Text style={[
                    styles.reviewCount,
                    isActive && styles.activeReviewCount
                  ]}>{count}</Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>

      {/* Filter Chips */}
      <FlatList
        data={filterOptions}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.filterList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterChip,
              filter === item.key && styles.activeFilterChip
            ]}
            onPress={() => setFilter(item.key)}
          >
            <Text style={[
              styles.filterChipText,
              filter === item.key && styles.activeFilterChipText
            ]}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Add Review Button */}
      <TouchableOpacity 
        style={styles.addReviewButton}
        onPress={onAddReview}
        activeOpacity={0.85}
      >
        <Icon name="plus-circle" size={20} color={theme.colors.text.inverse} style={{ marginRight: 8 }} />
        <Text style={styles.addReviewText}>Write a Review</Text>
      </TouchableOpacity>

      {/* Reviews List */}
      <ScrollView style={styles.reviewsContainer} showsVerticalScrollIndicator={false}>
        {filteredReviews.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="star-outline" size={48} color={theme.colors.text.tertiary} />
            <Text style={styles.emptyText}>No reviews found</Text>
          </View>
        ) : (
          filteredReviews.slice(0, page * ITEMS_PER_PAGE).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
        {filteredReviews.length > page * ITEMS_PER_PAGE && (
          <TouchableOpacity 
            style={[styles.loadMoreButton, loading && styles.loadMoreButtonDisabled]}
            onPress={() => {
              setLoading(true);
              // Simulate loading delay
              setTimeout(() => {
                setPage(prev => prev + 1);
                setLoading(false);
              }, 1000);
            }}
            disabled={loading}
          >
            <Text style={styles.loadMoreText}>
              {loading ? 'Loading...' : 'Load More Reviews'}
            </Text>
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
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.l,
    margin: theme.spacing.m,
    marginBottom: theme.spacing.s,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  summaryLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    marginRight: theme.spacing.l,
  },
  ratingNumber: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xs,
  },
  totalReviews: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  summaryRight: {
    flex: 1,
    justifyContent: 'center',
  },
  distributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
    borderRadius: theme.borderRadius.s,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },
  activeDistributionRow: {
    backgroundColor: theme.colors.primary + '10',
  },
  starCount: {
    width: 36,
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  activeStarCount: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.s,
    marginHorizontal: theme.spacing.s,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    opacity: 0.5,
  },
  activeProgressBar: {
    opacity: 1,
  },
  reviewCount: {
    width: 32,
    textAlign: 'right',
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  activeReviewCount: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  filterList: {
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.s,
    marginBottom: theme.spacing.s,
  },
  filterChip: {
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.s,
    marginRight: theme.spacing.s,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeFilterChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    ...theme.typography.button,
    color: theme.colors.text.primary,
  },
  activeFilterChipText: {
    color: theme.colors.text.inverse,
  },
  addReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: theme.spacing.m,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.l,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.xl,
    elevation: 1,
  },
  addReviewText: {
    color: theme.colors.text.inverse,
    ...theme.typography.button,
    fontWeight: '600',
    marginLeft: 4,
  },
  reviewsContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    color: theme.colors.text.secondary,
    fontSize: 16,
    marginTop: 12,
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
  loadMoreButtonDisabled: {
    opacity: 0.6,
  },
});

export default ReviewsTab;