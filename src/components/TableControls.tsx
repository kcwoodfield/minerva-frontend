import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Select,
  IconButton,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

type SortColumn = 'title' | 'author' | 'pages' | 'rating' | 'completed' | 'date_added';

interface TableControlsProps {
  totalBooks: number;
  onClearFilters: () => void;
  sort: SortColumn;
  order: 'asc' | 'desc';
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onOrderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  hasFilters: boolean;
}

export default function TableControls({
  totalBooks,
  onClearFilters,
  sort,
  order,
  onSortChange,
  onOrderChange,
  hasFilters,
}: TableControlsProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      display="flex"
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems={{ base: 'stretch', md: 'center' }}
      justifyContent="space-between"
      gap={4}
      mb={4}
      p={4}
      bg={bgColor}
      borderRadius="md"
      boxShadow="sm"
      border="1px solid"
      borderColor={borderColor}
    >
      <Text fontSize="lg" fontWeight="medium">
        {totalBooks} {totalBooks === 1 ? 'book' : 'books'} found
      </Text>

      <Box
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'stretch', md: 'center' }}
        gap={4}
      >
        <FormControl maxW={{ base: '100%', md: '200px' }}>
          <FormLabel>Sort by</FormLabel>
          <Select value={sort} onChange={onSortChange}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="pages">Pages</option>
            <option value="rating">Rating</option>
            <option value="completed">Completed</option>
            <option value="date_added">Date Added</option>
          </Select>
        </FormControl>

        <FormControl maxW={{ base: '100%', md: '200px' }}>
          <FormLabel>Order</FormLabel>
          <Select value={order} onChange={onOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </FormControl>

        {hasFilters && (
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
      </Box>
    </Box>
  );
}