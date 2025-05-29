'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState, Suspense } from 'react';
import { IconButton, Tooltip, Container, Typography } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useRouter, useSearchParams } from 'next/navigation';

function ThemeToggleContent() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync theme with URL on mount
  useEffect(() => {
    const themeParam = searchParams.get('theme');
    if (themeParam && (themeParam === 'dark' || themeParam === 'light')) {
      setTheme(themeParam);
    }
  }, [searchParams, setTheme]);

  const handleThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    // Update URL with new theme
    const params = new URLSearchParams(searchParams.toString());
    params.set('theme', newTheme);
    router.push(`/?${params.toString()}`);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      <IconButton
        onClick={handleThemeChange}
        sx={{
          color: 'inherit',
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
          },
        }}
      >
        {theme === 'dark' ? (
          <LightModeIcon sx={{ fontSize: '1.2rem' }} />
        ) : (
          <DarkModeIcon sx={{ fontSize: '1.2rem' }} />
        )}
      </IconButton>
    </Tooltip>
  );
}

export default function ThemeToggle() {
  return (
    <Suspense fallback={
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading theme...</Typography>
      </Container>
    }>
      <ThemeToggleContent />
    </Suspense>
  );
}