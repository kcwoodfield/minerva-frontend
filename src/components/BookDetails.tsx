'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Grid, Rating, Alert, Snackbar, LinearProgress } from '@mui/material';
import { Book } from '@/types/book';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditBookModal from './EditBookModal';
import Image from 'next/image';

interface BookDetailsProps {
  book: Book | null;
  open: boolean;
  onClose: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}

export default function BookDetails({ book, open, onClose, onDelete, onEdit }: BookDetailsProps) {
  const [mounted, setMounted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDelete = async () => {
    if (!book || !window.confirm('Are you sure you want to delete this book?')) {
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/library'}/${book.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to delete book');
      }

      onClose();
      if (onDelete) {
        onDelete();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!book || !mounted) return null;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: resolvedTheme === 'dark' ? 'background.paper' : 'background.paper',
          }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h5" component="div" sx={{ fontFamily: 'var(--font-eb-garamond)' }}>
                {book.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                by {book.author}
              </Typography>
            </Box>
            <Button
              onClick={onClose}
              sx={{
                fontFamily: 'var(--font-eb-garamond)',
                minWidth: 'auto',
                p: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              ✕
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {book.cover_image_url && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Image
                  src={book.cover_image_url}
                  alt={`Cover of ${book.title}`}
                  width={200}
                  height={300}
                  style={{ maxWidth: '200px', maxHeight: '300px', objectFit: 'contain' }}
                />
              </Box>
            )}
            <Box>
              <Typography variant="subtitle2" color="text.secondary">ISBN-13</Typography>
              <Typography>{book.isbn_13}</Typography>
            </Box>
            {book.isbn_10 && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary">ISBN-10</Typography>
                <Typography>{book.isbn_10}</Typography>
              </Box>
            )}
            {book.publisher && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Publisher</Typography>
                <Typography>{book.publisher}</Typography>
              </Box>
            )}
            {book.publication_date && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Publication Date</Typography>
                <Typography>{book.publication_date}</Typography>
              </Box>
            )}
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Pages</Typography>
              <Typography>{book.pages}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Rating</Typography>
              <Typography>{book.rating}/5</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">Completion</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress variant="determinate" value={book.completed} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">{`${book.completed}%`}</Typography>
                </Box>
              </Box>
            </Box>
            {book.summary && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Summary</Typography>
                <Typography>{book.summary}</Typography>
              </Box>
            )}
            {book.tags && book.tags.length > 0 && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary">Tags</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {book.tags.map((tag) => (
                    <Typography
                      key={tag}
                      variant="body2"
                      sx={{
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {tag}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDelete}
            color="error"
            startIcon={<DeleteIcon />}
            disabled={isDeleting}
            sx={{ fontFamily: 'var(--font-eb-garamond)', mr: 'auto' }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
          <Button
            onClick={() => setIsEditModalOpen(true)}
            startIcon={<EditIcon />}
            sx={{ fontFamily: 'var(--font-eb-garamond)' }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      {book && (
        <EditBookModal
          book={book}
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={() => {
            setIsEditModalOpen(false);
            if (onEdit) {
              onEdit();
            }
          }}
        />
      )}

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