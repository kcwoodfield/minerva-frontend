"use client"

import React from 'react';
import { AddIcon } from '@chakra-ui/icons';
import {
    Button,
    VStack,
    Box,
    Input,
    FormControl,
    FormLabel,
    Select,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    IconButton,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

const AddBook: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const buttonBg = useColorModeValue('blue.500', 'blue.200');
    const buttonColor = useColorModeValue('white', 'gray.800');
    const buttonHoverBg = useColorModeValue('blue.600', 'blue.300');
    const drawerBg = useColorModeValue('white', 'gray.800');

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <Button
                leftIcon={<AddIcon />}
                onClick={handleOpen}
                ml={4}
                bg={buttonBg}
                color={buttonColor}
                _hover={{
                    bg: buttonHoverBg
                }}
            >
                Create user
            </Button>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={handleClose}
            >
                <DrawerOverlay />
                <DrawerContent bg={drawerBg}>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">
                        Create a new account
                    </DrawerHeader>

                    <DrawerBody>
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
                                    Submit
                                </Button>
                            </Box>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default AddBook;