export const lightTheme = {
  colors: {
    primary: '#9C27B0',
    secondary: '#FF9800',
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: {
      primary: '#333333',
      secondary: '#666666',
      tertiary: '#999999',
      inverse: '#FFFFFF',
    },
    border: '#E0E0E0',
    error: '#FF4444',
    success: '#4CAF50',
    info: '#2196F3',
    warning: '#FFC107',
    disabled: '#E0E0E0',
    ripple: 'rgba(156, 39, 176, 0.1)',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadius: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 20,
    round: 999,
  },
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: '600',
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
    },
    body1: {
      fontSize: 16,
      fontWeight: '400',
    },
    body2: {
      fontSize: 14,
      fontWeight: '400',
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
    },
    button: {
      fontSize: 16,
      fontWeight: '500',
    },
  },
  shadows: {
    default: {
      elevation: 2,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    }
  },
  components: {
    button: {
      primary: {
        backgroundColor: '#9C27B0',
        textColor: '#FFFFFF',
      },
      secondary: {
        backgroundColor: '#FF9800',
        textColor: '#000000',
      },
      outlined: {
        backgroundColor: 'transparent',
        borderColor: '#9C27B0',
        textColor: '#9C27B0',
      },
    },
    input: {
      backgroundColor: '#F9F9F9',
      borderColor: '#E0E0E0',
      textColor: '#333333',
      placeholderColor: '#999999',
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderColor: '#E0E0E0',
      shadowColor: '#000000',
    },
  },
};

export const darkTheme = {
  colors: {
    primary: '#BB86FC',
    secondary: '#FFB74D',
    background: '#121212',
    surface: '#1E1E1E',
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3',
      tertiary: '#737373',
      inverse: '#333333',
    },
    border: '#2C2C2C',
    error: '#CF6679',
    success: '#81C784',
    info: '#64B5F6',
    warning: '#FFD54F',
    disabled: '#424242',
    ripple: 'rgba(187, 134, 252, 0.1)',
  },
  spacing: {
    ...lightTheme.spacing,
  },
  borderRadius: {
    ...lightTheme.borderRadius,
  },
  typography: {
    ...lightTheme.typography,
  },
  components: {
    button: {
      primary: {
        backgroundColor: '#BB86FC',
        textColor: '#000000',
      },
      secondary: {
        backgroundColor: '#FFB74D',
        textColor: '#000000',
      },
      outlined: {
        backgroundColor: 'transparent',
        borderColor: '#BB86FC',
        textColor: '#BB86FC',
      },
    },
    input: {
      backgroundColor: '#2C2C2C',
      borderColor: '#424242',
      textColor: '#FFFFFF',
      placeholderColor: '#737373',
    },
    card: {
      backgroundColor: '#1E1E1E',
      borderColor: '#2C2C2C',
      shadowColor: '#000000',
    },
  },
};

// Seller-specific theme variants
export const sellerGreenTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#2E7D32', // Deep green for business/growth
    secondary: '#FF6F00', // Orange for energy/sales
    accent: '#1976D2', // Blue for trust/professional
    success: '#388E3C',
    warning: '#F57C00',
    error: '#D32F2F',
    info: '#1976D2',
    surface: '#FAFAFA',
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
  components: {
    ...lightTheme.components,
    button: {
      primary: {
        backgroundColor: '#2E7D32',
        textColor: '#FFFFFF',
      },
      secondary: {
        backgroundColor: '#FF6F00',
        textColor: '#FFFFFF',
      },
      outlined: {
        backgroundColor: 'transparent',
        borderColor: '#2E7D32',
        textColor: '#2E7D32',
      },
    },
  },
};

export const sellerDarkTheme = {
  ...darkTheme,
  colors: {
    ...darkTheme.colors,
    primary: '#4CAF50', // Lighter green for dark mode
    secondary: '#FF8F00', // Lighter orange for dark mode
    accent: '#42A5F5', // Lighter blue for dark mode
    background: '#121212',
    surface: '#1E1E1E',
    chart: {
      primary: '#4CAF50',
      secondary: '#FF8F00',
      tertiary: '#42A5F5',
      quaternary: '#BA68C8',
      success: '#66BB6A',
      warning: '#FFB74D',
      error: '#EF5350',
    },
    gradients: {
      primary: ['#4CAF50', '#81C784'],
      secondary: ['#FF8F00', '#FFB74D'],
      accent: ['#42A5F5', '#90CAF9'],
      success: ['#66BB6A', '#A5D6A7'],
      revenue: ['#4CAF50', '#A5D6A7'],
      orders: ['#FF8F00', '#FFCC02'],
    },
  },
  components: {
    ...darkTheme.components,
    button: {
      primary: {
        backgroundColor: '#4CAF50',
        textColor: '#000000',
      },
      secondary: {
        backgroundColor: '#FF8F00',
        textColor: '#000000',
      },
      outlined: {
        backgroundColor: 'transparent',
        borderColor: '#4CAF50',
        textColor: '#4CAF50',
      },
    },
  },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
  purple: {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      primary: '#9C27B0',
      secondary: '#FF9800',
    },
  },
  blue: {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      primary: '#2196F3',
      secondary: '#FFC107',
    },
  },
  green: {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      primary: '#4CAF50',
      secondary: '#FF5722',
    },
  },
  // Seller-specific themes
  sellerGreen: sellerGreenTheme,
  sellerDark: sellerDarkTheme,
  sellerBlue: {
    ...lightTheme,
    colors: {
      ...lightTheme.colors,
      primary: '#1976D2',
      secondary: '#FF6F00',
      accent: '#2E7D32',
      chart: {
        primary: '#1976D2',
        secondary: '#FF6F00',
        tertiary: '#2E7D32',
        quaternary: '#7B1FA2',
        success: '#388E3C',
        warning: '#F57C00',
        error: '#D32F2F',
      },
      gradients: {
        primary: ['#1976D2', '#42A5F5'],
        secondary: ['#FF6F00', '#FF8F00'],
        accent: ['#2E7D32', '#4CAF50'],
        success: ['#388E3C', '#66BB6A'],
        revenue: ['#1976D2', '#64B5F6'],
        orders: ['#FF6F00', '#FFB74D'],
      },
    },
    components: {
      ...lightTheme.components,
      button: {
        primary: {
          backgroundColor: '#1976D2',
          textColor: '#FFFFFF',
        },
        secondary: {
          backgroundColor: '#FF6F00',
          textColor: '#FFFFFF',
        },
        outlined: {
          backgroundColor: 'transparent',
          borderColor: '#1976D2',
          textColor: '#1976D2',
        },
      },
    },
  },
};
