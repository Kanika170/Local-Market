import React from 'react';
import { View, StyleSheet } from 'react-native';

const PageIndicators = ({ currentPage, totalPages }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalPages }, (_, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            index === currentPage ? styles.activeIndicator : styles.inactiveIndicator
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 24,
    backgroundColor: '#9C27B0',
  },
  inactiveIndicator: {
    width: 8,
    backgroundColor: '#E0E0E0',
  },
});

export default PageIndicators;
