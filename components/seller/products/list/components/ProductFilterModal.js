import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductFilterModal = ({
  visible,
  onClose,
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const categories = [
    'All',
    'Vegetables',
    'Fruits',
    'Grains',
    'Dairy',
    'Beverages',
    'Snacks',
    'Spices & Condiments',
    'Bakery',
    'Frozen Foods',
    'Personal Care',
    'Household Items',
  ];

  const stockStatuses = [
    { key: 'all', label: 'All Stock' },
    { key: 'in_stock', label: 'In Stock' },
    { key: 'low_stock', label: 'Low Stock' },
    { key: 'out_of_stock', label: 'Out of Stock' },
  ];

  const b2bOptions = [
    { key: 'all', label: 'All Products' },
    { key: 'enabled', label: 'B2B Enabled' },
    { key: 'disabled', label: 'B2B Disabled' },
  ];

  const FilterSection = ({ title, options, selectedValue, onSelect, keyField = 'key', labelField = 'label' }) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterTitle}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const key = typeof option === 'string' ? option : option[keyField];
          const label = typeof option === 'string' ? option : option[labelField];
          const isSelected = selectedValue === key;
          
          return (
            <TouchableOpacity
              key={key}
              style={[styles.optionButton, isSelected && styles.selectedOption]}
              onPress={() => onSelect(key)}
            >
              <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filter Products</Text>
          <TouchableOpacity onPress={onClearFilters}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <FilterSection
            title="Category"
            options={categories}
            selectedValue={filters.category}
            onSelect={(value) => onFilterChange('category', value)}
          />

          <FilterSection
            title="Stock Status"
            options={stockStatuses}
            selectedValue={filters.stockStatus}
            onSelect={(value) => onFilterChange('stockStatus', value)}
          />

          <FilterSection
            title="B2B Sales"
            options={b2bOptions}
            selectedValue={filters.b2bStatus}
            onSelect={(value) => onFilterChange('b2bStatus', value)}
          />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={onApplyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    clearText: {
      fontSize: 16,
      color: theme.colors.primary,
      fontWeight: '500',
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    filterSection: {
      marginVertical: 20,
    },
    filterTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 12,
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    optionButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: theme.borderRadius.s,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: 8,
    },
    selectedOption: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    optionText: {
      fontSize: 14,
      color: theme.colors.text.primary,
      fontWeight: '500',
    },
    selectedOptionText: {
      color: theme.colors.text.inverse,
    },
    footer: {
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    applyButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 16,
      borderRadius: theme.borderRadius.s,
      alignItems: 'center',
    },
    applyButtonText: {
      color: theme.colors.text.inverse,
      fontSize: 16,
      fontWeight: '600',
    },
  });

export default ProductFilterModal;
