import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/useTheme';
import HomeIcon from './icons/HomeIcon';
import SearchIcon from './icons/SearchIcon';
import ShoppingBagIcon from './icons/ShoppingBagIcon';
import ProfileIcon from './icons/ProfileIcon';

const NavItem = ({ label, icon: Icon, isActive, onPress, badge, theme, styles }) => (
  <TouchableOpacity 
    style={styles.navItem}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={label}
    accessibilityState={{ selected: isActive }}
  >
    <View style={styles.iconContainer}>
      <Icon 
        size={24} 
        color={isActive ? theme.colors.primary : theme.colors.text.secondary} 
      />
      {badge > 0 && (
        <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
          <Text style={styles.badgeText}>
            {badge > 99 ? '99+' : badge}
          </Text>
        </View>
      )}
    </View>
    <Text style={[
      styles.navText,
      isActive && styles.activeText,
      { color: isActive ? theme.colors.primary : theme.colors.text.secondary }
    ]}>{label}</Text>
  </TouchableOpacity>
);

const BottomNavigationBar = ({ 
  navigation, 
  activeTab, 
  translateY = new Animated.Value(1),
  badges = {} // { home: 0, search: 0, lists: 0, profile: 0 }
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  // Calculate the transform value based on translateY
  const transform = [{
    translateY: translateY.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0], // Move down by container height when hidden
      extrapolate: 'clamp',
    }),
  }];

  const navItems = [
    {
      label: 'Home',
      icon: HomeIcon,
      route: 'CustomerHomeFeed',
      badge: badges.home || 0,
    },
    {
      label: 'Search',
      icon: SearchIcon,
      route: 'SmartProductSearch',
      badge: badges.search || 0,
    },
    {
      label: 'Lists',
      icon: ShoppingBagIcon,
      route: 'Lists',
      badge: badges.lists || 0,
    },
    {
      label: 'Profile',
      icon: ProfileIcon,
      route: 'ProfileScreen',
      badge: badges.profile || 0,
    },
  ];

  return (
    <Animated.View 
      style={[styles.container, { transform }]}
      accessibilityRole="tablist"
    >
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          isActive={activeTab === item.label}
          onPress={() => navigation.navigate(item.route)}
          badge={item.badge}
          theme={theme}
          styles={styles}
        />
      ))}
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
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
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
