import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import ActivityItem from '../components/ActivityItem';

const RecentActivitySection = ({ activities, onActivityPress }) => {
  const { theme } = useTheme();

  return (
    <View style={{ 
      paddingHorizontal: theme.spacing.m,
      marginTop: theme.spacing.l,
      marginBottom: theme.spacing.l,
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.m,
      }}>
        <Text style={{
          ...theme.typography.h4,
          color: theme.colors.text.primary,
          fontWeight: '600',
        }}>
          Recent Activity
        </Text>
        
        <TouchableOpacity onPress={() => onActivityPress('viewAll')}>
          <Text style={{
            ...theme.typography.button,
            color: theme.colors.primary,
          }}>
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.m,
        ...theme.shadows.small,
      }}>
        {activities.length === 0 ? (
          <View style={{
            padding: theme.spacing.m,
            alignItems: 'center',
          }}>
            <Text style={{
              ...theme.typography.body2,
              color: theme.colors.text.secondary,
              textAlign: 'center',
            }}>
              No recent activity
            </Text>
          </View>
        ) : (
          <ScrollView
            style={{ maxHeight: 300 }}
            showsVerticalScrollIndicator={false}
          >
            {activities.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                onPress={() => onActivityPress(activity)}
                isLast={index === activities.length - 1}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default RecentActivitySection;
