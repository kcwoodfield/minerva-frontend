'use client'

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from 'next-themes';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

function MuiProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedTheme === 'dark' ? 'dark' : 'light',
        },
        typography: {
          fontFamily: 'var(--font-eb-garamond)',
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                fontFamily: 'var(--font-eb-garamond)',
              },
            },
          },
        },
      }),
    [resolvedTheme]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MuiProvider>{children}</MuiProvider>
    </ThemeProvider>
  );
}