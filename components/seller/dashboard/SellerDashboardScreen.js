import React, { useRef, useState, useEffect } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';
import { mockDashboardData } from './mockData';

// Import sections
import DashboardHeader from './sections/DashboardHeader';
import ShopStatusSection from './sections/ShopStatusSection';
import StatsSection from './sections/StatsSection';
import QuickActionsSection from './sections/QuickActionsSection';
import AlertsSection from './sections/AlertsSection';
import RecentActivitySection from './sections/RecentActivitySection';

const SCROLL_THRESHOLD = 10;
const SCROLL_TIMEOUT = 1500;

const SellerDashboardScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createSellerStyles(theme);
  const [refreshing, setRefreshing] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(mockDashboardData.shopData.isOpen);
  const [dashboardData, setDashboardData] = useState(mockDashboardData);
  
  // Scroll management
  const lastScrollY = useRef(0);
  const scrollDirection = useRef('up');
  const scrollTimeout = useRef(null);
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setDashboardData(mockDashboardData);
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleStatusToggle = () => {
    setIsShopOpen(!isShopOpen);
  };

  const handleStatPress = (statType) => {
    switch (statType) {
      case 'visits':
        navigation.navigate('Dashboard', { screen: 'Analytics', params: { tab: 'visitors' } });
        break;
      case 'inquiries':
        navigation.navigate('Chat', { screen: 'ChatDashboard' });
        break;
      case 'popular':
        navigation.navigate('Products', { screen: 'ProductsList', params: { filter: 'popular' } });
        break;
      case 'pending':
        navigation.navigate('Dashboard', { screen: 'Tasks' });
        break;
    }
  };

  const handleActionPress = (actionId) => {
    switch (actionId) {
      case 'add_product':
        navigation.navigate('Products', { screen: 'AddProduct' });
        break;
      case 'create_post':
        navigation.navigate('Feed', { screen: 'CreatePost' });
        break;
      case 'messages':
        navigation.navigate('Chat');
        break;
      case 'analytics':
        navigation.navigate('Analytics');
        break;
    }
  };

  const handleAlertPress = (alert) => {
    switch (alert.subType) {
      case 'low_stock':
        navigation.navigate('Products', { screen: 'StockManagement' });
        break;
      case 'performance':
        navigation.navigate('Feed', { screen: 'CreatePost', params: { type: 'deal' } });
        break;
      default:
        if (alert.link) {
          navigation.navigate(alert.link);
        }
    }
  };

  const handleActivityPress = (activity) => {
    if (activity === 'viewAll') {
      navigation.navigate('Dashboard', { screen: 'Activity' });
    } else if (activity.link) {
      const [screen, params] = activity.link.split('/');
      switch (screen) {
        case 'reviews':
          navigation.navigate('Settings', { screen: 'Reviews', params: { id: params } });
          break;
        case 'chat':
          navigation.navigate('Chat', { screen: 'ChatDashboard', params: { id: params } });
          break;
        case 'posts':
          navigation.navigate('Feed', { screen: 'Feed', params: { id: params } });
          break;
        case 'products':
          navigation.navigate('Products', { screen: 'ProductsList', params: { id: params } });
          break;
        default:
          navigation.navigate(screen, { id: params });
      }
    }
  };

  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const diff = currentScrollY - lastScrollY.current;
    
    // Determine scroll direction with threshold
    if (Math.abs(diff) > SCROLL_THRESHOLD) {
      const newDirection = diff > 0 ? 'down' : 'up';
      if (newDirection !== scrollDirection.current) {
        scrollDirection.current = newDirection;
        setIsTabBarVisible(newDirection === 'up');
      }
    }
    
    lastScrollY.current = currentScrollY;
    
    // Clear existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    // Set timeout to show tab bar when scrolling stops
    scrollTimeout.current = setTimeout(() => {
      setIsTabBarVisible(true);
    }, SCROLL_TIMEOUT);
  };

  // Update navigation params to control tab bar visibility
  useEffect(() => {
    navigation.setParams({ hideTabBar: !isTabBarVisible });
  }, [isTabBarVisible, navigation]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Sticky Header */}
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}>
        <DashboardHeader
          shopData={dashboardData.shopData}
          notifications={dashboardData.notifications}
          onNotificationPress={() => navigation.navigate('ShopNotificationScreen')}
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ 
          paddingTop: 140, // Increased space for header
          paddingBottom: 20 
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Shop Status Section */}
        <ShopStatusSection
          isOpen={isShopOpen}
          onToggle={handleStatusToggle}
        />

        {/* Stats Section */}
        <StatsSection
          statsData={dashboardData.stats}
          onStatPress={handleStatPress}
        />

        {/* Quick Actions Section */}
        <QuickActionsSection
          onActionPress={handleActionPress}
        />

        {/* Alerts Section */}
        <AlertsSection
          alerts={dashboardData.alerts}
          onAlertPress={handleAlertPress}
        />

        {/* Recent Activity Section */}
        <RecentActivitySection
          activities={dashboardData.recentActivity}
          onActivityPress={handleActivityPress}
        />
      </ScrollView>
    </View>
  );
};

export default SellerDashboardScreen;
