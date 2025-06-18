import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ImageUploadComponent = ({ 
  images = [], 
  onImagesChange, 
  maxImages = 5, 
  title = "Images",
  showTitle = true 
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const showImagePicker = () => {
    Alert.alert(
      'Image Upload',
      'Image upload functionality will be integrated with API later. For now, using mock images.',
      [
        { 
          text: 'Add Mock Image', 
          onPress: () => addMockImage() 
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const addMockImage = () => {
    if (images.length < maxImages) {
      // Add a mock image URI
      const mockImageUri = `https://via.placeholder.com/300x300/4CAF50/FFFFFF?text=Product+${images.length + 1}`;
      onImagesChange([...images, mockImageUri]);
    } else {
      Alert.alert('Limit Reached', `You can only add up to ${maxImages} images.`);
    }
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
  };

  return (
    <View style={styles.container}>
      {showTitle && <Text style={styles.title}>{title}</Text>}
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {/* Add Image Button */}
        {images.length < maxImages && (
          <TouchableOpacity style={styles.addImageButton} onPress={showImagePicker}>
            <Icon name="camera-plus" size={32} color={theme.colors.primary} />
            <Text style={styles.addImageText}>Add Image</Text>
          </TouchableOpacity>
        )}

        {/* Display Images */}
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeImage(index)}
            >
              <Icon name="close" size={16} color={theme.colors.text.inverse} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {images.length > 0 && (
        <Text style={styles.imageCount}>
          {images.length} of {maxImages} images
        </Text>
      )}
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 12,
    },
    scrollView: {
      flexGrow: 0,
    },
    addImageButton: {
      width: 100,
      height: 100,
      borderRadius: theme.borderRadius.m,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      backgroundColor: theme.colors.primary + '10',
    },
    addImageText: {
      color: theme.colors.primary,
      fontSize: 12,
      marginTop: 4,
      fontWeight: '500',
    },
    imageContainer: {
      width: 100,
      height: 100,
      marginRight: 12,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: theme.borderRadius.m,
      backgroundColor: theme.colors.surface,
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
      elevation: 2,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    imageCount: {
      fontSize: 12,
      color: theme.colors.text.secondary,
      marginTop: 8,
      textAlign: 'center',
    },
  });

export default ImageUploadComponent;
