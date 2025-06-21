import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../../theme/useTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';

const StatsCard = ({
  title,
  value,
  icon,
  change,
  type = 'primary',
  onPress,
  style,
}) => {
  const { theme } = useTheme();
  const styles = createSellerStyles(theme);
  
  const getGradientColors = () => {
    if (!theme.colors.gradients) {
      return [theme.colors.primary, theme.colors.primary];
    }
    
    switch (type) {
      case 'revenue':
        return theme.colors.gradients.revenue || theme.colors.gradients.primary || [theme.colors.primary, theme.colors.primary];
      case 'orders':
        return theme.colors.gradients.orders || theme.colors.gradients.primary || [theme.colors.primary, theme.colors.primary];
      case 'success':
        return theme.colors.gradients.success || theme.colors.gradients.primary || [theme.colors.primary, theme.colors.primary];
      default:
        return theme.colors.gradients.primary || [theme.colors.primary, theme.colors.primary];
    }
  };

  const getChangeStyle = () => {
    if (!change) return null;
    const isPositive = change > 0;
    return {
      ...styles.statsChange,
      color: isPositive ? theme.colors.success : theme.colors.error,
    };
  };

  const CardContent = () => (
    <LinearGradient
      colors={getGradientColors()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.statsCard, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        {icon && (
          <Icon
            name={icon}
            size={24}
            color={theme.colors.text.inverse}
            style={{ marginRight: 8 }}
          />
        )}
        <Text style={[styles.statsLabel, { color: theme.colors.text.inverse }]}>
          {title}
        </Text>
      </View>
      
      <Text style={[styles.statsValue, { color: theme.colors.text.inverse }]}>
        {value}
      </Text>
      
      {change !== undefined && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon
            name={change > 0 ? 'arrow-up' : 'arrow-down'}
            size={16}
            color={change > 0 ? theme.colors.success : theme.colors.error}
            style={{ marginRight: 4 }}
          />
          <Text style={getChangeStyle()}>
            {Math.abs(change)}% from last month
          </Text>
        </View>
      )}
    </LinearGradient>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};

export default StatsCard;
