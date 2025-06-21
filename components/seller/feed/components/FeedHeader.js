import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../../../theme/useTheme';

const FeedHeader = ({ 
  title = "Market Feed",
  subtitle = "Your Window to the Local Market",
  onNotificationPress,
  notificationCount = 0
}) => {
  const { theme } = useTheme();

  const getGradientColors = () => {
    if (theme.colors.gradients && theme.colors.gradients.primary) {
      return theme.colors.gradients.primary;
    }
    return [theme.colors.primary, theme.colors.primary];
  };

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
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 4,
          }}>
            <Text style={{
              fontSize: 20,
              marginRight: 8,
            }}>
              🏪
            </Text>
            <Text style={{
              ...theme.typography.body2,
              color: theme.colors.text.inverse,
              fontWeight: '600',
            }}>
              Local Market
            </Text>
          </View>
          
          <Text style={{
            ...theme.typography.h4,
            color: theme.colors.text.inverse,
            fontWeight: '700',
            marginBottom: 2,
          }}>
            {title}
          </Text>
          
          <Text style={{
            ...theme.typography.caption,
            color: theme.colors.text.inverse,
            opacity: 0.8,
          }}>
            {subtitle}
          </Text>
        </View>
        
        {onNotificationPress && (
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
            {notificationCount > 0 && (
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
                  {notificationCount > 9 ? '9+' : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

export default FeedHeader;
