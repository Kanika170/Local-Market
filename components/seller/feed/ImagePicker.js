import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ImagePicker = ({ postData, setPostData }) => {
  const { theme } = useTheme();

  const handleImagePicker = () => {
    // Implement image picker logic here
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Add Images</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.addImageButton} onPress={handleImagePicker}>
          <Icon name="camera-plus" size={32} color={theme.colors.primary} />
          <Text style={styles.addImageText}>Add Photo</Text>
        </TouchableOpacity>
        {postData.images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.postImage} />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => {
                const newImages = postData.images.filter((_, i) => i !== index);
                setPostData({ ...postData, images: newImages });
              }}
            >
              <Icon name="close" size={16} color={theme.colors.text.inverse} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addImageText: {
    color: '#2196F3',
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
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF0000',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImagePicker;
