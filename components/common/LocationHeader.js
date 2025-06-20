import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { useLocation } from '../../context/LocationContext';
import LocationSelector from './LocationSelector';

const LocationHeader = ({ navigation }) => {
  const { theme } = useTheme();
  const { selectedLocation } = useLocation();
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const styles = createStyles(theme);

  const getLocationDisplayName = () => {
    if (selectedLocation?.name) {
      return selectedLocation.name;
    }
    if (selectedLocation?.address) {
      // Extract city from address
      const parts = selectedLocation.address.split(',');
      return parts[parts.length - 1]?.trim() || 'Current Location';
    }
    return 'Select Location';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.locationSection}>
            <TouchableOpacity 
              style={styles.locationButton}
              onPress={() => setShowLocationSelector(true)}
            >
              <Text style={styles.locationIcon}>📍</Text>
              <View style={styles.locationText}>
                <Text style={styles.greeting}>{getGreeting()}!</Text>
                <View style={styles.locationRow}>
                  <Text style={styles.locationName} numberOfLines={1}>
                    {getLocationDisplayName()}
                  </Text>
                  <Text style={styles.dropdownIcon}>▼</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('ChatScreen')}
          >
            <Text style={styles.headerIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.navigate('NotificationScreen')}
          >
            <Text style={styles.headerIcon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      <LocationSelector
        visible={showLocationSelector}
        onClose={() => setShowLocationSelector(false)}
      />
    </>
  );
};

const createStyles = (theme) => StyleSheet.create({
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: Platform.OS === 'ios' ? theme.spacing.s : theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
    paddingHorizontal: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  headerLeft: {
    flex: 1,
    marginRight: theme.spacing.s,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.l,
    maxWidth: '90%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  locationIcon: {
    fontSize: 16,
    marginRight: theme.spacing.xs,
    opacity: 0.9,
  },
  locationText: {
    flex: 1,
  },
  greeting: {
    color: theme.colors.text.inverse,
    ...theme.typography.caption,
    opacity: 0.85,
    fontSize: 11,
    marginBottom: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationName: {
    color: theme.colors.text.inverse,
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  dropdownIcon: {
    color: theme.colors.text.inverse,
    fontSize: 9,
    marginLeft: theme.spacing.xs,
    opacity: 0.7,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    width: 34,
    height: 34,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  headerIcon: {
    fontSize: 16,
    color: theme.colors.text.inverse,
    opacity: 0.9,
  },
});

export default LocationHeader;
