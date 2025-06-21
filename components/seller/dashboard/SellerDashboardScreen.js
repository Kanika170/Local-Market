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
import { useTheme } from '../../../theme/useTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';
import SellerCard from '../common/SellerCard';
import StatsCard from '../common/StatsCard';
import QuickAction from '../common/QuickAction';

const SellerDashboardScreen = () => {
  const navigation = useNavigation();
  const { shopData, analytics, notifications, refreshAnalytics } = useSeller();
  const [refreshing, setRefreshing] = React.useState(false);
  const { theme } = useTheme();
  const styles = createSellerStyles(theme);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshAnalytics();
    setTimeout(() => setRefreshing(false), 1000);
  }, [refreshAnalytics]);

  const quickActions = [
    { 
      title: 'Add Product', 
      icon: 'plus-circle', 
      color: theme.colors.primary,
      action: () => navigation.navigate('AddProduct') 
    },
    { 
      title: 'View Orders', 
      icon: 'clipboard-list', 
      color: theme.colors.secondary,
      action: () => navigation.navigate('Orders') 
    },
    { 
      title: 'Create Post', 
      icon: 'post', 
      color: theme.colors.accent || theme.colors.info,
      action: () => navigation.navigate('Posts') 
    },
    { 
      title: 'Messages', 
      icon: 'message-text', 
      color: theme.colors.warning,
      action: () => navigation.navigate('Chat') 
    },
    { 
      title: 'Analytics', 
      icon: 'chart-line', 
      color: theme.colors.info,
      action: () => navigation.navigate('Analytics') 
    },
    { 
      title: 'Settings', 
      icon: 'cog', 
      color: theme.colors.text.secondary,
      action: () => navigation.navigate('Settings') 
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Fallback for gradients if not available in theme
  const getGradientColors = () => {
    if (theme.colors.gradients && theme.colors.gradients.primary) {
      return theme.colors.gradients.primary;
    }
    return [theme.colors.primary, theme.colors.primary];
  };

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 50,
          paddingBottom: 20,
          paddingHorizontal: theme.spacing.m,
        }}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{
              ...theme.typography.body1,
              color: theme.colors.text.inverse,
              opacity: 0.9,
            }}>
              {getGreeting()}!
            </Text>
            <Text style={{
              ...theme.typography.h3,
              color: theme.colors.text.inverse,
              fontWeight: '700',
              marginTop: 4,
            }}>
              {shopData?.shopName || 'Your Shop'}
            </Text>
            <Text style={{
              ...theme.typography.body2,
              color: theme.colors.text.inverse,
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
            onPress={() => navigation.navigate('ShopNotificationScreen')}
          >
            <Icon name="bell" size={24} color={theme.colors.text.inverse} />
            {notifications.filter(n => !n.isRead).length > 0 && (
              <View style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: theme.colors.error,
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
          paddingHorizontal: theme.spacing.m,
          paddingTop: theme.spacing.m,
          gap: theme.spacing.s,
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
          paddingHorizontal: theme.spacing.m,
          gap: theme.spacing.s,
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
        <View style={{ paddingHorizontal: theme.spacing.m, marginTop: theme.spacing.m }}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: -theme.spacing.xs,
          }}>
            {quickActions.map((action, index) => (
              <View key={index} style={{ width: '33.33%', marginBottom: theme.spacing.s }}>
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
        <View style={{ paddingHorizontal: theme.spacing.m }}>
          <SellerCard
            title="Monthly Overview"
            subtitle="Your business performance this month"
            icon="chart-box"
            iconColor={theme.colors.accent || theme.colors.info}
          >
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: theme.spacing.s,
            }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  ...theme.typography.h4,
                  color: theme.colors.primary,
                  fontWeight: '700',
                }}>
                  ₹{analytics.thisMonth?.sales?.toLocaleString() || 0}
                </Text>
                <Text style={{
                  ...theme.typography.caption,
                  color: theme.colors.text.secondary,
                }}>
                  Total Sales
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  ...theme.typography.h4,
                  color: theme.colors.secondary,
                  fontWeight: '700',
                }}>
                  {analytics.thisMonth?.orders || 0}
                </Text>
                <Text style={{
                  ...theme.typography.caption,
                  color: theme.colors.text.secondary,
                }}>
                  Total Orders
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  ...theme.typography.h4,
                  color: theme.colors.success,
                  fontWeight: '700',
                }}>
                  +{analytics.thisMonth?.growth || 0}%
                </Text>
                <Text style={{
                  ...theme.typography.caption,
                  color: theme.colors.text.secondary,
                }}>
                  Growth
                </Text>
              </View>
            </View>
          </SellerCard>
        </View>

        {/* Top Products */}
        <View style={{ paddingHorizontal: theme.spacing.m }}>
          <SellerCard
            title="Top Performing Products"
            subtitle="Your best sellers this month"
            icon="star"
            iconColor={theme.colors.warning}
          >
            {analytics.topProducts?.map((product, index) => (
              <View
                key={product.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: theme.spacing.s,
                  borderBottomWidth: index < analytics.topProducts.length - 1 ? 1 : 0,
                  borderBottomColor: theme.colors.divider || theme.colors.border,
                }}
              >
                <View style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: theme.colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: theme.spacing.m,
                }}>
                  <Text style={{
                    ...theme.typography.caption,
                    color: theme.colors.text.inverse,
                    fontWeight: '600',
                  }}>
                    {index + 1}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{
                    ...theme.typography.body1,
                    color: theme.colors.text.primary,
                    fontWeight: '500',
                  }}>
                    {product.name}
                  </Text>
                </View>
                <Text style={{
                  ...theme.typography.body2,
                  color: theme.colors.primary,
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

export default SellerDashboardScreen;
