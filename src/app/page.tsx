'use client';

import { useEffect, useState } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Box, TextField, MenuItem, FormControl, InputLabel, Select, IconButton, Tooltip, SelectChangeEvent } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import ClearIcon from '@mui/icons-material/Clear';
import dynamic from 'next/dynamic';

// Dynamically import SearchWrapper with SSR disabled
const SearchWrapper = dynamic(() => import('@/components/SearchWrapper'), {
  ssr: false
});

interface Book {
  id: string;  // Unique ID (UUID)
  title: string;
  author: string;
  isbn_13: string;
  isbn_10: string | null;
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
    isbn_13: string;
  }[];
  series_info: string | null;
  completed: boolean;
  date_added: string;
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialLimit = parseInt(searchParams.get('limit') || '10', 10);
  const initialSort = searchParams.get('sort') || 'title';
  const initialOrder = searchParams.get('order') || 'asc';
  const initialCompleted = searchParams.get('completed') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState(initialSort);
  const [order, setOrder] = useState<'asc' | 'desc'>(initialOrder as 'asc' | 'desc');
  const [completed, setCompleted] = useState(initialCompleted);
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setPage(initialPage);
    setLimit(initialLimit);
    setSort(initialSort);
    setOrder(initialOrder as 'asc' | 'desc');
    setCompleted(initialCompleted);
    setQuery(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage, initialLimit, initialSort, initialOrder, initialCompleted, initialQuery]);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          sort,
          order,
          completed,
        });
        if (query) {
          params.set('q', query);
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/library"}?${params.toString()}`);
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data.items);
        setTotalPages(data.pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, [page, limit, sort, order, completed, query]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    params.set('limit', limit.toString());
    params.set('sort', sort);
    params.set('order', order);
    params.set('completed', completed);
    if (query) {
      params.set('q', query);
    }
    router.push(`/?${params.toString()}`);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const newSort = event.target.value as string;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    params.set('order', order);
    params.set('page', '1');
    if (query) {
      params.set('q', query);
    }
    params.set('completed', completed);
    router.push(`/?${params.toString()}`);
  };

  const handleOrderChange = () => {
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    const params = new URLSearchParams(searchParams.toString());
    params.set('order', newOrder);
    params.set('sort', sort);
    params.set('page', '1');
    if (query) {
      params.set('q', query);
    }
    params.set('completed', completed);
    router.push(`/?${params.toString()}`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('q', newQuery);
    params.set('page', '1');
    params.set('sort', sort);
    params.set('order', order);
    params.set('completed', completed);
    router.push(`/?${params.toString()}`);
  };

  const handleCompletedChange = (event: SelectChangeEvent<string>) => {
    const newCompleted = event.target.value as string;
    const params = new URLSearchParams(searchParams.toString());
    params.set('completed', newCompleted);
    params.set('page', '1');
    params.set('sort', sort);
    params.set('order', order);
    if (query) {
      params.set('q', query);
    }
    router.push(`/?${params.toString()}`);
  };

  const handleClear = () => {
    router.push('/');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Add SearchWrapper at the top */}
      <Box sx={{ mb: 4 }}>
        <SearchWrapper />
      </Box>

      {/* Controls row */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
        {/* Left side - Items per page selector */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ mr: 1 }}>Show:</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[10, 50, 'all'].map((size) => (
                <Button
                  key={size}
                  size="small"
                  sx={{ fontSize: '0.75rem', minWidth: '32px', padding: '2px 8px' }}
                  variant={limit === (size === 'all' ? totalPages * 10 : size) ? 'contained' : 'outlined'}
                  onClick={() => {
                    const newLimit = size === 'all' ? totalPages * 10 : size;
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('limit', newLimit.toString());
                    params.set('page', '1');
                    router.push(`/?${params.toString()}`);
                  }}
                >
                  {size}
                </Button>
              ))}
            </Box>
          </Box>
          <Typography variant="caption" color="text.secondary">
            Showing {((page - 1) * limit) + 1}-{Math.min(page * limit, totalPages * 10)} of {totalPages * 10} books
          </Typography>
        </Box>

        {/* Right side - Completed filter and clear button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="completed-label" sx={{ fontSize: '0.75rem' }}>Completed</InputLabel>
            <Select
              labelId="completed-label"
              value={completed}
              label="Completed"
              onChange={handleCompletedChange}
              sx={{ fontSize: '0.75rem' }}
            >
              <MenuItem value="all" sx={{ fontSize: '0.75rem' }}>All</MenuItem>
              <MenuItem value="true" sx={{ fontSize: '0.75rem' }}>Completed</MenuItem>
              <MenuItem value="false" sx={{ fontSize: '0.75rem' }}>Not Completed</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>Sort by date:</Typography>
            <Button
              size="small"
              sx={{ fontSize: '0.75rem', minWidth: '32px', padding: '2px 8px' }}
              variant={sort === 'date_added' ? 'contained' : 'outlined'}
              onClick={() => {
                const newOrder = sort === 'date_added' && order === 'asc' ? 'desc' : 'asc';
                const params = new URLSearchParams(searchParams.toString());
                params.set('sort', 'date_added');
                params.set('order', newOrder);
                params.set('page', '1');
                router.push(`/?${params.toString()}`);
              }}
            >
              {sort === 'date_added' ? (order === 'asc' ? 'Newest' : 'Oldest') : 'Date'}
            </Button>
          </Box>
          <Tooltip title="Clear filters and sorting">
            <IconButton onClick={handleClear} size="small">
              <ClearIcon sx={{ fontSize: '1rem' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                { key: 'title', label: 'Title' },
                { key: 'author', label: 'Author' },
                { key: 'pages', label: 'Length (Pages)' },
                { key: 'rating', label: 'Rating' },
                { key: 'completed', label: 'Completed' },
                { key: 'date_added', label: 'Date Added' },
              ].map(col => (
                <TableCell
                  key={col.key}
                  onClick={() => {
                    let newOrder = 'asc';
                    if (sort === col.key) {
                      newOrder = order === 'asc' ? 'desc' : 'asc';
                    }
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('sort', col.key);
                    params.set('order', newOrder);
                    params.set('page', '1');
                    if (query) {
                      params.set('q', query);
                    }
                    params.set('completed', completed);
                    router.push(`/?${params.toString()}`);
                  }}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: sort === col.key ? 'bold' : 'normal',
                    fontSize: '0.75rem',
                    padding: '8px 16px'
                  }}
                >
                  {col.label}
                  {sort === col.key && (
                    <span style={{ marginLeft: 4 }}>{order === 'asc' ? '↑' : '↓'}</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map(book => (
              <TableRow key={book.id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell className="hidden md:table-cell">{book.pages}</TableCell>
                <TableCell className="hidden md:table-cell">{book.rating}</TableCell>
                <TableCell className="hidden md:table-cell">{book.completed ? 'Yes' : 'No'}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(book.date_added).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Previous</Button>
        <Typography sx={{ mx: 2 }}>Page {page} of {totalPages}</Typography>
        <Button disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>Next</Button>
      </Box>
    </Container>
  );
}
