'use client';

import { useEffect, useState, Suspense, useCallback } from 'react';
import { Container, Typography, IconButton, Snackbar, Alert, Box } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import dynamic from 'next/dynamic';
import BookDetails from '@/components/BookDetails';
import AddBookModal from '@/components/AddBookModal';
import TableControls from '@/components/TableControls';
import BookTable from '@/components/BookTable';
import PaginationControls from '@/components/PaginationControls';
import { Book } from '@/types/book';
import { SelectChangeEvent } from '@mui/material/Select';

// Dynamically import SearchWrapper with SSR disabled and loading state
const SearchWrapper = dynamic(() => import('@/components/SearchWrapper'), {
  ssr: false,
  loading: () => <div>Loading search...</div>
});

function PageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get('page') || '1', 10);
  const initialLimit = parseInt(searchParams.get('limit') || '25', 10);
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
  const [totalItems, setTotalItems] = useState(0);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [sort, setSort] = useState(initialSort);
  const [order, setOrder] = useState<'asc' | 'desc'>(initialOrder as 'asc' | 'desc');
  const [completed, setCompleted] = useState(initialCompleted);
  const [query, setQuery] = useState(initialQuery);

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);

  useEffect(() => {
    setPage(initialPage);
    setLimit(initialLimit);
    setSort(initialSort);
    setOrder(initialOrder as 'asc' | 'desc');
    setCompleted(initialCompleted);
    setQuery(initialQuery);
  }, [initialPage, initialLimit, initialSort, initialOrder, initialCompleted, initialQuery]);

  const fetchBooks = useCallback(async () => {
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
      setFilteredTotal(data.total);

      // Fetch total books without filters
      const totalParams = new URLSearchParams();
      if (query) {
        totalParams.set('q', query);
      }
      const totalResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/library"}?${totalParams.toString()}&limit=1`);
      if (totalResponse.ok) {
        const totalData = await totalResponse.json();
        setTotalItems(totalData.total);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [page, limit, sort, order, completed, query]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

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

  const handleSort = (column: string) => {
    let newOrder = 'asc';
    if (sort === column) {
      newOrder = order === 'asc' ? 'desc' : 'asc';
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', column);
    params.set('order', newOrder);
    params.set('page', '1');
    if (query) {
      params.set('q', query);
    }
    params.set('completed', completed);
    router.push(`/?${params.toString()}`);
  };

  const handleCompletedChange = (event: SelectChangeEvent) => {
    const newCompleted = event.target.value;
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

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleBookDelete = () => {
    setSelectedBook(null);
    setDeleteSuccess(true);
    fetchBooks();
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
    <Container maxWidth={false} sx={{ py: 4, maxWidth: '1400px' }}>
      <IconButton
        size="small"
        onClick={() => setIsAddModalOpen(true)}
        sx={{
          position: 'fixed',
          left: 16,
          top: 16,
          zIndex: 1000,
          backgroundColor: 'background.paper',
          boxShadow: 1,
          '&:hover': {
            backgroundColor: 'action.hover',
          },
          fontSize: '1.25rem'
        }}
      >
        <AddIcon />
      </IconButton>

      <AddBookModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          setIsAddModalOpen(false);
          setAddSuccess(true);
          fetchBooks();
        }}
      />

      <Box sx={{ mb: 4 }}>
        <SearchWrapper />
      </Box>

      <TableControls
        limit={limit}
        totalItems={totalItems}
        filteredTotal={filteredTotal}
        completed={completed}
        onLimitChange={(newLimit) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set('limit', newLimit.toString());
          params.set('page', '1');
          router.push(`/?${params.toString()}`);
        }}
        onCompletedChange={handleCompletedChange}
        onClear={handleClear}
      />

      <BookTable
        books={books}
        sort={sort}
        order={order}
        onSort={handleSort}
        onBookClick={handleBookClick}
      />

      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <BookDetails
        book={selectedBook}
        open={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        onDelete={handleBookDelete}
        onEdit={() => {
          fetchBooks();
        }}
      />

      <Snackbar
        open={deleteSuccess}
        autoHideDuration={3000}
        onClose={() => setDeleteSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setDeleteSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Book deleted successfully
        </Alert>
      </Snackbar>

      <Snackbar
        open={addSuccess}
        autoHideDuration={3000}
        onClose={() => setAddSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ zIndex: 9999 }}
      >
        <Alert onClose={() => setAddSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Book added successfully
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    }>
      <PageContent />
    </Suspense>
  );
}

