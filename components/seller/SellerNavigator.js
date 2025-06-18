import React from 'react';
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

// Feed & Posts
import CreatePostScreen from './feed/CreatePostScreen';
import ShopPostsScreen from './feed/ShopPostsScreen';

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
  { name: 'ShopPosts', component: ShopPostsScreen },
  { name: 'CreatePost', component: CreatePostScreen },
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
    name: 'Posts',
    component: PostsNavigator,
    icon: 'post',
    label: 'Posts',
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

// Main Tab Navigator
const SellerTabNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
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
