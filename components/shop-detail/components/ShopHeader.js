import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

const ShopHeader = ({ 
  onBack, 
  onChat, 
  onNotification, 
  shopName
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{shopName}</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={onChat}
          >
            <Text style={styles.headerIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={onNotification}
          >
            <Text style={styles.headerIcon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    zIndex: 1000,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop:  Platform.OS === 'ios' ? 36 : 12, // reduced from 50
    paddingBottom: theme.spacing.s,               // reduced from theme.spacing.m
    paddingHorizontal: theme.spacing.m,           // reduced from theme.spacing.l
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 56,                                // add minHeight for compactness
  },
  backButton: {
    padding: theme.spacing.s,
  },
  backButtonText: {
    color: theme.colors.text.inverse,
    ...theme.typography.h2,
  },
  headerTitle: {
    color: theme.colors.text.inverse,
    ...theme.typography.h3,
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: theme.borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.s,
  },
  headerIcon: {
    fontSize: 20,
    color: theme.colors.text.inverse,
  },
});

export default ShopHeader;
