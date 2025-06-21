import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import ShoppingBagIcon from './ShoppingBagIcon';

const SplashScreen = ({ navigation }) => {
  // State to track animation completion
  const [animationComplete, setAnimationComplete] = useState(false);

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

  // Navigation function
  const navigateToOnboarding = useCallback(() => {
    try {
      navigation.reset({
        index: 0,
        routes: [{ name: 'OnboardingScreen' }],
      });
    } catch (error) {
      console.warn('Navigation error:', error);
      // Fallback navigation if reset fails
      navigation.replace('OnboardingScreen');
    }
  }, [navigation]);

  // Handle navigation when animation completes
  useEffect(() => {
    if (animationComplete) {
      // Use setTimeout to defer navigation to next tick
      const timeoutId = setTimeout(() => {
        navigateToOnboarding();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [animationComplete, navigateToOnboarding]);

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

      return Animated.loop(
        Animated.stagger(100, animations)
      );
    };

    const dotsAnimation = animateDots();
    dotsAnimation.start();

    const progressAnimation = Animated.timing(progressWidth, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    });

    progressAnimation.start(() => {
      // Set state instead of directly navigating
      setAnimationComplete(true);
    });

    // Cleanup function
    return () => {
      dotsAnimation.stop();
      progressAnimation.stop();
    };
  }, []);

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
        onPress={navigateToOnboarding}
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