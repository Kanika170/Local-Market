import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/useTheme';
import HomeIcon from './icons/HomeIcon';
import SearchIcon from './icons/SearchIcon';
import ShoppingBagIcon from './icons/ShoppingBagIcon';
import ProfileIcon from './icons/ProfileIcon';

const BottomNavigationBar = ({ navigation, activeTab }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('CustomerHomeFeed')}
      >
        <HomeIcon 
          size={24} 
          color={activeTab === 'Home' ? theme.colors.primary : theme.colors.text.secondary} 
        />
        <Text style={[
          styles.navText,
          activeTab === 'Home' && styles.activeText
        ]}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('SmartProductSearch')}
      >
        <SearchIcon 
          size={24} 
          color={activeTab === 'Search' ? theme.colors.primary : theme.colors.text.secondary} 
        />
        <Text style={[
          styles.navText,
          activeTab === 'Search' && styles.activeText
        ]}>Search</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Lists')}
      >
        <ShoppingBagIcon 
          size={24} 
          color={activeTab === 'Lists' ? theme.colors.primary : theme.colors.text.secondary} 
        />
        <Text style={[
          styles.navText,
          activeTab === 'Lists' && styles.activeText
        ]}>Lists</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <ProfileIcon 
          size={24} 
          color={activeTab === 'Profile' ? theme.colors.primary : theme.colors.text.secondary} 
        />
        <Text style={[
          styles.navText,
          activeTab === 'Profile' && styles.activeText
        ]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme, insets) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.s,
    paddingHorizontal: Math.max(insets.left, theme.spacing.xs),
    paddingBottom: Math.max(insets.bottom, Platform.OS === 'ios' ? 34 : 20),
    paddingRight: Math.max(insets.right, theme.spacing.xs),
    elevation: 8,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Ensure the navigation bar is always above other content
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    // Ensure minimum height for proper touch targets
    minHeight: Platform.OS === 'ios' ? 83 : 65,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  activeText: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
});

export default BottomNavigationBar;
