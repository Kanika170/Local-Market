import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomerHomeFeed from './CustomerHomeFeed';
import ChatScreen from './ChatScreen';
import NotificationScreen from './NotificationScreen';
import ProductDetailScreen from './ProductDetailScreen';
import ShopDetailScreen from './ShopDetailScreen';
import SmartProductSearch from './SmartProductSearch';
import ProfileScreen from './ProfileScreen';
import ListsScreen from './ListsScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CustomerHomeFeed"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="CustomerHomeFeed" component={CustomerHomeFeed} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
      <Stack.Screen name="ShopDetailScreen" component={ShopDetailScreen} />
      <Stack.Screen name="SmartProductSearch" component={SmartProductSearch} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Lists" component={ListsScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
