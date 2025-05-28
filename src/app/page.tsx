'use client';

import { useEffect, useState } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Box } from '@mui/material';

interface Book {
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
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001/api/library"}?page=${page}&limit=${limit}`);
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
  }, [page, limit]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell className="hidden md:table-cell">Length (Pages)</TableCell>
              <TableCell className="hidden md:table-cell">Rating</TableCell>
              <TableCell className="hidden md:table-cell">Completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map(book => (
              <TableRow key={book.isbn_13}>
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
