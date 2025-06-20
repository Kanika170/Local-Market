import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/useTheme';
import HomeIcon from './icons/HomeIcon';
import SearchIcon from './icons/SearchIcon';
import ShoppingBagIcon from './icons/ShoppingBagIcon';
import ProfileIcon from './icons/ProfileIcon';

const BottomNavigationBar = ({ navigation, activeTab, translateY = new Animated.Value(1) }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  // Calculate the transform value based on translateY
  const transform = [{
    translateY: translateY.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0], // Move down by container height when hidden
    }),
  }];

  return (
    <Animated.View style={[styles.container, { transform }]}>
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
    </Animated.View>
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    minHeight: Platform.OS === 'ios' ? 83 : 65,
    // Add backdrop blur effect
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255,255,255,0.95)' : theme.colors.background,
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
