import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/useTheme';

const ImagesSection = ({ selectedImages, onAddImage, onRemoveImage }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.imagesSection}>
      <Text style={styles.sectionTitle}>Product Images</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.addImageButton}
          onPress={onAddImage}
        >
          <Icon name="camera-plus" size={32} color={theme.colors.primary} />
          <Text style={styles.addImageText}>Add Image</Text>
        </TouchableOpacity>
        {selectedImages.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.productImage} />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => onRemoveImage(index)}
            >
              <Icon name="close" size={20} color={theme.colors.text.inverse} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    imagesSection: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 16,
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
      fontSize: 14,
      marginTop: 8,
    },
    imageContainer: {
      width: 100,
      height: 100,
      marginRight: 12,
    },
    productImage: {
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
  });

export default ImagesSection;
