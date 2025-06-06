'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IconButton, Tooltip, Container, Text, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useRouter, useSearchParams } from 'next/navigation';

function ThemeToggleContent() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);
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
      toggleColorMode();
    }
  }, [searchParams, toggleColorMode]);

  const handleThemeChange = () => {
    toggleColorMode();

    // Update URL with new theme
    const params = new URLSearchParams(searchParams.toString());
    params.set('theme', colorMode === 'light' ? 'dark' : 'light');
    router.push(`/?${params.toString()}`);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Tooltip label={colorMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
      <IconButton
        aria-label="Toggle theme"
        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        onClick={handleThemeChange}
        variant="ghost"
        size="lg"
      />
    </Tooltip>
  );
}

export default function ThemeToggle() {
  return (
    <Container maxW="container.xl" py={4}>
      <ThemeToggleContent />
    </Container>
  );
}