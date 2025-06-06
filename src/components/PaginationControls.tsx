import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function PaginationControls({ page, totalPages, onPageChange }: PaginationControlsProps) {
  const buttonBg = useColorModeValue('blue.500', 'blue.200');
  const buttonColor = useColorModeValue('white', 'gray.800');
  const buttonHoverBg = useColorModeValue('blue.600', 'blue.300');

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Button
        isDisabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        size="sm"
        bg={buttonBg}
        color={buttonColor}
        _hover={{
          bg: buttonHoverBg
        }}
        px={6}
        py={2}
        minW="80px"
        fontFamily="var(--font-eb-garamond)"
        fontSize="0.875rem"
      >
        Previous
      </Button>
      <Text
        mx={4}
        fontFamily="var(--font-eb-garamond)"
        pt={1}
        fontSize="1rem"
      >
        Page {page} of {totalPages}
      </Text>
      <Button
        isDisabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        size="sm"
        bg={buttonBg}
        color={buttonColor}
        _hover={{
          bg: buttonHoverBg
        }}
        px={6}
        py={2}
        minW="80px"
        fontFamily="var(--font-eb-garamond)"
        fontSize="0.875rem"
      >
        Next
      </Button>
    </Box>
  );
}