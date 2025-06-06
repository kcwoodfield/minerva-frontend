'use client';

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
  IconButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (book: {
    title: string;
    author: string;
    pages: number;
    rating: number;
    completed: number;
  }) => void;
}

export default function AddBookModal({ isOpen, onClose, onAdd }: AddBookModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [completed, setCompleted] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title,
      author,
      pages,
      rating,
      completed,
    });
    setTitle('');
    setAuthor('');
    setPages(0);
    setRating(0);
    setCompleted(0);
    onClose();
  };

  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader>Add New Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit} id="add-book-form">
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
            form="add-book-form"
            colorScheme="blue"
            leftIcon={<AddIcon />}
          >
            Add Book
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}