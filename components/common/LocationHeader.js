import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
    paddingTop: theme.spacing.m,
    paddingBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerLeft: {
    flex: 1,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    borderRadius: theme.borderRadius.m,
    maxWidth: '85%',
  },
  locationIcon: {
    fontSize: 18,
    marginRight: theme.spacing.s,
  },
  locationText: {
    flex: 1,
  },
  greeting: {
    color: theme.colors.text.inverse,
    ...theme.typography.caption,
    opacity: 0.9,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationName: {
    color: theme.colors.text.inverse,
    ...theme.typography.body1,
    fontWeight: '600',
    flex: 1,
  },
  dropdownIcon: {
    color: theme.colors.text.inverse,
    fontSize: 10,
    marginLeft: theme.spacing.xs,
    opacity: 0.7,
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
    fontSize: 18,
    color: theme.colors.text.inverse,
  },
});

export default LocationHeader;
