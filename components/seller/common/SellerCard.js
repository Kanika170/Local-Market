import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { sellerTheme } from '../../../theme/sellerTheme';
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
  const styles = createSellerStyles(sellerTheme);
  
  const getCardStyle = () => {
    const baseStyle = styles.card;
    
    switch (variant) {
      case 'primary':
        return { ...baseStyle, backgroundColor: sellerTheme.colors.cardPrimary };
      case 'secondary':
        return { ...baseStyle, backgroundColor: sellerTheme.colors.cardSecondary };
      case 'accent':
        return { ...baseStyle, backgroundColor: sellerTheme.colors.cardAccent };
      case 'warning':
        return { ...baseStyle, backgroundColor: sellerTheme.colors.cardWarning };
      case 'error':
        return { ...baseStyle, backgroundColor: sellerTheme.colors.cardError };
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
                color={iconColor || sellerTheme.colors.primary} 
                style={{ marginRight: sellerTheme.spacing.s }}
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
