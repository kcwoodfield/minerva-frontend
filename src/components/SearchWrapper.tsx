'use client';

import { useState, useEffect, useCallback, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Box,
  Button,
  Spinner,
  Container,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

interface SearchWrapperProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

function SearchContent({ onSearch, isLoading }: SearchWrapperProps) {
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
      onSearch(query);
    },
    [searchParams, router, onSearch]
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
      <InputGroup size="lg">
        <Input
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          onKeyPress={handleKeyDown}
          pr="4.5rem"
        />
        <InputRightElement width="4.5rem">
          {searchQuery && (
            <IconButton
              aria-label="Clear search"
              icon={<CloseIcon />}
              size="sm"
              variant="ghost"
              onClick={() => {
                setSearchQuery('');
                handleSearch('');
              }}
              mr={2}
            />
          )}
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => {
              handleSearch(searchQuery);
            }}
            isLoading={isSearching || isLoading}
            loadingText="Searching..."
            spinner={<Spinner size="sm" />}
          >
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}

// Wrap the component in a client-side only wrapper
export default function SearchWrapper(props: SearchWrapperProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent {...props} />
    </Suspense>
  );
}