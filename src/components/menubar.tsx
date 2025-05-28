"use client"

import React from 'react';
import logoLight from '/public/logo/minerva-logo.png';
import logoDark from '/public/logo/minerva-logo-dark.png';
import Image from 'next/image';
import AddBook from "@/components/addbook";
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import ThemeToggle from './ThemeToggle';
import Subtitle from './Subtitle';
import { useTheme } from 'next-themes';

const MenuBar: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { resolvedTheme } = useTheme();

    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{
                backgroundColor: 'transparent',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }} />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *:not(:last-child)': {
                        mb: 0.5
                    }
                }}>
                    <Image
                        src={resolvedTheme === 'dark' ? logoDark : logoLight}
                        alt="Minerva Logo"
                        width={80}
                        height={80}
                    />
                    <Typography variant="h6" component="div" sx={{ fontSize: '2rem', mb: 0 }}>
                        Minerva
                    </Typography>
                    <Subtitle />
                </Box>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <ThemeToggle />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MenuBar;