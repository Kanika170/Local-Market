import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useTheme } from '../../../theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ActionButton = ({ icon, label, color }) => (
  <View style={styles.actionButton}>
    <Icon name={icon} size={20} color={color} />
    <Text style={[styles.actionText, { color }]}>{label}</Text>
  </View>
);

const OfferCard = ({ offerDetails }) => (
  <View style={styles.offerCard}>
    <Text style={styles.offerTitle}>{offerDetails.title}</Text>
    {offerDetails.discount ? (
      <Text style={styles.offerDiscount}>{offerDetails.discount}</Text>
    ) : null}
    {offerDetails.validUntil ? (
      <Text style={styles.offerValidity}>Valid until: {offerDetails.validUntil}</Text>
    ) : null}
  </View>
);

const PostPreview = ({ postData, shopData }) => {
  const { theme } = useTheme();

  const renderImages = () => {
    if (!postData.images || postData.images.length === 0) return null;
    return (
      <FlatList
        horizontal
        data={postData.images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.previewImage} />
        )}
        style={styles.imageList}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  const postTypeTemplates = {
    general: { bgColor: '#F5F5F5', icon: 'post' },
    offer: { bgColor: '#FFF3E0', icon: 'tag' },
    new_arrival: { bgColor: '#E8F5E9', icon: 'new-box' },
    limited_stock: { bgColor: '#FFEBEE', icon: 'alert-circle' },
  };

  const template = postTypeTemplates[postData.type] || {};

  return (
    <View style={[styles.container, { borderColor: theme.colors.border, backgroundColor: template.bgColor || theme.colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.shopName, { color: theme.colors.text.primary }]}>
          {shopData?.shopName || 'Your Shop'}
        </Text>
        <Text style={[styles.time, { color: theme.colors.text.secondary }]}>Just now</Text>
      </View>

      <Text style={[styles.contentText, { color: theme.colors.text.primary }]}>
        {postData.content || 'Your post content will appear here...'}
      </Text>

      {postData.type === 'offer' && postData.offerDetails?.title ? (
        <OfferCard offerDetails={postData.offerDetails} />
      ) : null}

      {renderImages()}

      <View style={styles.actionsContainer}>
        <ActionButton icon="heart-outline" label="Like" color={theme.colors.text.secondary} />
        <ActionButton icon="comment-outline" label="Comment" color={theme.colors.text.secondary} />
        <ActionButton icon="share-outline" label="Share" color={theme.colors.text.secondary} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  shopName: {
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
  },
  contentText: {
    fontSize: 15,
    marginBottom: 12,
    lineHeight: 22,
  },
  offerCard: {
    backgroundColor: '#FF9800',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  offerDiscount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginTop: 4,
  },
  offerValidity: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
  imageList: {
    marginBottom: 12,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#eee',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
  },
});

export default PostPreview;
