import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PostForm = ({ postData, setPostData, postTypes }) => {
  const { theme } = useTheme();

  return (
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
            <Icon name={type.icon} size={24} color={postData.type === type.id ? theme.colors.text.inverse : type.color} />
            <Text style={[styles.postTypeText, postData.type === type.id && styles.selectedPostTypeText]}>
              {type.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
  postTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 12,
    marginBottom: 12,
  },
  selectedPostType: {
    backgroundColor: '#2196F3',
  },
  postTypeText: {
    fontSize: 14,
    marginLeft: 8,
  },
  selectedPostTypeText: {
    color: '#fff',
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
  },
});

export default PostForm;
