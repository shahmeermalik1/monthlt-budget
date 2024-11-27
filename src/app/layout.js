'use client'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Inter } from 'next/font/google';
import theme from '../../theme.js'; // Import the theme
import './globals.css';
import { MyProvider } from '../FirstContext.js';


const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MyProvider>

          {children}
          </MyProvider>
    
        </ThemeProvider>
      </body>
    </html>
  );
}
