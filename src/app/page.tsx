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

import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

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
              <TableRow key={book.isbn}>
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
    </Container>
  );
}
