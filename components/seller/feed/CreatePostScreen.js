import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import { useSeller } from '../../../context/SellerContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { createPost, shopData } = useSeller();

  const [postData, setPostData] = useState({
    content: '',
    images: [],
    type: 'general', // general, offer, new_arrival, limited_stock
    offerDetails: {
      title: '',
      discount: '',
      validUntil: '',
    },
    taggedProducts: [],
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const postTypes = [
    { id: 'general', title: 'General Post', icon: 'post', color: '#2196F3' },
    { id: 'offer', title: 'Special Offer', icon: 'tag', color: '#FF9800' },
    { id: 'new_arrival', title: 'New Arrival', icon: 'new-box', color: '#4CAF50' },
    { id: 'limited_stock', title: 'Limited Stock', icon: 'alert-circle', color: '#F44336' },
  ];

  // Mock products for tagging
  const [availableProducts] = useState([
    { id: 1, name: 'Organic Tomatoes', image: '🍅' },
    { id: 2, name: 'Basmati Rice 5kg', image: '🌾' },
    { id: 3, name: 'Fresh Milk 1L', image: '🥛' },
    { id: 4, name: 'Whole Wheat Flour', image: '🌾' },
  ]);

  const handleImagePicker = () => {
    Alert.alert('Coming Soon', 'Image upload feature will be available soon!');
  };

  const handleTagProduct = (product) => {
    if (!postData.taggedProducts.find(p => p.id === product.id)) {
      setPostData({
        ...postData,
        taggedProducts: [...postData.taggedProducts, product],
      });
    }
  };

  const handleUntagProduct = (productId) => {
    setPostData({
      ...postData,
      taggedProducts: postData.taggedProducts.filter(p => p.id !== productId),
    });
  };

  const validatePost = () => {
    if (!postData.content.trim()) {
      Alert.alert('Error', 'Please enter post content');
      return false;
    }

    if (postData.type === 'offer') {
      if (!postData.offerDetails.title.trim()) {
        Alert.alert('Error', 'Please enter offer title');
        return false;
      }
      if (!postData.offerDetails.discount.trim()) {
        Alert.alert('Error', 'Please enter discount details');
        return false;
      }
    }

    return true;
  };

  const handleCreatePost = () => {
    if (validatePost()) {
      const newPost = {
        id: Date.now(),
        ...postData,
        shop: {
          id: shopData?.id || 1,
          name: shopData?.shopName || 'Your Shop',
          verified: shopData?.verified || false,
        },
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
      };

      createPost(newPost);
      Alert.alert('Success', 'Post created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  const styles = createStyles(theme);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity style={styles.postButton} onPress={handleCreatePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* Shop Info */}
        <View style={styles.shopInfo}>
          <View style={styles.shopAvatar}>
            <Text style={styles.shopAvatarText}>🏪</Text>
          </View>
          <View>
            <Text style={styles.shopName}>{shopData?.shopName || 'Your Shop'}</Text>
            <Text style={styles.postingAs}>Posting as shop owner</Text>
          </View>
        </View>

        {/* Post Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Post Type</Text>
          <View style={styles.postTypesContainer}>
            {postTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.postTypeButton,
                  postData.type === type.id && styles.selectedPostType,
                ]}
                onPress={() => setPostData({ ...postData, type: type.id })}
              >
                <Icon
                  name={type.icon}
                  size={24}
                  color={postData.type === type.id ? theme.colors.text.inverse : type.color}
                />
                <Text
                  style={[
                    styles.postTypeText,
                    postData.type === type.id && styles.selectedPostTypeText,
                  ]}
                >
                  {type.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Post Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's happening at your shop?</Text>
          <TextInput
            style={styles.contentInput}
            placeholder="Share updates, offers, or news with your customers..."
            placeholderTextColor={theme.colors.text.tertiary}
            value={postData.content}
            onChangeText={(text) => setPostData({ ...postData, content: text })}
            multiline
            numberOfLines={6}
          />
        </View>

        {/* Offer Details (if offer type selected) */}
        {postData.type === 'offer' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Offer Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Offer Title</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Weekend Special Sale"
                value={postData.offerDetails.title}
                onChangeText={(text) =>
                  setPostData({
                    ...postData,
                    offerDetails: { ...postData.offerDetails, title: text },
                  })
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Discount</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 20% off, Buy 1 Get 1 Free"
                value={postData.offerDetails.discount}
                onChangeText={(text) =>
                  setPostData({
                    ...postData,
                    offerDetails: { ...postData.offerDetails, discount: text },
                  })
                }
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Valid Until</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., This Sunday, 31st Dec"
                value={postData.offerDetails.validUntil}
                onChangeText={(text) =>
                  setPostData({
                    ...postData,
                    offerDetails: { ...postData.offerDetails, validUntil: text },
                  })
                }
              />
            </View>
          </View>
        )}

        {/* Images */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Images</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.addImageButton}
              onPress={handleImagePicker}
            >
              <Icon name="camera-plus" size={32} color={theme.colors.primary} />
              <Text style={styles.addImageText}>Add Photo</Text>
            </TouchableOpacity>
            {selectedImages.map((image, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.postImage} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => {
                    const newImages = [...selectedImages];
                    newImages.splice(index, 1);
                    setSelectedImages(newImages);
                  }}
                >
                  <Icon name="close" size={16} color={theme.colors.text.inverse} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Tag Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tag Products (Optional)</Text>
          
          {/* Tagged Products */}
          {postData.taggedProducts.length > 0 && (
            <View style={styles.taggedProductsContainer}>
              <Text style={styles.taggedProductsTitle}>Tagged Products:</Text>
              <View style={styles.taggedProducts}>
                {postData.taggedProducts.map((product) => (
                  <TouchableOpacity
                    key={product.id}
                    style={styles.taggedProduct}
                    onPress={() => handleUntagProduct(product.id)}
                  >
                    <Text style={styles.taggedProductEmoji}>{product.image}</Text>
                    <Text style={styles.taggedProductName}>{product.name}</Text>
                    <Icon name="close" size={16} color={theme.colors.text.inverse} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Available Products */}
          <Text style={styles.availableProductsTitle}>Available Products:</Text>
          <View style={styles.availableProducts}>
            {availableProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={[
                  styles.productTag,
                  postData.taggedProducts.find(p => p.id === product.id) && styles.selectedProductTag,
                ]}
                onPress={() => handleTagProduct(product)}
                disabled={!!postData.taggedProducts.find(p => p.id === product.id)}
              >
                <Text style={styles.productTagEmoji}>{product.image}</Text>
                <Text style={styles.productTagName}>{product.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Post Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preview</Text>
          <View style={styles.previewContainer}>
            <View style={styles.previewHeader}>
              <View style={styles.previewShopInfo}>
                <Text style={styles.previewShopAvatar}>🏪</Text>
                <View>
                  <Text style={styles.previewShopName}>
                    {shopData?.shopName || 'Your Shop'}
                  </Text>
                  <Text style={styles.previewTime}>Just now</Text>
                </View>
              </View>
            </View>
            
            <Text style={styles.previewContent}>{postData.content || 'Your post content will appear here...'}</Text>
            
            {postData.type === 'offer' && postData.offerDetails.title && (
              <View style={styles.previewOffer}>
                <Text style={styles.previewOfferTitle}>{postData.offerDetails.title}</Text>
                <Text style={styles.previewOfferDiscount}>{postData.offerDetails.discount}</Text>
                {postData.offerDetails.validUntil && (
                  <Text style={styles.previewOfferValidity}>Valid until: {postData.offerDetails.validUntil}</Text>
                )}
              </View>
            )}

            <View style={styles.previewActions}>
              <View style={styles.previewAction}>
                <Icon name="heart-outline" size={20} color={theme.colors.text.secondary} />
                <Text style={styles.previewActionText}>Like</Text>
              </View>
              <View style={styles.previewAction}>
                <Icon name="comment-outline" size={20} color={theme.colors.text.secondary} />
                <Text style={styles.previewActionText}>Comment</Text>
              </View>
              <View style={styles.previewAction}>
                <Icon name="share-outline" size={20} color={theme.colors.text.secondary} />
                <Text style={styles.previewActionText}>Share</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
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
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backButton: {
      padding: 8,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    postButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: theme.borderRadius.s,
    },
    postButtonText: {
      color: theme.colors.text.inverse,
      fontSize: 16,
      fontWeight: '500',
    },
    content: {
      padding: 20,
    },
    shopInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
    },
    shopAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    shopAvatarText: {
      fontSize: 24,
    },
    shopName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    postingAs: {
      fontSize: 14,
      color: theme.colors.text.secondary,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 12,
    },
    postTypesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    postTypeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: theme.borderRadius.s,
      backgroundColor: theme.colors.surface,
      marginRight: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    selectedPostType: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    postTypeText: {
      fontSize: 14,
      color: theme.colors.text.primary,
      marginLeft: 8,
    },
    selectedPostTypeText: {
      color: theme.colors.text.inverse,
    },
    contentInput: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.s,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: theme.colors.text.primary,
      backgroundColor: theme.colors.surface,
      height: 120,
      textAlignVertical: 'top',
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text.primary,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.s,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: theme.colors.text.primary,
      backgroundColor: theme.colors.surface,
    },
    addImageButton: {
      width: 100,
      height: 100,
      borderRadius: theme.borderRadius.m,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    addImageText: {
      color: theme.colors.primary,
      fontSize: 12,
      marginTop: 4,
    },
    imageContainer: {
      width: 100,
      height: 100,
      marginRight: 12,
    },
    postImage: {
      width: '100%',
      height: '100%',
      borderRadius: theme.borderRadius.m,
    },
    removeImageButton: {
      position: 'absolute',
      top: -8,
      right: -8,
      backgroundColor: theme.colors.error,
      borderRadius: 12,
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    taggedProductsContainer: {
      marginBottom: 16,
    },
    taggedProductsTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.text.primary,
      marginBottom: 8,
    },
    taggedProducts: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    taggedProduct: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: theme.borderRadius.s,
      marginRight: 8,
      marginBottom: 8,
    },
    taggedProductEmoji: {
      fontSize: 16,
      marginRight: 4,
    },
    taggedProductName: {
      color: theme.colors.text.inverse,
      fontSize: 14,
      marginRight: 4,
    },
    availableProductsTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.text.primary,
      marginBottom: 8,
    },
    availableProducts: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    productTag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: theme.borderRadius.s,
      marginRight: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    selectedProductTag: {
      opacity: 0.5,
    },
    productTagEmoji: {
      fontSize: 16,
      marginRight: 4,
    },
    productTagName: {
      color: theme.colors.text.primary,
      fontSize: 14,
    },
    previewContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.m,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    previewHeader: {
      marginBottom: 12,
    },
    previewShopInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    previewShopAvatar: {
      fontSize: 20,
      marginRight: 8,
    },
    previewShopName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    previewTime: {
      fontSize: 12,
      color: theme.colors.text.secondary,
    },
    previewContent: {
      fontSize: 16,
      color: theme.colors.text.primary,
      marginBottom: 12,
      lineHeight: 22,
    },
    previewOffer: {
      backgroundColor: theme.colors.secondary + '20',
      padding: 12,
      borderRadius: theme.borderRadius.s,
      marginBottom: 12,
    },
    previewOfferTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 4,
    },
    previewOfferDiscount: {
      fontSize: 14,
      color: theme.colors.secondary,
      fontWeight: '500',
      marginBottom: 4,
    },
    previewOfferValidity: {
      fontSize: 12,
      color: theme.colors.text.secondary,
    },
    previewActions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    previewAction: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    previewActionText: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginLeft: 4,
    },
  });

export default CreatePostScreen;
