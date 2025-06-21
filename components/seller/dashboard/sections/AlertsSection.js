import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../theme/useTheme';

const AlertsSection = ({ alerts, onAlertPress }) => {
  const { theme } = useTheme();

  const getAlertStyle = (type) => {
    const styles = {
      critical: {
        backgroundColor: `${theme.colors.error}15`,
        borderColor: theme.colors.error,
        iconColor: theme.colors.error,
      },
      warning: {
        backgroundColor: `${theme.colors.warning}15`,
        borderColor: theme.colors.warning,
        iconColor: theme.colors.warning,
      },
      info: {
        backgroundColor: `${theme.colors.info}15`,
        borderColor: theme.colors.info,
        iconColor: theme.colors.info,
      },
      success: {
        backgroundColor: `${theme.colors.success}15`,
        borderColor: theme.colors.success,
        iconColor: theme.colors.success,
      },
    };
    return styles[type] || styles.info;
  };

  const getAlertIcon = (type) => {
    const icons = {
      critical: 'alert-circle',
      warning: 'alert',
      info: 'lightbulb',
      success: 'check-circle',
      low_stock: 'package-variant',
      performance: 'trending-up',
    };
    return icons[type] || 'information';
  };

  if (!alerts || alerts.length === 0) {
    return null;
  }

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
        Alerts & Insights
      </Text>

      {alerts.map((alert, index) => {
        const alertStyle = getAlertStyle(alert.type);
        
        return (
          <TouchableOpacity
            key={alert.id}
            onPress={() => onAlertPress(alert)}
            activeOpacity={0.8}
            style={{
              backgroundColor: alertStyle.backgroundColor,
              borderLeftWidth: 4,
              borderLeftColor: alertStyle.borderColor,
              borderRadius: theme.borderRadius.m,
              padding: theme.spacing.m,
              marginBottom: theme.spacing.m,
              ...theme.shadows.small,
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}>
              <Icon
                name={getAlertIcon(alert.subType || alert.type)}
                size={24}
                color={alertStyle.iconColor}
                style={{ marginRight: theme.spacing.m, marginTop: 2 }}
              />
              
              <View style={{ flex: 1 }}>
                <Text style={{
                  ...theme.typography.body1,
                  color: theme.colors.text.primary,
                  fontWeight: '600',
                  marginBottom: 4,
                }}>
                  {alert.title}
                </Text>
                
                <Text style={{
                  ...theme.typography.body2,
                  color: theme.colors.text.primary,
                  lineHeight: 20,
                  marginBottom: alert.actionText ? theme.spacing.s : 0,
                }}>
                  {alert.message}
                </Text>
                
                {alert.examples && alert.examples.length > 0 && (
                  <View style={{ marginTop: theme.spacing.xs }}>
                    {alert.examples.map((example, idx) => (
                      <Text
                        key={idx}
                        style={{
                          ...theme.typography.body2,
                          color: theme.colors.text.secondary,
                          fontStyle: 'italic',
                        }}
                      >
                        • {example}
                      </Text>
                    ))}
                  </View>
                )}
                
                {alert.actionText && (
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: theme.spacing.s,
                  }}>
                    <Text style={{
                      ...theme.typography.button,
                      color: alertStyle.iconColor,
                      fontWeight: '600',
                    }}>
                      {alert.actionText}
                    </Text>
                    <Icon
                      name="chevron-right"
                      size={16}
                      color={alertStyle.iconColor}
                      style={{ marginLeft: 4 }}
                    />
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AlertsSection;
