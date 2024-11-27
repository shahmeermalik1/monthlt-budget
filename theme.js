// src/theme.js
import { createTheme } from '@mui/material/styles';

// Define light and dark mode color palettes
const lightPalette = {
  mode: 'light',
  primary: {
    main: '#1976d2', // Blue
    contrastText: '#ffffff', // White text for primary buttons
  },
  secondary: {
    main: '#dc004e', // Pinkish red
    contrastText: '#ffffff', // White text for secondary buttons
  },
  background: {
    default: '#f5f5f5', // Light gray background
    paper: '#ffffff', // White cards
  },
  text: {
    primary: '#000000', // Black text
    secondary: '#4f4f4f', // Gray text
  },
};

const darkPalette = {
  mode: 'dark',
  primary: {
    main: '#90caf9', // Light blue
    contrastText: '#000000', // Black text for primary buttons
  },
  secondary: {
    main: '#f48fb1', // Pink
    contrastText: '#000000', // Black text for secondary buttons
  },
  background: {
    default: '#121212', // Dark gray background
    paper: '#1e1e1e', // Slightly lighter gray for cards
  },
  text: {
    primary: '#ffffff', // White text
    secondary: '#b3b3b3', // Light gray text
  },
};

// Typography settings
const typography = {
  fontFamily: 'Roboto, Arial, sans-serif',
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
  },
  body1: {
    fontSize: '1rem',
  },
  button: {
    textTransform: 'none', // Disable uppercase for buttons
    fontWeight: 600,
  },
};

// Component overrides
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8, // Rounded buttons
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16, // Rounded corners for cards
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // Soft shadow
      },
    },
  },
};

// Create theme
const theme = createTheme({
  palette: lightPalette, // Replace with darkPalette for dark mode
  typography,
  components,
});

export default theme;
