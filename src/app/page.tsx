'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Text,
  IconButton,
  useToast,
  Box,
  useColorModeValue,
  Heading,
  HStack,
  Tooltip,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import BookTable from '@/components/BookTable';
import AddBookModal from '@/components/AddBookModal';
import BookDetails from '@/components/BookDetails';
import EditBookModal from '@/components/EditBookModal';
import SearchWrapper from '@/components/SearchWrapper';
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
  const textColor = useColorModeValue('gray.600', 'gray.400');

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
      // Only send the fields that are allowed in the update schema
      const updateData = {
        title: book.title,
        author: book.author,
        pages: book.pages,
        rating: book.rating,
        review: book.review,
        isbn_13: book.isbn_13,
        isbn_10: book.isbn_10,
        completed: book.completed,
        publisher: book.publisher,
        publication_date: book.publication_date,
        genre: book.genre,
        sub_genre: book.sub_genre,
        language: book.language,
        format: book.format,
        edition: book.edition,
        summary: book.summary,
        tags: book.tags,
        cover_image_url: book.cover_image_url
      };

      console.log('Sending update data:', updateData);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/library'}/${book.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.detail || 'Failed to update book');
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
      console.error('Error updating book:', err);
      toast({
        title: 'Error updating book',
        description: err instanceof Error ? err.message : 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteBook = async (bookId: string) => {
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
      <Container maxW="container.xl" py={2}>
        <Text color="red.500">{error}</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl">
      <Box mb={8}>
        <HStack justify="space-between" align="center" mb={4}>
          <HStack spacing={4}>
            {(searchQuery || sortConfig) && (
              <Tooltip label="Clear all filters">
                <IconButton
                  aria-label="Clear filters"
                  icon={<CloseIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setSearchQuery('');
                    setSortConfig(null);
                  }}
                />
              </Tooltip>
            )}
            <AddBookModal
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
              onAdd={handleAddBook}
            />
          </HStack>
        </HStack>

        <SearchWrapper onSearch={handleSearch} />
      </Box>
      <BookTable
        books={sortedAndFilteredBooks}
        onBookClick={setSelectedBook}
        onSort={handleSort}
        sortConfig={sortConfig}
        hasFilters={!!searchQuery || !!sortConfig}
        onClearFilters={() => {
          setSearchQuery('');
          setSortConfig(null);
        }}
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

