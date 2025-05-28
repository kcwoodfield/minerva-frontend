'use client';

import { useEffect, useState } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Box, TextField, MenuItem, FormControl, InputLabel, Select, IconButton, Tooltip, SelectChangeEvent } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import ClearIcon from '@mui/icons-material/Clear';

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
}

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialLimit = parseInt(searchParams.get('limit') || '10', 10);
  const initialSort = searchParams.get('sort') || 'title';
  const initialOrder = searchParams.get('order') || 'asc';
  const initialFilter = searchParams.get('filter') || '';
  const initialCompleted = searchParams.get('completed') || 'all';

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState(initialSort);
  const [order, setOrder] = useState<'asc' | 'desc'>(initialOrder as 'asc' | 'desc');
  const [filter, setFilter] = useState(initialFilter);
  const [completed, setCompleted] = useState(initialCompleted);

  useEffect(() => {
    setPage(initialPage);
    setLimit(initialLimit);
    setSort(initialSort);
    setOrder(initialOrder as 'asc' | 'desc');
    setFilter(initialFilter);
    setCompleted(initialCompleted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPage, initialLimit, initialSort, initialOrder, initialFilter, initialCompleted]);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          sort,
          order,
          filter,
          completed,
        });
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
  }, [page, limit, sort, order, filter, completed]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    params.set('limit', limit.toString());
    params.set('sort', sort);
    params.set('order', order);
    params.set('filter', filter);
    params.set('completed', completed);
    router.push(`/?${params.toString()}`);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const newSort = event.target.value as string;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    params.set('order', order);
    params.set('page', '1');
    params.set('filter', filter);
    params.set('completed', completed);
    router.push(`/?${params.toString()}`);
  };

  const handleOrderChange = () => {
    const newOrder = order === 'asc' ? 'desc' : 'asc';
    const params = new URLSearchParams(searchParams.toString());
    params.set('order', newOrder);
    params.set('sort', sort);
    params.set('page', '1');
    params.set('filter', filter);
    params.set('completed', completed);
    router.push(`/?${params.toString()}`);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFilter = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('filter', newFilter);
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
    params.set('filter', filter);
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
      {/* Sorting and Filtering Controls */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          gap: 2
        }}
      >
        <TextField
          size="small"
          label="Filter by Title/Author"
          value={filter}
          onChange={handleFilterChange}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="completed-label">Completed</InputLabel>
          <Select
            labelId="completed-label"
            value={completed}
            label="Completed"
            onChange={handleCompletedChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="true">Completed</MenuItem>
            <MenuItem value="false">Not Completed</MenuItem>
          </Select>
        </FormControl>
        <Tooltip title="Clear filters and sorting">
          <IconButton onClick={handleClear}>
            <ClearIcon />
          </IconButton>
        </Tooltip>
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
                    params.set('filter', filter);
                    params.set('completed', completed);
                    router.push(`/?${params.toString()}`);
                  }}
                  style={{ cursor: 'pointer', fontWeight: sort === col.key ? 'bold' : 'normal' }}
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
