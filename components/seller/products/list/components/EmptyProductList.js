import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmptyProductList = ({ onAddProduct, hasFilters, onClearFilters }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  if (hasFilters) {
    return (
      <View style={styles.container}>
        <Icon name="filter-remove" size={64} color={theme.colors.text.tertiary} />
        <Text style={styles.title}>No products match your filters</Text>
        <Text style={styles.subtitle}>
          Try adjusting your search criteria or clear filters to see all products
        </Text>
        <TouchableOpacity style={styles.clearButton} onPress={onClearFilters}>
          <Text style={styles.clearButtonText}>Clear Filters</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Icon name="package-variant-closed" size={64} color={theme.colors.text.tertiary} />
      <Text style={styles.title}>No products yet</Text>
      <Text style={styles.subtitle}>
        Start building your inventory by adding your first product
      </Text>
      <TouchableOpacity style={styles.addButton} onPress={onAddProduct}>
        <Icon name="plus" size={20} color={theme.colors.text.inverse} />
        <Text style={styles.addButtonText}>Add Your First Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
      paddingVertical: 60,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginTop: 16,
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.text.secondary,
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: 32,
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: theme.borderRadius.s,
    },
    addButtonText: {
      color: theme.colors.text.inverse,
      fontSize: 16,
      fontWeight: '500',
      marginLeft: 8,
    },
    clearButton: {
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: theme.borderRadius.s,
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    clearButtonText: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: '500',
    },
  });

export default EmptyProductList;
