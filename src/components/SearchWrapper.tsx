'use client';

import { useState, useEffect, useCallback, Suspense, useRef } from 'react';
import { TextField, InputAdornment, IconButton, Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter, useSearchParams } from 'next/navigation';
import debounce from 'lodash/debounce';

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchRef = useRef<ReturnType<typeof debounce>>();

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  // Debounced search function
  const debouncedSearch = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set('q', query);
      } else {
        params.delete('q');
      }
      params.set('page', '1');
      router.push(`/?${params.toString()}`);
      setIsSearching(false);
    },
    [searchParams, router]
  );

  useEffect(() => {
    debouncedSearchRef.current = debounce(debouncedSearch, 300);
    return () => {
      debouncedSearchRef.current?.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = useCallback((query: string) => {
    setIsSearching(true);
    debouncedSearchRef.current?.(query);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      debouncedSearchRef.current?.flush();
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
        placeholder="Search by title, author, genre, ISBN..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'white',
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: '1.25rem', color: 'var(--muted-foreground)' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {isSearching ? (
                <CircularProgress size={20} sx={{ mr: 1 }} />
              ) : searchQuery ? (
                <Button
                  size="small"
                  onClick={() => {
                    setSearchQuery('');
                    handleSearch('');
                  }}
                  startIcon={<ClearIcon sx={{ fontSize: '1rem' }} />}
                  sx={{
                    fontSize: '1rem',
                    minWidth: 'auto',
                    px: 1,
                    py: 0.5,
                    color: 'text.secondary',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'text.primary'
                    }
                  }}
                >
                  Clear
                </Button>
              ) : null}
            </InputAdornment>
          ),
          sx: {
            fontSize: '1rem',
            '& .MuiInputBase-input': {
              py: 1.5,
            },
          },
        }}
      />
    </Box>
  );
}

export default function SearchWrapper() {
  return (
    <Suspense fallback={
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading search...</Typography>
      </Container>
    }>
      <SearchContent />
    </Suspense>
  );
}