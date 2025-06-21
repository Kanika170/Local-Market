import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/useTheme';
import AppHeader from './AppHeader';
import BottomNavigationBar from '../BottomNavigationBar';

const ScreenWrapper = ({
  children,
  header,
  showHeader = true,
  showBottomNav = true,
  bottomNavProps,
  style,
  contentContainerStyle,
  statusBarStyle = 'dark-content',
  backgroundColor,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView 
      style={[
        styles.container,
        backgroundColor && { backgroundColor },
        style,
      ]}
      edges={['top']}
    >
      <StatusBar 
        barStyle={statusBarStyle}
        backgroundColor={backgroundColor || theme.colors.background}
      />
      
      {showHeader && (
        header || (
          <AppHeader {...(typeof header === 'object' ? header : {})} />
        )
      )}

      <View style={[styles.content, contentContainerStyle]}>
        {children}
      </View>

      {showBottomNav && (
        <BottomNavigationBar
          {...bottomNavProps}
        />
      )}
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});

export default ScreenWrapper;
