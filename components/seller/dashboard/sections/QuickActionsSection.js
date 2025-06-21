import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../../theme/useTheme';
import ActionButton from '../components/ActionButton';

const QuickActionsSection = ({ onActionPress }) => {
  const { theme } = useTheme();

  const actions = [
    {
      id: 'add_product',
      title: 'Add Product',
      icon: 'plus-circle',
      color: theme.colors.primary,
      description: 'Add new items to your inventory',
    },
    {
      id: 'create_post',
      title: 'Create Post',
      icon: 'post',
      color: theme.colors.secondary,
      description: 'Share updates with customers',
    },
    {
      id: 'messages',
      title: 'Messages',
      icon: 'message-text',
      color: theme.colors.warning,
      description: 'Respond to customer inquiries',
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: 'chart-bar',
      color: theme.colors.info,
      description: 'View detailed performance',
    },
  ];

  return (
    <View style={{ 
      paddingHorizontal: theme.spacing.m,
      marginTop: theme.spacing.l,
    }}>
      <Text style={{
        ...theme.typography.h4,
        color: theme.colors.text.primary,
        fontWeight: '600',
        marginBottom: theme.spacing.m,
      }}>
        Quick Actions
      </Text>

      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -theme.spacing.xs,
      }}>
        {actions.map((action) => (
          <View
            key={action.id}
            style={{
              width: '50%',
              paddingHorizontal: theme.spacing.xs,
              marginBottom: theme.spacing.m,
            }}
          >
            <ActionButton
              title={action.title}
              icon={action.icon}
              color={action.color}
              description={action.description}
              onPress={() => onActionPress(action.id)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default QuickActionsSection;
