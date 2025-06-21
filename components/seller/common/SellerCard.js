import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/useTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';

const SellerCard = ({ 
  title, 
  subtitle, 
  children, 
  onPress, 
  style, 
  headerRight,
  variant = 'default',
  icon,
  iconColor,
  ...props 
}) => {
  const { theme } = useTheme();
  const styles = createSellerStyles(theme);
  
  const getCardStyle = () => {
    const baseStyle = styles.card;
    
    switch (variant) {
      case 'primary':
        return { ...baseStyle, backgroundColor: theme.colors.cardPrimary || theme.colors.surface };
      case 'secondary':
        return { ...baseStyle, backgroundColor: theme.colors.cardSecondary || theme.colors.surface };
      case 'accent':
        return { ...baseStyle, backgroundColor: theme.colors.cardAccent || theme.colors.surface };
      case 'warning':
        return { ...baseStyle, backgroundColor: theme.colors.cardWarning || theme.colors.surface };
      case 'error':
        return { ...baseStyle, backgroundColor: theme.colors.cardError || theme.colors.surface };
      default:
        return baseStyle;
    }
  };

  const CardContent = () => (
    <View style={[getCardStyle(), style]} {...props}>
      {(title || subtitle || headerRight || icon) && (
        <View style={styles.cardHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            {icon && (
              <Icon 
                name={icon} 
                size={24} 
                color={iconColor || theme.colors.primary} 
                style={{ marginRight: theme.spacing.s }}
              />
            )}
            <View style={{ flex: 1 }}>
              {title && <Text style={styles.cardTitle}>{title}</Text>}
              {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
            </View>
          </View>
          {headerRight}
        </View>
      )}
      {children && (
        <View style={styles.cardContent}>
          {children}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};

export default SellerCard;
