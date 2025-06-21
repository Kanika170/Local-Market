import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/useTheme';

const PostCard = ({ post, isLiked, onLike, onComment, onShare }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.cardContainer}>
      <Image source={post.image} style={styles.image} />
      <Text style={styles.title}>{post?.title}</Text>
      <Text style={styles.body}>{post?.content}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={onLike} style={styles.actionButton}>
          <Icon
            name={isLiked ? 'heart' : 'heart-outline'}
            size={20}
            color={isLiked ? theme.colors.error : theme.colors.text.tertiary}
          />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onComment} style={styles.actionButton}>
          <Icon name="comment-outline" size={20} color={theme.colors.text.tertiary} />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare} style={styles.actionButton}>
          <Icon name="share-outline" size={20} color={theme.colors.text.tertiary} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Dairy', 'Bakery', 'Shop Update'];

  const staticPosts = [
    {
      id: '1',
      title: 'Organic Milk Available!',
      content: 'Fresh organic milk sourced from local farms.',
      category: 'Dairy',
      image: require('../../../assets/organic_milk.jpeg'),
    },
    {
      id: '2',
      title: 'Sourdough Bread Now in Stock!',
      content: 'Try our freshly baked sourdough bread.',
      category: 'Bakery',
      image: require('../../../assets/sourdough_bread.jpeg'),
    },
    {
      id: '3',
      title: 'Shop with Us!',
      content: 'Check out our latest arrivals and updates.',
      category: 'Shop Update',
      image: require('../../../assets/shopping bag.jpeg'),
    },
  ];

  const filteredPosts =
    selectedCategory === 'All'
      ? staticPosts
      : staticPosts.filter((post) => post.category === selectedCategory);

  const handleLike = (id) => {
    // Implement like logic
  };

  const handleComment = (id) => {
    // Implement comment logic
  };

  const handleShare = (id) => {
    // Implement share logic
  };

  return (
    <View style={styles.container}>
      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryScrollContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.selectedCategoryChip,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category && styles.selectedCategoryChipText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Posts */}
      <ScrollView contentContainerStyle={styles.postsList}>
        {filteredPosts.map((post) => (
          <View key={post.id} style={styles.postWrapper}>
            <Text style={styles.categoryLabel}>{post.category}</Text>
            <PostCard
              post={post}
              isLiked={false}
              onLike={() => handleLike(post.id)}
              onComment={() => handleComment(post.id)}
              onShare={() => handleShare(post.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    categoryScroll: {
      paddingVertical: theme.spacing.s,
      backgroundColor: theme.colors.background,
    },
    categoryScrollContent: {
      paddingHorizontal: theme.spacing.m,
      alignItems: 'center',
    },
    categoryChip: {
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 10,
      borderWidth: 1,
      borderColor: theme.components.card.borderColor,
    },
    selectedCategoryChip: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    categoryChipText: {
      color: theme.colors.text.primary,
      fontSize: 14,
      fontWeight: '500',
    },
    selectedCategoryChipText: {
      color: theme.colors.text.inverse,
    },
    postsList: {
      padding: theme.spacing.m,
    },
    postWrapper: {
      marginBottom: theme.spacing.l,
    },
    categoryLabel: {
      fontSize: 12,
      color: theme.colors.primary,
      fontWeight: '600',
      marginBottom: 4,
      marginLeft: 4,
    },
    cardContainer: {
      backgroundColor: theme.components.card.backgroundColor,
      borderRadius: theme.borderRadius.m,
      padding: theme.spacing.m,
      borderWidth: 1,
      borderColor: theme.components.card.borderColor,
      ...theme.shadows.default,
    },
    image: {
      width: '100%',
      height: 150,
      borderRadius: theme.borderRadius.s,
      marginBottom: theme.spacing.s,
    },
    title: {
      ...theme.typography.h3,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.s,
    },
    body: {
      ...theme.typography.body1,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.m,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: theme.spacing.s,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    actionText: {
      marginLeft: 6,
      color: theme.colors.text.tertiary,
      fontSize: 14,
    },
  });

export default App;