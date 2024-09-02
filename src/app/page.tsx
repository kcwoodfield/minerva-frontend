interface Book {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publication_date: string;
  genre: string;
  sub_genre: string;
  language: string;
  pages: number;
  format: string;
  edition: string;
  summary: string;
  tags: string[];
  cover_image_url: string;
  rating: number;
  related_books: {
    title: string;
    author: string;
    isbn: string;
  }[];
  series_info: string | null;
  completed: boolean;
}

import { Container } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

async function fetchBooks(): Promise<Book[]> {
  const response = await fetch("http://127.0.0.1:8001/api/library");
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
}

export default async function Home() {
  const books = await fetchBooks();

  return (
    <VStack>
        <Container maxW='1200px'>
        <TableContainer>
        <Table variant='simple'>
          <TableCaption>This is where we can place pagination...</TableCaption>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Author</Th>
              <Th>Length (Pages)</Th>
              <Th>Rating</Th>
              <Th>Completed</Th>
            </Tr>
          </Thead>
          <Tbody>
            {books.map(book => (
              <Tr key={book.isbn}>
                <Td className="font-medium">{book.title}</Td>
                <Td>{book.author}</Td>
                <Td className="invisible md:visible">{book.pages}</Td>
                <Td className="invisible md:visible">{book.rating}</Td>
                <Td className="invisible md:visible">{book.completed ? 'Yes' : 'No'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      </Container>
    </VStack>
  );
}
