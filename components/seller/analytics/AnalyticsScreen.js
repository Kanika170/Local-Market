import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const AnalyticsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createSellerStyles(theme);
  const [selectedTab, setSelectedTab] = useState(route?.params?.tab || 'overview');

  const analyticsData = {
    overview: {
      todaySales: 15780,
      todayOrders: 23,
      todayVisitors: 145,
      conversionRate: 15.9,
      avgOrderValue: 686,
      totalRevenue: 458900,
    },
    visitors: {
      today: 145,
      yesterday: 126,
      thisWeek: 892,
      lastWeek: 756,
      thisMonth: 3245,
      lastMonth: 2890,
      topSources: [
        { source: 'Direct Search', visitors: 45, percentage: 31 },
        { source: 'Social Media', visitors: 38, percentage: 26 },
        { source: 'Referrals', visitors: 32, percentage: 22 },
        { source: 'Local Discovery', visitors: 30, percentage: 21 },
      ],
    },
    sales: {
      today: 15780,
      yesterday: 12450,
      thisWeek: 89560,
      lastWeek: 76340,
      thisMonth: 458900,
      lastMonth: 389200,
      topProducts: [
        { name: 'Amul Taaza Milk', sales: 2340, units: 48 },
        { name: 'Fortune Oil', sales: 1890, units: 35 },
        { name: 'Tata Salt', sales: 1560, units: 30 },
        { name: 'Parle-G Biscuit', sales: 1200, units: 25 },
      ],
    },
  };

  const tabs = [
    { id: 'overview', title: 'Overview', icon: 'view-dashboard' },
    { id: 'visitors', title: 'Visitors', icon: 'eye' },
    { id: 'sales', title: 'Sales', icon: 'currency-inr' },
  ];

  const StatCard = ({ title, value, subtitle, icon, color = theme.colors.primary, change }) => (
    <View style={[styles.card, { flex: 1, marginHorizontal: 4 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Icon name={icon} size={20} color={color} />
        <Text style={[styles.cardTitle, { marginLeft: 8, fontSize: 12 }]}>{title}</Text>
      </View>
      <Text style={[styles.cardValue, { fontSize: 18, fontWeight: 'bold' }]}>{value}</Text>
      {subtitle && (
        <Text style={[styles.cardSubtitle, { fontSize: 10 }]}>{subtitle}</Text>
      )}
      {change && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <Icon 
            name={change > 0 ? 'trending-up' : 'trending-down'} 
            size={12} 
            color={change > 0 ? theme.colors.success : theme.colors.error} 
          />
          <Text style={{ 
            fontSize: 10, 
            color: change > 0 ? theme.colors.success : theme.colors.error,
            marginLeft: 2 
          }}>
            {Math.abs(change)}%
          </Text>
        </View>
      )}
    </View>
  );

  const renderOverview = () => (
    <View>
      <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>Today's Performance</Text>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <StatCard
          title="Sales"
          value={`₹${analyticsData.overview.todaySales.toLocaleString()}`}
          subtitle="today"
          icon="currency-inr"
          color={theme.colors.success}
          change={12}
        />
        <StatCard
          title="Orders"
          value={analyticsData.overview.todayOrders}
          subtitle="completed"
          icon="shopping"
          color={theme.colors.primary}
          change={8}
        />
      </View>
      
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <StatCard
          title="Visitors"
          value={analyticsData.overview.todayVisitors}
          subtitle="unique"
          icon="eye"
          color={theme.colors.info}
          change={15}
        />
        <StatCard
          title="Conversion"
          value={`${analyticsData.overview.conversionRate}%`}
          subtitle="rate"
          icon="chart-line"
          color={theme.colors.warning}
          change={-2}
        />
      </View>

      <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>Monthly Summary</Text>
      <View style={[styles.card, { marginBottom: 16 }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={styles.cardTitle}>Total Revenue</Text>
            <Text style={[styles.cardValue, { fontSize: 24 }]}>
              ₹{analyticsData.overview.totalRevenue.toLocaleString()}
            </Text>
            <Text style={styles.cardSubtitle}>This month</Text>
          </View>
          <Icon name="trending-up" size={40} color={theme.colors.success} />
        </View>
      </View>
    </View>
  );

  const renderVisitors = () => (
    <View>
      <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>Visitor Analytics</Text>
      
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <StatCard
          title="Today"
          value={analyticsData.visitors.today}
          subtitle="visitors"
          icon="eye"
          color={theme.colors.primary}
        />
        <StatCard
          title="This Week"
          value={analyticsData.visitors.thisWeek}
          subtitle="visitors"
          icon="calendar-week"
          color={theme.colors.secondary}
        />
      </View>

      <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>Traffic Sources</Text>
      {analyticsData.visitors.topSources.map((source, index) => (
        <View key={index} style={[styles.card, { marginBottom: 12 }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{source.source}</Text>
              <Text style={styles.cardSubtitle}>{source.visitors} visitors</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.cardValue, { fontSize: 16 }]}>{source.percentage}%</Text>
              <View style={{
                width: 60,
                height: 4,
                backgroundColor: theme.colors.border,
                borderRadius: 2,
                marginTop: 4,
              }}>
                <View style={{
                  width: `${source.percentage}%`,
                  height: '100%',
                  backgroundColor: theme.colors.primary,
                  borderRadius: 2,
                }} />
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderSales = () => (
    <View>
      <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>Sales Performance</Text>
      
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <StatCard
          title="Today"
          value={`₹${analyticsData.sales.today.toLocaleString()}`}
          subtitle="sales"
          icon="currency-inr"
          color={theme.colors.success}
        />
        <StatCard
          title="This Month"
          value={`₹${analyticsData.sales.thisMonth.toLocaleString()}`}
          subtitle="sales"
          icon="chart-bar"
          color={theme.colors.primary}
        />
      </View>

      <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>Top Selling Products</Text>
      {analyticsData.sales.topProducts.map((product, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.card, { marginBottom: 12 }]}
          onPress={() => navigation.navigate('Products', { productId: product.name })}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{product.name}</Text>
              <Text style={styles.cardSubtitle}>{product.units} units sold</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[styles.cardValue, { fontSize: 16 }]}>
                ₹{product.sales.toLocaleString()}
              </Text>
              <Icon name="chevron-right" size={16} color={theme.colors.text.tertiary} />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'visitors':
        return renderVisitors();
      case 'sales':
        return renderSales();
      default:
        return renderOverview();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: 50 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={{ 
        flexDirection: 'row', 
        paddingHorizontal: 16, 
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
      }}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={{
              flex: 1,
              paddingVertical: 12,
              alignItems: 'center',
              borderBottomWidth: selectedTab === tab.id ? 2 : 0,
              borderBottomColor: theme.colors.primary,
            }}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Icon 
              name={tab.icon} 
              size={20} 
              color={selectedTab === tab.id ? theme.colors.primary : theme.colors.text.tertiary} 
            />
            <Text style={{
              fontSize: 12,
              color: selectedTab === tab.id ? theme.colors.primary : theme.colors.text.tertiary,
              marginTop: 4,
            }}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
        {renderContent()}
      </ScrollView>
    </View>
  );
};

export default AnalyticsScreen;
