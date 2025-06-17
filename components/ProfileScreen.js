import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Switch,
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/useTheme';
import BottomNavigationBar from './BottomNavigationBar';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { theme, currentTheme, isDarkMode, changeTheme, toggleDarkMode, availableThemes } = useTheme();
  const styles = createStyles(theme);
  
  const [showSettings, setShowSettings] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    newDeals: true,
    shopMessages: true,
    priceAlerts: true
  });

  // Static user data
  const userData = {
    name: 'Sarah Johnson',
    memberSince: '2021',
    city: 'San Francisco',
    language: 'English'
  };

  // Static lists data
  const userLists = [
    { id: 1, name: 'Weekly Groceries', items: 12, lastUpdated: '2 days ago' },
    { id: 2, name: 'Party Supplies', items: 8, lastUpdated: '1 week ago' },
    { id: 3, name: 'Home Essentials', items: 15, lastUpdated: '3 days ago' }
  ];

  // Static tracked products
  const trackedProducts = [
    { id: 1, name: 'Organic Almond Milk', status: 'Price dropped by 15%' },
    { id: 2, name: 'Wireless Headphones', status: 'Back in stock' },
    { id: 3, name: 'Insulated Water Bottle', status: 'New colors available' }
  ];

  const renderProfile = () => (
    <ScrollView style={styles.content}>
      {/* Profile Header */}
      <View style={styles.profileSection}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar} />
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.memberSince}>Member since {userData.memberSince}</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput 
              style={styles.input}
              value={userData.name}
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>City</Text>
            <TextInput 
              style={styles.input}
              value={userData.city}
              editable={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Language</Text>
            <TouchableOpacity 
              style={styles.input}
              onPress={() => setShowSettings(true)}
            >
              <Text>{userData.language}</Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* My Lists */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Lists</Text>
          {userLists.map(list => (
            <TouchableOpacity key={list.id} style={styles.listItem}>
              <View>
                <Text style={styles.listName}>{list.name}</Text>
                <Text style={styles.listDetails}>
                  {list.items} items • Updated {list.lastUpdated}
                </Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tracked Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tracked Products</Text>
          {trackedProducts.map(product => (
            <TouchableOpacity key={product.id} style={styles.productItem}>
              <View>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productStatus}>{product.status}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => setShowSettings(true)}
          >
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Recent Purchases</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const renderSettings = () => (
    <ScrollView style={styles.content}>
      <View style={styles.settingsHeader}>
        <TouchableOpacity onPress={() => setShowSettings(false)}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.settingsTitle}>Settings</Text>
        <Text style={styles.settingsSubtitle}>Customize your app experience</Text>
      </View>

      {/* Language Settings */}
      <View style={styles.settingsSection}>
        <View style={styles.settingHeader}>
          <Text style={styles.settingIcon}>🌐</Text>
          <Text style={styles.settingTitle}>Language</Text>
        </View>
        {['English', 'Español', 'Français', 'Deutsch'].map(language => (
          <TouchableOpacity 
            key={language}
            style={styles.languageOption}
            onPress={() => setSelectedLanguage(language)}
          >
            <View style={[
              styles.radioButton,
              selectedLanguage === language && styles.radioSelected
            ]} />
            <Text style={styles.languageText}>{language}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Theme Settings */}
      <TouchableOpacity 
        style={styles.settingsSection}
        onPress={() => navigation.navigate('ThemeSettings')}
      >
        <View style={styles.settingHeader}>
          <Text style={styles.settingIcon}>🎨</Text>
          <View style={styles.settingTitleContainer}>
            <Text style={styles.settingTitle}>Theme Settings</Text>
            <Text style={styles.settingSubtitle}>
              {isDarkMode ? 'Dark Mode' : 'Light Mode'} • {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} Theme
            </Text>
          </View>
          <Text style={styles.chevronRight}>›</Text>
        </View>
      </TouchableOpacity>

      {/* Notification Settings */}
      <View style={styles.settingsSection}>
        <View style={styles.settingHeader}>
          <Text style={styles.settingIcon}>🔔</Text>
          <Text style={styles.settingTitle}>Notifications</Text>
        </View>
        {Object.entries(notifications).map(([key, value]) => (
          <View key={key} style={styles.notificationOption}>
            <Text style={styles.notificationText}>
              {key === 'pushNotifications' ? 'Push Notifications' :
               key === 'newDeals' ? 'New Deals' :
               key === 'shopMessages' ? 'Shop Messages' : 'Price Alerts'}
            </Text>
            <Switch
              value={value}
              onValueChange={(newValue) => 
                setNotifications(prev => ({ ...prev, [key]: newValue }))
              }
              trackColor={{ false: '#E0E0E0', true: '#9C27B0' }}
              thumbColor="#FFFFFF"
            />
          </View>
        ))}
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.appVersion}>Shopping Companion App v2.4.1</Text>
        <Text style={styles.copyright}>© 2023 Shopping Companion Inc.</Text>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Shopping Companion</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>tto</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showSettings ? renderSettings() : renderProfile()}
      
      <BottomNavigationBar navigation={navigation} activeTab="Profile" />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: theme.colors.text.inverse,
    ...theme.typography.h3,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.m,
    marginLeft: theme.spacing.s,
  },
  headerButtonText: {
    color: theme.colors.text.inverse,
    ...theme.typography.caption,
  },
  content: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  profileSection: {
    paddingBottom: Platform.OS === 'ios' ? 90 : 65,
  },
  profileHeader: {
    alignItems: 'center',
    padding: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.disabled,
    marginBottom: theme.spacing.m,
  },
  userName: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  memberSince: {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
  },
  infoSection: {
    padding: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.m,
  },
  inputGroup: {
    marginBottom: theme.spacing.m,
  },
  label: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.s,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.components.input.borderColor,
    borderRadius: theme.borderRadius.m,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.m,
    backgroundColor: theme.components.input.backgroundColor,
  },
  dropdownArrow: {
    color: theme.colors.text.secondary,
    fontSize: 12,
  },
  section: {
    padding: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  listName: {
    ...theme.typography.body1,
    fontWeight: '500',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  listDetails: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  chevron: {
    fontSize: 20,
    color: theme.colors.primary,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  productName: {
    ...theme.typography.body1,
    fontWeight: '500',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  productStatus: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  menuSection: {
    padding: theme.spacing.l,
  },
  menuItem: {
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
  },
  menuText: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
  logoutText: {
    color: theme.colors.error,
  },
  settingsHeader: {
    padding: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    ...theme.typography.body1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.m,
  },
  settingsTitle: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.s,
  },
  settingsSubtitle: {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
  },
  settingsSection: {
    padding: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: theme.spacing.m,
  },
  settingTitleContainer: {
    flex: 1,
  },
  settingTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  settingSubtitle: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  chevronRight: {
    fontSize: 24,
    color: theme.colors.text.secondary,
    marginLeft: theme.spacing.m,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.m,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    marginRight: theme.spacing.m,
  },
  radioSelected: {
    backgroundColor: theme.colors.primary,
  },
  languageText: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
  },
  themeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.l,
  },
  themeItem: {
    alignItems: 'center',
  },
  themeColor: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.s,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTheme: {
    borderColor: theme.colors.text.primary,
    borderWidth: 3,
  },
  themeText: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  selectedThemeText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  darkModeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.l,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  darkModeText: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
  },
  notificationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.m,
  },
  notificationText: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
  },
  appInfo: {
    padding: theme.spacing.l,
    alignItems: 'center',
  },
  appVersion: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  copyright: {
    ...theme.typography.caption,
    color: theme.colors.text.tertiary,
  },
});

export default ProfileScreen;
