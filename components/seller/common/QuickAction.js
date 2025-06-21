import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/useTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';

const QuickAction = ({
  title,
  icon,
  onPress,
  color,
  backgroundColor,
  style,
}) => {
  const { theme } = useTheme();
  const styles = createSellerStyles(theme);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: backgroundColor || theme.colors.surface,
          borderRadius: theme.borderRadius.m,
          padding: theme.spacing.m,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 80,
          flex: 1,
          marginHorizontal: theme.spacing.xs,
          ...(theme.shadows?.small || {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }),
        },
        style,
      ]}
    >
      <Icon name={icon} size={28} color={color || theme.colors.primary} />
      <Text
        style={{
          ...theme.typography.caption,
          color: theme.colors.text.primary,
          marginTop: theme.spacing.xs,
          textAlign: 'center',
          fontWeight: '500',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default QuickAction;
