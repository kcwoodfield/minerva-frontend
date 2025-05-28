'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      <IconButton
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
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