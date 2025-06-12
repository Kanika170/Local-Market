import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PhoneIllustration from './PhoneIllustration';
import PageIndicators from './PageIndicators';

const OnboardingScreen = () => {
  const navigation = useNavigation();

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#9C27B0',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3E5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  tagIcon: {
    width: 20,
    height: 16,
    backgroundColor: '#9C27B0',
    borderRadius: 2,
    position: 'relative',
  },
  bellIcon: {
    width: 16,
    height: 20,
    backgroundColor: '#9C27B0',
    borderRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  percentIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9C27B0',
  },
  featureText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 80,
  },
  skipText: {
    fontSize: 16,
    color: '#9C27B0',
    fontWeight: '500',
  },
  nextButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    minWidth: 120,
  },
  nextText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default OnboardingScreen;