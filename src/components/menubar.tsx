"use client"

import React from 'react';
import logoLight from '/public/logo/minerva-logo.png';
import logoDark from '/public/logo/minerva-logo-dark.png';
import Image from 'next/image';
import AddBook from "@/components/addbook";
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import ThemeToggle from './ThemeToggle';
import Subtitle from './Subtitle';
import { useTheme } from 'next-themes';

const MenuBar: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { resolvedTheme } = useTheme();
    const bgColor = useColorModeValue('transparent', 'transparent');

    return (
        <Box
            as="header"
            position="static"
            bg={bgColor}
            boxShadow="none"
        >
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                padding="1.5rem"
            >
                <Box flex="1" />
                <Flex
                    direction="column"
                    align="center"
                    gap={2}
                >
                    <Image
                        src={resolvedTheme === 'dark' ? logoDark : logoLight}
                        alt="Minerva Logo"
                        width={80}
                        height={80}
                    />
                    <Text
                        fontSize="2rem"
                        fontWeight="bold"
                        mb={0}
                    >
                        Minerva
                    </Text>
                    <Subtitle />
                </Flex>
                <Box flex="1" display="flex" justifyContent="flex-end">
                    <ThemeToggle />
                </Box>
            </Flex>
        </Box>
    );
};

export default MenuBar;