import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../theme/useTheme';

const ActionButton = ({ 
  title, 
  icon, 
  color, 
  description, 
  onPress,
  badge,
  disabled = false 
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.m,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
        position: 'relative',
        opacity: disabled ? 0.6 : 1,
        ...theme.shadows.small,
      }}
    >
      {/* Badge */}
      {badge && (
        <View style={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: theme.colors.error,
          borderRadius: 10,
          minWidth: 20,
          height: 20,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 6,
        }}>
          <Text style={{
            ...theme.typography.caption,
            color: theme.colors.text.inverse,
            fontSize: 10,
            fontWeight: '600',
          }}>
            {badge > 99 ? '99+' : badge}
          </Text>
        </View>
      )}

      {/* Icon */}
      <View style={{
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: `${color}15`,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.s,
      }}>
        <Icon
          name={icon}
          size={24}
          color={color}
        />
      </View>

      {/* Title */}
      <Text style={{
        ...theme.typography.body1,
        color: theme.colors.text.primary,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 4,
      }}>
        {title}
      </Text>

      {/* Description */}
      {description && (
        <Text style={{
          ...theme.typography.caption,
          color: theme.colors.text.secondary,
          textAlign: 'center',
          lineHeight: 16,
        }}>
          {description}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ActionButton;
