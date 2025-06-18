import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

const AdditionalOptionsSection = ({
  formData,
  onToggleOption,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Additional Options</Text>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Mark as Best Seller</Text>
        <Switch
          value={formData.isBestSeller}
          onValueChange={(value) => onToggleOption('isBestSeller', value)}
          trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Show Discount Badge</Text>
        <Switch
          value={formData.isDiscounted}
          onValueChange={(value) => onToggleOption('isDiscounted', value)}
          trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Home Delivery Available</Text>
        <Switch
          value={formData.isDeliveryAvailable}
          onValueChange={(value) => onToggleOption('isDeliveryAvailable', value)}
          trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
        />
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
    switchRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    switchLabel: {
      fontSize: 16,
      color: theme.colors.text.primary,
    },
  });

export default AdditionalOptionsSection;
