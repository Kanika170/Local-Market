import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSeller } from '../../../context/SellerContext';
import { useTheme } from '../../../theme/useTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';

const ShopNotificationScreen = () => {
  const navigation = useNavigation();
  const { notifications } = useSeller();
  const { theme } = useTheme();
  const styles = createSellerStyles(theme);

  // Filter shop-related notifications (e.g., type 'shop_post', 'order', 'stock', etc.)
  const shopNotifications = notifications.filter(
    (notif) => ['shop_post', 'order', 'stock'].includes(notif.type)
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.m,
        marginBottom: theme.spacing.s,
        borderWidth: 1,
        borderColor: theme.colors.border,
      }}
      onPress={() => navigation.navigate('ShopNotificationPreviewScreen', { notification: item })}
    >
      <Text style={{
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.primary,
        marginBottom: 4,
      }}>{item.title}</Text>
      <Text style={{
        fontSize: 14,
        color: theme.colors.text.primary,
        marginBottom: 6,
      }}>{item.content}</Text>
      <Text style={{
        fontSize: 12,
        color: theme.colors.text.secondary,
        textAlign: 'right',
      }}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 24,
        fontWeight: '700',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.m,
      }}>Shop Notifications</Text>
      {shopNotifications.length === 0 ? (
        <Text style={{
          fontSize: 16,
          color: theme.colors.text.secondary,
          textAlign: 'center',
          marginTop: theme.spacing.l,
        }}>No shop notifications available.</Text>
      ) : (
        <FlatList
          data={shopNotifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: theme.spacing.l,
          }}
        />
      )}
    </View>
  );
};

export default ShopNotificationScreen;
