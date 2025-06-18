import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSeller } from '../../../context/SellerContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { sellerTheme } from '../../../theme/sellerTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';
import SellerCard from '../common/SellerCard';
import StatsCard from '../common/StatsCard';
import QuickAction from '../common/QuickAction';

const SellerDashboardScreen = () => {
  const navigation = useNavigation();
  const { shopData, analytics, notifications, refreshAnalytics } = useSeller();
  const [refreshing, setRefreshing] = React.useState(false);
  const styles = createSellerStyles(sellerTheme);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshAnalytics();
    setTimeout(() => setRefreshing(false), 1000);
  }, [refreshAnalytics]);

  const quickActions = [
    { 
      title: 'Add Product', 
      icon: 'plus-circle', 
      color: sellerTheme.colors.primary,
      action: () => navigation.navigate('AddProduct') 
    },
    { 
      title: 'View Orders', 
      icon: 'clipboard-list', 
      color: sellerTheme.colors.secondary,
      action: () => navigation.navigate('Orders') 
    },
    { 
      title: 'Create Post', 
      icon: 'post', 
      color: sellerTheme.colors.accent,
      action: () => navigation.navigate('Posts') 
    },
    { 
      title: 'Messages', 
      icon: 'message-text', 
      color: sellerTheme.colors.warning,
      action: () => navigation.navigate('Chat') 
    },
    { 
      title: 'Analytics', 
      icon: 'chart-line', 
      color: sellerTheme.colors.info,
      action: () => navigation.navigate('Analytics') 
    },
    { 
      title: 'Settings', 
      icon: 'cog', 
      color: sellerTheme.colors.text.secondary,
      action: () => navigation.navigate('Settings') 
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={sellerTheme.colors.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 50,
          paddingBottom: 20,
          paddingHorizontal: sellerTheme.spacing.m,
        }}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{
              ...sellerTheme.typography.body1,
              color: sellerTheme.colors.text.inverse,
              opacity: 0.9,
            }}>
              {getGreeting()}!
            </Text>
            <Text style={{
              ...sellerTheme.typography.h3,
              color: sellerTheme.colors.text.inverse,
              fontWeight: '700',
              marginTop: 4,
            }}>
              {shopData?.shopName || 'Your Shop'}
            </Text>
            <Text style={{
              ...sellerTheme.typography.body2,
              color: sellerTheme.colors.text.inverse,
              opacity: 0.8,
              marginTop: 2,
            }}>
              {shopData?.ownerName || 'Shop Owner'}
            </Text>
          </View>
          
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
              padding: 12,
              position: 'relative',
            }}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Icon name="bell" size={24} color={sellerTheme.colors.text.inverse} />
            {notifications.filter(n => !n.isRead).length > 0 && (
              <View style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: sellerTheme.colors.error,
              }} />
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Stats Cards */}
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: sellerTheme.spacing.m,
          paddingTop: sellerTheme.spacing.m,
          gap: sellerTheme.spacing.s,
        }}>
          <View style={{ flex: 1 }}>
            <StatsCard
              title="Today's Sales"
              value={`₹${analytics.today?.sales?.toLocaleString() || 0}`}
              icon="currency-inr"
              change={15}
              type="revenue"
            />
          </View>
          <View style={{ flex: 1 }}>
            <StatsCard
              title="Orders"
              value={analytics.today?.orders || 0}
              icon="clipboard-list"
              change={8}
              type="orders"
            />
          </View>
        </View>

        <View style={{
          flexDirection: 'row',
          paddingHorizontal: sellerTheme.spacing.m,
          gap: sellerTheme.spacing.s,
        }}>
          <View style={{ flex: 1 }}>
            <StatsCard
              title="Visitors"
              value={analytics.today?.visitors || 0}
              icon="eye"
              change={-3}
              type="success"
            />
          </View>
          <View style={{ flex: 1 }}>
            <StatsCard
              title="New Followers"
              value={analytics.today?.newCustomers || 0}
              icon="account-plus"
              change={12}
              type="primary"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: sellerTheme.spacing.m, marginTop: sellerTheme.spacing.m }}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -sellerTheme.spacing.xs,
          }}>
            {quickActions.map((action, index) => (
              <View key={index} style={{ width: '33.33%', marginBottom: sellerTheme.spacing.s }}>
                <QuickAction
                  title={action.title}
                  icon={action.icon}
                  color={action.color}
                  onPress={action.action}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Monthly Overview */}
        <View style={{ paddingHorizontal: sellerTheme.spacing.m }}>
          <SellerCard
            title="Monthly Overview"
            subtitle="Your business performance this month"
            icon="chart-box"
            iconColor={sellerTheme.colors.accent}
          >
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: sellerTheme.spacing.s,
            }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  ...sellerTheme.typography.h4,
                  color: sellerTheme.colors.primary,
                  fontWeight: '700',
                }}>
                  ₹{analytics.thisMonth?.sales?.toLocaleString() || 0}
                </Text>
                <Text style={{
                  ...sellerTheme.typography.caption,
                  color: sellerTheme.colors.text.secondary,
                }}>
                  Total Sales
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  ...sellerTheme.typography.h4,
                  color: sellerTheme.colors.secondary,
                  fontWeight: '700',
                }}>
                  {analytics.thisMonth?.orders || 0}
                </Text>
                <Text style={{
                  ...sellerTheme.typography.caption,
                  color: sellerTheme.colors.text.secondary,
                }}>
                  Total Orders
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  ...sellerTheme.typography.h4,
                  color: sellerTheme.colors.success,
                  fontWeight: '700',
                }}>
                  +{analytics.thisMonth?.growth || 0}%
                </Text>
                <Text style={{
                  ...sellerTheme.typography.caption,
                  color: sellerTheme.colors.text.secondary,
                }}>
                  Growth
                </Text>
              </View>
            </View>
          </SellerCard>
        </View>

        {/* Top Products */}
        <View style={{ paddingHorizontal: sellerTheme.spacing.m }}>
          <SellerCard
            title="Top Performing Products"
            subtitle="Your best sellers this month"
            icon="star"
            iconColor={sellerTheme.colors.warning}
          >
            {analytics.topProducts?.map((product, index) => (
              <View
                key={product.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: sellerTheme.spacing.s,
                  borderBottomWidth: index < analytics.topProducts.length - 1 ? 1 : 0,
                  borderBottomColor: sellerTheme.colors.divider,
                }}
              >
                <View style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: sellerTheme.colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: sellerTheme.spacing.m,
                }}>
                  <Text style={{
                    ...sellerTheme.typography.caption,
                    color: sellerTheme.colors.text.inverse,
                    fontWeight: '600',
                  }}>
                    {index + 1}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    ...sellerTheme.typography.body1,
                    color: sellerTheme.colors.text.primary,
                    fontWeight: '500',
                  }}>
                    {product.name}
                  </Text>
                </View>
                <Text style={{
                  ...sellerTheme.typography.body2,
                  color: sellerTheme.colors.primary,
                  fontWeight: '600',
                }}>
                  {product.sales} sold
                </Text>
              </View>
            ))}
          </SellerCard>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = createSellerStyles(sellerTheme);

export default SellerDashboardScreen;
