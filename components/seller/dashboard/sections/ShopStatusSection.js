import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../theme/useTheme';

const ShopStatusSection = ({ isOpen, onToggle }) => {
  const { theme } = useTheme();

  return (
    <View style={{
      backgroundColor: theme.colors.surface,
      marginHorizontal: theme.spacing.m,
      marginTop: theme.spacing.xs, 
      marginBottom: theme.spacing.m,
      borderRadius: theme.borderRadius.m,
      padding: theme.spacing.m,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...theme.shadows.small,
    }}>
      <View style={{ flex: 1 }}>
        <Text style={{
          ...theme.typography.body1,
          color: theme.colors.text.primary,
          fontWeight: '600',
          marginBottom: theme.spacing.xs,
        }}>
          Shop Status
        </Text>
        <Text style={{
          ...theme.typography.caption,
          color: theme.colors.text.secondary,
        }}>
          {isOpen ? 'Your shop is open for business' : 'Your shop is currently closed'}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onToggle}
        style={{
          backgroundColor: isOpen ? `${theme.colors.success}15` : `${theme.colors.error}15`,
          paddingHorizontal: theme.spacing.m,
          paddingVertical: theme.spacing.s,
          borderRadius: theme.borderRadius.m,
          flexDirection: 'row',
          alignItems: 'center',
          minWidth: 100,
          justifyContent: 'center',
        }}
      >
        <Icon
          name={isOpen ? 'store' : 'store-off'}
          size={20}
          color={isOpen ? theme.colors.success : theme.colors.error}
          style={{ marginRight: 6 }}
        />
        <Text style={{
          ...theme.typography.button,
          color: isOpen ? theme.colors.success : theme.colors.error,
          fontWeight: '600',
        }}>
          {isOpen ? 'OPEN' : 'CLOSED'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShopStatusSection;
