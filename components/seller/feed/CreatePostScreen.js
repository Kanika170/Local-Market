import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import { useSeller } from '../../../context/SellerContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PostForm from './PostForm';
import OfferDetails from './OfferDetails';
import ImagePicker from './ImagePicker';
import TaggedProducts from './TaggedProducts';
import PostPreview from './PostPreview';

const CreatePostScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { createPost, shopData } = useSeller();

  const [postData, setPostData] = useState({
    content: '',
    images: [],
    type: 'general',
    offerDetails: { title: '', discount: '', validUntil: '' },
    taggedProducts: [],
  });

  const postTypes = [
    { id: 'general', title: 'General Post', icon: 'post', color: '#2196F3' },
    { id: 'offer', title: 'Special Offer', icon: 'tag', color: '#FF9800' },
    { id: 'new_arrival', title: 'New Arrival', icon: 'new-box', color: '#4CAF50' },
    { id: 'limited_stock', title: 'Limited Stock', icon: 'alert-circle', color: '#F44336' },
  ];

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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Post</Text>
        <TouchableOpacity style={styles.postButton} onPress={handleCreatePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <PostForm postData={postData} setPostData={setPostData} postTypes={postTypes} />
        {postData.type === 'offer' && <OfferDetails postData={postData} setPostData={setPostData} />}
        <ImagePicker postData={postData} setPostData={setPostData} />
        <TaggedProducts postData={postData} setPostData={setPostData} />
        <PostPreview postData={postData} shopData={shopData} />
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
  });

export default CreatePostScreen;
