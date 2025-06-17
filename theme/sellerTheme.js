export const sellerTheme = {
  colors: {
    // Primary brand colors for sellers
    primary: '#2E7D32', // Deep green for business/growth
    primaryLight: '#4CAF50',
    primaryDark: '#1B5E20',
    
    // Secondary colors
    secondary: '#FF6F00', // Orange for energy/sales
    secondaryLight: '#FF8F00',
    secondaryDark: '#E65100',
    
    // Accent colors
    accent: '#1976D2', // Blue for trust/professional
    accentLight: '#42A5F5',
    accentDark: '#0D47A1',
    
    // Status colors
    success: '#388E3C',
    warning: '#F57C00',
    error: '#D32F2F',
    info: '#1976D2',
    
    // Background colors
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    overlay: 'rgba(0, 0, 0, 0.5)',
    
    // Card backgrounds
    cardPrimary: '#E8F5E8',
    cardSecondary: '#FFF3E0',
    cardAccent: '#E3F2FD',
    cardWarning: '#FFF8E1',
    cardError: '#FFEBEE',
    
    // Text colors
    text: {
      primary: '#212121',
      secondary: '#757575',
      tertiary: '#9E9E9E',
      inverse: '#FFFFFF',
      onPrimary: '#FFFFFF',
      onSecondary: '#FFFFFF',
      onSurface: '#212121',
    },
    
    // Border and divider colors
    border: '#E0E0E0',
    divider: '#EEEEEE',
    disabled: '#BDBDBD',
    
    // Chart colors for analytics
    chart: {
      primary: '#2E7D32',
      secondary: '#FF6F00',
      tertiary: '#1976D2',
      quaternary: '#7B1FA2',
      success: '#388E3C',
      warning: '#F57C00',
      error: '#D32F2F',
    },
    
    // Gradient colors
    gradients: {
      primary: ['#2E7D32', '#4CAF50'],
      secondary: ['#FF6F00', '#FF8F00'],
      accent: ['#1976D2', '#42A5F5'],
      success: ['#388E3C', '#66BB6A'],
      revenue: ['#2E7D32', '#81C784'],
      orders: ['#FF6F00', '#FFB74D'],
    },
  },
  
  // Typography
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 40,
    },
    h2: {
      fontSize: 28,
      fontWeight: '600',
      lineHeight: 36,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    h5: {
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 24,
    },
    h6: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 22,
    },
    body1: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    body2: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
    button: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
    },
  },
  
  // Spacing system
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Border radius
  borderRadius: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    round: 50,
  },
  
  // Shadows
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
  
  // Component specific styles
  components: {
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    button: {
      primary: {
        backgroundColor: '#2E7D32',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
      },
      secondary: {
        backgroundColor: '#FF6F00',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
      },
      outline: {
        borderColor: '#2E7D32',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
      },
    },
    input: {
      borderColor: '#E0E0E0',
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 16,
    },
    tab: {
      height: 60,
      backgroundColor: '#FFFFFF',
      borderTopColor: '#E0E0E0',
      borderTopWidth: 1,
    },
  },
};

// Dark theme variant for sellers
export const sellerDarkTheme = {
  ...sellerTheme,
  colors: {
    ...sellerTheme.colors,
    
    // Background colors for dark mode
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#2C2C2C',
    
    // Card backgrounds for dark mode
    cardPrimary: '#1B3A1B',
    cardSecondary: '#2D1B00',
    cardAccent: '#0D1B2D',
    cardWarning: '#2D2400',
    cardError: '#2D0D0D',
    
    // Text colors for dark mode
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      tertiary: '#808080',
      inverse: '#000000',
      onPrimary: '#FFFFFF',
      onSecondary: '#FFFFFF',
      onSurface: '#FFFFFF',
    },
    
    // Border colors for dark mode
    border: '#404040',
    divider: '#303030',
    disabled: '#606060',
  },
  
  components: {
    ...sellerTheme.components,
    card: {
      ...sellerTheme.components.card,
      backgroundColor: '#1E1E1E',
    },
    tab: {
      ...sellerTheme.components.tab,
      backgroundColor: '#1E1E1E',
      borderTopColor: '#404040',
    },
  },
};
