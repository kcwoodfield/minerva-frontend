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
  InputLeftElement,
  Tooltip,
} from '@chakra-ui/react';
import { SearchIcon, CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

interface SearchWrapperProps {
  onSearch: (query: string) => void;
  onClearFilters?: () => void;
  hasFilters?: boolean;
  isLoading?: boolean;
}

function SearchContent({ onSearch, onClearFilters, hasFilters, isLoading }: SearchWrapperProps) {
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

  const bgColor = useColorModeValue('transparent', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={4} mb={4}>
      {hasFilters && onClearFilters && (
        <Tooltip label="Clear all filters">
          <IconButton
            aria-label="Clear filters"
            icon={<CloseIcon />}
            onClick={onClearFilters}
            variant="ghost"
            colorScheme="red"
            size="lg"
          />
        </Tooltip>
      )}
      <Box
        display="flex"
        alignItems="center"
        gap={4}
        p={4}
        bg={bgColor}
        borderRadius="md"
        boxShadow="sm"
        border="1px solid"
        borderColor={borderColor}
        maxW="600px"
        width="100%"
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
            onKeyPress={handleKeyDown}
            variant="filled"
            bg="transparent"
            _hover={{ bg: 'transparent' }}
            _focus={{ bg: 'transparent' }}
          />
        </InputGroup>
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
      </Box>
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