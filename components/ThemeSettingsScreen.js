import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Platform 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/useTheme';

const ThemeSettingsScreen = () => {
  const navigation = useNavigation();
  const { theme, currentTheme, isDarkMode, changeTheme, toggleDarkMode, availableThemes } = useTheme();
  const styles = createStyles(theme);

  const themeColors = {
    purple: '#9C27B0',
    blue: '#2196F3',
    green: '#4CAF50',
    orange: '#FF9800',
    red: '#F44336',
    teal: '#009688',
  };

  const themeDescriptions = {
    purple: 'Classic purple theme with elegant vibes',
    blue: 'Cool blue theme for a professional look',
    green: 'Fresh green theme inspired by nature',
    orange: 'Vibrant orange theme for energy',
    red: 'Bold red theme for passion',
    teal: 'Calming teal theme for focus',
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Theme Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Dark Mode Toggle */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🌙</Text>
            <Text style={styles.sectionTitle}>Appearance</Text>
          </View>
          
          <View style={styles.darkModeContainer}>
            <View style={styles.darkModeInfo}>
              <Text style={styles.darkModeTitle}>Dark Mode</Text>
              <Text style={styles.darkModeDescription}>
                {isDarkMode ? 'Dark theme is active' : 'Light theme is active'}
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: theme.colors.disabled, true: theme.colors.primary }}
              thumbColor={theme.colors.background}
              ios_backgroundColor={theme.colors.disabled}
            />
          </View>
        </View>

        {/* Theme Selection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🎨</Text>
            <Text style={styles.sectionTitle}>Color Themes</Text>
          </View>
          <Text style={styles.sectionDescription}>
            Choose your preferred color scheme. The selected theme will be applied across the entire app.
          </Text>

          <View style={styles.themesGrid}>
            {availableThemes.map((themeName) => (
              <TouchableOpacity
                key={themeName}
                style={[
                  styles.themeCard,
                  currentTheme === themeName && styles.selectedThemeCard
                ]}
                onPress={() => changeTheme(themeName)}
              >
                <View style={styles.themePreview}>
                  <View style={[
                    styles.themeColorCircle,
                    { backgroundColor: themeColors[themeName] || themeColors.purple }
                  ]} />
                  <View style={styles.themeColorBars}>
                    <View style={[
                      styles.themeColorBar,
                      { backgroundColor: themeColors[themeName] || themeColors.purple, opacity: 0.7 }
                    ]} />
                    <View style={[
                      styles.themeColorBar,
                      { backgroundColor: themeColors[themeName] || themeColors.purple, opacity: 0.4 }
                    ]} />
                  </View>
                </View>
                
                <View style={styles.themeInfo}>
                  <Text style={[
                    styles.themeName,
                    currentTheme === themeName && styles.selectedThemeName
                  ]}>
                    {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                  </Text>
                  <Text style={styles.themeDescription}>
                    {themeDescriptions[themeName] || 'Beautiful color theme'}
                  </Text>
                </View>

                {currentTheme === themeName && (
                  <View style={styles.selectedIndicator}>
                    <Text style={styles.checkmark}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Preview Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>👀</Text>
            <Text style={styles.sectionTitle}>Preview</Text>
          </View>
          <Text style={styles.sectionDescription}>
            See how your selected theme looks with different components.
          </Text>

          <View style={styles.previewContainer}>
            {/* Sample Card */}
            <View style={styles.previewCard}>
              <Text style={styles.previewCardTitle}>Sample Product Card</Text>
              <Text style={styles.previewCardDescription}>
                This is how product cards will look with your selected theme.
              </Text>
              <View style={styles.previewButtons}>
                <TouchableOpacity style={styles.previewButtonPrimary}>
                  <Text style={styles.previewButtonPrimaryText}>Primary Button</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.previewButtonSecondary}>
                  <Text style={styles.previewButtonSecondaryText}>Secondary</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Sample Text Elements */}
            <View style={styles.previewTextContainer}>
              <Text style={styles.previewHeading}>Heading Text</Text>
              <Text style={styles.previewBody}>Body text will appear like this throughout the app.</Text>
              <Text style={styles.previewCaption}>Caption text for additional information.</Text>
            </View>
          </View>
        </View>

        {/* Reset Section */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => {
              changeTheme('purple');
              // Don't reset dark mode as it's a user preference
            }}
          >
            <Text style={styles.resetButtonText}>Reset to Default Theme</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: theme.colors.text.inverse,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: theme.colors.text.inverse,
    ...theme.typography.h2,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.l,
  },
  section: {
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.l,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: theme.spacing.m,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  sectionDescription: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.l,
    lineHeight: 20,
  },
  darkModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.components.card.backgroundColor,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.l,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
  },
  darkModeInfo: {
    flex: 1,
  },
  darkModeTitle: {
    ...theme.typography.body1,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  darkModeDescription: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  themesGrid: {
    gap: theme.spacing.m,
  },
  themeCard: {
    backgroundColor: theme.components.card.backgroundColor,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.l,
    borderWidth: 2,
    borderColor: theme.components.card.borderColor,
    marginBottom: theme.spacing.m,
  },
  selectedThemeCard: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.ripple,
  },
  themePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  themeColorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.m,
  },
  themeColorBars: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  themeColorBar: {
    height: 8,
    borderRadius: theme.borderRadius.xs,
  },
  themeInfo: {
    flex: 1,
  },
  themeName: {
    ...theme.typography.body1,
    fontWeight: '600',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  selectedThemeName: {
    color: theme.colors.primary,
  },
  themeDescription: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    lineHeight: 16,
  },
  selectedIndicator: {
    position: 'absolute',
    top: theme.spacing.m,
    right: theme.spacing.m,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: theme.colors.text.inverse,
    fontSize: 14,
    fontWeight: 'bold',
  },
  previewContainer: {
    gap: theme.spacing.m,
  },
  previewCard: {
    backgroundColor: theme.components.card.backgroundColor,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.l,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
  },
  previewCardTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.s,
  },
  previewCardDescription: {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.l,
    lineHeight: 18,
  },
  previewButtons: {
    flexDirection: 'row',
    gap: theme.spacing.m,
  },
  previewButtonPrimary: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    flex: 1,
  },
  previewButtonPrimaryText: {
    color: theme.colors.text.inverse,
    ...theme.typography.button,
    textAlign: 'center',
  },
  previewButtonSecondary: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderRadius: theme.borderRadius.s,
    flex: 1,
  },
  previewButtonSecondaryText: {
    color: theme.colors.text.primary,
    ...theme.typography.button,
    textAlign: 'center',
  },
  previewTextContainer: {
    backgroundColor: theme.components.card.backgroundColor,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.l,
    borderWidth: 1,
    borderColor: theme.components.card.borderColor,
  },
  previewHeading: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.s,
  },
  previewBody: {
    ...theme.typography.body1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.s,
    lineHeight: 20,
  },
  previewCaption: {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
  },
  resetButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.l,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  resetButtonText: {
    ...theme.typography.button,
    color: theme.colors.text.secondary,
  },
});

export default ThemeSettingsScreen;
