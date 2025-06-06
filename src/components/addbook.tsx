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
} from '@chakra-ui/react';

const AddBook: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const buttonBg = useColorModeValue('blue.500', 'blue.200');
    const buttonColor = useColorModeValue('white', 'gray.800');
    const buttonHoverBg = useColorModeValue('blue.600', 'blue.300');
    const modalBg = useColorModeValue('white', 'gray.800');

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <IconButton
                aria-label="Add new book"
                icon={<IoAdd size="24px" />}
                onClick={handleOpen}
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
            <Modal isOpen={isOpen} onClose={handleClose} size="md">
                <ModalOverlay />
                <ModalContent bg={modalBg}>
                    <ModalHeader borderBottomWidth="1px">
                        Create a new account
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody py={6}>
                        <VStack spacing={4} align="stretch">
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input placeholder="Please enter user name" />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Url</FormLabel>
                                <Box position="relative">
                                    <Box
                                        position="absolute"
                                        left={2}
                                        top="50%"
                                        transform="translateY(-50%)"
                                        color="gray.500"
                                    >
                                        http://
                                    </Box>
                                    <Input
                                        pl="60px"
                                        pr="40px"
                                        placeholder="Please enter domain"
                                    />
                                    <Box
                                        position="absolute"
                                        right={2}
                                        top="50%"
                                        transform="translateY(-50%)"
                                        color="gray.500"
                                    >
                                        .com
                                    </Box>
                                </Box>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Select Owner</FormLabel>
                                <Select defaultValue="lobo">
                                    <option value="lobo">Lobo the Wolf</option>
                                    <option value="cat">a cat</option>
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Input
                                    as="textarea"
                                    rows={4}
                                    resize="vertical"
                                />
                            </FormControl>

                            <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                                <Button variant="outline" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button
                                    bg={buttonBg}
                                    color={buttonColor}
                                    _hover={{
                                        bg: buttonHoverBg
                                    }}
                                >
                                    Create
                                </Button>
                            </Box>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddBook;