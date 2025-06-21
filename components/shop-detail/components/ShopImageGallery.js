import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import PageIndicators from '../../PageIndicators';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ShopImageGallery = ({ images }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentPage(page);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image
              source={image}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.indicatorsContainer}>
        <PageIndicators 
          total={images.length} 
          current={currentPage}
        />
      </View>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    height: 300,
    backgroundColor: theme.colors.surface,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  indicatorsContainer: {
    position: 'absolute',
    bottom: theme.spacing.l,
    width: '100%',
    alignItems: 'center',
  },
});

export default ShopImageGallery;
