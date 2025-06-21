import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../../../theme/useTheme';

const DashboardHeader = ({ 
  shopData, 
  notifications, 
  onNotificationPress
}) => {
  const { theme } = useTheme();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getCurrentDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  };

  const getGradientColors = () => {
    if (theme.colors.gradients && theme.colors.gradients.primary) {
      return theme.colors.gradients.primary;
    }
    return [theme.colors.primary, theme.colors.primary];
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <LinearGradient
      colors={getGradientColors()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        paddingTop: 40,
        paddingBottom: 16,
        paddingHorizontal: theme.spacing.m,
      }}
    >
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
        <View style={{ flex: 1 }}>
          <Text style={{
            ...theme.typography.body2,
            color: theme.colors.text.inverse,
            opacity: 0.9,
          }}>
            {getGreeting()}!
          </Text>
          <Text style={{
            ...theme.typography.h4,
            color: theme.colors.text.inverse,
            fontWeight: '700',
            marginTop: 2,
          }}>
            {shopData?.shopName || 'Modern Kirana Store'}
          </Text>
          <Text style={{
            ...theme.typography.caption,
            color: theme.colors.text.inverse,
            opacity: 0.8,
            marginTop: 2,
          }}>
            {getCurrentDate()}
          </Text>
        </View>
        
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 20,
            padding: 10,
            position: 'relative',
          }}
          onPress={onNotificationPress}
        >
          <Icon name="bell" size={20} color={theme.colors.text.inverse} />
          {unreadCount > 0 && (
            <View style={{
              position: 'absolute',
              top: 6,
              right: 6,
              minWidth: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: theme.colors.error,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 3,
            }}>
              <Text style={{
                ...theme.typography.caption,
                color: theme.colors.text.inverse,
                fontSize: 9,
                fontWeight: '600',
              }}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default DashboardHeader;
