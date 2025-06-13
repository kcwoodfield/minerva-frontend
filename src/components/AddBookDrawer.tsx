'use client';

import { useState } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  DrawerCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  useColorModeValue,
  Grid,
  GridItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  HStack,
  Text,
} from '@chakra-ui/react';
import { Book } from '@/types/book';

interface AddBookDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Omit<Book, 'id' | 'date_added'>) => Promise<void>;
}

export default function AddBookDrawer({ isOpen, onClose, onSave }: AddBookDrawerProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [pages, setPages] = useState<number | ''>('');
  const [rating, setRating] = useState<number | ''>('');
  const [review, setReview] = useState('');
  const [completed, setCompleted] = useState(0);
  const [publisher, setPublisher] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [genre, setGenre] = useState('');
  const [subGenre, setSubGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [format, setFormat] = useState('');
  const [edition, setEdition] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [relatedBooks, setRelatedBooks] = useState('');
  const [seriesInfo, setSeriesInfo] = useState('');
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bookData: Omit<Book, 'id' | 'date_added'> = {
        title,
        author,
        isbn_13: isbn,
        pages: pages ? Number(pages) : 0,
        rating: rating ? Number(rating) : 0,
        review,
        completed,
        publisher,
        publication_date: publicationDate,
        genre,
        sub_genre: subGenre,
        language,
        format,
        edition,
        summary,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        cover_image_url: coverImageUrl,
        subtitle,
        related_books: relatedBooks.split(',').map(book => {
          const [title, author, isbn] = book.split('|').map(s => s.trim());
          return { title, author, isbn_13: isbn };
        }).filter(book => book.title && book.author && book.isbn_13),
        series_info: seriesInfo,
      };

      await onSave(bookData);
      onClose();
      toast({
        title: 'Book added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error adding book',
        description: error instanceof Error ? error.message : 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="xl"
    >
      <DrawerOverlay />
      <DrawerContent bg={bgColor}>
        <DrawerHeader borderBottomWidth="1px">
          Add New Book
        </DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                <GridItem colSpan={3}>
                  <FormControl isRequired>
                    <FormLabel>Title</FormLabel>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter book title"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={3}>
                  <FormControl>
                    <FormLabel>Subtitle</FormLabel>
                    <Input
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                      placeholder="Enter book subtitle"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={3}>
                  <FormControl isRequired>
                    <FormLabel>Author</FormLabel>
                    <Input
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Enter author name"
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>ISBN-13</FormLabel>
                    <Input
                      value={isbn}
                      onChange={(e) => setIsbn(e.target.value)}
                      placeholder="Enter ISBN-13"
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Pages</FormLabel>
                    <NumberInput
                      value={pages}
                      onChange={(_, value) => setPages(value)}
                      min={0}
                    >
                      <NumberInputField placeholder="Enter number of pages" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Rating (0-5)</FormLabel>
                    <NumberInput
                      value={rating}
                      onChange={(_, value) => setRating(value)}
                      min={0}
                      max={5}
                      step={0.5}
                    >
                      <NumberInputField placeholder="Enter rating" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Publisher</FormLabel>
                    <Input
                      value={publisher}
                      onChange={(e) => setPublisher(e.target.value)}
                      placeholder="Enter publisher"
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Publication Date</FormLabel>
                    <Input
                      type="date"
                      value={publicationDate}
                      onChange={(e) => setPublicationDate(e.target.value)}
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Genre</FormLabel>
                    <Input
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      placeholder="Enter genre"
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Sub-Genre</FormLabel>
                    <Input
                      value={subGenre}
                      onChange={(e) => setSubGenre(e.target.value)}
                      placeholder="Enter sub-genre"
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Language</FormLabel>
                    <Input
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      placeholder="Enter language"
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Format</FormLabel>
                    <Input
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                      placeholder="Enter format"
                    />
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel>Edition</FormLabel>
                    <Input
                      value={edition}
                      onChange={(e) => setEdition(e.target.value)}
                      placeholder="Enter edition"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={3}>
                  <FormControl>
                    <FormLabel>Series Info</FormLabel>
                    <Input
                      value={seriesInfo}
                      onChange={(e) => setSeriesInfo(e.target.value)}
                      placeholder="Enter series information"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={3}>
                  <FormControl>
                    <FormLabel>Related Books</FormLabel>
                    <Input
                      value={relatedBooks}
                      onChange={(e) => setRelatedBooks(e.target.value)}
                      placeholder="Enter related books (comma-separated)"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={3}>
                  <FormControl>
                    <FormLabel>Tags</FormLabel>
                    <Input
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="Enter tags (comma-separated)"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={3}>
                  <FormControl>
                    <FormLabel>Cover Image URL</FormLabel>
                    <Input
                      value={coverImageUrl}
                      onChange={(e) => setCoverImageUrl(e.target.value)}
                      placeholder="Enter cover image URL"
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={3}>
                  <FormControl>
                    <FormLabel>Progress</FormLabel>
                    <HStack justify="space-between" mb={2}>
                      <Text>0%</Text>
                      <Text>50%</Text>
                      <Text>100%</Text>
                    </HStack>
                    <Slider
                      value={completed}
                      onChange={setCompleted}
                      min={0}
                      max={100}
                      step={1}
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={3}>
                  <FormControl>
                    <FormLabel>Review</FormLabel>
                    <Textarea
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder="Enter your review"
                      rows={4}
                    />
                  </FormControl>
                </GridItem>

                <GridItem colSpan={3}>
                  <FormControl>
                    <FormLabel>Summary</FormLabel>
                    <Textarea
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Enter book summary"
                      rows={4}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
            </VStack>
          </form>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}