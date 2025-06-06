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
  Text,
  Box,
  Grid,
  GridItem,
  IconButton,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Book } from '@/types/book';
import Image from 'next/image';

interface BookDetailsProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (book: Book) => void;
  onDelete: (bookId: number) => void;
}

export default function BookDetails({ book, isOpen, onClose, onEdit, onDelete }: BookDetailsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(Number(book.id));
      toast({
        title: 'Book deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error deleting book',
        description: error instanceof Error ? error.message : 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader>{book.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Text fontWeight="bold">Author</Text>
              <Text>{book.author}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Pages</Text>
              <Text>{book.pages}</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Rating</Text>
              <Text>{book.rating}/5</Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Progress</Text>
              <Text>
                {book.completed === 0 ? 'Not Started' :
                 book.completed === 100 ? 'Completed' :
                 `In Progress (${book.completed}%)`}
              </Text>
            </GridItem>
            <GridItem>
              <Text fontWeight="bold">Date Added</Text>
              <Text>{new Date(book.date_added).toLocaleDateString()}</Text>
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <IconButton
            aria-label="Edit book"
            icon={<EditIcon />}
            onClick={() => onEdit(book)}
            mr={3}
            variant="ghost"
          />
          <IconButton
            aria-label="Delete book"
            icon={<DeleteIcon />}
            onClick={handleDelete}
            isLoading={isDeleting}
            colorScheme="red"
            variant="ghost"
            mr={3}
          />
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}