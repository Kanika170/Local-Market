import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { sellerTheme } from '../../../theme/sellerTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';

const ShopNotificationPreviewScreen = ({ route }) => {
  const { notification } = route.params;
  const styles = createSellerStyles(sellerTheme);

  if (!notification) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No notification data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{notification.title}</Text>
      <Text style={styles.time}>{notification.time}</Text>
      <Text style={styles.content}>{notification.content}</Text>
      {/* Add more detailed fields if available */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: sellerTheme.colors.background,
    padding: sellerTheme.spacing.m,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: sellerTheme.colors.primary,
    marginBottom: sellerTheme.spacing.s,
  },
  time: {
    fontSize: 14,
    color: sellerTheme.colors.text.secondary,
    marginBottom: sellerTheme.spacing.m,
  },
  content: {
    fontSize: 16,
    color: sellerTheme.colors.text.primary,
    lineHeight: 22,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: sellerTheme.spacing.l,
  },
});

export default ShopNotificationPreviewScreen;
