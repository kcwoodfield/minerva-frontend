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
  InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddBookModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddBookModal({ open, onClose }: AddBookModalProps) {
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
  const [completed, setCompleted] = useState(false);

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/library"}`, {
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
          publication_date: publicationDate,
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
        throw new Error('Failed to add book');
      }

      // Reset form
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
      setCompleted(false);
      onClose();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                fullWidth
                required
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
              <FormControlLabel
                control={
                  <Switch
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                  />
                }
                label="Completed"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ fontFamily: 'var(--font-eb-garamond)' }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ fontFamily: 'var(--font-eb-garamond)' }}
          disabled={!title || !author || !pages || !isbn13}
        >
          Add Book
        </Button>
      </DialogActions>
    </Dialog>
  );
}