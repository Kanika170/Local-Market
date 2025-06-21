import React, { useEffect, useRef } from 'react';
import { Animated, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../theme/useTheme';

// Auth Screens
import SellerLoginScreen from './auth/SellerLoginScreen';
import SellerRegisterScreen from './auth/SellerRegisterScreen';
import SellerVerificationScreen from './auth/SellerVerificationScreen';

// Dashboard & Analytics
import SellerDashboardScreen from './dashboard/SellerDashboardScreen';
import ShopNotificationScreen from './notifications/ShopNotificationScreen';

// Product Management
import ProductListScreen from './products/ProductListScreen';
import AddEditProductScreen from './products/AddEditProductScreen';

// Feed Screen
import SellerFeedScreen from './feed/SellerFeedScreen';

// Chat & Communication
import SellerChatDashboardScreen from './chat/SellerChatDashboardScreen';

// Settings & Profile
import ShopSettingsScreen from './settings/ShopSettingsScreen';

// Placeholder components for upcoming features
const AnalyticsScreen = () => null;
const StockManagementScreen = () => null;
const ReviewManagementScreen = () => null;
const OrdersScreen = () => null;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigators for each tab
const createStackNavigator = (screens) => {
  const Stack = createNativeStackNavigator();
  return () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

// Define screen configurations for each stack
const dashboardScreens = [
  { name: 'DashboardMain', component: SellerDashboardScreen },
  { name: 'ShopNotificationScreen', component: ShopNotificationScreen },
  { name: 'ShopNotificationPreviewScreen', component: require('./notifications/ShopNotificationPreviewScreen').default },
  { name: 'Analytics', component: AnalyticsScreen },
  { name: 'Orders', component: OrdersScreen },
];

const productScreens = [
  { name: 'ProductsList', component: ProductListScreen },
  { name: 'AddProduct', component: AddEditProductScreen },
  { name: 'EditProduct', component: AddEditProductScreen },
  { name: 'ProductShow', component: require('./products/ProductShowScreen').default },
  { name: 'StockManagement', component: StockManagementScreen },
];

const postScreens = [
  { name: 'Feed', component: SellerFeedScreen },
];

const chatScreens = [
  { name: 'ChatDashboard', component: SellerChatDashboardScreen },
];

const settingScreens = [
  { name: 'SettingsMain', component: ShopSettingsScreen },
  { name: 'Reviews', component: ReviewManagementScreen },
];

// Create stack navigators
const DashboardNavigator = createStackNavigator(dashboardScreens);
const ProductsNavigator = createStackNavigator(productScreens);
const PostsNavigator = createStackNavigator(postScreens);
const ChatNavigator = createStackNavigator(chatScreens);
const SettingsNavigator = createStackNavigator(settingScreens);

// Tab configuration
const TAB_CONFIG = [
  {
    name: 'Dashboard',
    component: DashboardNavigator,
    icon: 'view-dashboard',
    label: 'Dashboard',
  },
  {
    name: 'Products',
    component: ProductsNavigator,
    icon: 'package-variant',
    label: 'Products',
  },
  {
    name: 'Feed',
    component: PostsNavigator,
    icon: 'post',
    label: 'Feed',
  },
  {
    name: 'Chat',
    component: ChatNavigator,
    icon: 'chat',
    label: 'Chat',
  },
  {
    name: 'Settings',
    component: SettingsNavigator,
    icon: 'cog',
    label: 'Settings',
  },
];

// Main Tab Navigator with fixed animation
const SellerTabNavigator = () => {
  const { theme } = useTheme();
  const [isTabBarVisible, setIsTabBarVisible] = React.useState(true);
  const tabBarTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(tabBarTranslateY, {
      toValue: isTabBarVisible ? 0 : 100,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isTabBarVisible]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          elevation: 8,
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 8,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
          transform: [{ translateY: tabBarTranslateY }],
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
      screenListeners={{
        state: (e) => {
          const route = e.data.state.routes[e.data.state.index];
          if (route.params?.hideTabBar !== undefined) {
            setIsTabBarVisible(!route.params.hideTabBar);
          }
        },
      }}
    >
      {TAB_CONFIG.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name={tab.icon} size={size} color={color} />
            ),
            tabBarLabel: tab.label,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

// Auth Stack configuration
const AUTH_SCREENS = [
  {
    name: 'SellerLogin',
    component: SellerLoginScreen,
  },
  {
    name: 'SellerRegister',
    component: SellerRegisterScreen,
  },
  {
    name: 'SellerVerification',
    component: SellerVerificationScreen,
  },
  {
    name: 'SellerTabs',
    component: SellerTabNavigator,
  },
];

// Root Navigator
const SellerNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      {AUTH_SCREENS.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default SellerNavigator;
