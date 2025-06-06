'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Text,
  IconButton,
  useToast,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import BookTable from '@/components/BookTable';
import AddBookModal from '@/components/AddBookModal';
import BookDetails from '@/components/BookDetails';
import EditBookModal from '@/components/EditBookModal';
import SearchWrapper from '@/components/SearchWrapper';
import TableControls from '@/components/TableControls';
import { Book } from '@/types/book';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Book; direction: 'asc' | 'desc' } | null>(null);
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/library'}`;
      console.log('Fetching books from:', apiUrl);

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      console.log('API Response:', data);

      // Handle paginated response
      setBooks(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast({
        title: 'Error fetching books',
        description: err instanceof Error ? err.message : 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBook = async (book: { title: string; author: string; pages: number; rating: number; completed: number; }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/library'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error('Failed to add book');
      }

      const newBook = await response.json();
      setBooks(prev => [...prev, newBook]);
      toast({
        title: 'Book added',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error adding book',
        description: err instanceof Error ? err.message : 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEditBook = async (book: Book) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/library'}/${book.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (!response.ok) {
        throw new Error('Failed to update book');
      }

      const updatedBook = await response.json();
      setBooks(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b));
      toast({
        title: 'Book updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error updating book',
        description: err instanceof Error ? err.message : 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteBook = async (bookId: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/library'}/${bookId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      setBooks(prev => prev.filter(b => b.id !== bookId));
      toast({
        title: 'Book deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Error deleting book',
        description: err instanceof Error ? err.message : 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      throw err;
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredBooks = books.filter(book => {
    const searchLower = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower)
    );
  });

  const handleSort = (key: keyof Book) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredBooks = [...filteredBooks].sort((a, b) => {
    if (!sortConfig) return 0;

    const { key, direction } = sortConfig;
    const aValue = a[key];
    const bValue = b[key];

    if (aValue === bValue) return 0;
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    const comparison = aValue < bValue ? -1 : 1;
    return direction === 'asc' ? comparison : -comparison;
  });

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text color="red.500">{error}</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Box
        position="fixed"
        bottom={8}
        right={8}
        zIndex={1000}
      >
        <IconButton
          aria-label="Add book"
          icon={<AddIcon />}
          onClick={() => setIsAddModalOpen(true)}
          colorScheme="blue"
          size="lg"
          isRound
        />
      </Box>

      <SearchWrapper onSearch={handleSearch} isLoading={isLoading} />

      <TableControls
        totalBooks={filteredBooks.length}
        onClearFilters={() => setSearchQuery('')}
        hasFilters={searchQuery !== ''}
      />

      <BookTable
        books={sortedAndFilteredBooks}
        onBookClick={setSelectedBook}
        onSort={handleSort}
        sortConfig={sortConfig}
      />

      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddBook}
      />

      {selectedBook && (
        <BookDetails
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          book={selectedBook}
          onEdit={(book) => {
            setIsEditModalOpen(true);
          }}
          onDelete={handleDeleteBook}
        />
      )}

      {selectedBook && (
        <EditBookModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedBook(null);
          }}
          book={selectedBook}
          onSave={handleEditBook}
        />
      )}
    </Container>
  );
}

