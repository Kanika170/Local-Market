import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../../../theme/useTheme';

const StatCard = ({
  title,
  value,
  icon,
  change,
  type = 'primary',
  subtitle,
  onPress,
  isProduct = false,
  productImage,
}) => {
  const { theme } = useTheme();
  
  const getGradientColors = () => {
    const gradients = {
      primary: ['#667eea', '#764ba2'],
      secondary: ['#11998e', '#38ef7d'],
      warning: ['#f093fb', '#f5576c'],
      error: ['#4facfe', '#00f2fe'],
      success: ['#43e97b', '#38f9d7'],
    };
    
    return gradients[type] || gradients.primary;
  };

  const getIconColor = () => {
    return 'rgba(255, 255, 255, 0.9)';
  };

  const CardContent = () => (
    <LinearGradient
      colors={getGradientColors()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.m,
        height: 120,
        ...theme.shadows.medium,
      }}
    >
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <Icon
            name={icon}
            size={18}
            color={getIconColor()}
            style={{ marginRight: 6 }}
          />
          <Text style={{
            ...theme.typography.caption,
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: 11,
            fontWeight: '500',
          }}>
            {title}
          </Text>
        </View>

        {/* Value */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {isProduct && productImage ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{ uri: productImage }}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  marginRight: 8,
                }}
              />
              <Text style={{
                ...theme.typography.body1,
                color: 'rgba(255, 255, 255, 0.95)',
                flex: 1,
                fontSize: 13,
                fontWeight: '600',
              }} numberOfLines={2}>
                {value}
              </Text>
            </View>
          ) : (
            <Text style={{
              ...theme.typography.h3,
              color: 'rgba(255, 255, 255, 0.95)',
              fontWeight: '700',
              fontSize: 24,
            }}>
              {value}
            </Text>
          )}
        </View>

        {/* Footer */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{
            ...theme.typography.caption,
            color: 'rgba(255, 255, 255, 0.75)',
            fontSize: 10,
          }}>
            {subtitle}
          </Text>
          
          {change !== undefined && (
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 8,
            }}>
              <Icon
                name={change >= 0 ? 'arrow-up' : 'arrow-down'}
                size={12}
                color="rgba(255, 255, 255, 0.9)"
                style={{ marginRight: 2 }}
              />
              <Text style={{
                ...theme.typography.caption,
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: '600',
                fontSize: 10,
              }}>
                {Math.abs(change)}%
              </Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );

  if (onPress) {
    return (
      <TouchableOpacity 
        onPress={onPress} 
        activeOpacity={0.9}
        style={{ flex: 1 }}
      >
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};

export default StatCard;
