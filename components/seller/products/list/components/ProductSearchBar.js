import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductSearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  onFilterPress, 
  onSortPress 
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={theme.colors.text.secondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by product name or barcode"
          placeholderTextColor={theme.colors.text.tertiary}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onFilterPress}
        >
          <Icon name="filter-variant" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={onSortPress}
        >
          <Icon name="sort-variant" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: theme.borderRadius.s,
      marginRight: 12,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text.primary,
      marginLeft: 8,
    },
    actionsContainer: {
      flexDirection: 'row',
    },
    actionButton: {
      width: 44,
      height: 44,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.s,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
    },
  });

export default ProductSearchBar;
