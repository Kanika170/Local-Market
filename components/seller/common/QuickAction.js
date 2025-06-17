import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { sellerTheme } from '../../../theme/sellerTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';

const QuickAction = ({
  title,
  icon,
  onPress,
  color = sellerTheme.colors.primary,
  backgroundColor = sellerTheme.colors.surface,
  style,
}) => {
  const styles = createSellerStyles(sellerTheme);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor,
          borderRadius: sellerTheme.borderRadius.m,
          padding: sellerTheme.spacing.m,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 80,
          flex: 1,
          marginHorizontal: sellerTheme.spacing.xs,
          ...sellerTheme.shadows.small,
        },
        style,
      ]}
    >
      <Icon name={icon} size={28} color={color} />
      <Text
        style={{
          ...sellerTheme.typography.caption,
          color: sellerTheme.colors.text.primary,
          marginTop: sellerTheme.spacing.xs,
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
