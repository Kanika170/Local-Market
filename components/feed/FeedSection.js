import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { useLocation } from '../../context/LocationContext';
import InteractionBar from '../common/InteractionBar';
import CommentModal from '../common/CommentModal';

const FeedSection = ({ feedData, onProductPress, onShopPress }) => {
  const { theme } = useTheme();
  const { selectedLocation } = useLocation();
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const styles = createStyles(theme);

  // Filter feed data based on location (mock implementation)
  const getLocationBasedFeed = () => {
    if (!selectedLocation) return feedData;
    
    // Mock location-based filtering - in real app, this would filter based on shop proximity
    return feedData.map(item => ({
      ...item,
      locationRelevant: true // Mock flag for location relevance
    }));
  };

  const locationBasedFeed = getLocationBasedFeed();

  const renderFeedItem = (item) => {
    const isShopPost = item.type !== 'user_post';
    const author = isShopPost ? item.shop : item.user;

    return (
      <View key={item.id} style={[styles.feedItem, isShopPost && styles.shopFeedItem]}>
        <View style={styles.feedHeader}>
          <Text style={styles.avatar}>{author.avatar}</Text>
          <TouchableOpacity 
            style={styles.authorInfo}
            onPress={() => isShopPost ? onShopPress(author) : null}
          >
            <View style={styles.authorNameRow}>
              <Text style={styles.authorName}>{author.name}</Text>
              {author.verified && <Text style={styles.verifiedBadge}>Verified Shop</Text>}
              {item.locationRelevant && (
                <Text style={styles.nearbyBadge}>📍 Nearby</Text>
              )}
            </View>
            <Text style={styles.authorMeta}>
              {author.type || 'Shop'} • {author.time}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.feedContent}>{item.content}</Text>

        {item.tags && (
          <View style={styles.tagsContainer}>
            {item.tags.map((tag, index) => (
              <Text key={index} style={styles.tag}>{tag}</Text>
            ))}
          </View>
        )}

        {item.image && (
          <TouchableOpacity 
            style={styles.imageContainer}
            onPress={() => item.product && onProductPress(item.product)}
          >
            <Text style={styles.feedImage}>{item.image}</Text>
          </TouchableOpacity>
        )}

        {item.product && (
          <TouchableOpacity 
            style={styles.productContainer}
            onPress={() => onProductPress(item.product)}
          >
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.product.name}</Text>
              <Text style={styles.productPrice}>{item.product.price}</Text>
              <Text style={styles.productCategory}>{item.product.category}</Text>
            </View>
          </TouchableOpacity>
        )}

        {item.offer && (
          <View style={styles.offerContainer}>
            <View style={styles.offerBadge}>
              <Text style={styles.offerTitle}>{item.offer.title}</Text>
              <Text style={styles.offerDetails}>
                {item.offer.validity || item.offer.deal}
              </Text>
              {item.offer.originalPrice && (
                <Text style={styles.originalPrice}>
                  Was: {item.offer.originalPrice}
                </Text>
              )}
              {item.offer.discountedPrice && (
                <Text style={styles.discountedPrice}>
                  Now: {item.offer.discountedPrice}
                </Text>
              )}
            </View>
            <TouchableOpacity 
              style={styles.offerButton}
              onPress={() => item.product && onProductPress(item.product)}
            >
              <Text style={styles.offerButtonText}>View Deal</Text>
            </TouchableOpacity>
          </View>
        )}

        <InteractionBar
          postId={item.id}
          initialLikes={item.likes || 0}
          initialComments={item.comments || 0}
          onCommentPress={() => {
            setSelectedPostId(item.id);
            setCommentModalVisible(true);
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Feed</Text>
        {selectedLocation && (
          <Text style={styles.locationInfo}>
            📍 Showing content near {selectedLocation.name || 'your location'}
          </Text>
        )}
      </View>
      
      {locationBasedFeed.map(renderFeedItem)}

      <CommentModal
        visible={isCommentModalVisible}
        postId={selectedPostId}
        onClose={() => {
          setCommentModalVisible(false);
          setSelectedPostId(null);
        }}
      />
    </View>
  );
};

const createStyles = (theme) => {
  const { width: screenWidth } = Dimensions.get('window');
  const isTablet = screenWidth > 768;
  const cardPadding = isTablet ? theme.spacing.l : theme.spacing.m;
  
  return StyleSheet.create({
  container: {
    marginBottom: theme.spacing.l,
  },
  sectionHeader: {
    marginBottom: theme.spacing.m,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  locationInfo: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    fontStyle: 'italic',
  },
  feedItem: {
    backgroundColor: theme.components.card.backgroundColor,
    borderRadius: theme.borderRadius.m,
    padding: cardPadding,
    marginBottom: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
    maxWidth: isTablet ? screenWidth * 0.8 : '100%',
    alignSelf: isTablet ? 'center' : 'stretch',
  },
  shopFeedItem: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  feedHeader: {
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
  },
  avatar: {
    fontSize: 24,
    marginRight: theme.spacing.m,
  },
  authorInfo: {
    flex: 1,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  authorName: {
    ...theme.typography.body1,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  verifiedBadge: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.text.inverse,
    fontSize: 10,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.s,
    marginLeft: theme.spacing.s,
  },
  nearbyBadge: {
    backgroundColor: theme.colors.secondary + '20',
    color: theme.colors.secondary,
    fontSize: 10,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.s,
    marginLeft: theme.spacing.s,
  },
  authorMeta: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  feedContent: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    lineHeight: 20,
    marginBottom: theme.spacing.m,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.m,
  },
  tag: {
    color: theme.colors.primary,
    ...theme.typography.caption,
    marginRight: theme.spacing.s,
    marginBottom: theme.spacing.xs,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  feedImage: {
    fontSize: Math.min(60, screenWidth * 0.15), // Scale image size based on screen width
  },
  productContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: cardPadding,
    marginBottom: theme.spacing.m,
    maxWidth: '100%',
  },
  productInfo: {
    alignItems: 'center',
  },
  productName: {
    ...theme.typography.body1,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  productPrice: {
    ...theme.typography.h3,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  productCategory: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  offerContainer: {
    backgroundColor: theme.colors.secondary + '20',
    borderRadius: theme.borderRadius.s,
    padding: cardPadding,
    flexDirection: isTablet ? 'row' : 'column',
    justifyContent: 'space-between',
    alignItems: isTablet ? 'center' : 'stretch',
    marginBottom: theme.spacing.m,
  },
  offerBadge: {
    flex: 1,
  },
  offerTitle: {
    ...theme.typography.body2,
    fontWeight: '600',
    color: theme.colors.secondary,
  },
  offerDetails: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  originalPrice: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    textDecorationLine: 'line-through',
    marginTop: 4,
  },
  discountedPrice: {
    ...theme.typography.body2,
    color: theme.colors.secondary,
    fontWeight: '600',
    marginTop: 2,
  },
  offerButton: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.xs,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    marginTop: isTablet ? 0 : theme.spacing.s,
    alignSelf: isTablet ? 'auto' : 'center',
    minWidth: isTablet ? 'auto' : 120,
  },
  offerButtonText: {
    color: theme.colors.secondary,
    ...theme.typography.caption,
    fontWeight: '500',
  },
  });
};

export default FeedSection;
