import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../theme/useTheme';

const StatusToggle = ({ isOpen, onToggle }) => {
  const { theme } = useTheme();
  const [animatedValue] = React.useState(new Animated.Value(isOpen ? 1 : 0));

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const toggleBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.3)', 'rgba(76, 175, 80, 0.9)'],
  });

  const toggleTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 32],
  });

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      borderRadius: 12,
      padding: theme.spacing.m,
    }}>
      <View style={{ flex: 1 }}>
        <Text style={{
          ...theme.typography.body1,
          color: theme.colors.text.inverse,
          fontWeight: '600',
        }}>
          Shop Status
        </Text>
        <Text style={{
          ...theme.typography.body2,
          color: theme.colors.text.inverse,
          opacity: 0.8,
          marginTop: 2,
        }}>
          {isOpen ? 'Currently Open' : 'Currently Closed'}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.8}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={{
            width: 60,
            height: 32,
            borderRadius: 16,
            backgroundColor: toggleBackgroundColor,
            justifyContent: 'center',
            marginRight: theme.spacing.s,
          }}
        >
          <Animated.View
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              backgroundColor: theme.colors.text.inverse,
              transform: [{ translateX: toggleTranslateX }],
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <Icon
              name={isOpen ? 'check' : 'close'}
              size={16}
              color={isOpen ? theme.colors.success : theme.colors.error}
            />
          </Animated.View>
        </Animated.View>

        <Text style={{
          ...theme.typography.body2,
          color: theme.colors.text.inverse,
          fontWeight: '600',
        }}>
          {isOpen ? 'OPEN' : 'CLOSED'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StatusToggle;
