import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import { useSeller } from '../../../context/SellerContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SellerChatDashboardScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { shopData } = useSeller();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock chat data
  const [chats] = useState([
    {
      id: 1,
      customer: {
        name: 'Priya Sharma',
        avatar: '👩‍💼',
        phone: '+91 98765 43210',
      },
      lastMessage: {
        text: 'Is the organic milk available?',
        timestamp: '2 min ago',
        isFromCustomer: true,
        isRead: false,
      },
      unreadCount: 2,
      status: 'active',
    },
    {
      id: 2,
      customer: {
        name: 'Rajesh Kumar',
        avatar: '👨‍💻',
        phone: '+91 87654 32109',
      },
      lastMessage: {
        text: 'Thank you for the quick delivery!',
        timestamp: '15 min ago',
        isFromCustomer: true,
        isRead: true,
      },
      unreadCount: 0,
      status: 'satisfied',
    },
    {
      id: 3,
      customer: {
        name: 'Anita Patel',
        avatar: '👩‍🏫',
        phone: '+91 76543 21098',
      },
      lastMessage: {
        text: 'What time do you close today?',
        timestamp: '1 hour ago',
        isFromCustomer: true,
        isRead: false,
      },
      unreadCount: 1,
      status: 'inquiry',
    },
    {
      id: 4,
      customer: {
        name: 'Vikram Singh',
        avatar: '👨‍🔧',
        phone: '+91 65432 10987',
      },
      lastMessage: {
        text: 'Order confirmed. Will pick up at 6 PM.',
        timestamp: '2 hours ago',
        isFromCustomer: false,
        isRead: true,
      },
      unreadCount: 0,
      status: 'order',
    },
  ]);

  const filters = [
    { id: 'all', title: 'All Chats', count: chats.length },
    { id: 'unread', title: 'Unread', count: chats.filter(c => c.unreadCount > 0).length },
    { id: 'active', title: 'Active Orders', count: chats.filter(c => c.status === 'order').length },
    { id: 'inquiry', title: 'Inquiries', count: chats.filter(c => c.status === 'inquiry').length },
  ];

  const filteredChats = chats.filter(chat => {
    if (selectedFilter === 'unread') return chat.unreadCount > 0;
    if (selectedFilter === 'active') return chat.status === 'order';
    if (selectedFilter === 'inquiry') return chat.status === 'inquiry';
    return true;
  }).filter(chat => 
    chat.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return theme.colors.success;
      case 'order': return theme.colors.primary;
      case 'inquiry': return theme.colors.info;
      case 'satisfied': return theme.colors.success;
      default: return theme.colors.text.secondary;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return 'circle';
      case 'order': return 'shopping';
      case 'inquiry': return 'help-circle';
      case 'satisfied': return 'check-circle';
      default: return 'circle-outline';
    }
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('SellerChat', { chat: item })}
    >
      <View style={styles.chatAvatar}>
        <Text style={styles.avatarText}>{item.customer.avatar}</Text>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]}>
          <Icon name={getStatusIcon(item.status)} size={12} color={theme.colors.text.inverse} />
        </View>
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.customerName}>{item.customer.name}</Text>
          <Text style={styles.timestamp}>{item.lastMessage.timestamp}</Text>
        </View>

        <View style={styles.messagePreview}>
          <Text
            style={[
              styles.lastMessage,
              !item.lastMessage.isRead && item.lastMessage.isFromCustomer && styles.unreadMessage,
            ]}
            numberOfLines={1}
          >
            {!item.lastMessage.isFromCustomer && 'You: '}
            {item.lastMessage.text}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Customer Chats</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="cog" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={theme.colors.text.secondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search customers..."
          placeholderTextColor={theme.colors.text.tertiary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filter Tabs */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filters}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === item.id && styles.selectedFilter,
              ]}
              onPress={() => setSelectedFilter(item.id)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === item.id && styles.selectedFilterText,
                ]}
              >
                {item.title}
              </Text>
              {item.count > 0 && (
                <View style={styles.filterBadge}>
                  <Text style={styles.filterBadgeText}>{item.count}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionButton}>
          <Icon name="message-plus" size={20} color={theme.colors.primary} />
          <Text style={styles.quickActionText}>Broadcast Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionButton}>
          <Icon name="tag" size={20} color={theme.colors.secondary} />
          <Text style={styles.quickActionText}>Send Offer</Text>
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderChatItem}
        contentContainerStyle={styles.chatsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="chat-outline" size={64} color={theme.colors.text.tertiary} />
            <Text style={styles.emptyText}>No chats found</Text>
            <Text style={styles.emptySubtext}>
              Customer messages will appear here
            </Text>
          </View>
        }
      />

      {/* Quick Reply Templates */}
      <View style={styles.quickRepliesContainer}>
        <Text style={styles.quickRepliesTitle}>Quick Replies:</Text>
        <View style={styles.quickReplies}>
          <TouchableOpacity style={styles.quickReply}>
            <Text style={styles.quickReplyText}>👋 Hello!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickReply}>
            <Text style={styles.quickReplyText}>✅ Available</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickReply}>
            <Text style={styles.quickReplyText}>🚚 Delivery Info</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 60,
      paddingBottom: 20,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    settingsButton: {
      padding: 8,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      marginHorizontal: 20,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: theme.borderRadius.s,
      marginBottom: 16,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: theme.colors.text.primary,
      marginLeft: 8,
    },
    filtersContainer: {
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: theme.borderRadius.s,
      backgroundColor: theme.colors.surface,
      marginRight: 8,
    },
    selectedFilter: {
      backgroundColor: theme.colors.primary,
    },
    filterText: {
      fontSize: 14,
      color: theme.colors.text.primary,
      fontWeight: '500',
    },
    selectedFilterText: {
      color: theme.colors.text.inverse,
    },
    filterBadge: {
      backgroundColor: theme.colors.error,
      borderRadius: 10,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginLeft: 6,
    },
    filterBadgeText: {
      color: theme.colors.text.inverse,
      fontSize: 12,
      fontWeight: '600',
    },
    quickActions: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 16,
    },
    quickActionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: theme.borderRadius.s,
      marginRight: 12,
      flex: 1,
    },
    quickActionText: {
      fontSize: 14,
      color: theme.colors.text.primary,
      marginLeft: 8,
      fontWeight: '500',
    },
    chatsList: {
      paddingHorizontal: 20,
    },
    chatItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.m,
      padding: 16,
      marginBottom: 12,
    },
    chatAvatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.colors.primary + '20',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      position: 'relative',
    },
    avatarText: {
      fontSize: 24,
    },
    statusIndicator: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 20,
      height: 20,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.colors.surface,
    },
    chatContent: {
      flex: 1,
    },
    chatHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    customerName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text.primary,
    },
    timestamp: {
      fontSize: 12,
      color: theme.colors.text.secondary,
    },
    messagePreview: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    lastMessage: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      flex: 1,
    },
    unreadMessage: {
      color: theme.colors.text.primary,
      fontWeight: '500',
    },
    unreadBadge: {
      backgroundColor: theme.colors.primary,
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginLeft: 8,
    },
    unreadCount: {
      color: theme.colors.text.inverse,
      fontSize: 12,
      fontWeight: '600',
    },
    emptyContainer: {
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyText: {
      fontSize: 18,
      color: theme.colors.text.secondary,
      marginTop: 16,
      fontWeight: '500',
    },
    emptySubtext: {
      fontSize: 14,
      color: theme.colors.text.tertiary,
      marginTop: 8,
      textAlign: 'center',
    },
    quickRepliesContainer: {
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    quickRepliesTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.colors.text.primary,
      marginBottom: 8,
    },
    quickReplies: {
      flexDirection: 'row',
    },
    quickReply: {
      backgroundColor: theme.colors.primary + '20',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: theme.borderRadius.s,
      marginRight: 8,
    },
    quickReplyText: {
      fontSize: 14,
      color: theme.colors.primary,
      fontWeight: '500',
    },
  });

export default SellerChatDashboardScreen;
