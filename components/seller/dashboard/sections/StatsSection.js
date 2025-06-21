import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import StatCard from '../components/StatCard';

const StatsSection = ({ statsData, onStatPress }) => {
  const { theme } = useTheme();

  const stats = [
    {
      id: 'visits',
      title: "Today's Visits",
      value: statsData.todayVisits,
      icon: 'eye',
      change: statsData.visitsChange,
      type: 'primary',
      subtitle: 'unique customers',
      onPress: () => onStatPress('visits'),
    },
    {
      id: 'inquiries',
      title: 'New Inquiries',
      value: statsData.newInquiries,
      icon: 'message-text',
      change: statsData.inquiriesChange,
      type: 'secondary',
      subtitle: 'chat threads',
      onPress: () => onStatPress('inquiries'),
    },
    {
      id: 'popular',
      title: 'Most Popular Today',
      value: statsData.topProduct?.name || 'No data',
      icon: 'star',
      type: 'warning',
      subtitle: `${statsData.topProduct?.views || 0} views`,
      onPress: () => onStatPress('popular'),
      isProduct: true,
    },
    {
      id: 'pending',
      title: 'Needs Attention',
      value: statsData.pendingActions,
      icon: 'alert-circle',
      change: statsData.pendingChange,
      type: 'error',
      subtitle: 'pending items',
      onPress: () => onStatPress('pending'),
    },
  ];

  return (
    <View style={{ paddingHorizontal: theme.spacing.m }}>
      <Text style={{
        ...theme.typography.h4,
        color: theme.colors.text.primary,
        fontWeight: '600',
        marginBottom: theme.spacing.m,
        marginTop: theme.spacing.s,
      }}>
        Today's Performance
      </Text>
      
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -theme.spacing.xs,
      }}>
        {stats.map((stat, index) => (
          <View 
            key={stat.id} 
            style={{ 
              width: '50%', 
              paddingHorizontal: theme.spacing.xs,
              marginBottom: theme.spacing.s,
            }}
          >
            <StatCard {...stat} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default StatsSection;
