import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/useTheme';

const AppHeader = ({ 
  title,
  leftComponent,
  rightComponent,
  showBack = false,
  onBackPress,
  style,
  titleStyle,
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = createStyles(theme, insets);

  const renderLeftComponent = () => {
    if (leftComponent) return leftComponent;
    if (showBack) {
      return (
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onBackPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={[styles.header, style]}>
      <View style={styles.leftContainer}>
        {renderLeftComponent()}
      </View>
      
      <View style={styles.titleContainer}>
        <Text 
          style={[styles.title, titleStyle]} 
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
      
      <View style={styles.rightContainer}>
        {rightComponent}
      </View>
    </View>
  );
};

const createStyles = (theme, insets) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'ios' ? insets.top : theme.spacing.s,
    paddingBottom: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    minHeight: Platform.OS === 'ios' ? 44 + insets.top : 56,
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  backButton: {
    padding: theme.spacing.xs,
    marginLeft: -theme.spacing.xs,
  },
  backIcon: {
    fontSize: 24,
    color: theme.colors.text.primary,
  },
});

export default AppHeader;
