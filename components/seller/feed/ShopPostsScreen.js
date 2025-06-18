import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ShopPostsScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('Latest');

  // Mock posts data matching the design
  const [posts] = useState([
    {
      id: 1,
      shopName: 'Green Harvest Organics',
      shopIcon: '🌿',
      timeAgo: '4 hours ago',
      distance: '0.8 miles away',
      type: 'NEW ARRIVALS',
      title: 'Fresh Organic Produce!',
      description: 'Just received a fresh batch of organic strawberries, blueberries, and avocados! All locally sourced and pesticide-free. Limited quantities available!',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      likes: 42,
      comments: 8,
      hasViewProducts: true,
    },
    {
      id: 2,
      shopName: 'Artisan Bakery',
      shopIcon: '🥖',
      timeAgo: '5 hours ago',
      distance: '1.2 miles away',
      type: 'SPECIAL OFFER',
      title: 'Buy 1 Get 1 Free!',
      description: 'Today only! Buy any loaf of our signature sourdough bread and get a second one free! Perfect for weekend brunches. Offer valid until 6 PM.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      likes: 31,
      comments: 12,
      hasViewProducts: true,
      badge: '50% Off',
    },
    {
      id: 3,
      shopName: 'Fresh Catch Seafood',
      shopIcon: '🐟',
      timeAgo: '8 hours ago',
      distance: '1.5 miles away',
      type: 'WEEKEND SPECIAL',
      title: 'Wild-Caught Salmon',
      description: 'Just in! Premium wild-caught salmon delivered fresh this morning. Perfect for grilling or baking. Limited stock available at ₹599/lb.',
      image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400',
      likes: 24,
      comments: 5,
      hasViewProducts: true,
    },
    {
      id: 4,
      shopName: 'Tech Haven',
      shopIcon: '📱',
      timeAgo: '12 hours ago',
      distance: '2.1 miles away',
      type: 'NEW STOCK',
      title: 'Latest Smartphone Accessories',
      description: 'Just received our new collection of premium phone cases, wireless chargers, and screen protectors. 15% off for the first 20 customers!',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      likes: 18,
      comments: 3,
      hasViewProducts: true,
    },
  ]);

  const filters = ['Latest', 'Popular'];

  const getTypeColor = (type) => {
    switch (type) {
      case 'NEW ARRIVALS': return '#4CAF50';
      case 'SPECIAL OFFER': return '#FF9800';
      case 'WEEKEND SPECIAL': return '#2196F3';
      case 'NEW STOCK': return '#9C27B0';
      default: return '#9C27B0';
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      {/* Shop Header */}
      <View style={styles.shopHeader}>
        <View style={styles.shopInfo}>
          <View style={styles.shopIcon}>
            <Text style={styles.shopIconText}>{item.shopIcon}</Text>
          </View>
          <View style={styles.shopDetails}>
            <Text style={styles.shopName}>{item.shopName}</Text>
            <Text style={styles.postMeta}>
              Posted {item.timeAgo} • {item.distance}
            </Text>
          </View>
        </View>
        {item.badge && (
          <View style={[styles.badge, { backgroundColor: getTypeColor(item.type) }]}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
      </View>

      {/* Post Type Badge */}
      <View style={[styles.typeBadge, { backgroundColor: `${getTypeColor(item.type)}20` }]}>
        <Text style={[styles.typeText, { color: getTypeColor(item.type) }]}>
          {item.type}: {item.title}
        </Text>
      </View>

      {/* Post Content */}
      <Text style={styles.postDescription}>{item.description}</Text>

      {/* Post Image */}
      <Image source={{ uri: item.image }} style={styles.postImage} />

      {/* Post Actions */}
      <View style={styles.postActions}>
        <View style={styles.engagementStats}>
          <Text style={styles.statText}>{item.likes}</Text>
          <Text style={styles.statText}>{item.comments}</Text>
        </View>
        {item.hasViewProducts && (
          <TouchableOpacity style={styles.viewProductsButton}>
            <Text style={styles.viewProductsText}>View Products</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🏪</Text>
            <Text style={styles.logoText}>Local Market</Text>
          </View>
        </View>
        <View style={styles.headerBottom}>
          <Text style={styles.headerTitle}>Shop Posts</Text>
          <View style={styles.filterContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  selectedFilter === filter && styles.selectedFilter,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === filter && styles.selectedFilterText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Posts List */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.postsList}
        showsVerticalScrollIndicator={false}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Icon name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    header: {
      backgroundColor: '#C6FF00',
      paddingTop: 50,
      paddingBottom: 16,
    },
    headerTop: {
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoIcon: {
      fontSize: 20,
      marginRight: 8,
    },
    logoText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#9C27B0',
    },
    headerBottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: '#9C27B0',
    },
    filterContainer: {
      flexDirection: 'row',
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: 'rgba(156, 39, 176, 0.1)',
      marginLeft: 8,
    },
    selectedFilter: {
      backgroundColor: '#9C27B0',
    },
    filterText: {
      fontSize: 14,
      color: '#9C27B0',
      fontWeight: '500',
    },
    selectedFilterText: {
      color: '#FFFFFF',
    },
    postsList: {
      padding: 16,
    },
    postCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    shopHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    shopInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    shopIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(156, 39, 176, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    shopIconText: {
      fontSize: 20,
    },
    shopDetails: {
      flex: 1,
    },
    shopName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#9C27B0',
      marginBottom: 2,
    },
    postMeta: {
      fontSize: 12,
      color: '#666666',
    },
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    badgeText: {
      fontSize: 12,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    typeBadge: {
      alignSelf: 'flex-start',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      marginBottom: 12,
    },
    typeText: {
      fontSize: 14,
      fontWeight: '600',
    },
    postDescription: {
      fontSize: 14,
      color: '#333333',
      lineHeight: 20,
      marginBottom: 12,
    },
    postImage: {
      width: '100%',
      height: 200,
      borderRadius: 8,
      marginBottom: 12,
    },
    postActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    engagementStats: {
      flexDirection: 'row',
    },
    statText: {
      fontSize: 14,
      color: '#9C27B0',
      fontWeight: '500',
      marginRight: 16,
    },
    viewProductsButton: {
      backgroundColor: '#C6FF00',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    viewProductsText: {
      fontSize: 14,
      color: '#9C27B0',
      fontWeight: '600',
    },
    fab: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#9C27B0',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
  });

export default ShopPostsScreen;
