import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';

// Components
import FeedHeader from './components/FeedHeader';
import FeedTabBar from './components/FeedTabBar';
import MyCommunityTab from './tabs/MyCommunityTab';
import MyPostsTab from './tabs/MyPostsTab';
import CreatePostTab from './tabs/CreatePostTab';

const SellerFeedScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const [activeTab, setActiveTab] = useState('community');
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);
  
  // Animation for tab bar visibility
  const tabBarTranslateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  // Mock notification count
  const notificationCount = 3;

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
  };

  const handleNotificationPress = () => {
    navigation.navigate('ShopNotificationScreen');
  };

  const handleCreatePost = () => {
    setActiveTab('create');
  };

  const handlePostCreated = (newPost) => {
    // In a real app, this would update the posts list
    setActiveTab('posts');
  };

  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const diff = currentScrollY - lastScrollY.current;
    
    // Determine scroll direction with threshold
    if (Math.abs(diff) > 10) {
      const newDirection = diff > 0 ? 'down' : 'up';
      const shouldShow = newDirection === 'up' || currentScrollY < 50;
      
      if (shouldShow !== isTabBarVisible) {
        setIsTabBarVisible(shouldShow);
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
    }, 1500);
  };

  // Update navigation params to control bottom tab bar visibility
  useEffect(() => {
    navigation.setParams({ hideTabBar: !isTabBarVisible });
  }, [isTabBarVisible, navigation]);

  // Animate tab bar visibility
  useEffect(() => {
    Animated.timing(tabBarTranslateY, {
      toValue: isTabBarVisible ? 0 : 100,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isTabBarVisible]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'community':
        return <MyCommunityTab onScroll={handleScroll} />;
      case 'posts':
        return <MyPostsTab onCreatePost={handleCreatePost} onScroll={handleScroll} />;
      case 'create':
        return <CreatePostTab onPostCreated={handlePostCreated} />;
      default:
        return <MyCommunityTab onScroll={handleScroll} />;
    }
  };

  const getHeaderProps = () => {
    switch (activeTab) {
      case 'community':
        return {
          title: 'Market Feed',
          subtitle: 'Your Window to the Local Market'
        };
      case 'posts':
        return {
          title: 'My Posts',
          subtitle: 'Track Your Marketing Performance'
        };
      case 'create':
        return {
          title: 'Create Post',
          subtitle: 'Share with Your Community'
        };
      default:
        return {
          title: 'Market Feed',
          subtitle: 'Your Window to the Local Market'
        };
    }
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <FeedHeader
          {...getHeaderProps()}
          onNotificationPress={handleNotificationPress}
          notificationCount={notificationCount}
        />
      </View>

      {/* Tab Bar */}
      <Animated.View 
        style={[
          styles.tabBarContainer,
          {
            transform: [{ translateY: tabBarTranslateY }]
          }
        ]}
      >
        <FeedTabBar
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      </Animated.View>

      {/* Tab Content */}
      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    ...theme.shadows.default,
  },
  tabBarContainer: {
    position: 'absolute',
    top: 140, // Adjust based on header height
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: theme.colors.background,
    paddingBottom: theme.spacing.xs,
  },
  contentContainer: {
    flex: 1,
    marginTop: 220, // Adjust based on header + tab bar height
  },
});

export default SellerFeedScreen;
