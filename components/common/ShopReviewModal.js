import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../theme/useTheme';

const ShopReviewModal = ({ visible, onClose, shop, onSubmit }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [images, setImages] = useState([]); // For future image upload feature

  const handleSubmit = () => {
    if (rating && review.trim()) {
      onSubmit({
        rating,
        review: review.trim(),
        images,
        timestamp: new Date().toISOString()
      });
      setRating(5);
      setReview('');
      setImages([]);
      onClose();
    }
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            style={styles.starButton}
          >
            <Text style={[
              styles.star,
              star <= rating && styles.starSelected
            ]}>
              ⭐
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Rate & Review</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.shopInfo}>
              <Text style={styles.shopAvatar}>{shop?.avatar || '🏪'}</Text>
              <View style={styles.shopDetails}>
                <Text style={styles.shopName}>{shop?.name}</Text>
                {shop?.verified && (
                  <Text style={styles.verifiedBadge}>Verified Shop</Text>
                )}
              </View>
            </View>

            <Text style={styles.sectionTitle}>Your Rating</Text>
            {renderStars()}

            <Text style={styles.sectionTitle}>Your Review</Text>
            <TextInput
              style={styles.reviewInput}
              value={review}
              onChangeText={setReview}
              placeholder="Share your experience with this shop..."
              placeholderTextColor={theme.colors.text.tertiary}
              multiline
              textAlignVertical="top"
              numberOfLines={6}
            />

            {/* Future feature: Image upload section */}
            <View style={styles.imageSection}>
              <Text style={styles.sectionTitle}>Add Photos</Text>
              <TouchableOpacity style={styles.addImageButton}>
                <Text style={styles.addImageIcon}>📷</Text>
                <Text style={styles.addImageText}>Add Photos</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={[
                styles.submitButton,
                (!rating || !review.trim()) && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={!rating || !review.trim()}
            >
              <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const createStyles = (theme) => StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.l,
    borderTopRightRadius: theme.borderRadius.l,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  closeButton: {
    fontSize: 20,
    color: theme.colors.text.secondary,
    padding: theme.spacing.s,
  },
  content: {
    padding: theme.spacing.m,
  },
  shopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  shopAvatar: {
    fontSize: 40,
    marginRight: theme.spacing.m,
  },
  shopDetails: {
    flex: 1,
  },
  shopName: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  verifiedBadge: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginTop: 4,
  },
  sectionTitle: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontWeight: '600',
    marginBottom: theme.spacing.s,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.l,
  },
  starButton: {
    padding: theme.spacing.s,
  },
  star: {
    fontSize: 32,
    opacity: 0.3,
  },
  starSelected: {
    opacity: 1,
  },
  reviewInput: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.l,
    minHeight: 120,
    ...theme.typography.body2,
    color: theme.colors.text.primary,
  },
  imageSection: {
    marginBottom: theme.spacing.l,
  },
  addImageButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
  },
  addImageIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.s,
  },
  addImageText: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 34 : 24,
  },
  submitButtonDisabled: {
    backgroundColor: theme.colors.disabled,
  },
  submitButtonText: {
    color: theme.colors.text.inverse,
    ...theme.typography.button,
  },
});

export default ShopReviewModal;
