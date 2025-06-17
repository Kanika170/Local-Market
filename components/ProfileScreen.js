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
import BottomNavigationBar from './BottomNavigationBar';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [showSettings, setShowSettings] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [darkMode, setDarkMode] = useState(false);
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
      <View style={styles.settingsSection}>
        <View style={styles.settingHeader}>
          <Text style={styles.settingIcon}>🎨</Text>
          <Text style={styles.settingTitle}>Theme</Text>
        </View>
        <View style={styles.themeGrid}>
          {['Purple', 'Blue', 'Green'].map(theme => (
            <View key={theme} style={styles.themeItem}>
              <View style={[
                styles.themeColor,
                { backgroundColor: theme === 'Purple' ? '#9C27B0' : 
                                 theme === 'Blue' ? '#2196F3' : '#4CAF50' }
              ]} />
              <Text style={styles.themeText}>{theme}</Text>
            </View>
          ))}
        </View>
        <View style={styles.darkModeOption}>
          <Text style={styles.darkModeText}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#E0E0E0', true: '#9C27B0' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#9C27B0',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginLeft: 8,
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileSection: {
    paddingBottom: Platform.OS === 'ios' ? 90 : 65,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 16,
    color: '#666666',
  },
  infoSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F9F9F9',
  },
  dropdownArrow: {
    color: '#666666',
    fontSize: 12,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  listName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },
  listDetails: {
    fontSize: 14,
    color: '#666666',
  },
  chevron: {
    fontSize: 20,
    color: '#9C27B0',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 4,
  },
  productStatus: {
    fontSize: 14,
    color: '#666666',
  },
  menuSection: {
    padding: 20,
  },
  menuItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
  logoutText: {
    color: '#FF4444',
  },
  settingsHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    fontSize: 16,
    color: '#9C27B0',
    marginBottom: 16,
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  settingsSubtitle: {
    fontSize: 16,
    color: '#666666',
  },
  settingsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9C27B0',
    marginRight: 12,
  },
  radioSelected: {
    backgroundColor: '#9C27B0',
  },
  languageText: {
    fontSize: 16,
    color: '#333333',
  },
  themeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  themeItem: {
    alignItems: 'center',
  },
  themeColor: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  themeText: {
    fontSize: 14,
    color: '#666666',
  },
  darkModeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  darkModeText: {
    fontSize: 16,
    color: '#333333',
  },
  notificationOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  notificationText: {
    fontSize: 16,
    color: '#333333',
  },
  appInfo: {
    padding: 20,
    alignItems: 'center',
  },
  appVersion: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    color: '#999999',
  },
});

export default ProfileScreen;
