"use client"

import React from 'react';
import logo from '/public/logo/logo.png';
import Image from 'next/image';
import AddBook from "@/components/addbook";
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import ThemeToggle from './ThemeToggle';
import Subtitle from './Subtitle';

const MenuBar: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

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
                        src={logo}
                        alt="Minerva Logo"
                        width={64}
                        height={64}
                    />
                    <Typography variant="h6" component="div">
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