import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { Book } from '@/types/book';

type SortColumn = 'title' | 'author' | 'pages' | 'rating' | 'completed' | 'date_added';

interface BookTableProps {
  books: Book[];
  sort: SortColumn;
  order: 'asc' | 'desc';
  onSort: (column: SortColumn) => void;
  onBookClick: (book: Book) => void;
}

export default function BookTable({ books, sort, order, onSort, onBookClick }: BookTableProps) {
  const columns: { key: SortColumn; label: string; width: string }[] = [
    { key: 'title', label: 'Title', width: '300px' },
    { key: 'author', label: 'Author', width: '200px' },
    { key: 'pages', label: 'Length (Pages)', width: '120px' },
    { key: 'rating', label: 'Rating', width: '100px' },
    { key: 'completed', label: 'Completed', width: '100px' },
    { key: 'date_added', label: 'Date Added', width: '120px' },
  ];

  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box
      bg={bgColor}
      borderRadius="md"
      boxShadow="sm"
      overflow="hidden"
      pb={4}
    >
      <Table>
        <Thead>
          <Tr>
            {columns.map(col => (
              <Th
                key={col.key}
                onClick={() => onSort(col.key)}
                cursor="pointer"
                fontWeight={sort === col.key ? '700' : '600'}
                fontSize="1rem"
                py={3}
                px={4}
                letterSpacing="0.025em"
                borderBottom="none"
                width={col.width}
                minWidth={col.width}
                maxWidth={col.width}
              >
                {col.label}
                {sort === col.key && (
                  <Box as="span" ml={1}>{order === 'asc' ? '↑' : '↓'}</Box>
                )}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {books.map(book => (
            <Tr
              key={book.id}
              onClick={() => onBookClick(book)}
              cursor="pointer"
              _hover={{
                bg: hoverBg,
                transition: 'background-color 0.2s ease'
              }}
            >
              <Td
                fontWeight="medium"
                borderBottom="none"
                maxWidth="300px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize="1rem"
                py={3}
                px={4}
              >
                {book.title}
              </Td>
              <Td borderBottom="none" fontSize="1rem" py={3} px={4}>{book.author}</Td>
              <Td display={{ base: 'none', md: 'table-cell' }} borderBottom="none" fontSize="1rem" py={3} px={4}>{book.pages}</Td>
              <Td display={{ base: 'none', md: 'table-cell' }} borderBottom="none" fontSize="1rem" py={3} px={4}>{book.rating}</Td>
              <Td display={{ base: 'none', md: 'table-cell' }} borderBottom="none" fontSize="1rem" py={3} px={4}>
                {book.completed === 0 ? 'Not Started' :
                 book.completed === 100 ? 'Completed' :
                 `In Progress (${book.completed}%)`}
              </Td>
              <Td display={{ base: 'none', md: 'table-cell' }} borderBottom="none" fontSize="1rem" py={3} px={4}>
                {new Date(book.date_added).toLocaleDateString()}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}