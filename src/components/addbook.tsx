"use client"

import React from 'react';
import { IoAdd } from 'react-icons/io5';
import {
    IconButton,
    Button,
    VStack,
    Box,
    Input,
    FormControl,
    FormLabel,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useColorModeValue,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Grid,
    GridItem,
    HStack,
    Image,
    useDisclosure,
    useColorMode,
    useToast,
} from '@chakra-ui/react';

const AddBook: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode } = useColorMode();
    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [isbn13, setIsbn13] = React.useState('');
    const [isbn10, setIsbn10] = React.useState('');
    const [publisher, setPublisher] = React.useState('');
    const [publicationDate, setPublicationDate] = React.useState('');
    const [genre, setGenre] = React.useState('');
    const [subGenre, setSubGenre] = React.useState('');
    const [summary, setSummary] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [review, setReview] = React.useState('');
    const [pages, setPages] = React.useState(0);
    const [completion, setCompletion] = React.useState(0);
    const toast = useToast();

    const buttonBg = useColorModeValue('blue.500', 'blue.200');
    const buttonColor = useColorModeValue('white', 'gray.800');
    const buttonHoverBg = useColorModeValue('blue.600', 'blue.300');
    const modalBg = useColorModeValue('white', 'gray.800');

    const handleSubmit = async () => {
        try {
            const bookData = {
                title,
                author,
                isbn_13: isbn13,
                isbn_10: isbn10 || null,
                publisher: publisher || null,
                publication_date: publicationDate || null,
                genre: genre || null,
                sub_genre: subGenre || null,
                summary: summary || null,
                tags: tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
                review: review || null,
                pages,
                completed: completion,
                rating: 0,
                language: null,
                format: null,
                edition: null,
                cover_image_url: null
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/library'}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to create book');
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
            setSummary('');
            setTags('');
            setReview('');
            setPages(0);
            setCompletion(0);

            // Close modal
            onClose();

            // Show success message
            toast({
                title: 'Book created',
                description: `${bookData.title} has been added to your library`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            // Refresh the page to show the new book
            window.location.reload();
        } catch (error) {
            console.error('Error creating book:', error);
            toast({
                title: 'Error creating book',
                description: error instanceof Error ? error.message : 'An error occurred',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <IconButton
                aria-label="Add new book"
                icon={<IoAdd size="24px" />}
                onClick={onOpen}
                ml={4}
                bg="white"
                color="black"
                _hover={{
                    bg: 'gray.50'
                }}
                size="lg"
                isRound
                boxShadow="md"
            />
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
                            <span>Add New Book</span>
                        </HStack>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody py={6}>
                        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                            <GridItem>
                                <FormControl isRequired>
                                    <FormLabel>Title</FormLabel>
                                    <Input
                                        placeholder="Enter book title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem>
                                <FormControl isRequired>
                                    <FormLabel>Author</FormLabel>
                                    <Input
                                        placeholder="Enter author name"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem>
                                <FormControl isRequired>
                                    <FormLabel>ISBN-13</FormLabel>
                                    <Input
                                        placeholder="Enter ISBN-13"
                                        value={isbn13}
                                        onChange={(e) => setIsbn13(e.target.value)}
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem>
                                <FormControl>
                                    <FormLabel>ISBN-10</FormLabel>
                                    <Input
                                        placeholder="Enter ISBN-10"
                                        value={isbn10}
                                        onChange={(e) => setIsbn10(e.target.value)}
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem>
                                <FormControl>
                                    <FormLabel>Publisher</FormLabel>
                                    <Input
                                        placeholder="Enter publisher name"
                                        value={publisher}
                                        onChange={(e) => setPublisher(e.target.value)}
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
                                        placeholder="Enter genre"
                                        value={genre}
                                        onChange={(e) => setGenre(e.target.value)}
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem>
                                <FormControl>
                                    <FormLabel>Sub-Genre</FormLabel>
                                    <Input
                                        placeholder="Enter sub-genre"
                                        value={subGenre}
                                        onChange={(e) => setSubGenre(e.target.value)}
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Summary</FormLabel>
                                    <Input
                                        as="textarea"
                                        rows={8}
                                        resize="vertical"
                                        placeholder="Enter book summary"
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Tags (comma separated)</FormLabel>
                                    <Input
                                        placeholder="Enter tags separated by commas"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Review</FormLabel>
                                    <Input
                                        as="textarea"
                                        rows={8}
                                        resize="vertical"
                                        placeholder="Enter your review"
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                    />
                                </FormControl>
                            </GridItem>

                            <GridItem>
                                <FormControl isRequired>
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
                            </GridItem>

                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Completion</FormLabel>
                                    <Box pt={6} pb={2}>
                                        <Slider
                                            value={completion}
                                            onChange={(value) => setCompletion(value)}
                                            min={0}
                                            max={100}
                                            step={1}
                                        >
                                            <SliderMark value={0} mt="2" ml="-2.5" fontSize="sm">
                                                0%
                                            </SliderMark>
                                            <SliderMark value={50} mt="2" ml="-2.5" fontSize="sm">
                                                50%
                                            </SliderMark>
                                            <SliderMark value={100} mt="2" ml="-2.5" fontSize="sm">
                                                100%
                                            </SliderMark>
                                            <SliderTrack>
                                                <SliderFilledTrack />
                                            </SliderTrack>
                                            <SliderThumb />
                                        </Slider>
                                    </Box>
                                </FormControl>
                            </GridItem>

                            <GridItem colSpan={2}>
                                <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                                    <Button variant="outline" onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        colorScheme="blue"
                                        onClick={handleSubmit}
                                        _hover={{ bg: buttonHoverBg }}
                                    >
                                        Add Book
                                    </Button>
                                </Box>
                            </GridItem>
                        </Grid>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddBook;