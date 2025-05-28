'use client';

import { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  return (
    <Box sx={{
      width: '100%',
      maxWidth: '500px',
      mx: 'auto',
      px: { xs: 2, sm: 0 }
    }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: '1rem', color: 'var(--muted-foreground)' }} />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => {
                  setSearchQuery('');
                  handleSearch('');
                }}
                sx={{ fontSize: '0.75rem' }}
              >
                <ClearIcon sx={{ fontSize: '0.75rem' }} />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            fontSize: '0.75rem',
            '& .MuiInputBase-input': {
              py: 1,
            },
          },
        }}
      />
    </Box>
  );
}