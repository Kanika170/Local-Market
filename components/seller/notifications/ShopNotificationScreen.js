import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSeller } from '../../../context/SellerContext';
import { useTheme } from '../../../theme/useTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';

const ShopNotificationScreen = () => {
  const navigation = useNavigation();
  const { notifications, refreshNotifications } = useSeller();
  const { theme } = useTheme();
  const styles = createSellerStyles(theme);
  const [refreshing, setRefreshing] = useState(false);

  // Filter shop-related notifications (e.g., type 'shop_post', 'order', 'stock', etc.)
  const shopNotifications = notifications.filter(
    (notif) => ['shop_post', 'order', 'stock'].includes(notif.type)
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshNotifications && refreshNotifications();
    setTimeout(() => setRefreshing(false), 1000);
  }, [refreshNotifications]);

  const getIconName = (type) => {
    switch (type) {
      case 'shop_post':
        return 'post-outline';
      case 'order':
        return 'clipboard-list-outline';
      case 'stock':
        return 'warehouse';
      default:
        return 'bell-outline';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.m,
        padding: theme.spacing.m,
        marginBottom: theme.spacing.s,
        borderWidth: 1,
        borderColor: theme.colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => navigation.navigate('ShopNotificationPreviewScreen', { notification: item })}
    >
      <Icon
        name={getIconName(item.type)}
        size={24}
        color={theme.colors.primary}
        style={{ marginRight: theme.spacing.m }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '700',
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
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: theme.spacing.m,
        paddingHorizontal: theme.spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: theme.spacing.m }}>
          <Icon name="arrow-left" size={28} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={{
          fontSize: 24,
          fontWeight: '700',
          color: theme.colors.text.primary,
        }}>Shop Notifications</Text>
      </View>
      {shopNotifications.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: theme.spacing.l }}>
          <Icon name="bell-off-outline" size={64} color={theme.colors.text.secondary} />
          <Text style={{
            fontSize: 16,
            color: theme.colors.text.secondary,
            textAlign: 'center',
            marginTop: theme.spacing.m,
          }}>No shop notifications available.</Text>
        </View>
      ) : (
        <FlatList
          data={shopNotifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: theme.spacing.l,
            paddingHorizontal: theme.spacing.m,
            paddingTop: theme.spacing.m,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.colors.primary]} />
          }
        />
      )}
    </View>
  );
};

export default ShopNotificationScreen;
