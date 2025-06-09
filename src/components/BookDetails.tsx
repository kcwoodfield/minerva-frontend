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
  Image as ChakraImage,
  HStack,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import { Book } from '@/types/book';
import Image from 'next/image';

interface BookDetailsProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (book: Book) => void;
  onDelete: (bookId: string) => void;
}

export default function BookDetails({ book, isOpen, onClose, onEdit, onDelete }: BookDetailsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(book.id);
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
      <ModalContent maxW="800px" bg={bgColor}>
        <ModalHeader>
          <Text fontSize="2xl" fontFamily="EB Garamond">{book.title}</Text>
          {book.rating && (
            <HStack spacing={1} mt={2}>
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  color={index < book.rating ? "yellow.400" : "gray.200"}
                />
              ))}
              <Text fontFamily="EB Garamond" ml={2}>({book.rating}/5)</Text>
            </HStack>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <GridItem>
              <Text fontWeight="bold" fontFamily="EB Garamond">Author</Text>
              <Text fontFamily="EB Garamond">{book.author}</Text>
            </GridItem>
            {book.pages && (
              <GridItem>
                <Text fontWeight="bold" fontFamily="EB Garamond">Pages</Text>
                <Text fontFamily="EB Garamond">{book.pages}</Text>
              </GridItem>
            )}
            <GridItem>
              <Text fontWeight="bold" fontFamily="EB Garamond">Progress</Text>
              <Text fontFamily="EB Garamond">
                {book.completed === 0 ? 'Not Started' :
                 book.completed === 100 ? 'Completed' :
                 `In Progress (${book.completed}%)`}
              </Text>
            </GridItem>
            {book.publisher && (
              <GridItem>
                <Text fontWeight="bold" fontFamily="EB Garamond">Publisher</Text>
                <Text fontFamily="EB Garamond">{book.publisher}</Text>
              </GridItem>
            )}
            {book.publication_date && (
              <GridItem>
                <Text fontWeight="bold" fontFamily="EB Garamond">Publication Date</Text>
                <Text fontFamily="EB Garamond">{book.publication_date}</Text>
              </GridItem>
            )}
            {book.genre && (
              <GridItem>
                <Text fontWeight="bold" fontFamily="EB Garamond">Genre</Text>
                <Text fontFamily="EB Garamond">{book.genre}</Text>
              </GridItem>
            )}
            {book.sub_genre && (
              <GridItem>
                <Text fontWeight="bold" fontFamily="EB Garamond">Sub-Genre</Text>
                <Text fontFamily="EB Garamond">{book.sub_genre}</Text>
              </GridItem>
            )}
            {book.language && (
              <GridItem>
                <Text fontWeight="bold" fontFamily="EB Garamond">Language</Text>
                <Text fontFamily="EB Garamond">{book.language}</Text>
              </GridItem>
            )}
            {book.format && (
              <GridItem>
                <Text fontWeight="bold" fontFamily="EB Garamond">Format</Text>
                <Text fontFamily="EB Garamond">{book.format}</Text>
              </GridItem>
            )}
            {book.edition && (
              <GridItem>
                <Text fontWeight="bold" fontFamily="EB Garamond">Edition</Text>
                <Text fontFamily="EB Garamond">{book.edition}</Text>
              </GridItem>
            )}
            <GridItem>
              <Text fontWeight="bold" fontFamily="EB Garamond">Date Added</Text>
              <Text fontFamily="EB Garamond">{new Date(book.date_added).toLocaleDateString()}</Text>
            </GridItem>
            {book.summary && (
              <GridItem colSpan={2}>
                <Text fontWeight="bold" fontFamily="EB Garamond">Summary</Text>
                <Text fontFamily="EB Garamond" whiteSpace="pre-wrap">{book.summary}</Text>
              </GridItem>
            )}
            {book.review && (
              <GridItem colSpan={2}>
                <Text fontWeight="bold" fontFamily="EB Garamond">Review</Text>
                <Text fontFamily="EB Garamond" whiteSpace="pre-wrap">{book.review}</Text>
              </GridItem>
            )}
            {book.tags && book.tags.length > 0 && (
              <GridItem colSpan={2}>
                <Text fontWeight="bold" fontFamily="EB Garamond">Tags</Text>
                <Text fontFamily="EB Garamond">{book.tags.join(', ')}</Text>
              </GridItem>
            )}
            {book.cover_image_url && (
              <GridItem colSpan={2}>
                <Text fontWeight="bold" fontFamily="EB Garamond" mb={2}>Cover Image</Text>
                <ChakraImage
                  src={book.cover_image_url}
                  alt={`Cover of ${book.title}`}
                  maxH="300px"
                  objectFit="contain"
                />
              </GridItem>
            )}
            {book.isbn_13 && (
              <GridItem colSpan={2}>
                <Text fontWeight="bold" fontFamily="EB Garamond" fontSize="sm">ISBN-13</Text>
                <Text fontFamily="EB Garamond" fontSize="sm">{book.isbn_13}</Text>
              </GridItem>
            )}
            {book.isbn_10 && (
              <GridItem colSpan={2}>
                <Text fontWeight="bold" fontFamily="EB Garamond" fontSize="sm">ISBN-10</Text>
                <Text fontFamily="EB Garamond" fontSize="sm">{book.isbn_10}</Text>
              </GridItem>
            )}
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