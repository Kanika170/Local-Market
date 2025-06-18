import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

const PricingStockSection = ({
  formData,
  errors,
  units,
  onChangeText,
  onSelectUnit,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Pricing and Stock</Text>

      <View style={styles.row}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>Price (₹) *</Text>
          <TextInput
            style={[styles.input, errors.price && styles.inputError]}
            placeholder="0.00"
            value={formData.price.toString()}
            onChangeText={(text) => onChangeText('price', text)}
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
            value={formData.originalPrice.toString()}
            onChangeText={(text) => onChangeText('originalPrice', text)}
            keyboardType="decimal-pad"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
          <Text style={styles.label}>Stock Quantity *</Text>
          <TextInput
            style={[styles.input, errors.stock && styles.inputError]}
            placeholder="0"
            value={formData.stock.toString()}
            onChangeText={(text) => onChangeText('stock', text)}
            keyboardType="number-pad"
          />
          {errors.stock && (
            <Text style={styles.errorText}>{errors.stock}</Text>
          )}
        </View>

        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.label}>Unit</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.unitList}
          >
            {units.map((unit) => (
              <TouchableOpacity
                key={unit}
                style={[
                  styles.unitButton,
                  formData.unit === unit && styles.selectedUnit,
                ]}
                onPress={() => onSelectUnit(unit)}
              >
                <Text
                  style={[
                    styles.unitButtonText,
                    formData.unit === unit && styles.selectedUnitText,
                  ]}
                >
                  {unit}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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
      backgroundColor: theme.colors.surface,
    },
    inputError: {
      borderColor: theme.colors.error,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: 14,
      marginTop: 4,
    },
    unitList: {
      flexGrow: 0,
    },
    unitButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: theme.borderRadius.s,
      backgroundColor: theme.colors.surface,
      marginRight: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    selectedUnit: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    unitButtonText: {
      color: theme.colors.text.primary,
      fontSize: 14,
    },
    selectedUnitText: {
      color: theme.colors.text.inverse,
    },
  });

export default PricingStockSection;
