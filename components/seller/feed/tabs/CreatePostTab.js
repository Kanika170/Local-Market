import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../theme/useTheme';
import { mockFeedData } from '../mockFeedData';

const CreatePostTab = ({ onPostCreated }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const [postData, setPostData] = useState({
    content: '',
    type: 'general',
    images: [],
    offerDetails: { title: '', discount: '', validUntil: '' },
    taggedProducts: [],
  });

  const postTypes = mockFeedData.postTypes;

  const handleContentChange = (text) => {
    setPostData(prev => ({ ...prev, content: text }));
  };

  const handleTypeSelect = (type) => {
    setPostData(prev => ({ ...prev, type }));
  };

  const handleAddImage = () => {
    // In a real app, this would open image picker
    Alert.alert(
      'Add Image',
      'Image picker would open here',
      [
        { text: 'Camera', onPress: () => addMockImage() },
        { text: 'Gallery', onPress: () => addMockImage() },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const addMockImage = () => {
    const mockImageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400';
    setPostData(prev => ({
      ...prev,
      images: [...prev.images, mockImageUrl]
    }));
  };

  const removeImage = (index) => {
    setPostData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleTagProduct = () => {
    // In a real app, this would open product selector
    Alert.alert(
      'Tag Products',
      'Product selector would open here',
      [{ text: 'OK' }]
    );
  };

  const validatePost = () => {
    if (!postData.content.trim()) {
      Alert.alert('Error', 'Please enter post content');
      return false;
    }
    if (postData.type === 'offer' && !postData.offerDetails.title.trim()) {
      Alert.alert('Error', 'Please enter offer title');
      return false;
    }
    return true;
  };

  const handleCreatePost = () => {
    if (validatePost()) {
      const newPost = {
        id: Date.now(),
        ...postData,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        performance: 'medium'
      };

      Alert.alert(
        'Success',
        'Post created successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              setPostData({
                content: '',
                type: 'general',
                images: [],
                offerDetails: { title: '', discount: '', validUntil: '' },
                taggedProducts: [],
              });
              onPostCreated && onPostCreated(newPost);
            }
          }
        ]
      );
    }
  };

  const renderPostTypeSelector = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Post Type</Text>
      <View style={styles.typeContainer}>
        {postTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.typeButton,
              postData.type === type.id && styles.selectedType,
              { borderColor: type.color }
            ]}
            onPress={() => handleTypeSelect(type.id)}
          >
            <Icon 
              name={type.icon} 
              size={20} 
              color={postData.type === type.id ? type.color : theme.colors.text.secondary} 
            />
            <Text style={[
              styles.typeText,
              postData.type === type.id && { color: type.color }
            ]}>
              {type.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderContentInput = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>What's happening in your shop?</Text>
      <TextInput
        style={styles.contentInput}
        placeholder="Share updates, offers, new arrivals, or connect with your community..."
        placeholderTextColor={theme.colors.text.tertiary}
        value={postData.content}
        onChangeText={handleContentChange}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />
    </View>
  );

  const renderOfferDetails = () => {
    if (postData.type !== 'offer') return null;
    
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Offer Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Offer title (e.g., Buy 1 Get 1 Free)"
          placeholderTextColor={theme.colors.text.tertiary}
          value={postData.offerDetails.title}
          onChangeText={(text) => 
            setPostData(prev => ({
              ...prev,
              offerDetails: { ...prev.offerDetails, title: text }
            }))
          }
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Discount %"
            placeholderTextColor={theme.colors.text.tertiary}
            value={postData.offerDetails.discount}
            onChangeText={(text) => 
              setPostData(prev => ({
                ...prev,
                offerDetails: { ...prev.offerDetails, discount: text }
              }))
            }
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Valid until"
            placeholderTextColor={theme.colors.text.tertiary}
            value={postData.offerDetails.validUntil}
            onChangeText={(text) => 
              setPostData(prev => ({
                ...prev,
                offerDetails: { ...prev.offerDetails, validUntil: text }
              }))
            }
          />
        </View>
      </View>
    );
  };

  const renderImageSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Photos</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddImage}>
          <Icon name="camera-plus" size={20} color={theme.colors.primary} />
          <Text style={styles.addButtonText}>Add Photo</Text>
        </TouchableOpacity>
      </View>
      
      {postData.images.length > 0 && (
        <View style={styles.imageContainer}>
          {postData.images.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeImage(index)}
              >
                <Icon name="close" size={16} color={theme.colors.text.inverse} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderProductSection = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Tag Products</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleTagProduct}>
          <Icon name="tag-plus" size={20} color={theme.colors.primary} />
          <Text style={styles.addButtonText}>Tag Products</Text>
        </TouchableOpacity>
      </View>
      
      {postData.taggedProducts.length > 0 && (
        <View style={styles.tagContainer}>
          {postData.taggedProducts.map((product, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{product}</Text>
              <TouchableOpacity onPress={() => removeTaggedProduct(index)}>
                <Icon name="close" size={14} color={theme.colors.text.secondary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderPostTypeSelector()}
        {renderContentInput()}
        {renderOfferDetails()}
        {renderImageSection()}
        {renderProductSection()}
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={handleCreatePost}
        >
          <Icon name="send" size={20} color={theme.colors.text.inverse} />
          <Text style={styles.createButtonText}>Create Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.m,
    paddingBottom: theme.spacing.xl,
  },
  section: {
    marginBottom: theme.spacing.l,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  sectionTitle: {
    ...theme.typography.h5,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.s,
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.round,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  selectedType: {
    backgroundColor: `${theme.colors.primary}10`,
  },
  typeText: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.xs,
    fontWeight: '500',
  },
  contentInput: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.s,
    padding: theme.spacing.m,
    minHeight: 100,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.s,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.s,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.s,
  },
  halfInput: {
    flex: 1,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.round,
    backgroundColor: `${theme.colors.primary}10`,
  },
  addButtonText: {
    ...theme.typography.button,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.s,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.s,
  },
  removeButton: {
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
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.s,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tagText: {
    ...theme.typography.caption,
    color: theme.colors.text.primary,
    marginRight: theme.spacing.xs,
  },
  footer: {
    padding: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    ...theme.shadows.default,
  },
  createButtonText: {
    ...theme.typography.button,
    color: theme.colors.text.inverse,
    marginLeft: theme.spacing.s,
    fontWeight: '600',
  },
});

export default CreatePostTab;
