import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ShoppingBagIcon from './ShoppingBagIcon';

const SplashScreen = () => {
  const navigation = useNavigation();

  // Animation refs
  const loadingDotsOpacity = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const progressWidth = useRef(new Animated.Value(0)).current;

  // Animate loading dots and progress bar
  useEffect(() => {
    const animateDots = () => {
      const animations = loadingDotsOpacity.map((dot, index) => {
        return Animated.sequence([
          Animated.delay(index * 200),
          Animated.timing(dot, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 500,
            useNativeDriver: true,
          }),
        ]);
      });

      Animated.loop(
        Animated.stagger(100, animations)
      ).start();
    };

    Animated.timing(progressWidth, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(() => {
      navigation.replace('OnboardingScreen'); // Navigate to OnboardingScreen
    });

    animateDots();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Shopping Bag Icon */}
      <View style={styles.iconContainer}>
        <ShoppingBagIcon size={80} />
      </View>

      {/* Title and Subtitle */}
      <Text style={styles.title}>Shopping Companion</Text>
      <Text style={styles.subtitle}>Your smart shopping assistant</Text>

      {/* Loading Dots */}
      <View style={styles.dotsContainer}>
        {loadingDotsOpacity.map((dot, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              { opacity: dot }
            ]}
          />
        ))}
      </View>

      {/* Playing Text */}
      <Text style={styles.playingText}>Playing Indian musical jingle...</Text>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Animated.View 
          style={[
            styles.progressBar,
            {
              width: progressWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
            }
          ]} 
        />
      </View>
      <Text style={styles.redirectingText}>Redirecting to onboarding...</Text>

      {/* Skip Button */}
      <TouchableOpacity 
        style={styles.skipButton} 
        onPress={() => navigation.replace('OnboardingScreen')}
      >
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#9C27B0',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#9C27B0',
    marginBottom: 40,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9C27B0',
    marginHorizontal: 4,
  },
  playingText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  progressContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#9C27B0',
    borderRadius: 2,
  },
  redirectingText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 40,
  },
  skipButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
  },
  skipText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default SplashScreen;