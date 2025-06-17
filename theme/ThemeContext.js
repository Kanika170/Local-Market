import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes, lightTheme, darkTheme } from './themes';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('purple');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme preferences
  useEffect(() => {
    loadThemePreferences();
  }, []);

  const loadThemePreferences = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('selectedTheme');
      const savedDarkMode = await AsyncStorage.getItem('isDarkMode');
      
      if (savedTheme) {
        setCurrentTheme(savedTheme);
      }
      if (savedDarkMode !== null) {
        setIsDarkMode(JSON.parse(savedDarkMode));
      }
    } catch (error) {
      console.error('Error loading theme preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreferences = async (theme, darkMode) => {
    try {
      await AsyncStorage.setItem('selectedTheme', theme);
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(darkMode));
    } catch (error) {
      console.error('Error saving theme preferences:', error);
    }
  };

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    saveThemePreferences(themeName, isDarkMode);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    saveThemePreferences(currentTheme, newDarkMode);
  };

  const getTheme = () => {
    if (isDarkMode) {
      return darkTheme;
    }
    return themes[currentTheme] || themes.purple;
  };

  const value = {
    theme: getTheme(),
    currentTheme,
    isDarkMode,
    isLoading,
    changeTheme,
    toggleDarkMode,
    availableThemes: Object.keys(themes).filter(key => key !== 'light' && key !== 'dark'),
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
