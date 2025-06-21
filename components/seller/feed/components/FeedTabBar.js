import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../theme/useTheme';

const FeedTabBar = ({ activeTab, onTabPress, tabs }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const defaultTabs = [
    {
      id: 'community',
      title: 'My Community',
      icon: 'account-group',
      description: 'Listen & Discover'
    },
    {
      id: 'posts',
      title: 'My Posts',
      icon: 'post',
      description: 'Track Performance'
    },
    {
      id: 'create',
      title: 'Create Post',
      icon: 'plus-circle',
      description: 'Share & Announce'
    }
  ];

  const tabsToRender = tabs || defaultTabs;

  return (
    <View style={styles.container}>
      {tabsToRender.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && styles.activeTab
          ]}
          onPress={() => onTabPress(tab.id)}
          activeOpacity={0.7}
        >
          <View style={styles.tabContent}>
            <Icon 
              name={tab.icon} 
              size={20} 
              color={activeTab === tab.id ? theme.colors.primary : theme.colors.text.secondary}
              style={styles.tabIcon}
            />
            <Text style={[
              styles.tabTitle,
              activeTab === tab.id && styles.activeTabTitle
            ]}>
              {tab.title}
            </Text>
            <Text style={[
              styles.tabDescription,
              activeTab === tab.id && styles.activeTabDescription
            ]}>
              {tab.description}
            </Text>
          </View>
          {activeTab === tab.id && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.xs,
    marginHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.default,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.s,
    borderRadius: theme.borderRadius.s,
    alignItems: 'center',
    position: 'relative',
    minHeight: 70,
  },
  activeTab: {
    backgroundColor: `${theme.colors.primary}10`,
  },
  tabContent: {
    alignItems: 'center',
  },
  tabIcon: {
    marginBottom: theme.spacing.xs,
  },
  tabTitle: {
    ...theme.typography.caption,
    fontWeight: '600',
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: 2,
  },
  activeTabTitle: {
    color: theme.colors.primary,
  },
  tabDescription: {
    ...theme.typography.caption,
    fontSize: 10,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
  },
  activeTabDescription: {
    color: theme.colors.primary,
    opacity: 0.8,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: 1,
  },
});

export default FeedTabBar;
