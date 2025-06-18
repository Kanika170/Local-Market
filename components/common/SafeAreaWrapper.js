import React from 'react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/useTheme';

const SafeAreaWrapper = ({ 
  children, 
  style = {}, 
  edges = ['top', 'bottom', 'left', 'right'],
  backgroundColor,
  statusBarStyle = 'default'
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  
  const safeAreaStyle = {
    flex: 1,
    backgroundColor: backgroundColor || theme.colors.background,
    paddingTop: edges.includes('top') ? insets.top : 0,
    paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
    paddingLeft: edges.includes('left') ? insets.left : 0,
    paddingRight: edges.includes('right') ? insets.right : 0,
    ...style,
  };

  return (
    <>
      <StatusBar 
        barStyle={statusBarStyle}
        backgroundColor={Platform.OS === 'android' ? (backgroundColor || theme.colors.background) : 'transparent'}
        translucent={Platform.OS === 'android'}
      />
      <SafeAreaView style={safeAreaStyle}>
        {children}
      </SafeAreaView>
    </>
  );
};

export default SafeAreaWrapper;
