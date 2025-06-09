import React from 'react';
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
    VStack,
    useColorModeValue,
    Grid,
    GridItem,
    HStack,
    Image,
    Text,
    useColorMode,
} from '@chakra-ui/react';
import { Book } from '../types/book';

interface EditBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (book: Book) => void;
    book: Book;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ isOpen, onClose, onSave, book }) => {
    const [title, setTitle] = React.useState(book.title);
    const [author, setAuthor] = React.useState(book.author);
    const [isbn13, setIsbn13] = React.useState(book.isbn_13);
    const [isbn10, setIsbn10] = React.useState(book.isbn_10 || '');
    const [publisher, setPublisher] = React.useState(book.publisher || '');
    const [publicationDate, setPublicationDate] = React.useState(book.publication_date || '');
    const [genre, setGenre] = React.useState(book.genre || '');
    const [subGenre, setSubGenre] = React.useState(book.sub_genre || '');
    const [summary, setSummary] = React.useState(book.summary || '');
    const [tags, setTags] = React.useState(book.tags?.join(', ') || '');
    const [review, setReview] = React.useState(book.review || '');
    const [pages, setPages] = React.useState(book.pages);
    const [completion, setCompletion] = React.useState(book.completed || 0);
    const [rating, setRating] = React.useState(book.rating || 0);
    const { colorMode } = useColorMode();
    const modalBg = 'white';
    const buttonHoverBg = useColorModeValue('blue.600', 'blue.300');

    const handleSubmit = () => {
        const updatedBook: Book = {
            ...book,
            title,
            author,
            isbn_13: isbn13,
            isbn_10: isbn10 || undefined,
            publisher: publisher || undefined,
            publication_date: publicationDate || undefined,
            genre: genre || undefined,
            sub_genre: subGenre || undefined,
            summary: summary || undefined,
            tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
            review: review || undefined,
            pages,
            completed: completion,
            rating,
        };
        onSave(updatedBook);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={{ base: "md", md: "xl", lg: "2xl" }}>
            <ModalOverlay />
            <ModalContent bg={modalBg}>
                <ModalHeader>
                    <HStack spacing={3}>
                        <Image
                            src={colorMode === 'dark' ? '/logo/minerva-logo-dark.png' : '/logo/minerva-logo.png'}
                            alt="Minerva Logo"
                            boxSize="32px"
                            objectFit="contain"
                        />
                        <Text fontFamily="EB Garamond" fontSize="xl">Edit Book</Text>
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                        <GridItem>
                            <FormControl isRequired>
                                <FormLabel fontFamily="EB Garamond">Title</FormLabel>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    fontFamily="EB Garamond"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl isRequired>
                                <FormLabel fontFamily="EB Garamond">Author</FormLabel>
                                <Input
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    fontFamily="EB Garamond"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl isRequired>
                                <FormLabel fontFamily="EB Garamond">ISBN-13</FormLabel>
                                <Input
                                    value={isbn13}
                                    onChange={(e) => setIsbn13(e.target.value)}
                                    fontFamily="EB Garamond"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl>
                                <FormLabel fontFamily="EB Garamond">ISBN-10</FormLabel>
                                <Input
                                    value={isbn10}
                                    onChange={(e) => setIsbn10(e.target.value)}
                                    fontFamily="EB Garamond"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl>
                                <FormLabel fontFamily="EB Garamond">Publisher</FormLabel>
                                <Input
                                    value={publisher}
                                    onChange={(e) => setPublisher(e.target.value)}
                                    fontFamily="EB Garamond"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl>
                                <FormLabel fontFamily="EB Garamond">Publication Date</FormLabel>
                                <Input
                                    type="date"
                                    value={publicationDate}
                                    onChange={(e) => setPublicationDate(e.target.value)}
                                    fontFamily="EB Garamond"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl>
                                <FormLabel fontFamily="EB Garamond">Genre</FormLabel>
                                <Input
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    fontFamily="EB Garamond"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl>
                                <FormLabel fontFamily="EB Garamond">Sub-Genre</FormLabel>
                                <Input
                                    value={subGenre}
                                    onChange={(e) => setSubGenre(e.target.value)}
                                    fontFamily="EB Garamond"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem colSpan={2}>
                            <FormControl>
                                <FormLabel fontFamily="EB Garamond">Summary</FormLabel>
                                <Input
                                    as="textarea"
                                    rows={8}
                                    resize="vertical"
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    fontFamily="EB Garamond"
                                    minH="100px"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem colSpan={2}>
                            <FormControl>
                                <FormLabel fontFamily="EB Garamond">Tags (comma separated)</FormLabel>
                                <Input
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    fontFamily="EB Garamond"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem colSpan={2}>
                            <FormControl>
                                <FormLabel fontFamily="EB Garamond">Review</FormLabel>
                                <Input
                                    as="textarea"
                                    rows={8}
                                    resize="vertical"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    fontFamily="EB Garamond"
                                    minH="100px"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl isRequired>
                                <FormLabel fontFamily="EB Garamond">Pages</FormLabel>
                                <Input
                                    type="number"
                                    value={pages}
                                    onChange={(e) => setPages(parseInt(e.target.value))}
                                    fontFamily="EB Garamond"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl isRequired>
                                <FormLabel fontFamily="EB Garamond">Rating (0-5)</FormLabel>
                                <Input
                                    type="number"
                                    min="0"
                                    max="5"
                                    step="1"
                                    value={rating}
                                    onChange={(e) => setRating(parseInt(e.target.value))}
                                    fontFamily="EB Garamond"
                                />
                            </FormControl>
                        </GridItem>

                        <GridItem>
                            <FormControl>
                                <FormLabel fontFamily="EB Garamond">Completion</FormLabel>
                                <Input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={completion}
                                    onChange={(e) => setCompletion(parseInt(e.target.value))}
                                />
                                <HStack justify="space-between" mt={2}>
                                    <Text fontFamily="EB Garamond">0%</Text>
                                    <Text fontFamily="EB Garamond">50%</Text>
                                    <Text fontFamily="EB Garamond">100%</Text>
                                </HStack>
                            </FormControl>
                        </GridItem>
                    </Grid>
                </ModalBody>

                <ModalFooter>
                    <Button
                        variant="outline"
                        mr={3}
                        onClick={onClose}
                        fontFamily="EB Garamond"
                    >
                        Cancel
                    </Button>
                    <Button
                        colorScheme="blue"
                        onClick={handleSubmit}
                        _hover={{ bg: buttonHoverBg }}
                        fontFamily="EB Garamond"
                    >
                        Save Changes
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditBookModal;