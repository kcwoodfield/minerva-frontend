'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { TextField, Box, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';

export default function SearchWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for CMD + K (Mac) or CTRL + K (Windows)
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault(); // Prevent browser's default search
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newQuery = event.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (newQuery) {
      params.set('q', newQuery);
    } else {
      params.delete('q');
    }

    // Reset to page 1 when searching
    params.set('page', '1');

    router.push(`/?${params.toString()}`);
  };

  return (
    <Box className="relative">
      <TextField
        inputRef={inputRef}
        fullWidth
        size="small"
        label="Search Books"
        value={query}
        onChange={handleSearchChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        placeholder="Search by title or author..."
        InputProps={{
          endAdornment: (
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                display: { xs: 'none', sm: 'block' },
                position: 'absolute',
                right: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: 'background.paper',
                padding: '0 4px',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              ⌘K
            </Typography>
          ),
        }}
      />
    </Box>
  );
}