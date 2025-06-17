import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/useTheme';
import PhoneIllustration from './PhoneIllustration';
import PageIndicators from './PageIndicators';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const handleNext = () => {
    navigation.replace('LoginRegisterScreen'); // Navigate to Login/Register screen
  };

  const handleSkip = () => {
    navigation.replace('LoginRegisterScreen'); // Navigate to Login/Register screen
  };

  return (
    <View style={styles.container}>
      {/* Page Indicators */}
      <PageIndicators currentPage={0} totalPages={3} />

      {/* Phone Illustration */}
      <View style={styles.illustrationContainer}>
        <PhoneIllustration />
      </View>

      {/* Title */}
      <Text style={styles.title}>Find the Best Prices</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Compare prices across multiple stores in your area to ensure you're always getting the best deals on your groceries and essentials.
      </Text>

      {/* Features List */}
      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <View style={styles.tagIcon} />
          </View>
          <Text style={styles.featureText}>Price comparison across local stores</Text>
        </View>

        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <View style={styles.bellIcon} />
          </View>
          <Text style={styles.featureText}>Price drop alerts for your favorites</Text>
        </View>

        <View style={styles.featureItem}>
          <View style={styles.featureIcon}>
            <Text style={styles.percentIcon}>%</Text>
          </View>
          <Text style={styles.featureText}>Exclusive deals and discounts</Text>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip to Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.l,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.m,
  },
  subtitle: {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.s,
  },
  featuresContainer: {
    marginBottom: theme.spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.ripple,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.m,
  },
  tagIcon: {
    width: 20,
    height: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.xs,
    position: 'relative',
  },
  bellIcon: {
    width: 16,
    height: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.m,
    borderTopLeftRadius: theme.borderRadius.m,
    borderTopRightRadius: theme.borderRadius.m,
    borderBottomLeftRadius: theme.borderRadius.xs,
    borderBottomRightRadius: theme.borderRadius.xs,
  },
  percentIcon: {
    ...theme.typography.h2,
    color: theme.colors.primary,
  },
  featureText: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: theme.spacing.xxl,
  },
  skipText: {
    ...theme.typography.button,
    color: theme.colors.primary,
  },
  nextButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.m,
    minWidth: 120,
  },
  nextText: {
    ...theme.typography.button,
    color: theme.colors.text.primary,
    textAlign: 'center',
  },
});

export default OnboardingScreen;