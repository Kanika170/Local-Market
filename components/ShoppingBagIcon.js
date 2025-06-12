import React from 'react';
import { View, StyleSheet } from 'react-native';

const ShoppingBagIcon = ({ size = 60 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Bag body */}
      <View style={[styles.bagBody, { 
        width: size * 0.8, 
        height: size * 0.65,
        borderRadius: size * 0.1 
      }]} />
      
      {/* Bag handles */}
      <View style={[styles.handleLeft, { 
        width: size * 0.15,
        height: size * 0.25,
        borderRadius: size * 0.075,
        left: size * 0.2,
        top: -size * 0.05
      }]} />
      <View style={[styles.handleRight, { 
        width: size * 0.15,
        height: size * 0.25,
        borderRadius: size * 0.075,
        right: size * 0.2,
        top: -size * 0.05
      }]} />
      
      {/* Handle dots */}
      <View style={[styles.handleDotLeft, { 
        width: size * 0.06,
        height: size * 0.06,
        borderRadius: size * 0.03,
        left: size * 0.265,
        top: -size * 0.02
      }]} />
      <View style={[styles.handleDotRight, { 
        width: size * 0.06,
        height: size * 0.06,
        borderRadius: size * 0.03,
        right: size * 0.265,
        top: -size * 0.02
      }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bagBody: {
    backgroundColor: '#9C27B0',
    position: 'absolute',
    bottom: 0,
  },
  handleLeft: {
    backgroundColor: '#9C27B0',
    position: 'absolute',
  },
  handleRight: {
    backgroundColor: '#9C27B0',
    position: 'absolute',
  },
  handleDotLeft: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
  },
  handleDotRight: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
  },
});

export default ShoppingBagIcon;
