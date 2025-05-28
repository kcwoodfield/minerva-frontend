"use client"

import React from 'react';
import logo from '/public/logo/logo.png';
import Image from 'next/image';
import AddBook from "@/components/addbook";
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import ThemeToggle from './ThemeToggle';

const MenuBar: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{
                backgroundColor: 'var(--background)',
                borderBottom: '1px solid var(--border)',
            }}
        >
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Image
                        src={logo}
                        alt="Minerva Logo"
                        width={32}
                        height={32}
                        style={{ marginRight: '8px' }}
                    />
                    <Typography variant="h6" component="div">
                        Minerva
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ThemeToggle />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default MenuBar;