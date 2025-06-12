import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import ProductDetailScreen from './ProductDetailScreen';
import ShopDetailScreen from './ShopDetailScreen';

const CustomerHomeFeed = ({ onNavigateToSearch }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);

  const handleProductPress = (product) => {
    product = {
      id: 1,
      shop: 'Urban Outfitters',
      category: 'Fashion & Apparel',
      name: 'Leather Crossbody Bag',
      price: '$49.99',
      discount: '20% Off',
      description: 'Premium leather crossbody bag with adjustable strap and gold hardware.',
      rating: 4.5,
      reviews: 124,
      image: require('../assets/shopping bag.jpeg'),
    }
    setSelectedProduct(product || null);
  };

  const handleShopPress = (shop) => {
    const shopData = {
      id: 1,
      name: 'Green Grocery Store',
      rating: 4.5,
      reviews: 256,
      location: '123 Market Street, Downtown',
      distance: '2.3 miles away',
      hours: {
        weekday: '8:00 AM - 9:00 PM',
        weekend: '9:00 AM - 7:00 PM'
      },
      image: require('../assets/grocery shop.jpeg'),
    };
    setSelectedShop(shopData);
  };

  if (selectedProduct) {
    return (
      <ProductDetailScreen 
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  if (selectedShop) {
    return (
      <ShopDetailScreen
        shop={selectedShop}
        onBack={() => setSelectedShop(null)}
      />
    );
  }

  // Static data for the feed
  const feedData = [
    {
      id: 1,
      type: 'user_post',
      user: {
        name: 'Sarah Johnson',
        type: 'Customer',
        time: '35 min ago',
        avatar: '👩‍💼'
      },
      content: 'Looking for organic honey in the downtown area. Any shops have special offers this week?',
      tags: ['#organic', '#honey', '#downtown'],
      comments: 3
    },
    {
      id: 2,
      type: 'shop_offer',
      shop: {
        name: 'Green Market',
        verified: true,
        time: '1 hour ago',
        avatar: '🏪'
      },
      content: 'Weekend special! 20% off on all organic produce. Fresh vegetables and fruits just arrived!',
      image: '🥬🥕🍎',
      offer: {
        title: 'Weekend Offer',
        validity: 'Valid until Sunday'
      },
      comments: 8
    },
    {
      id: 3,
      type: 'user_post',
      user: {
        name: 'Mike Chen',
        type: 'Customer',
        time: '3 hours ago',
        avatar: '👨'
      },
      content: 'Anyone know where I can find specialty coffee beans in the north side? Looking for Ethiopian or Colombian single origin.',
      tags: ['#coffee', '#specialty'],
      comments: 5
    },
    {
      id: 4,
      type: 'shop_response',
      shop: {
        name: 'Bean There Coffee Shop',
        verified: true,
        time: '2 hours ago',
        avatar: '☕'
      },
      content: 'We have both Ethiopian Yirgacheffe and Colombian Supremo in stock! 15% off for first-time customers. Located at 123 North Main St.',
      comments: 5
    },
    {
      id: 5,
      type: 'shop_offer',
      shop: {
        name: 'Fresh Bakery',
        verified: true,
        time: '5 hours ago',
        avatar: '🥖'
      },
      content: 'Just baked! Artisanal sourdough bread and pastries available now. Limited quantities!',
      images: ['🍞', '🥐', '🧁'],
      offer: {
        title: 'Today Only!',
        deal: 'Buy 2 Get 1 Free'
      },
      comments: 12
    }
  ];

  const nearbyEvents = [
    {
      id: 1,
      title: 'Summer Sale',
      subtitle: 'Up to 50% off at Fashion',
      distance: '0.5 miles away',
      image: '👕'
    },
    {
      id: 2,
      title: 'Tech Expo',
      subtitle: 'Latest gadgets at TechWin',
      distance: '1.2 miles away',
      image: '📱'
    },
    {
      id: 3,
      title: 'Food Festival',
      subtitle: 'Local restaurants at Downtown',
      distance: '0.8 miles away',
      image: '🍕'
    },
    {
      id: 4,
      title: 'Book Fair',
      subtitle: 'Used books at Community Center',
      distance: '2.1 miles away',
      image: '📚'
    },
    {
      id: 5,
      title: 'Farmers Market',
      subtitle: 'Fresh produce every Saturday',
      distance: '1.5 miles away',
      image: '🥕'
    },
    {
      id: 6,
      title: 'Art Gallery Opening',
      subtitle: 'Local artists showcase',
      distance: '0.9 miles away',
      image: '🎨'
    }
  ];

  const popularProducts = [
    {
      id: 1,
      shop: 'Urban Outfitters',
      category: 'Fashion & Apparel',
      name: 'Leather Crossbody Bag',
      price: '$49.99',
      discount: '20% Off',
      description: 'Premium leather crossbody bag with adjustable strap and gold hardware.',
      rating: 4.5,
      reviews: 124,
      image: '👜'
    },
    {
      id: 2,
      shop: 'TechWorld',
      category: 'Electronics',
      name: 'Wireless Headphones',
      price: '$129.99',
      tag: 'NEW',
      description: 'Noise-cancelling wireless headphones with 30-hour battery life.',
      rating: 4.8,
      reviews: 89,
      image: '🎧'
    },
    {
      id: 3,
      shop: 'Sarah Johnson',
      category: 'Personal Review',
      name: 'Three Haven Coffee',
      price: 'Review',
      description: 'Just found this amazing coffee shop! Their cappuccino is to die for and the ambiance is perfect for working or catching up with friends.',
      rating: 4.9,
      reviews: 45,
      image: '☕',
      distance: '0.3 miles away',
      isReview: true
    },
    {
      id: 4,
      shop: 'Green Grocers',
      category: 'Organic Food',
      name: 'Fresh Produce Just Arrived!',
      price: 'Limited Time Offer',
      description: "We've just received our weekly shipment of organic fruits and vegetables. Come by today for the freshest picks!",
      rating: 4.7,
      reviews: 156,
      image: '🥬',
      offer: 'Limited Time Offer - 10% off all produce until Sunday',
      isShopPost: true
    },
    {
      id: 5,
      shop: 'BookWorm Corner',
      category: 'Books & Literature',
      name: 'Vintage Book Collection',
      price: '$15.99 - $45.99',
      description: 'Rare and vintage books collection including first editions and signed copies.',
      rating: 4.6,
      reviews: 78,
      image: '📖'
    },
    {
      id: 6,
      shop: 'Fitness Plus',
      category: 'Sports & Fitness',
      name: 'Yoga Mat Premium',
      price: '$29.99',
      discount: '15% Off',
      description: 'Non-slip yoga mat with extra cushioning. Perfect for home workouts.',
      rating: 4.4,
      reviews: 203,
      image: '🧘‍♀️'
    },
    {
      id: 7,
      shop: 'Home Decor Studio',
      category: 'Home & Garden',
      name: 'Ceramic Plant Pots Set',
      price: '$24.99',
      tag: 'TRENDING',
      description: 'Set of 3 handcrafted ceramic pots perfect for indoor plants.',
      rating: 4.7,
      reviews: 92,
      image: '🪴'
    },
    {
      id: 8,
      shop: 'Gourmet Kitchen',
      category: 'Kitchen & Dining',
      name: 'Stainless Steel Cookware',
      price: '$89.99',
      discount: '25% Off',
      description: 'Professional-grade stainless steel cookware set with non-stick coating.',
      rating: 4.5,
      reviews: 167,
      image: '🍳'
    },
    {
      id: 9,
      shop: 'Pet Paradise',
      category: 'Pet Supplies',
      name: 'Interactive Dog Toy',
      price: '$19.99',
      description: 'Keep your furry friend entertained with this puzzle toy.',
      rating: 4.3,
      reviews: 134,
      image: '🐕'
    },
    {
      id: 10,
      shop: 'Beauty Bliss',
      category: 'Beauty & Personal Care',
      name: 'Organic Face Mask Set',
      price: '$34.99',
      tag: 'BESTSELLER',
      description: 'Natural ingredients face mask set for all skin types.',
      rating: 4.8,
      reviews: 245,
      image: '🧴'
    }
  ];

  const renderFeedItem = (item) => {
    const isShopPost = item.type === 'shop_offer' || item.type === 'shop_response';
    const author = isShopPost ? item.shop : item.user;

    return (
      <View key={item.id} style={[styles.feedItem, isShopPost && styles.shopFeedItem]}>
        <View style={styles.feedHeader}>
          <Text style={styles.avatar}>{author.avatar}</Text>
          <TouchableOpacity 
            style={styles.authorInfo}
            onPress={() => isShopPost ? handleShopPress(item) : null}
          >
            <View style={styles.authorNameRow}>
              <Text style={styles.authorName}>{author.name}</Text>
              {author.verified && <Text style={styles.verifiedBadge}>Verified Shop</Text>}
            </View>
            <Text style={styles.authorMeta}>
              {author.type || 'Shop'} • {author.time}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.feedContent}>{item.content}</Text>

        {item.tags && (
          <View style={styles.tagsContainer}>
            {item.tags.map((tag, index) => (
              <Text key={index} style={styles.tag}>{tag}</Text>
            ))}
          </View>
        )}

        {item.image && (
          <View style={styles.imageContainer}>
            <Text style={styles.feedImage}>{item.image}</Text>
          </View>
        )}

        {item.images && (
          <View style={styles.imagesContainer}>
            {item.images.map((img, index) => (
              <Text key={index} style={styles.feedImageSmall}>{img}</Text>
            ))}
          </View>
        )}

        {item.offer && (
          <View style={styles.offerContainer}>
            <View style={styles.offerBadge}>
              <Text style={styles.offerTitle}>{item.offer.title}</Text>
              <Text style={styles.offerDetails}>
                {item.offer.validity || item.offer.deal}
              </Text>
            </View>
            <TouchableOpacity style={styles.offerButton}>
              <Text style={styles.offerButtonText}>
                {item.offer.deal ? 'Claim' : 'Save'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.feedActions}>
          <TouchableOpacity>
            <Text style={styles.actionText}>Comment ({item.comments})</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderProductCard = (product) => {
    return (
      <View 
        key={product.id} 
        style={[
          styles.productCard,
          product.isShopPost && styles.shopProductCard
        ]}
      >
        <View style={styles.productHeader}>
          <Text style={styles.productShop}>{product.shop}</Text>
          <Text style={styles.productCategory}>{product.category}</Text>
          {product.distance && (
            <Text style={styles.productDistance}>{product.distance}</Text>
          )}
        </View>
        
        <View style={styles.productContent}>
          <Text style={styles.productImage}>{product.image}</Text>
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
            {product.discount && (
              <Text style={styles.productDiscount}>{product.discount}</Text>
            )}
            {product.tag && (
              <Text style={styles.productTag}>{product.tag}</Text>
            )}
            <Text style={styles.productDescription} numberOfLines={2}>{product.description}</Text>
            <Text style={styles.productRating}>⭐ {product.rating} ({product.reviews})</Text>
          </View>
        </View>

        {product.offer && (
          <View style={styles.productOfferContainer}>
            <Text style={styles.productOfferText}>{product.offer}</Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={[
            styles.viewDetailsButton,
            product.isReview && styles.visitShopButton,
            product.isShopPost && styles.visitShopButton
          ]}
          onPress={() => product.isReview || product.isShopPost ? handleShopPress(product) : handleProductPress(product)}
        >
          <Text style={styles.viewDetailsText}>
            {product.isReview ? 'View Shop' : product.isShopPost ? 'Visit Shop' : 'View Details'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderTabContent = () => {
    if (activeTab === 'Home') {
      return (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Feed</Text>
          {feedData.map(renderFeedItem)}

          <Text style={styles.sectionTitle}>Nearby Events</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.eventsContainer}>
            {nearbyEvents.map((event) => (
              <TouchableOpacity 
                key={event.id} 
                style={styles.eventCard}
                onPress={() => handleProductPress(event)}
              >
                <Text style={styles.eventImage}>{event.image}</Text>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
                  <Text style={styles.eventDistance}>{event.distance}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Popular Products</Text>
          <View style={styles.productsGrid}>
            {popularProducts.map(renderProductCard)}
          </View>
        </ScrollView>
      );
    } else if (activeTab === 'Search') {
      return (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search products, shops, events..."
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.filterContainer}>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Distance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Category</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Offers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>More</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Nearby Events</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.eventsContainer}>
            {nearbyEvents.map((event) => (
              <TouchableOpacity 
                key={event.id} 
                style={styles.eventCard}
                onPress={() => handleProductPress(event)}
              >
                <Text style={styles.eventImage}>{event.image}</Text>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventSubtitle}>{event.subtitle}</Text>
                  <Text style={styles.eventDistance}>{event.distance}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Popular Products</Text>
          <View style={styles.productsGrid}>
            {popularProducts.map(renderProductCard)}
          </View>
        </ScrollView>
      );
    }
    
    return (
      <View style={styles.content}>
        <Text style={styles.comingSoon}>Coming Soon!</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerIcon}>🛍️</Text>
          <Text style={styles.headerTitle}>Shopping Companion</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Sell</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      {renderTabContent()}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('Home')}
        >
          <Image 
            source={require('../assets/6389f902-d158-468d-8f00-45bbb02103b2.png')} 
            style={[styles.navIcon, activeTab === 'Home' && styles.activeNavIcon]} 
          />
          <Text style={[styles.navText, activeTab === 'Home' && styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('Search')}
        >
          <Text style={[styles.navIcon, activeTab === 'Search' && styles.activeNavIcon]}>🔍</Text>
          <Text style={[styles.navText, activeTab === 'Search' && styles.activeNavText]}>Search</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('Lists')}
        >
          <Text style={[styles.navIcon, activeTab === 'Lists' && styles.activeNavIcon]}>📋</Text>
          <Text style={[styles.navText, activeTab === 'Lists' && styles.activeNavText]}>Lists</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => setActiveTab('Profile')}
        >
          <Text style={[styles.navIcon, activeTab === 'Profile' && styles.activeNavIcon]}>👤</Text>
          <Text style={[styles.navText, activeTab === 'Profile' && styles.activeNavText]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#9C27B0',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginLeft: 8,
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 80, // Add padding for absolute positioned bottom nav
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginTop: 20,
    marginBottom: 16,
  },
  feedItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  shopFeedItem: {
    borderColor: '#9C27B0',
    borderWidth: 2,
  },
  feedHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatar: {
    fontSize: 24,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  verifiedBadge: {
    backgroundColor: '#9C27B0',
    color: '#FFFFFF',
    fontSize: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  authorMeta: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  feedContent: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    color: '#9C27B0',
    fontSize: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  feedImage: {
    fontSize: 60,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  feedImageSmall: {
    fontSize: 40,
  },
  offerContainer: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  offerBadge: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9800',
  },
  offerDetails: {
    fontSize: 12,
    color: '#666666',
  },
  offerButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FF9800',
  },
  offerButtonText: {
    color: '#FF9800',
    fontSize: 12,
    fontWeight: '500',
  },
  feedActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionText: {
    color: '#666666',
    fontSize: 14,
  },
  searchContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  filterText: {
    color: '#666666',
    fontSize: 14,
  },
  eventsContainer: {
    marginBottom: 20,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  eventImage: {
    fontSize: 40,
    marginRight: 16,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  eventSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  eventDistance: {
    fontSize: 12,
    color: '#9C27B0',
    marginTop: 4,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productHeader: {
    marginBottom: 12,
  },
  productShop: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  productCategory: {
    fontSize: 12,
    color: '#666666',
  },
  productContent: {
    marginBottom: 16,
  },
  productImage: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 4,
  },
  productDiscount: {
    fontSize: 12,
    color: '#FF9800',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  productTag: {
    fontSize: 12,
    color: '#9C27B0',
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 16,
    marginBottom: 4,
  },
  productRating: {
    fontSize: 12,
    color: '#666666',
  },
  shopProductCard: {
    borderColor: '#9C27B0',
    borderWidth: 2,
  },
  productDistance: {
    fontSize: 12,
    color: '#9C27B0',
    marginTop: 4,
  },
  productOfferContainer: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  productOfferText: {
    color: '#FF9800',
    fontSize: 14,
    fontWeight: '500',
  },
  viewDetailsButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 12,
    borderRadius: 8,
  },
  visitShopButton: {
    backgroundColor: '#FF9800',
  },
  viewDetailsText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
    paddingBottom: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    width: 20,
    height: 20,
    marginBottom: 4,
    tintColor: '#666666',
  },
  activeNavIcon: {
    tintColor: '#9C27B0',
  },
  navText: {
    fontSize: 12,
    color: '#666666',
  },
  activeNavText: {
    color: '#9C27B0',
    fontWeight: '500',
  },
  comingSoon: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666666',
    marginTop: 100,
  },
});

export default CustomerHomeFeed;
