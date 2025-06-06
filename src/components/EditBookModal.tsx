import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Book } from '@/types/book';

interface EditBookModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
}

export default function EditBookModal({ book, isOpen, onClose, onSave }: EditBookModalProps) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [pages, setPages] = useState(book.pages || 0);
  const [rating, setRating] = useState(book.rating || 0);
  const [completed, setCompleted] = useState(book.completed || 0);
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const updatedBook = {
        ...book,
        title,
        author,
        pages,
        rating,
        completed,
      };
      await onSave(updatedBook);
      onClose();
    } catch (error) {
      toast({
        title: 'Error updating book',
        description: error instanceof Error ? error.message : 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader>Edit Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit} id="edit-book-form">
            <FormControl isRequired mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter book title"
              />
            </FormControl>

            <FormControl isRequired mb={4}>
              <FormLabel>Author</FormLabel>
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter author name"
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Pages</FormLabel>
              <NumberInput
                value={pages}
                onChange={(_, value) => setPages(value)}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Rating (0-5)</FormLabel>
              <NumberInput
                value={rating}
                onChange={(_, value) => setRating(value)}
                min={0}
                max={5}
                step={0.5}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Progress (0-100%)</FormLabel>
              <NumberInput
                value={completed}
                onChange={(_, value) => setCompleted(value)}
                min={0}
                max={100}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-book-form"
            colorScheme="blue"
            isLoading={isSaving}
          >
            Save Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}