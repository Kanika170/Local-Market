import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { height: screenHeight } = Dimensions.get('window');

const SearchableDropdown = ({
  data = [],
  value,
  onSelect,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  allowOther = false,
  otherLabel = "Other",
  label,
  error,
}) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const styles = createStyles(theme);

  const filteredData = data.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (item) => {
    if (item === otherLabel && allowOther) {
      setShowCustomInput(true);
      return;
    }
    onSelect(item);
    setIsVisible(false);
    setSearchQuery('');
    setShowCustomInput(false);
  };

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      onSelect(customValue.trim());
      setIsVisible(false);
      setCustomValue('');
      setShowCustomInput(false);
      setSearchQuery('');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.dropdownItem,
        value === item && styles.selectedItem,
      ]}
      onPress={() => handleSelect(item)}
    >
      <Text
        style={[
          styles.dropdownItemText,
          value === item && styles.selectedItemText,
        ]}
      >
        {item}
      </Text>
      {value === item && (
        <Icon name="check" size={20} color={theme.colors.primary} />
      )}
    </TouchableOpacity>
  );

  const displayValue = value || placeholder;
  const isPlaceholder = !value;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={[
          styles.selector,
          error && styles.selectorError,
          isVisible && styles.selectorActive,
        ]}
        onPress={() => setIsVisible(true)}
      >
        <Text
          style={[
            styles.selectorText,
            isPlaceholder && styles.placeholderText,
          ]}
        >
          {displayValue}
        </Text>
        <Icon
          name={isVisible ? "chevron-up" : "chevron-down"}
          size={24}
          color={theme.colors.text.secondary}
        />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setIsVisible(false);
          setSearchQuery('');
          setShowCustomInput(false);
        }}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => {
            setIsVisible(false);
            setSearchQuery('');
            setShowCustomInput(false);
          }}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {showCustomInput ? `Enter ${otherLabel}` : 'Select Option'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(false);
                  setSearchQuery('');
                  setShowCustomInput(false);
                }}
              >
                <Icon name="close" size={24} color={theme.colors.text.primary} />
              </TouchableOpacity>
            </View>

            {showCustomInput ? (
              <View style={styles.customInputContainer}>
                <TextInput
                  style={styles.customInput}
                  placeholder={`Enter custom ${otherLabel.toLowerCase()}`}
                  value={customValue}
                  onChangeText={setCustomValue}
                  autoFocus
                />
                <View style={styles.customInputActions}>
                  <TouchableOpacity
                    style={styles.customInputButton}
                    onPress={() => {
                      setShowCustomInput(false);
                      setCustomValue('');
                    }}
                  >
                    <Text style={styles.customInputButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.customInputButton, styles.customInputButtonPrimary]}
                    onPress={handleCustomSubmit}
                  >
                    <Text style={[styles.customInputButtonText, styles.customInputButtonTextPrimary]}>
                      Add
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <>
                <View style={styles.searchContainer}>
                  <Icon name="magnify" size={20} color={theme.colors.text.secondary} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={theme.colors.text.tertiary}
                  />
                </View>

                <FlatList
                  data={[...filteredData, ...(allowOther ? [otherLabel] : [])]}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  renderItem={renderItem}
                  style={styles.dropdownList}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>No options found</Text>
                    </View>
                  }
                />
              </>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text.primary,
      marginBottom: 8,
    },
    selector: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.s,
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.colors.surface,
    },
    selectorError: {
      borderColor: theme.colors.error,
    },
    selectorActive: {
      borderColor: theme.colors.primary,
    },
    selectorText: {
      fontSize: 16,
      color: theme.colors.text.primary,
      flex: 1,
    },
    placeholderText: {
      color: theme.colors.text.tertiary,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 14,
      marginTop: 4,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.m,
      width: '90%',
      maxHeight: screenHeight * 0.6,
      elevation: 10,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      marginHorizontal: 16,
      marginTop: 16,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: theme.borderRadius.s,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text.primary,
      marginLeft: 8,
    },
    dropdownList: {
      maxHeight: screenHeight * 0.4,
      margin: 16,
    },
    dropdownItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: theme.borderRadius.s,
      marginBottom: 4,
    },
    selectedItem: {
      backgroundColor: theme.colors.primary + '20',
    },
    dropdownItemText: {
      fontSize: 16,
      color: theme.colors.text.primary,
      flex: 1,
    },
    selectedItemText: {
      color: theme.colors.primary,
      fontWeight: '500',
    },
    emptyContainer: {
      alignItems: 'center',
      paddingVertical: 32,
    },
    emptyText: {
      fontSize: 16,
      color: theme.colors.text.secondary,
    },
    customInputContainer: {
      padding: 16,
    },
    customInput: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.s,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: theme.colors.text.primary,
      backgroundColor: theme.colors.background,
      marginBottom: 16,
    },
    customInputActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    customInputButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: theme.borderRadius.s,
      marginLeft: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    customInputButtonPrimary: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    customInputButtonText: {
      fontSize: 14,
      color: theme.colors.text.primary,
      fontWeight: '500',
    },
    customInputButtonTextPrimary: {
      color: theme.colors.text.inverse,
    },
  });

export default SearchableDropdown;
