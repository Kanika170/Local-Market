import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../theme/useTheme';
import HomeIcon from './icons/HomeIcon';
import SearchIcon from './icons/SearchIcon';
import ShoppingBagIcon from './icons/ShoppingBagIcon';
import ProfileIcon from './icons/ProfileIcon';

const BottomNavigationBar = ({ navigation, activeTab }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[
      styles.container,
      { paddingBottom: Platform.OS === 'ios' ? 34 : 10 }
    ]}>
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

const createStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.s,
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
