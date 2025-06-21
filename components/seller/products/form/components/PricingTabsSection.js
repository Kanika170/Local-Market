import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PricingTabsSection = ({ formData, onFormDataChange, errors }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('b2c');
  const styles = createStyles(theme);

  const handleInputChange = (field, value) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  const TabButton = ({ id, label, icon, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTab]}
      onPress={onPress}
    >
      <Icon 
        name={icon} 
        size={20} 
        color={isActive ? theme.colors.primary : theme.colors.text.secondary} 
      />
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pricing & Stock</Text>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TabButton
          id="b2c"
          label="Retail (B2C)"
          icon="account"
          isActive={activeTab === 'b2c'}
          onPress={() => setActiveTab('b2c')}
        />
        <TabButton
          id="b2b"
          label="Wholesale (B2B)"
          icon="office-building"
          isActive={activeTab === 'b2b'}
          onPress={() => setActiveTab('b2b')}
        />
      </View>

      {/* B2C Tab Content */}
      {activeTab === 'b2c' && (
        <View style={styles.tabContent}>
          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Price (₹) *</Text>
              <TextInput
                style={[styles.input, errors.price && styles.inputError]}
                placeholder="0.00"
                value={formData.price?.toString() || ''}
                onChangeText={(text) => handleInputChange('price', text)}
                keyboardType="decimal-pad"
              />
              {errors.price && (
                <Text style={styles.errorText}>{errors.price}</Text>
              )}
            </View>

            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Original Price (₹)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                value={formData.originalPrice?.toString() || ''}
                onChangeText={(text) => handleInputChange('originalPrice', text)}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Stock Quantity *</Text>
            <TextInput
              style={[styles.input, errors.stock && styles.inputError]}
              placeholder="0"
              value={formData.stock?.toString() || ''}
              onChangeText={(text) => handleInputChange('stock', text)}
              keyboardType="number-pad"
            />
            {errors.stock && (
              <Text style={styles.errorText}>{errors.stock}</Text>
            )}
          </View>
        </View>
      )}

      {/* B2B Tab Content */}
      {activeTab === 'b2b' && (
        <View style={styles.tabContent}>
          <View style={styles.switchRow}>
            <View style={styles.switchInfo}>
              <Text style={styles.switchLabel}>Enable B2B Sales</Text>
              <Text style={styles.switchDescription}>
                Allow other businesses to buy this product in bulk
              </Text>
            </View>
            <Switch
              value={formData.b2bEnabled || false}
              onValueChange={(value) => handleInputChange('b2bEnabled', value)}
              trackColor={{ 
                false: theme.colors.disabled, 
                true: theme.colors.primary + '40' 
              }}
              thumbColor={formData.b2bEnabled ? theme.colors.primary : theme.colors.text.tertiary}
            />
          </View>

          {formData.b2bEnabled && (
            <>
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Wholesale Price (₹) *</Text>
                  <TextInput
                    style={[styles.input, errors.wholesalePrice && styles.inputError]}
                    placeholder="0.00"
                    value={formData.wholesalePrice?.toString() || ''}
                    onChangeText={(text) => handleInputChange('wholesalePrice', text)}
                    keyboardType="decimal-pad"
                  />
                  {errors.wholesalePrice && (
                    <Text style={styles.errorText}>{errors.wholesalePrice}</Text>
                  )}
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Min Order Qty *</Text>
                  <TextInput
                    style={[styles.input, errors.minOrderQty && styles.inputError]}
                    placeholder="24"
                    value={formData.minOrderQty?.toString() || ''}
                    onChangeText={(text) => handleInputChange('minOrderQty', text)}
                    keyboardType="number-pad"
                  />
                  {errors.minOrderQty && (
                    <Text style={styles.errorText}>{errors.minOrderQty}</Text>
                  )}
                </View>
              </View>

              <View style={styles.infoBox}>
                <Icon name="information" size={16} color={theme.colors.primary} />
                <Text style={styles.infoText}>
                  Wholesale price should be lower than retail price. 
                  Minimum order quantity helps ensure bulk purchases.
                </Text>
              </View>
            </>
          )}
        </View>
      )}
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
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.s,
      padding: 4,
      marginBottom: 16,
    },
    tabButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: theme.borderRadius.s,
      gap: 8,
    },
    activeTab: {
      backgroundColor: theme.colors.surface,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    tabText: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      fontWeight: '500',
    },
    activeTabText: {
      color: theme.colors.primary,
      fontWeight: '600',
    },
    tabContent: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.s,
      padding: 16,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text.primary,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.s,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: theme.colors.text.primary,
      backgroundColor: theme.colors.background,
    },
    inputError: {
      borderColor: theme.colors.error,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 14,
      marginTop: 4,
    },
    switchRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    switchInfo: {
      flex: 1,
      marginRight: 16,
    },
    switchLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.text.primary,
      marginBottom: 4,
    },
    switchDescription: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      lineHeight: 18,
    },
    infoBox: {
      flexDirection: 'row',
      backgroundColor: theme.colors.primary + '10',
      borderRadius: theme.borderRadius.s,
      padding: 12,
      marginTop: 8,
    },
    infoText: {
      flex: 1,
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginLeft: 8,
      lineHeight: 18,
    },
  });

export default PricingTabsSection;
