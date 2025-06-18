import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductShowScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useTheme();
  const { product } = route.params;

  // Mock reviews data
  const [reviews] = useState([
    {
      id: 1,
      customerName: 'Rahul M.',
      rating: 5,
      comment: 'Excellent quality product! Very fresh and well packaged.',
      date: '2 days ago',
      verified: true,
    },
    {
      id: 2,
      customerName: 'Priya S.',
      rating: 4,
      comment: 'Good product but delivery was a bit delayed.',
      date: '1 week ago',
      verified: true,
    },
    {
      id: 3,
      customerName: 'Amit K.',
      rating: 4.5,
      comment: 'Fresh and good quality. Will order again.',
      date: '2 weeks ago',
      verified: true,
    },
  ]);

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <View style={styles.starsContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <Icon key={`full-${i}`} name="star" size={16} color={theme.colors.warning} />
        ))}
        {hasHalfStar && (
          <Icon name="star-half" size={16} color={theme.colors.warning} />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Icon key={`empty-${i}`} name="star-outline" size={16} color={theme.colors.warning} />
        ))}
      </View>
    );
  };

  const renderReview = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View>
          <Text style={styles.reviewerName}>{item.customerName}</Text>
          <Text style={styles.reviewDate}>{item.date}</Text>
        </View>
        <View style={styles.ratingContainer}>
          {renderRatingStars(item.rating)}
          {item.verified && (
            <View style={styles.verifiedBadge}>
              <Icon name="check-circle" size={12} color={theme.colors.success} />
              <Text style={styles.verifiedText}>Verified Purchase</Text>
            </View>
          )}
        </View>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProduct', { product })}
        >
          <Icon name="pencil" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Info */}
        <View style={styles.productInfo}>
          <View style={styles.productImageContainer}>
            <Text style={styles.productEmoji}>{product.image}</Text>
          </View>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productCategory}>{product.category}</Text>
          
          <View style={styles.ratingSection}>
            <View style={styles.overallRating}>
              <Text style={styles.ratingNumber}>{product.rating}</Text>
              {renderRatingStars(product.rating)}
              <Text style={styles.reviewCount}>
                {product.reviewCount} reviews
              </Text>
            </View>
            <View style={styles.ratingBreakdown}>
              <Text style={styles.ratingBreakdownTitle}>Rating Breakdown</Text>
              {[5, 4, 3, 2, 1].map((star) => (
                <View key={star} style={styles.ratingBar}>
                  <Text style={styles.ratingLabel}>{star} star</Text>
                  <View style={styles.ratingBarBackground}>
                    <View 
                      style={[
                        styles.ratingBarFill,
                        { 
                          width: `${Math.random() * 100}%`,
                          backgroundColor: star >= 4 ? theme.colors.success : 
                                         star >= 3 ? theme.colors.warning :
                                         theme.colors.error
                        }
                      ]} 
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Customer Reviews</Text>
          <FlatList
            data={reviews}
            renderItem={renderReview}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.emptyReviews}>
                <Icon name="star-outline" size={48} color={theme.colors.text.tertiary} />
                <Text style={styles.emptyReviewsText}>No reviews yet</Text>
              </View>
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: theme.colors.surface,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  editButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  productInfo: {
    padding: 20,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
  },
  productImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  productEmoji: {
    fontSize: 64,
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  productCategory: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    marginBottom: 16,
  },
  ratingSection: {
    width: '100%',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  overallRating: {
    alignItems: 'center',
    marginBottom: 24,
  },
  ratingNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  ratingBreakdown: {
    width: '100%',
  },
  ratingBreakdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingLabel: {
    width: 60,
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  ratingBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: theme.colors.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  ratingBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  reviewsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
  reviewCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: theme.colors.text.tertiary,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  verifiedText: {
    fontSize: 12,
    color: theme.colors.success,
    marginLeft: 4,
  },
  reviewComment: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  emptyReviews: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyReviewsText: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    marginTop: 16,
  },
});

export default ProductShowScreen;
