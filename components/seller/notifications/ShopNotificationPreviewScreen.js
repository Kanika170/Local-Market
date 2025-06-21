import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';

const ShopNotificationPreviewScreen = ({ route }) => {
  const { notification } = route.params;
  const { theme } = useTheme();
  const styles = createSellerStyles(theme);

  if (!notification) {
    return (
      <View style={styles.container}>
        <Text style={{
          fontSize: 16,
          color: theme.colors.error,
          textAlign: 'center',
          marginTop: theme.spacing.l,
        }}>No notification data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={{
        fontSize: 24,
        fontWeight: '700',
        color: theme.colors.primary,
        marginBottom: theme.spacing.s,
      }}>{notification.title}</Text>
      <Text style={{
        fontSize: 14,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.m,
      }}>{notification.time}</Text>
      <Text style={{
        fontSize: 16,
        color: theme.colors.text.primary,
        lineHeight: 22,
      }}>{notification.content}</Text>
      {/* Add more detailed fields if available */}
    </ScrollView>
  );
};

export default ShopNotificationPreviewScreen;
