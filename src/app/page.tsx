'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Text,
  IconButton,
  useToast,
  Box,
  Heading,
  HStack,
  Tooltip,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useSearchParams, useRouter } from 'next/navigation';
import { Book } from '@/types/book';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Book; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showComingSoon, setShowComingSoon] = useState(true);
  const itemsPerPage = 25;
  const toast = useToast();
  const textColor = 'gray.600';
  const searchParams = useSearchParams();
  const router = useRouter();

  // Disabled API calls for coming soon mode
  // useEffect(() => {
  //   fetchBooks();
  // }, [currentPage, sortConfig, searchQuery]);

  // Add new useEffect for checking URL parameters
  useEffect(() => {
    const bookId = searchParams.get('book');
    if (bookId && !isLoading) {  // Only proceed if we're not loading and have a book ID
      // Find the book in the current list
      const book = books.find(b => b.id === bookId);
      if (book) {
        setSelectedBook(book);
      } else {
        // If book not found in current list, show error
        toast({
          title: 'Book not found',
          description: 'The requested book could not be found',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });

        // Remove the book parameter from URL if the book doesn't exist
        const params = new URLSearchParams(searchParams.toString());
        params.delete('book');
        router.push(`?${params.toString()}`);
      }
    }
  }, [searchParams, books, isLoading]); // Add isLoading to dependencies

  // Disabled API fetch function
  // const fetchBooks = async () => {
  //   try {
  //     const apiUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/library'}`);

  //     // Add pagination parameters
  //     apiUrl.searchParams.append('page', currentPage.toString());
  //     apiUrl.searchParams.append('limit', itemsPerPage.toString());

  //     // Add sorting parameters if they exist
  //     if (sortConfig) {
  //       apiUrl.searchParams.append('sort', sortConfig.key);
  //       apiUrl.searchParams.append('order', sortConfig.direction);
  //     }

  //     // Add search parameter if it exists
  //     if (searchQuery) {
  //       apiUrl.searchParams.append('q', searchQuery);
  //     }

  //     console.log('Fetching books from:', apiUrl.toString());

  //     const response = await fetch(apiUrl.toString());
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch books');
  //     }
  //     const data = await response.json();
  //     console.log('API Response:', data);

  //     setBooks(data.items);
  //     setTotalPages(data.pages);
  //     setTotalItems(data.total);
  //   } catch (err) {
  //     console.error('Error fetching books:', err);
  //     setError(err instanceof Error ? err.message : 'An error occurred');
  //     toast({
  //       title: 'Error fetching books',
  //       description: err instanceof Error ? err.message : 'An error occurred',
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //     setBooks([]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Disabled add book functionality
  // const handleAddBook = async (book: Omit<Book, 'id' | 'date_added'>) => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/library'}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(book),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error('Error response:', errorData);
  //       throw new Error(errorData.detail || 'Failed to create book');
  //       }

  //     const newBook = await response.json();
  //     setBooks(prevBooks => [...prevBooks, newBook]);
  //     toast({
  //       title: 'Book created',
  //       description: `${newBook.title} has been added to your library`,
  //       status: 'success',
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   } catch (err) {
  //     console.error('Error creating book:', err);
  //     console.error('Error creating book:', err);
  //     toast({
  //       title: 'Error creating book',
  //       description: err instanceof Error ? err.message : 'An error occurred',
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }
  // };

  // Disabled edit book functionality
  // const handleEditBook = async (book: Book) => {
  //   try {
  //     // Only send the fields that are allowed in the update schema
  //     const updateData = {
  //       title: book.title,
  //       author: book.author,
  //       pages: book.pages,
  //       rating: book.rating,
  //       review: book.review,
  //       isbn_13: book.isbn_13,
  //       isbn_10: book.isbn_10,
  //       completed: book.completed,
  //       publisher: book.publisher,
  //       publication_date: book.publication_date,
  //       genre: book.genre,
  //       sub_genre: book.sub_genre,
  //       language: book.language,
  //       format: book.format,
  //       edition: book.edition,
  //       summary: book.summary,
  //       tags: book.tags,
  //       cover_image_url: book.cover_image_url
  //     };

  //     console.log('Sending update data:', updateData);

  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/library'}/${book.id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(updateData),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error('Error response:', errorData);
  //       throw new Error(errorData.detail || 'Failed to update book');
  //     }

  //     const updatedBook = await response.json();
  //     setBooks(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b));
  //     toast({
  //       title: 'Book updated',
  //       status: 'success',
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   } catch (err) {
  //     console.error('Error updating book:', err);
  //     toast({
  //       title: 'Error updating book',
  //       description: err instanceof Error ? err.message : 'An error occurred',
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }
  // };

  // Disabled delete book functionality
  // const handleDeleteBook = async (bookId: string) => {
  //   try {
  //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/library'}/${bookId}`, {
  //       method: 'DELETE',
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to delete book');
  //     }

  //     setBooks(prev => prev.filter(b => b.id !== bookId));
  //     toast({
  //       title: 'Book deleted',
  //       status: 'success',
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   } catch (err) {
  //     toast({
  //       title: 'Error deleting book',
  //       description: err instanceof Error ? err.message : 'An error occurred',
  //       status: 'error',
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //     throw err;
  //   }
  // };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const handleSort = (key: keyof Book) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    // Update sort config
    const newSortConfig = { key, direction };
    setSortConfig(newSortConfig);
    setCurrentPage(1); // Reset to first page when sorting changes

    // Update URL with new sort parameters
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', key);
    params.set('direction', direction);
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    // Update URL with new page
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);

    // Update URL with book ID
    const params = new URLSearchParams(searchParams.toString());
    params.set('book', book.id);
    router.push(`?${params.toString()}`);
  };

  const handleCloseBookDetails = () => {
    setSelectedBook(null);

    // Remove book ID from URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete('book');
    router.push(`?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSortConfig(null);
    setCurrentPage(1);
    setSelectedBook(null);

    // Clear all parameters from URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete('sort');
    params.delete('direction');
    params.delete('page');
    params.delete('book');
    router.push(`?${params.toString()}`);
  };

  const currentBooks = books;

  if (error) {
    return (
      <Container maxW="container.xl" py={2}>
        <Text color="red.500">{error}</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl">
      {showComingSoon && (
        <Alert
          status="info"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="auto"
          py={6}
          mb={6}
          borderRadius="lg"
          bg="blue.50"
          border="1px solid"
          borderColor="blue.200"
        >
          <AlertIcon boxSize="40px" />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Coming Aug 31, 2025
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            We&apos;re working on exciting new features for Minerva! Stay tuned for enhanced book management,
            reading analytics, and more.
          </AlertDescription>
        </Alert>
      )}

      <Box mb={8}>
        {/* Search bar and table removed for coming soon mode */}
      </Box>
    </Container>
  );
}

