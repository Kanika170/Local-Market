import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';

export const useScrollAnimation = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const scrollDirection = useRef('up');
  const scrollTimeout = useRef(null);
  const isScrolling = useRef(false);
  
  // Animation value for bottom bar (0 = hidden, 1 = visible)
  const bottomBarTranslateY = useRef(new Animated.Value(1)).current;
  
  const hideBottomBar = useCallback(() => {
    Animated.timing(bottomBarTranslateY, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [bottomBarTranslateY]);
  
  const showBottomBar = useCallback(() => {
    Animated.timing(bottomBarTranslateY, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [bottomBarTranslateY]);
  
  const handleScroll = useCallback((event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const scrollDelta = currentScrollY - lastScrollY.current;
    
    // Only handle scroll if there's significant movement
    if (Math.abs(scrollDelta) < 5) return;
    
    // Determine scroll direction
    const newDirection = scrollDelta > 0 ? 'down' : 'up';
    
    // Don't hide bottom bar if we're at the top
    if (currentScrollY <= 50) {
      showBottomBar();
      lastScrollY.current = currentScrollY;
      return;
    }
    
    // Handle direction change
    if (newDirection !== scrollDirection.current) {
      scrollDirection.current = newDirection;
      
      if (newDirection === 'down') {
        hideBottomBar();
      } else {
        showBottomBar();
      }
    }
    
    lastScrollY.current = currentScrollY;
    isScrolling.current = true;
    
    // Clear existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    // Set timeout to show bottom bar when scrolling stops
    scrollTimeout.current = setTimeout(() => {
      isScrolling.current = false;
      showBottomBar();
    }, 1000); // Show after 1 second of no scrolling
    
  }, [hideBottomBar, showBottomBar]);
  
  const scrollEventThrottle = 16; // 60fps
  
  return {
    scrollY,
    bottomBarTranslateY,
    handleScroll,
    scrollEventThrottle,
    showBottomBar,
    hideBottomBar,
  };
};
