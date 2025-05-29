import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Book } from '@/types/book';

interface BookTableProps {
  books: Book[];
  sort: string;
  order: 'asc' | 'desc';
  onSort: (column: string) => void;
  onBookClick: (book: Book) => void;
}

export default function BookTable({ books, sort, order, onSort, onBookClick }: BookTableProps) {
  const columns = [
    { key: 'title', label: 'Title', width: '300px' },
    { key: 'author', label: 'Author', width: '200px' },
    { key: 'pages', label: 'Length (Pages)', width: '120px' },
    { key: 'rating', label: 'Rating', width: '100px' },
    { key: 'completed', label: 'Completed', width: '100px' },
    { key: 'date_added', label: 'Date Added', width: '120px' },
  ];

  return (
    <TableContainer
      component={Paper}
      sx={{
        bgcolor: 'background.default',
        '& .MuiPaper-root': {
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#1e1e1e' : 'background.default',
        },
        pb: 2
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(col => (
              <TableCell
                key={col.key}
                onClick={() => onSort(col.key)}
                sx={{
                  cursor: 'pointer',
                  fontWeight: sort === col.key ? '700' : '600',
                  fontSize: '1rem',
                  padding: '12px 16px',
                  letterSpacing: '0.025em',
                  borderBottom: 'none',
                  width: col.width,
                  minWidth: col.width,
                  maxWidth: col.width
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
            <TableRow
              key={book.id}
              onClick={() => onBookClick(book)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2a2a2a' : '#f2f2f6',
                  transition: 'background-color 0.2s ease'
                }
              }}
            >
              <TableCell
                className="font-medium"
                sx={{
                  borderBottom: 'none',
                  maxWidth: '300px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '1rem',
                  padding: '12px 16px'
                }}
              >
                {book.title}
              </TableCell>
              <TableCell sx={{ borderBottom: 'none', fontSize: '1rem', padding: '12px 16px' }}>{book.author}</TableCell>
              <TableCell className="hidden md:table-cell" sx={{ borderBottom: 'none', fontSize: '1rem', padding: '12px 16px' }}>{book.pages}</TableCell>
              <TableCell className="hidden md:table-cell" sx={{ borderBottom: 'none', fontSize: '1rem', padding: '12px 16px' }}>{book.rating}</TableCell>
              <TableCell className="hidden md:table-cell" sx={{ borderBottom: 'none', fontSize: '1rem', padding: '12px 16px' }}>
                {book.completed === 0 ? 'Not Started' :
                 book.completed === 100 ? 'Completed' :
                 `In Progress (${book.completed}%)`}
              </TableCell>
              <TableCell className="hidden md:table-cell" sx={{ borderBottom: 'none', fontSize: '1rem', padding: '12px 16px' }}>
                {new Date(book.date_added).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}