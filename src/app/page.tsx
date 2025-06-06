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

type SortColumn = 'title' | 'author' | 'pages' | 'rating' | 'completed' | 'date_added';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sort, setSort] = useState<SortColumn>('date_added');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/library'}`);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(Array.isArray(data) ? data : []);
    } catch (err) {
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

  const handleSort = (column: SortColumn) => {
    if (sort === column) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(column);
      setOrder('asc');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredBooks = books
    .filter(book => {
      const searchLower = searchQuery.toLowerCase();
      return (
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const modifier = order === 'asc' ? 1 : -1;

      switch (sort) {
        case 'date_added':
          return (new Date(a.date_added).getTime() - new Date(b.date_added).getTime()) * modifier;
        case 'title':
        case 'author':
          return (a[sort] as string).localeCompare(b[sort] as string) * modifier;
        case 'pages':
        case 'rating':
        case 'completed':
          return ((a[sort] as number) - (b[sort] as number)) * modifier;
        default:
          return 0;
      }
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
        onClearFilters={() => {
          setSearchQuery('');
          setSort('date_added');
          setOrder('desc');
        }}
        sort={sort}
        order={order}
        onSortChange={(e) => setSort(e.target.value as SortColumn)}
        onOrderChange={(e) => setOrder(e.target.value as 'asc' | 'desc')}
        hasFilters={searchQuery !== '' || sort !== 'date_added' || order !== 'desc'}
      />

      <BookTable
        books={filteredBooks}
        sort={sort}
        order={order}
        onSort={handleSort}
        onBookClick={setSelectedBook}
      />

      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddBook}
      />

      {selectedBook && (
        <BookDetails
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={() => setSelectedBook(null)}
          onEdit={(book) => {
            setSelectedBook(book);
            setIsEditModalOpen(true);
          }}
          onDelete={handleDeleteBook}
        />
      )}

      {selectedBook && (
        <EditBookModal
          book={selectedBook}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditBook}
        />
      )}
    </Container>
  );
}

