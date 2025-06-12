import React from 'react';
import { View, StyleSheet } from 'react-native';

const PhoneIllustration = () => {
  return (
    <View style={styles.container}>
      {/* Background circle */}
      <View style={styles.backgroundCircle}>
        {/* Left hand */}
        <View style={styles.leftHand}>
          <View style={styles.leftThumb} />
          <View style={styles.leftPalm} />
          <View style={styles.leftFingers} />
        </View>

        {/* Right hand */}
        <View style={styles.rightHand}>
          <View style={styles.rightThumb} />
          <View style={styles.rightPalm} />
          <View style={styles.rightFingers} />
        </View>

        {/* Phone */}
        <View style={styles.phone}>
          <View style={styles.phoneScreen} />
          <View style={styles.homeButton} />
        </View>

        {/* Shopping bag icon on phone */}
        <View style={styles.phoneIcon}>
          <View style={styles.bagBody} />
          <View style={styles.bagHandle} />
        </View>

        {/* Bottom decorative elements */}
        <View style={styles.bottomDecorations}>
          <View style={styles.yellowBag} />
          <View style={styles.greenPlant} />
          <View style={styles.blueLine} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundCircle: {
    width: 220,
    height: 220,
    backgroundColor: '#F5F5F5',
    borderRadius: 110,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  // Left hand
  leftHand: {
    position: 'absolute',
    left: 45,
    top: 65,
  },
  leftThumb: {
    width: 20,
    height: 35,
    backgroundColor: '#FFAB91',
    borderRadius: 10,
    position: 'absolute',
    left: -5,
    top: 20,
    transform: [{ rotate: '15deg' }],
  },
  leftPalm: {
    width: 35,
    height: 80,
    backgroundColor: '#FFAB91',
    borderRadius: 17,
  },
  leftFingers: {
    width: 30,
    height: 40,
    backgroundColor: '#FFAB91',
    borderRadius: 15,
    position: 'absolute',
    top: -20,
    left: 2,
  },
  // Right hand
  rightHand: {
    position: 'absolute',
    right: 45,
    top: 65,
  },
  rightThumb: {
    width: 20,
    height: 35,
    backgroundColor: '#FFAB91',
    borderRadius: 10,
    position: 'absolute',
    right: -5,
    top: 20,
    transform: [{ rotate: '-15deg' }],
  },
  rightPalm: {
    width: 35,
    height: 80,
    backgroundColor: '#FFAB91',
    borderRadius: 17,
  },
  rightFingers: {
    width: 30,
    height: 40,
    backgroundColor: '#FFAB91',
    borderRadius: 15,
    position: 'absolute',
    top: -20,
    right: 2,
  },
  // Phone
  phone: {
    width: 80,
    height: 140,
    backgroundColor: '#333333',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
  },
  phoneScreen: {
    width: 68,
    height: 115,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  homeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#666666',
    position: 'absolute',
    bottom: 10,
  },
  // Shopping bag icon on phone
  phoneIcon: {
    position: 'absolute',
    zIndex: 3,
  },
  bagBody: {
    width: 20,
    height: 16,
    backgroundColor: '#9C27B0',
    borderRadius: 3,
  },
  bagHandle: {
    width: 12,
    height: 8,
    borderWidth: 2,
    borderColor: '#9C27B0',
    borderRadius: 6,
    position: 'absolute',
    top: -4,
    left: 4,
    backgroundColor: 'transparent',
  },
  // Bottom decorations
  bottomDecorations: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  yellowBag: {
    width: 16,
    height: 12,
    backgroundColor: '#FFC107',
    borderRadius: 2,
    position: 'absolute',
    left: 100,
    bottom: 0,
  },
  greenPlant: {
    width: 12,
    height: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    position: 'absolute',
    right: 100,
    bottom: 0,
  },
  blueLine: {
    width: 60,
    height: 3,
    backgroundColor: '#2196F3',
    borderRadius: 1.5,
    position: 'absolute',
    bottom: -5,
  },
});

export default PhoneIllustration;
