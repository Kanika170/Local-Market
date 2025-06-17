import { StyleSheet } from 'react-native';
import { sellerTheme } from '../theme/sellerTheme';

// Common seller styles that can be reused across components
export const createSellerStyles = (theme = sellerTheme) => StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  
  safeContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 50,
  },
  
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: theme.colors.background,
  },
  
  contentContainer: {
    padding: theme.spacing.m,
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.l,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    ...theme.shadows.small,
  },
  
  headerTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  
  headerSubtitle: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  
  // Card styles
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    ...theme.shadows.small,
  },
  
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  
  cardTitle: {
    ...theme.typography.h5,
    color: theme.colors.text.primary,
    fontWeight: '600',
  },
  
  cardSubtitle: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  
  cardContent: {
    marginTop: theme.spacing.s,
  },
  
  // Stats card styles
  statsCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  
  statsValue: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    fontWeight: '700',
    marginBottom: 4,
  },
  
  statsLabel: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  
  statsChange: {
    ...theme.typography.caption,
    marginTop: 4,
    fontWeight: '500',
  },
  
  statsChangePositive: {
    color: theme.colors.success,
  },
  
  statsChangeNegative: {
    color: theme.colors.error,
  },
  
  // Button styles
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.s,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  
  secondaryButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.s,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  
  outlineButton: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.s,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  
  buttonText: {
    ...theme.typography.button,
    color: theme.colors.text.onPrimary,
    fontWeight: '600',
  },
  
  outlineButtonText: {
    ...theme.typography.button,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  
  // Input styles
  inputContainer: {
    marginBottom: theme.spacing.m,
  },
  
  inputLabel: {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
    fontWeight: '500',
  },
  
  textInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.s,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    fontSize: 16,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.surface,
  },
  
  textInputFocused: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  
  textInputError: {
    borderColor: theme.colors.error,
  },
  
  inputError: {
    ...theme.typography.caption,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
  
  // List styles
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  
  listItemContent: {
    flex: 1,
    marginLeft: theme.spacing.m,
  },
  
  listItemTitle: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    fontWeight: '500',
  },
  
  listItemSubtitle: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  
  // Badge styles
  badge: {
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.xs,
    alignSelf: 'flex-start',
  },
  
  badgePrimary: {
    backgroundColor: theme.colors.primary,
  },
  
  badgeSecondary: {
    backgroundColor: theme.colors.secondary,
  },
  
  badgeSuccess: {
    backgroundColor: theme.colors.success,
  },
  
  badgeWarning: {
    backgroundColor: theme.colors.warning,
  },
  
  badgeError: {
    backgroundColor: theme.colors.error,
  },
  
  badgeText: {
    ...theme.typography.caption,
    color: theme.colors.text.onPrimary,
    fontWeight: '600',
  },
  
  // Section styles
  section: {
    marginBottom: theme.spacing.l,
  },
  
  sectionTitle: {
    ...theme.typography.h4,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.m,
    fontWeight: '600',
  },
  
  sectionSubtitle: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.m,
  },
  
  // Grid styles
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.xs,
  },
  
  gridItem: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
    minWidth: '45%',
  },
  
  gridItemHalf: {
    flex: 0.5,
    marginHorizontal: theme.spacing.xs,
  },
  
  // Divider styles
  divider: {
    height: 1,
    backgroundColor: theme.colors.divider,
    marginVertical: theme.spacing.m,
  },
  
  // Loading styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  
  loadingText: {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.m,
  },
  
  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.l,
  },
  
  emptyTitle: {
    ...theme.typography.h4,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.s,
  },
  
  emptySubtitle: {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.l,
  },
  
  // Tab styles
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.s,
    padding: theme.spacing.xs,
    marginBottom: theme.spacing.m,
  },
  
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.xs,
    alignItems: 'center',
  },
  
  tabActive: {
    backgroundColor: theme.colors.primary,
  },
  
  tabText: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  
  tabTextActive: {
    color: theme.colors.text.onPrimary,
  },
  
  // Floating action button
  fab: {
    position: 'absolute',
    bottom: theme.spacing.l,
    right: theme.spacing.l,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.large,
  },
  
  // Status indicators
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: theme.spacing.s,
  },
  
  statusActive: {
    backgroundColor: theme.colors.success,
  },
  
  statusInactive: {
    backgroundColor: theme.colors.disabled,
  },
  
  statusWarning: {
    backgroundColor: theme.colors.warning,
  },
  
  statusError: {
    backgroundColor: theme.colors.error,
  },
});

// Utility functions for common patterns
export const getStatusColor = (status, theme = sellerTheme) => {
  switch (status) {
    case 'active':
    case 'success':
      return theme.colors.success;
    case 'warning':
    case 'low_stock':
      return theme.colors.warning;
    case 'error':
    case 'out_of_stock':
      return theme.colors.error;
    case 'info':
      return theme.colors.info;
    default:
      return theme.colors.text.secondary;
  }
};

export const getGradientColors = (type, theme = sellerTheme) => {
  return theme.colors.gradients[type] || theme.colors.gradients.primary;
};
