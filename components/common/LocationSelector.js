import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { useLocation } from '../../context/LocationContext';

const LocationSelector = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const { location, selectedLocation, savedLocations, updateSelectedLocation } = useLocation();
  const styles = createStyles(theme);

  const handleLocationSelect = (selectedLoc) => {
    updateSelectedLocation(selectedLoc);
    onClose();
  };

  const locationOptions = [
    ...(location ? [{
      id: 'current',
      name: 'Current Location',
      address: location.address,
      coordinates: { latitude: location.latitude, longitude: location.longitude },
      icon: '📍'
    }] : []),
    ...savedLocations.map(loc => ({
      ...loc,
      icon: loc.name === 'Home' ? '🏠' : loc.name === 'Office' ? '🏢' : '📌'
    }))
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Location</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.locationsList}>
            {locationOptions.map((loc) => (
              <TouchableOpacity
                key={loc.id}
                style={[
                  styles.locationItem,
                  selectedLocation?.id === loc.id && styles.selectedLocationItem
                ]}
                onPress={() => handleLocationSelect(loc)}
              >
                <Text style={styles.locationItemIcon}>{loc.icon}</Text>
                <View style={styles.locationItemContent}>
                  <Text style={[
                    styles.locationItemName,
                    selectedLocation?.id === loc.id && styles.selectedLocationText
                  ]}>
                    {loc.name}
                  </Text>
                  <Text style={[
                    styles.locationItemAddress,
                    selectedLocation?.id === loc.id && styles.selectedLocationAddress
                  ]}>
                    {loc.address}
                  </Text>
                </View>
                {selectedLocation?.id === loc.id && (
                  <Text style={styles.checkIcon}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.addLocationButton}>
            <Text style={styles.addLocationIcon}>➕</Text>
            <Text style={styles.addLocationText}>Add New Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    paddingTop: theme.spacing.l,
    paddingHorizontal: theme.spacing.l,
    paddingBottom: theme.spacing.xl,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  modalTitle: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: theme.colors.text.secondary,
    fontSize: 16,
  },
  locationsList: {
    maxHeight: 300,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    marginBottom: theme.spacing.s,
    backgroundColor: theme.colors.surface,
  },
  selectedLocationItem: {
    backgroundColor: theme.colors.primary + '20',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  locationItemIcon: {
    fontSize: 20,
    marginRight: theme.spacing.m,
  },
  locationItemContent: {
    flex: 1,
  },
  locationItemName: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontWeight: '600',
    marginBottom: 2,
  },
  selectedLocationText: {
    color: theme.colors.primary,
  },
  locationItemAddress: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  selectedLocationAddress: {
    color: theme.colors.primary,
    opacity: 0.8,
  },
  checkIcon: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  addLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.m,
    marginTop: theme.spacing.l,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.m,
    borderStyle: 'dashed',
  },
  addLocationIcon: {
    fontSize: 16,
    color: theme.colors.primary,
    marginRight: theme.spacing.s,
  },
  addLocationText: {
    ...theme.typography.body2,
    color: theme.colors.primary,
    fontWeight: '500',
  },
});

export default LocationSelector;
