'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  FormControlLabel,
  Switch,
  Rating,
  Typography,
  Grid,
  Chip,
  IconButton,
  InputAdornment,
  Alert,
  Snackbar,
  Slider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

interface AddBookModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddBookModal({ open, onClose, onSuccess }: AddBookModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn13, setIsbn13] = useState('');
  const [isbn10, setIsbn10] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [genre, setGenre] = useState('');
  const [subGenre, setSubGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [pages, setPages] = useState('');
  const [format, setFormat] = useState('');
  const [edition, setEdition] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [completed, setCompleted] = useState(0);

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setIsbn13('');
    setIsbn10('');
    setPublisher('');
    setPublicationDate('');
    setGenre('');
    setSubGenre('');
    setLanguage('');
    setPages('');
    setFormat('');
    setEdition('');
    setSummary('');
    setTags([]);
    setCoverImageUrl('');
    setRating(null);
    setCompleted(0);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/library'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          author,
          isbn_13: isbn13,
          isbn_10: isbn10 || null,
          publisher,
          publication_date: publicationDate || null,
          genre,
          sub_genre: subGenre,
          language,
          pages: parseInt(pages),
          format,
          edition,
          summary,
          tags,
          cover_image_url: coverImageUrl,
          rating: rating || 0,
          completed,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to add book');
      }

      router.refresh();
      resetForm();
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setCompleted(newValue as number);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            position: 'absolute',
            top: '80px',
            margin: 0,
            p: 3,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
          }
        }}
      >
        <DialogTitle sx={{ fontFamily: 'var(--font-eb-garamond)' }}>
          Add New Book
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                  required
                  error={!title && isSubmitting}
                  helperText={!title && isSubmitting ? 'Title is required' : ''}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  fullWidth
                  required
                  error={!author && isSubmitting}
                  helperText={!author && isSubmitting ? 'Author is required' : ''}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="ISBN-13"
                  value={isbn13}
                  onChange={(e) => setIsbn13(e.target.value)}
                  fullWidth
                  required
                  inputProps={{ maxLength: 13 }}
                  error={!isbn13 && isSubmitting}
                  helperText={!isbn13 && isSubmitting ? 'ISBN-13 is required' : ''}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="ISBN-10"
                  value={isbn10}
                  onChange={(e) => setIsbn10(e.target.value)}
                  fullWidth
                  inputProps={{ maxLength: 10 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Publisher"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Publication Date"
                  type="date"
                  value={publicationDate}
                  onChange={(e) => setPublicationDate(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Genre"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Sub Genre"
                  value={subGenre}
                  onChange={(e) => setSubGenre(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Pages"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  type="number"
                  fullWidth
                  required
                  error={!pages && isSubmitting}
                  helperText={!pages && isSubmitting ? 'Pages is required' : ''}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Edition"
                  value={edition}
                  onChange={(e) => setEdition(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="subtitle2">Tags</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        onDelete={() => handleRemoveTag(tag)}
                      />
                    ))}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      label="Add Tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      size="small"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <IconButton onClick={handleAddTag} size="small">
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Cover Image URL"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography component="legend">Rating</Typography>
                  <Rating
                    value={rating}
                    onChange={(_, newValue) => setRating(newValue)}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: 2 }}>
                  <Typography gutterBottom>Completion Percentage</Typography>
                  <Slider
                    value={completed}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    step={5}
                    marks
                    min={0}
                    max={100}
                    valueLabelFormat={(value) => `${value}%`}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{ fontFamily: 'var(--font-eb-garamond)' }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ fontFamily: 'var(--font-eb-garamond)' }}
            disabled={!title || !author || !pages || !isbn13 || isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Book'}
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
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Book added successfully!
        </Alert>
      </Snackbar>
    </>
  );
}