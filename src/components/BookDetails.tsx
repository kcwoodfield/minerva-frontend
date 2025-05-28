'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Grid, Rating, Alert, Snackbar } from '@mui/material';
import { Book } from '@/types/book';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

interface BookDetailsProps {
  book: Book | null;
  open: boolean;
  onClose: () => void;
  onDelete?: () => void;
}

export default function BookDetails({ book, open, onClose, onDelete }: BookDetailsProps) {
  const [mounted, setMounted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!book) return;

    try {
      setIsDeleting(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/library"}/${book.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to delete book');
      }

      setShowDeleteConfirm(false);
      onClose();
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete book');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  if (!book || !mounted) return null;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: resolvedTheme === 'dark' ? 'background.paper' : 'background.paper',
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h5" component="div" sx={{ fontFamily: 'var(--font-eb-garamond)' }}>
            {book.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            by {book.author}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              {book.cover_image_url && (
                <Box
                  component="img"
                  src={book.cover_image_url}
                  alt={`Cover of ${book.title}`}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 1,
                    boxShadow: 3,
                  }}
                />
              )}
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      ISBN-13
                    </Typography>
                    <Typography variant="body1">
                      {book.isbn_13}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      ISBN-10
                    </Typography>
                    <Typography variant="body1">
                      {book.isbn_10 || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Publisher
                    </Typography>
                    <Typography variant="body1">
                      {book.publisher}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Publication Date
                    </Typography>
                    <Typography variant="body1">
                      {new Date(book.publication_date).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Pages
                    </Typography>
                    <Typography variant="body1">
                      {book.pages}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Rating
                    </Typography>
                    <Rating value={book.rating} readOnly precision={0.5} />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Summary
                </Typography>
                <Typography variant="body1">
                  {book.summary}
                </Typography>
              </Box>
              {book.tags && book.tags.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Tags
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {book.tags.map((tag, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        sx={{
                          backgroundColor: resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                          padding: '4px 8px',
                          borderRadius: 1,
                        }}
                      >
                        {tag}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteClick}
            color="error"
            startIcon={<DeleteIcon />}
            disabled={isDeleting}
            sx={{ fontFamily: 'var(--font-eb-garamond)' }}
          >
            {isDeleting ? 'Deleting...' : 'Delete Book'}
          </Button>
          <Button onClick={onClose} sx={{ fontFamily: 'var(--font-eb-garamond)' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={showDeleteConfirm}
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: resolvedTheme === 'dark' ? 'background.paper' : 'background.paper',
          }
        }}
      >
        <DialogTitle sx={{ fontFamily: 'var(--font-eb-garamond)' }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ fontFamily: 'var(--font-eb-garamond)' }}>
            Are you sure you want to delete &ldquo;{book.title}&rdquo;? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteCancel}
            sx={{ fontFamily: 'var(--font-eb-garamond)' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={isDeleting}
            sx={{ fontFamily: 'var(--font-eb-garamond)' }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}