import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './theme/ThemeContext';
import { LocationProvider } from './context/LocationContext';
import { ShoppingListProvider } from './context/ShoppingListContext';
import { SellerProvider } from './context/SellerContext';

// Screens
import SplashScreen from './components/SplashScreen';
import OnboardingScreen from './components/OnboardingScreen';
import LoginRegisterScreen from './components/LoginRegisterScreen';
import AppNavigator from './components/AppNavigator';
import SellerNavigator from './components/seller/SellerNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <LocationProvider>
        <ShoppingListProvider>
          <SellerProvider>
            <NavigationContainer>
              <Stack.Navigator 
                initialRouteName="SplashScreen"
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
                <Stack.Screen name="LoginRegisterScreen" component={LoginRegisterScreen} />
                <Stack.Screen name="MainApp" component={AppNavigator} />
                <Stack.Screen name="SellerApp" component={SellerNavigator} />
              </Stack.Navigator>
            </NavigationContainer>
          </SellerProvider>
        </ShoppingListProvider>
      </LocationProvider>
    </ThemeProvider>
  );
}
