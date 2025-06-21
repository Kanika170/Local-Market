import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../theme/useTheme';

const ActivityItem = ({ activity, onPress, isLast = false }) => {
  const { theme } = useTheme();

  const getActivityIcon = (type) => {
    const icons = {
      review: 'star',
      message: 'message-text',
      like: 'heart',
      order: 'shopping',
      quote: 'file-document',
      product_view: 'eye',
      follow: 'account-plus',
    };
    return icons[type] || 'information';
  };

  const getActivityColor = (type) => {
    const colors = {
      review: theme.colors.warning,
      message: theme.colors.primary,
      like: theme.colors.error,
      order: theme.colors.success,
      quote: theme.colors.info,
      product_view: theme.colors.secondary,
      follow: theme.colors.primary,
    };
    return colors[type] || theme.colors.text.secondary;
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.m,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: theme.colors.divider,
      }}
    >
      {/* Activity Icon */}
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: `${getActivityColor(activity.type)}15`,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.m,
      }}>
        <Icon
          name={getActivityIcon(activity.type)}
          size={20}
          color={getActivityColor(activity.type)}
        />
      </View>

      {/* Activity Content */}
      <View style={{ flex: 1 }}>
        <Text style={{
          ...theme.typography.body1,
          color: theme.colors.text.primary,
          lineHeight: 20,
        }}>
          {activity.message}
        </Text>
        
        {activity.subtitle && (
          <Text style={{
            ...theme.typography.body2,
            color: theme.colors.text.secondary,
            marginTop: 2,
          }}>
            {activity.subtitle}
          </Text>
        )}
      </View>

      {/* Time and Arrow */}
      <View style={{
        alignItems: 'flex-end',
        marginLeft: theme.spacing.s,
      }}>
        <Text style={{
          ...theme.typography.caption,
          color: theme.colors.text.secondary,
          marginBottom: 4,
        }}>
          {formatTimeAgo(activity.timestamp)}
        </Text>
        
        <Icon
          name="chevron-right"
          size={16}
          color={theme.colors.text.secondary}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ActivityItem;
