import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../../theme/useTheme';

const AboutTab = ({ shop }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const shopHours = [
    { day: 'Monday', hours: '8:00 AM - 9:00 PM' },
    { day: 'Tuesday', hours: '8:00 AM - 9:00 PM' },
    { day: 'Wednesday', hours: '8:00 AM - 9:00 PM' },
    { day: 'Thursday', hours: '8:00 AM - 9:00 PM' },
    { day: 'Friday', hours: '8:00 AM - 9:00 PM' },
    { day: 'Saturday', hours: '8:00 AM - 9:00 PM' },
    { day: 'Sunday', hours: '9:00 AM - 7:00 PM' },
  ];

  const shopFeatures = [
    'Free Wi-Fi',
    'Parking Available',
    'Wheelchair Accessible',
    'Air Conditioning',
    'Credit Cards Accepted',
    'Home Delivery',
    'Online Ordering',
    'Fresh Produce Daily'
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          Green Grocery Store has been serving the community for over 15 years with fresh, 
          quality products at affordable prices. We pride ourselves on sourcing locally 
          whenever possible and maintaining the highest standards of freshness and quality.
        </Text>
      </View>

      {/* Opening Hours */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opening Hours</Text>
        <View style={styles.hoursContainer}>
          {shopHours.map((item, index) => (
            <View key={index} style={styles.hourRow}>
              <Text style={styles.dayText}>{item.day}</Text>
              <Text style={styles.hoursText}>{item.hours}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.contactContainer}>
          <View style={styles.contactRow}>
            <Text style={styles.contactIcon}>📞</Text>
            <Text style={styles.contactText}>+1 (555) 123-4567</Text>
          </View>
          <View style={styles.contactRow}>
            <Text style={styles.contactIcon}>✉️</Text>
            <Text style={styles.contactText}>info@greengrocery.com</Text>
          </View>
          <View style={styles.contactRow}>
            <Text style={styles.contactIcon}>🌐</Text>
            <Text style={styles.contactText}>www.greengrocery.com</Text>
          </View>
        </View>
      </View>

      {/* Features & Amenities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features & Amenities</Text>
        <View style={styles.featuresContainer}>
          {shopFeatures.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Payment Methods */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Methods</Text>
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentMethod}>💳 Credit Cards</Text>
          <Text style={styles.paymentMethod}>💰 Cash</Text>
          <Text style={styles.paymentMethod}>📱 Mobile Payments</Text>
          <Text style={styles.paymentMethod}>🏦 Bank Transfer</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  section: {
    padding: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.m,
  },
  description: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    lineHeight: 22,
  },
  hoursContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  dayText: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  hoursText: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  },
  contactContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.s,
  },
  contactIcon: {
    fontSize: 20,
    marginRight: theme.spacing.m,
  },
  contactText: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
  },
  featuresContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.s,
  },
  featureIcon: {
    color: theme.colors.primary,
    fontSize: 16,
    marginRight: theme.spacing.m,
    fontWeight: 'bold',
  },
  featureText: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
  },
  paymentContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  paymentMethod: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    width: '48%',
    marginBottom: theme.spacing.s,
  },
});

export default AboutTab;
