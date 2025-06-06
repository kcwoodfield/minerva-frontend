import {
  Box,
  Text,
  IconButton,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface TableControlsProps {
  totalBooks: number;
  onClearFilters: () => void;
  hasFilters: boolean;
}

export default function TableControls({
  totalBooks,
  onClearFilters,
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