import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import { useSeller } from '../../../context/SellerContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ShopSettingsScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { shopData, updateShopData } = useSeller();

  const [settings, setSettings] = useState({
    shopName: shopData?.shopName || 'Demo Shop',
    ownerName: shopData?.ownerName || 'Shop Owner',
    mobile: shopData?.mobile || '9876543210',
    email: shopData?.email || 'shop@example.com',
    address: shopData?.address || '123 Market Street, Mumbai',
    description: shopData?.description || 'Quality products at best prices',
    
    // Business Settings
    deliveryAvailable: true,
    homeDelivery: false,
    pickupAvailable: true,
    onlinePayments: true,
    cashOnDelivery: true,
    
    // Notification Settings
    orderNotifications: true,
    reviewNotifications: true,
    promotionalMessages: false,
    stockAlerts: true,
    
    // Privacy Settings
    showPhoneNumber: true,
    showEmail: false,
    allowReviews: true,
    autoReplyEnabled: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    updateShopData({
      ...shopData,
      ...settings,
    });
    setIsEditing(false);
    Alert.alert('Success', 'Shop settings updated successfully');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.navigate('SellerLogin'),
        },
      ]
    );
  };

  const settingSections = [
    {
      title: 'Shop Information',
      items: [
        { key: 'shopName', label: 'Shop Name', type: 'text', editable: true },
        { key: 'ownerName', label: 'Owner Name', type: 'text', editable: true },
        { key: 'mobile', label: 'Mobile Number', type: 'phone', editable: false },
        { key: 'email', label: 'Email', type: 'email', editable: true },
        { key: 'address', label: 'Address', type: 'textarea', editable: true },
        { key: 'description', label: 'Description', type: 'textarea', editable: true },
      ],
    },
    {
      title: 'Business Settings',
      items: [
        { key: 'deliveryAvailable', label: 'Delivery Service', type: 'switch' },
        { key: 'homeDelivery', label: 'Home Delivery', type: 'switch' },
        { key: 'pickupAvailable', label: 'Store Pickup', type: 'switch' },
        { key: 'onlinePayments', label: 'Online Payments', type: 'switch' },
        { key: 'cashOnDelivery', label: 'Cash on Delivery', type: 'switch' },
      ],
    },
    {
      title: 'Notifications',
      items: [
        { key: 'orderNotifications', label: 'Order Notifications', type: 'switch' },
        { key: 'reviewNotifications', label: 'Review Notifications', type: 'switch' },
        { key: 'promotionalMessages', label: 'Promotional Messages', type: 'switch' },
        { key: 'stockAlerts', label: 'Stock Alerts', type: 'switch' },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        { key: 'showPhoneNumber', label: 'Show Phone Number', type: 'switch' },
        { key: 'showEmail', label: 'Show Email Address', type: 'switch' },
        { key: 'allowReviews', label: 'Allow Customer Reviews', type: 'switch' },
        { key: 'autoReplyEnabled', label: 'Auto Reply Messages', type: 'switch' },
      ],
    },
  ];

  const renderSettingItem = (item) => {
    const value = settings[item.key];

    if (item.type === 'switch') {
      return (
        <View key={item.key} style={styles.settingItem}>
          <Text style={styles.settingLabel}>{item.label}</Text>
          <Switch
            value={value}
            onValueChange={(newValue) =>
              setSettings({ ...settings, [item.key]: newValue })
            }
            trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
          />
        </View>
      );
    }

    if (item.type === 'textarea') {
      return (
        <View key={item.key} style={styles.settingItem}>
          <Text style={styles.settingLabel}>{item.label}</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={value}
            onChangeText={(text) => setSettings({ ...settings, [item.key]: text })}
            editable={isEditing && item.editable !== false}
            multiline
            numberOfLines={3}
          />
        </View>
      );
    }

    return (
      <View key={item.key} style={styles.settingItem}>
        <Text style={styles.settingLabel}>{item.label}</Text>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={(text) => setSettings({ ...settings, [item.key]: text })}
          editable={isEditing && item.editable !== false}
          keyboardType={item.type === 'phone' ? 'phone-pad' : item.type === 'email' ? 'email-address' : 'default'}
        />
      </View>
    );
  };

  const styles = createStyles(theme);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop Settings</Text>
        <View style={styles.headerActions}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsEditing(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Icon name="pencil" size={20} color={theme.colors.primary} />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Shop Status Card */}
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <View style={styles.shopInfo}>
            <Text style={styles.shopName}>{settings.shopName}</Text>
            <View style={styles.verificationStatus}>
              <Icon
                name={shopData?.verified ? 'check-circle' : 'clock'}
                size={16}
                color={shopData?.verified ? theme.colors.success : theme.colors.warning}
              />
              <Text
                style={[
                  styles.verificationText,
                  { color: shopData?.verified ? theme.colors.success : theme.colors.warning },
                ]}
              >
                {shopData?.verified ? 'Verified' : 'Pending Verification'}
              </Text>
            </View>
          </View>
          <View style={styles.shopStats}>
            <Text style={styles.statValue}>4.3</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>

      {/* Settings Sections */}
      {settingSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map(renderSettingItem)}
          </View>
        </View>
      ))}

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Reviews')}
          >
            <Icon name="star" size={24} color={theme.colors.warning} />
            <Text style={styles.actionText}>Manage Reviews</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Analytics')}
          >
            <Icon name="chart-line" size={24} color={theme.colors.info} />
            <Text style={styles.actionText}>View Analytics</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => Alert.alert('Coming Soon', 'Backup feature will be available soon!')}
          >
            <Icon name="backup-restore" size={24} color={theme.colors.success} />
            <Text style={styles.actionText}>Backup Data</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => Alert.alert('Coming Soon', 'Help center will be available soon!')}
          >
            <Icon name="help-circle" size={24} color={theme.colors.primary} />
            <Text style={styles.actionText}>Help & Support</Text>
            <Icon name="chevron-right" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Danger Zone */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.dangerZone}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={24} color={theme.colors.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() =>
              Alert.alert(
                'Delete Account',
                'This action cannot be undone. Are you sure?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', style: 'destructive' },
                ]
              )
            }
          >
            <Icon name="delete" size={24} color={theme.colors.error} />
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    editButtonText: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: '500',
      marginLeft: 4,
    },
    cancelButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginRight: 8,
    },
    cancelButtonText: {
      color: theme.colors.text.secondary,
      fontSize: 16,
    },
    saveButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: theme.borderRadius.s,
    },
    saveButtonText: {
      color: theme.colors.text.inverse,
      fontSize: 16,
      fontWeight: '500',
    },
    statusCard: {
      backgroundColor: theme.colors.surface,
      marginHorizontal: 20,
      borderRadius: theme.borderRadius.m,
      padding: 16,
      marginBottom: 20,
    },
    statusHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    shopInfo: {
      flex: 1,
    },
    shopName: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text.primary,
      marginBottom: 4,
    },
    verificationStatus: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    verificationText: {
      fontSize: 14,
      fontWeight: '500',
      marginLeft: 4,
    },
    shopStats: {
      alignItems: 'center',
    },
    statValue: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.colors.primary,
    },
    statLabel: {
      fontSize: 12,
      color: theme.colors.text.secondary,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text.primary,
      paddingHorizontal: 20,
      marginBottom: 12,
    },
    sectionContent: {
      backgroundColor: theme.colors.surface,
      marginHorizontal: 20,
      borderRadius: theme.borderRadius.m,
      padding: 16,
    },
    settingItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    settingLabel: {
      fontSize: 16,
      color: theme.colors.text.primary,
      flex: 1,
    },
    textInput: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text.primary,
      textAlign: 'right',
      paddingVertical: 4,
    },
    textArea: {
      textAlign: 'left',
      marginTop: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.s,
      padding: 8,
    },
    quickActions: {
      backgroundColor: theme.colors.surface,
      marginHorizontal: 20,
      borderRadius: theme.borderRadius.m,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    actionText: {
      fontSize: 16,
      color: theme.colors.text.primary,
      flex: 1,
      marginLeft: 12,
    },
    dangerZone: {
      backgroundColor: theme.colors.surface,
      marginHorizontal: 20,
      borderRadius: theme.borderRadius.m,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    logoutText: {
      fontSize: 16,
      color: theme.colors.error,
      marginLeft: 12,
    },
    deleteButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    deleteText: {
      fontSize: 16,
      color: theme.colors.error,
      marginLeft: 12,
    },
  });

export default ShopSettingsScreen;
