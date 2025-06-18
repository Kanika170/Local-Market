import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/useTheme';

const TagsSection = ({
  formData,
  onAddTag,
  onRemoveTag,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Tags</Text>
      <View style={styles.tagsContainer}>
        {formData.tags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={styles.tag}
            onPress={() => onRemoveTag(tag)}
          >
            <Text style={styles.tagText}>{tag}</Text>
            <Icon name="close" size={16} color={theme.colors.text.inverse} />
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.addTagButton}
          onPress={() => onAddTag(`Tag ${formData.tags.length + 1}`)}
        >
          <Icon name="plus" size={20} color={theme.colors.primary} />
          <Text style={styles.addTagText}>Add Tag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 16,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    tag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: theme.borderRadius.s,
      marginRight: 8,
      marginBottom: 8,
    },
    tagText: {
      color: theme.colors.text.inverse,
      marginRight: 4,
    },
    addTagButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: theme.borderRadius.s,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      marginBottom: 8,
    },
    addTagText: {
      color: theme.colors.primary,
      marginLeft: 4,
    },
  });

export default TagsSection;
