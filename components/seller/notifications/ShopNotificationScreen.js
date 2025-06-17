import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSeller } from '../../../context/SellerContext';
import { sellerTheme } from '../../../theme/sellerTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';

const ShopNotificationScreen = () => {
  const { notifications } = useSeller();
  const styles = createSellerStyles(sellerTheme);

  // Filter shop-related notifications (e.g., type 'shop_post', 'order', 'stock', etc.)
  const shopNotifications = notifications.filter(
    (notif) => ['shop_post', 'order', 'stock'].includes(notif.type)
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationCard}
      onPress={() => navigation.navigate('ShopNotificationPreviewScreen', { notification: item })}
    >
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationContent}>{item.content}</Text>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Shop Notifications</Text>
      {shopNotifications.length === 0 ? (
        <Text style={styles.noNotifications}>No shop notifications available.</Text>
      ) : (
        <FlatList
          data={shopNotifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: sellerTheme.colors.background,
    padding: sellerTheme.spacing.m,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: sellerTheme.colors.text.primary,
    marginBottom: sellerTheme.spacing.m,
  },
  noNotifications: {
    fontSize: 16,
    color: sellerTheme.colors.text.secondary,
    textAlign: 'center',
    marginTop: sellerTheme.spacing.l,
  },
  listContainer: {
    paddingBottom: sellerTheme.spacing.l,
  },
  notificationCard: {
    backgroundColor: sellerTheme.colors.surface,
    borderRadius: sellerTheme.borderRadius.m,
    padding: sellerTheme.spacing.m,
    marginBottom: sellerTheme.spacing.s,
    borderWidth: 1,
    borderColor: sellerTheme.colors.border,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: sellerTheme.colors.primary,
    marginBottom: 4,
  },
  notificationContent: {
    fontSize: 14,
    color: sellerTheme.colors.text.primary,
    marginBottom: 6,
  },
  notificationTime: {
    fontSize: 12,
    color: sellerTheme.colors.text.secondary,
    textAlign: 'right',
  },
});

export default ShopNotificationScreen;
