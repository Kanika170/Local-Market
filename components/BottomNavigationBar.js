import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import HomeIcon from './icons/HomeIcon';
import SearchIcon from './icons/SearchIcon';
import ShoppingBagIcon from './icons/ShoppingBagIcon';
import ProfileIcon from './icons/ProfileIcon';

const BottomNavigationBar = ({ navigation, activeTab }) => {
  return (
    <View style={[
      styles.container,
      { paddingBottom: Platform.OS === 'ios' ? 34 : 10 }
    ]}>
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('CustomerHomeFeed')}
      >
        <HomeIcon 
          size={24} 
          color={activeTab === 'Home' ? '#9C27B0' : '#666666'} 
        />
        <Text style={[
          styles.navText,
          activeTab === 'Home' && styles.activeText
        ]}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('SmartProductSearch')}
      >
        <SearchIcon 
          size={24} 
          color={activeTab === 'Search' ? '#9C27B0' : '#666666'} 
        />
        <Text style={[
          styles.navText,
          activeTab === 'Search' && styles.activeText
        ]}>Search</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Lists')}
      >
        <ShoppingBagIcon 
          size={24} 
          color={activeTab === 'Lists' ? '#9C27B0' : '#666666'} 
        />
        <Text style={[
          styles.navText,
          activeTab === 'Lists' && styles.activeText
        ]}>Lists</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <ProfileIcon 
          size={24} 
          color={activeTab === 'Profile' ? '#9C27B0' : '#666666'} 
        />
        <Text style={[
          styles.navText,
          activeTab === 'Profile' && styles.activeText
        ]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  activeText: {
    color: '#9C27B0',
    fontWeight: '500',
  },
});

export default BottomNavigationBar;
