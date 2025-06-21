import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductSortModal = ({
  visible,
  onClose,
  sortBy,
  sortOrder,
  onSortChange,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const sortOptions = [
    { key: 'name', label: 'Product Name', icon: 'alphabetical-variant' },
    { key: 'price', label: 'Price', icon: 'currency-usd' },
    { key: 'stock', label: 'Stock Quantity', icon: 'package-variant' },
    { key: 'category', label: 'Category', icon: 'tag' },
    { key: 'created', label: 'Date Added', icon: 'calendar-plus' },
  ];

  const handleSortSelect = (key) => {
    if (sortBy === key) {
      // Toggle order if same sort option
      onSortChange(key, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to ascending for new sort option
      onSortChange(key, 'asc');
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Sort Products</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color={theme.colors.text.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {sortOptions.map((option) => {
              const isSelected = sortBy === option.key;
              return (
                <TouchableOpacity
                  key={option.key}
                  style={[styles.sortOption, isSelected && styles.selectedSort]}
                  onPress={() => handleSortSelect(option.key)}
                >
                  <View style={styles.sortOptionLeft}>
                    <Icon 
                      name={option.icon} 
                      size={20} 
                      color={isSelected ? theme.colors.primary : theme.colors.text.secondary} 
                    />
                    <Text style={[styles.sortOptionText, isSelected && styles.selectedSortText]}>
                      {option.label}
                    </Text>
                  </View>
                  {isSelected && (
                    <Icon 
                      name={sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'} 
                      size={20} 
                      color={theme.colors.primary} 
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.m,
      width: '85%',
      maxWidth: 400,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    content: {
      paddingVertical: 8,
    },
    sortOption: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    selectedSort: {
      backgroundColor: theme.colors.primary + '10',
    },
    sortOptionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    sortOptionText: {
      fontSize: 16,
      color: theme.colors.text.primary,
      marginLeft: 12,
    },
    selectedSortText: {
      color: theme.colors.primary,
      fontWeight: '500',
    },
  });

export default ProductSortModal;
