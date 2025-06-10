'use client';

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';
import { Book } from '@/types/book';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (book: Book) => void;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = React.useState<Partial<Book>>({
    title: '',
    author: '',
    pages: 0,
    rating: 0,
    completed: 0,
    review: '',
    isbn_13: '',
    isbn_10: '',
    publisher: '',
    publication_date: '',
    genre: '',
    sub_genre: '',
    language: '',
    format: '',
    edition: '',
    summary: '',
    tags: [],
    cover_image_url: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData as Book);
    setFormData({
      title: '',
      author: '',
      pages: 0,
      rating: 0,
      completed: 0,
      review: '',
      isbn_13: '',
      isbn_10: '',
      publisher: '',
      publication_date: '',
      genre: '',
      sub_genre: '',
      language: '',
      format: '',
      edition: '',
      summary: '',
      tags: [],
      cover_image_url: ''
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const modalBg = useColorModeValue('white', 'gray.800');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg={modalBg}>
        <ModalHeader>Add New Book</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Author</FormLabel>
                <Input
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Pages</FormLabel>
                <NumberInput
                  min={0}
                  value={formData.pages}
                  onChange={(value) => handleNumberChange('pages', value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Rating</FormLabel>
                <NumberInput
                  min={0}
                  max={5}
                  step={0.5}
                  value={formData.rating}
                  onChange={(value) => handleNumberChange('rating', value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select
                  name="completed"
                  value={formData.completed}
                  onChange={handleChange}
                >
                  <option value={0}>Not Started</option>
                  <option value={1}>In Progress</option>
                  <option value={2}>Completed</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>ISBN-13</FormLabel>
                <Input
                  name="isbn_13"
                  value={formData.isbn_13}
                  onChange={handleChange}
                  placeholder="Enter ISBN-13"
                />
              </FormControl>

              <FormControl>
                <FormLabel>ISBN-10</FormLabel>
                <Input
                  name="isbn_10"
                  value={formData.isbn_10}
                  onChange={handleChange}
                  placeholder="Enter ISBN-10"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Publisher</FormLabel>
                <Input
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  placeholder="Enter publisher"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Publication Date</FormLabel>
                <Input
                  name="publication_date"
                  value={formData.publication_date}
                  onChange={handleChange}
                  placeholder="YYYY-MM-DD"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Genre</FormLabel>
                <Input
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  placeholder="Enter genre"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Sub Genre</FormLabel>
                <Input
                  name="sub_genre"
                  value={formData.sub_genre}
                  onChange={handleChange}
                  placeholder="Enter sub genre"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Language</FormLabel>
                <Input
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="Enter language"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Format</FormLabel>
                <Input
                  name="format"
                  value={formData.format}
                  onChange={handleChange}
                  placeholder="Enter format"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Edition</FormLabel>
                <Input
                  name="edition"
                  value={formData.edition}
                  onChange={handleChange}
                  placeholder="Enter edition"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Summary</FormLabel>
                <Input
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Enter summary"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Cover Image URL</FormLabel>
                <Input
                  name="cover_image_url"
                  value={formData.cover_image_url}
                  onChange={handleChange}
                  placeholder="Enter cover image URL"
                />
              </FormControl>

              <Button type="submit" colorScheme="blue" width="full">
                Add Book
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddBookModal;