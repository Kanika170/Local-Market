import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { useLocation } from '../../context/LocationContext';

const EventsSection = ({ events, onEventPress }) => {
  const { theme } = useTheme();
  const { selectedLocation } = useLocation();
  const styles = createStyles(theme);

  // Filter events based on location
  const getLocationBasedEvents = () => {
    if (!selectedLocation) return events;

    // In a real app, this would filter based on actual coordinates
    // For now, we'll just sort by distance and add a nearby flag
    return events
      .map(event => ({
        ...event,
        isNearby: parseFloat(event.distance) <= 1.0 // Consider events within 1 mile as nearby
      }))
      .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  };

  const locationBasedEvents = getLocationBasedEvents();

  const renderEventCard = (event) => (
    <TouchableOpacity 
      key={event.id} 
      style={[styles.eventCard, event.isNearby && styles.nearbyEventCard]}
      onPress={() => onEventPress(event)}
    >
      <View style={styles.eventImageContainer}>
        <Text style={styles.eventImage}>{event.image}</Text>
        {event.isNearby && (
          <View style={styles.nearbyBadge}>
            <Text style={styles.nearbyText}>Nearby</Text>
          </View>
        )}
      </View>
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
        <View style={styles.eventMetaContainer}>
          <Text style={styles.eventDistance}>📍 {event.distance}</Text>
          {event.startDate && (
            <Text style={styles.eventDate}>
              📅 {new Date(event.startDate).toLocaleDateString()}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nearby Events</Text>
        {selectedLocation && (
          <Text style={styles.locationInfo}>
            Events around {selectedLocation.name || 'your location'}
          </Text>
        )}
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.eventsContainer}
        contentContainerStyle={styles.eventsContentContainer}
      >
        {locationBasedEvents.map(renderEventCard)}
      </ScrollView>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    marginBottom: theme.spacing.l,
  },
  sectionHeader: {
    marginBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  locationInfo: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  eventsContainer: {
    marginBottom: theme.spacing.m,
  },
  eventsContentContainer: {
    paddingHorizontal: theme.spacing.m,
  },
  eventCard: {
    width: 280,
    backgroundColor: theme.components.card.backgroundColor,
    borderRadius: theme.borderRadius.m,
    marginRight: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
    overflow: 'hidden',
  },
  nearbyEventCard: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  eventImageContainer: {
    height: 120,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  eventImage: {
    fontSize: 48,
  },
  nearbyBadge: {
    position: 'absolute',
    top: theme.spacing.s,
    right: theme.spacing.s,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.s,
  },
  nearbyText: {
    color: theme.colors.text.inverse,
    ...theme.typography.caption,
    fontWeight: '500',
  },
  eventInfo: {
    padding: theme.spacing.m,
  },
  eventTitle: {
    ...theme.typography.body1,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  eventSubtitle: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.s,
  },
  eventMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventDistance: {
    ...theme.typography.caption,
    color: theme.colors.primary,
  },
  eventDate: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
});

export default EventsSection;
