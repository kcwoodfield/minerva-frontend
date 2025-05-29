import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Rating, Typography, Slider } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Book } from '@/types/book';

interface EditBookModalProps {
  book: Book;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditBookModal({ book, open, onClose, onSuccess }: EditBookModalProps) {
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    pages: book.pages,
    rating: book.rating,
    review: book.review || '',
    completed: book.completed,
    publisher: book.publisher || '',
    publication_date: book.publication_date ? dayjs(book.publication_date) : null,
    summary: book.summary || '',
    tags: (book.tags || []).join(', '),
    isbn_13: book.isbn_13,
    isbn_10: book.isbn_10 || '',
    genre: book.genre || '',
    sub_genre: book.sub_genre || '',
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/library'}/${book.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          publication_date: formData.publication_date ? formData.publication_date.format('YYYY-MM-DD') : null,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to update book');
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontFamily: 'var(--font-eb-garamond)' }}>Edit Book</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                name="title"
                label="Title"
                value={formData.title}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="author"
                label="Author"
                value={formData.author}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="isbn_13"
                label="ISBN-13"
                value={formData.isbn_13}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="isbn_10"
                label="ISBN-10"
                value={formData.isbn_10}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="publisher"
                label="Publisher"
                value={formData.publisher}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="pages"
                label="Pages"
                type="number"
                value={formData.pages}
                onChange={handleChange}
                required
                fullWidth
              />
              <TextField
                name="genre"
                label="Genre"
                value={formData.genre}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                name="sub_genre"
                label="Sub-genre"
                value={formData.sub_genre}
                onChange={handleChange}
                fullWidth
              />
            </Box>

            <Box>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="rating"
                value={formData.rating}
                onChange={(_, value) => {
                  setFormData(prev => ({ ...prev, rating: value || 0 }));
                }}
              />
            </Box>

            <Box>
              <Typography component="legend">Completion</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                <Slider
                  value={formData.completed}
                  onChange={(_, value) => {
                    setFormData(prev => ({ ...prev, completed: value as number }));
                  }}
                  min={0}
                  max={100}
                  step={1}
                  sx={{ flex: 1 }}
                />
                <Typography sx={{ minWidth: 45 }}>
                  {formData.completed}%
                </Typography>
              </Box>
            </Box>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Publication Date"
                value={formData.publication_date}
                onChange={(newValue) => {
                  setFormData(prev => ({ ...prev, publication_date: newValue }));
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>

            <TextField
              name="review"
              label="Review"
              value={formData.review}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />

            <TextField
              name="summary"
              label="Summary"
              value={formData.summary}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />

            <TextField
              name="tags"
              label="Tags (comma-separated)"
              value={formData.tags}
              onChange={handleChange}
              fullWidth
            />

            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={{ fontFamily: 'var(--font-eb-garamond)' }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{ fontFamily: 'var(--font-eb-garamond)' }}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}