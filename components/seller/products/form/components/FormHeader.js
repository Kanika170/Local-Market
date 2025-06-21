import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FormHeader = ({ 
  title, 
  onBack, 
  onSave, 
  onDelete, 
  isEditing = false,
  isSaving = false 
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Icon name="arrow-left" size={24} color={theme.colors.text.primary} />
      </TouchableOpacity>
      
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      
      <View style={styles.actions}>
        {isEditing && onDelete && (
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <Icon name="delete" size={20} color={theme.colors.error} />
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.saveButton, isSaving && styles.savingButton]} 
          onPress={onSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <Icon name="loading" size={16} color={theme.colors.text.inverse} />
          ) : (
            <Icon name="check" size={16} color={theme.colors.text.inverse} />
          )}
          <Text style={styles.saveButtonText}>
            {isSaving ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
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
      marginLeft: -8,
    },
    title: {
      flex: 1,
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
      textAlign: 'center',
      marginHorizontal: 16,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    deleteButton: {
      padding: 8,
      marginRight: 8,
    },
    saveButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: theme.borderRadius.s,
      gap: 4,
    },
    savingButton: {
      opacity: 0.7,
    },
    saveButtonText: {
      color: theme.colors.text.inverse,
      fontSize: 14,
      fontWeight: '500',
    },
  });

export default FormHeader;
