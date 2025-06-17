import { createThemedStyles } from '../theme/useTheme';

export const globalStyles = createThemedStyles((theme) => ({
  // Layout
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },

  // Typography
  heading1: {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
  },
  heading2: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
  },
  heading3: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  bodyText: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
  },
  caption: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },

  // Cards
  card: {
    backgroundColor: theme.components.card.backgroundColor,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
    shadowColor: theme.components.card.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // Buttons
  buttonPrimary: {
    backgroundColor: theme.components.button.primary.backgroundColor,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.borderRadius.m,
    ...theme.typography.button,
  },
  buttonPrimaryText: {
    color: theme.components.button.primary.textColor,
    textAlign: 'center',
  },
  buttonSecondary: {
    backgroundColor: theme.components.button.secondary.backgroundColor,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.borderRadius.m,
    ...theme.typography.button,
  },
  buttonSecondaryText: {
    color: theme.components.button.secondary.textColor,
    textAlign: 'center',
  },
  buttonOutlined: {
    backgroundColor: theme.components.button.outlined.backgroundColor,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.borderRadius.m,
    borderWidth: 1,
    borderColor: theme.components.button.outlined.borderColor,
    ...theme.typography.button,
  },
  buttonOutlinedText: {
    color: theme.components.button.outlined.textColor,
    textAlign: 'center',
  },

  // Inputs
  input: {
    backgroundColor: theme.components.input.backgroundColor,
    borderWidth: 1,
    borderColor: theme.components.input.borderColor,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    color: theme.components.input.textColor,
    ...theme.typography.body1,
  },

  // Headers
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: 50,
    paddingBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: theme.colors.text.inverse,
    ...theme.typography.h2,
  },

  // Lists
  listItem: {
    paddingVertical: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },

  // Spacing
  padding: {
    xs: { padding: theme.spacing.xs },
    s: { padding: theme.spacing.s },
    m: { padding: theme.spacing.m },
    l: { padding: theme.spacing.l },
    xl: { padding: theme.spacing.xl },
  },
  margin: {
    xs: { margin: theme.spacing.xs },
    s: { margin: theme.spacing.s },
    m: { margin: theme.spacing.m },
    l: { margin: theme.spacing.l },
    xl: { margin: theme.spacing.xl },
  },

  // Dividers
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.m,
  },
}));
