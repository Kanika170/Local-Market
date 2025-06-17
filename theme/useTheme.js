import { useTheme as useThemeContext } from './ThemeContext';

export const useTheme = () => {
  return useThemeContext();
};

// Helper function to create themed styles
export const createThemedStyles = (styleFunction) => {
  return (theme) => styleFunction(theme);
};

// Helper function to get themed color
export const getThemedColor = (theme, colorPath) => {
  const paths = colorPath.split('.');
  let color = theme.colors;
  
  for (const path of paths) {
    color = color[path];
    if (!color) break;
  }
  
  return color || theme.colors.primary;
};

// Helper function to get themed spacing
export const getThemedSpacing = (theme, size) => {
  return theme.spacing[size] || theme.spacing.m;
};

// Helper function to get themed border radius
export const getThemedBorderRadius = (theme, size) => {
  return theme.borderRadius[size] || theme.borderRadius.m;
};

// Helper function to get themed typography
export const getThemedTypography = (theme, variant) => {
  return theme.typography[variant] || theme.typography.body1;
};
